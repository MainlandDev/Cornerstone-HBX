#!/usr/bin/env node
// Token-compare parity check: original Stencil template (templates/**/*.html) against the
// Vite-rendered TSX port (dist/templates/**/*.html). Both files are reduced to a token stream
// under the normalisations below; equal streams count as identical.
//
//   node scripts/hbx-parity.mjs [--ported] [path-prefix...]
//
// Normalisations: whitespace next to tags and block/partial control tags (block formatting);
// quote style on string literals and partial names; `this.` / `./` / `@root.` path prefixes;
// `<x/>` vs `<x></x>`; plain attribute order and quote style; hash-argument order; front-matter
// indentation and mapping-key order (list order is kept).
// Not normalised: whitespace between two expressions, whitespace inside attribute values beyond
// collapse, order of Handlebars blocks inside tags, comments.

import {readdirSync, readFileSync, existsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

function normPath(p) {
    let x = p;
    for (;;) {
        if (x.startsWith('this.')) x = x.slice(5);
        else if (x.startsWith('./')) x = x.slice(2);
        else if (x.startsWith('@root.')) x = x.slice(6);
        else return x;
    }
}

function parseArgs(s) {
    const pos = [];
    const hash = [];
    const n = s.length;
    let i = 0;
    const readValue = () => {
        if (s[i] === '"' || s[i] === "'") {
            const q = s[i++];
            let v = '';
            while (i < n && s[i] !== q) {
                if (s[i] === '\\' && i + 1 < n) i++;
                v += s[i++];
            }
            i++;
            return {str: v};
        }
        if (s[i] === '(') {
            const start = i;
            let depth = 0;
            for (; i < n; i++) {
                if (s[i] === '(') depth++;
                else if (s[i] === ')' && --depth === 0) {
                    i++;
                    break;
                }
            }
            return {sub: canonExpr(s.slice(start + 1, i - 1))};
        }
        const start = i;
        while (i < n && !/\s/.test(s[i]) && s[i] !== '=') i++;
        return {path: normPath(s.slice(start, i))};
    };
    for (;;) {
        while (i < n && /\s/.test(s[i])) i++;
        if (i >= n) break;
        if (s[i] === '"' || s[i] === "'" || s[i] === '(') {
            pos.push(readValue());
            continue;
        }
        const start = i;
        while (i < n && !/\s/.test(s[i]) && s[i] !== '=') i++;
        const word = s.slice(start, i);
        if (s[i] === '=') {
            i++;
            hash.push([word, readValue()]);
        } else {
            pos.push({path: normPath(word)});
        }
    }
    return {pos, hash};
}

function renderArg(a, unquote) {
    if ('str' in a) return unquote ? a.str : JSON.stringify(a.str);
    if ('sub' in a) return `(${a.sub})`;
    return a.path;
}

// `unquoteIdx`: positional index whose string literal is a partial name, so `"x"` and `x` match.
function canonExpr(s, unquoteIdx = -1) {
    const {pos, hash} = parseArgs(s.trim());
    const parts = pos.map((a, idx) => renderArg(a, idx === unquoteIdx));
    const pairs = hash
        .map(([k, v]) => [k, renderArg(v, false)])
        .sort((x, y) => (x[0] < y[0] ? -1 : x[0] > y[0] ? 1 : 0));
    for (const [k, v] of pairs) parts.push(`${k}=${v}`);
    return parts.join(' ');
}

function partialIdx(inner) {
    return inner.trim().split(/\s/)[0] === 'partial' ? 1 : -1;
}

function mustacheToken(raw) {
    if (raw.startsWith('{{!')) return null;
    if (raw.startsWith('{{{')) return `RAW ${canonExpr(raw.slice(3, -3))}`;
    const inner = raw.slice(2, -2).replace(/^~|~$/g, '');
    const sigil = inner[0];
    if (sigil === '&') return `RAW ${canonExpr(inner.slice(1))}`;
    if (sigil === '#') return `OPEN ${canonExpr(inner.slice(1), partialIdx(inner.slice(1)))}`;
    if (sigil === '/') return `CLOSE ${inner.slice(1).trim()}`;
    if (sigil === '^') {
        return inner.trim() === '^' ? 'ELSE' : `OPEN_INVERSE ${canonExpr(inner.slice(1))}`;
    }
    if (sigil === '>') return `PARTIAL ${canonExpr(inner.slice(1), 0)}`;
    if (inner.trim() === 'else') return 'ELSE';
    return `EXPR ${canonExpr(inner)}`;
}

function mustacheEnd(s, i) {
    if (s.startsWith('{{!', i)) {
        const e = s.indexOf('}}', i);
        return e < 0 ? s.length : e + 2;
    }
    const triple = s.startsWith('{{{', i);
    const close = triple ? '}}}' : '}}';
    let j = i + (triple ? 3 : 2);
    while (j < s.length) {
        const c = s[j];
        if (c === '"' || c === "'") {
            j++;
            while (j < s.length && s[j] !== c) {
                if (s[j] === '\\') j++;
                j++;
            }
            j++;
            continue;
        }
        if (s.startsWith(close, j)) return j + close.length;
        j++;
    }
    throw new Error(`Unclosed Handlebars expression at offset ${i}`);
}

// Attribute values keep their inner spacing: `class="{{a}} {{b}}"` differs from `class="{{a}}{{b}}"`.
function canonAttr(value) {
    const parts = [];
    tokenizeBody(value, parts, false);
    return parts.map((t) => (t.startsWith('TEXT ') ? t.slice(5) : `{${t}}`)).join('').trim();
}

// CSS declarations compare without case, spacing or a trailing semicolon: `display: none;` is `display:none`.
function canonStyle(value) {
    return value
        .toLowerCase()
        .split(';')
        .map((decl) => decl.trim())
        .filter(Boolean)
        .map((decl) => decl.replace(/\s*:\s*/, ':').replace(/\s+/g, ' '))
        .join(';');
}

function tagTokens(s, start) {
    let i = start + 1;
    const closing = s[i] === '/';
    if (closing) i++;
    const nameStart = i;
    while (i < s.length && /[A-Za-z0-9!_:-]/.test(s[i])) i++;
    const name = s.slice(nameStart, i).toLowerCase();
    const items = []; // {plain, text}: plain attributes may be reordered, Handlebars items may not
    let selfClose = false;
    while (i < s.length) {
        const c = s[i];
        if (c === '>') {
            i++;
            break;
        }
        if (/\s/.test(c)) {
            i++;
            continue;
        }
        if (c === '/' && s[i + 1] === '>') {
            selfClose = true;
            i += 2;
            break;
        }
        if (s.startsWith('{{', i)) {
            const e = mustacheEnd(s, i);
            const tok = mustacheToken(s.slice(i, e));
            if (tok) items.push({plain: false, text: tok});
            i = e;
            continue;
        }
        const aStart = i;
        while (i < s.length && !/[\s=>]/.test(s[i]) && !s.startsWith('{{', i) && !(s[i] === '/' && s[i + 1] === '>')) i++;
        if (i === aStart) i++;
        const aname = s.slice(aStart, i).toLowerCase();
        if (s[i] !== '=') {
            items.push({plain: true, text: `${aname}=""`});
            continue;
        }
        i++;
        let value;
        if (s[i] === '"' || s[i] === "'") {
            const q = s[i++];
            const vs = i;
            while (i < s.length && s[i] !== q) {
                if (s.startsWith('{{', i)) i = mustacheEnd(s, i);
                else i++;
            }
            value = s.slice(vs, i);
            i++;
        } else {
            const vs = i;
            while (i < s.length && !/[\s>]/.test(s[i])) {
                if (s.startsWith('{{', i)) i = mustacheEnd(s, i);
                else i++;
            }
            value = s.slice(vs, i);
        }
        const canon = aname === 'style' ? canonStyle(canonAttr(value)) : canonAttr(value);
        items.push({plain: true, text: `${aname}="${canon}"`});
    }
    if (closing) return {tokens: [`CLOSE ${name}`], end: i};
    const ordered = [];
    let run = [];
    const flushRun = () => {
        ordered.push(...run.map((it) => it.text).sort());
        run = [];
    };
    for (const it of items) {
        if (it.plain) run.push(it);
        else {
            flushRun();
            ordered.push(it.text);
        }
    }
    flushRun();
    const tokens = [`OPEN ${name}${ordered.length ? ' ' + ordered.join(' ') : ''}`];
    if (selfClose && !VOID.has(name)) tokens.push(`CLOSE ${name}`);
    return {tokens, end: i};
}

const isExpression = (tok) => tok !== undefined && /^(EXPR|RAW) /.test(tok);

// Whitespace is block formatting unless it sits between two expressions, where it prints.
function trimAtBoundaries(out, from) {
    const seg = out.splice(from);
    seg.forEach((tok, k) => {
        if (!tok.startsWith('TEXT ')) {
            out.push(tok);
            return;
        }
        let t = tok.slice(5);
        if (!isExpression(k === 0 ? undefined : seg[k - 1])) t = t.trimStart();
        if (!isExpression(k === seg.length - 1 ? undefined : seg[k + 1])) t = t.trimEnd();
        if (t) out.push(`TEXT ${t}`);
    });
}

function tokenizeBody(s, out, boundaries = true) {
    const from = out.length;
    let text = '';
    const flush = () => {
        const t = text.replace(/\s+/g, ' ');
        if (t) out.push(`TEXT ${t}`);
        text = '';
    };
    let i = 0;
    while (i < s.length) {
        if (s.startsWith('{{', i)) {
            flush();
            const end = mustacheEnd(s, i);
            const tok = mustacheToken(s.slice(i, end));
            if (tok) out.push(tok);
            i = end;
        } else if (s.startsWith('<!--', i)) {
            flush();
            const e = s.indexOf('-->', i);
            const end = e < 0 ? s.length : e + 3;
            out.push(`COMMENT ${s.slice(i, end).replace(/\s+/g, ' ')}`);
            i = end;
        } else if (s[i] === '<' && /[A-Za-z/!]/.test(s[i + 1] ?? '')) {
            flush();
            const {tokens, end} = tagTokens(s, i);
            out.push(...tokens);
            i = end;
        } else {
            text += s[i++];
        }
    }
    flush();
    if (boundaries) trimAtBoundaries(out, from);
}

function canonValue(v) {
    const m = /^(["'])(.*)\1$/s.exec(v.trim());
    const inner = m ? m[2] : v.trim();
    const parts = [];
    tokenizeBody(inner, parts, false);
    return parts.map((t) => (t.startsWith('TEXT ') ? t.slice(5) : `{${t}}`)).join('').trim();
}

// Mapping keys are sorted (order drops out); list items keep their position via an index in the path.
function frontMatterTokens(block) {
    const entries = [];
    const stack = [];
    const listCounts = new Map();
    for (const raw of block.split('\n')) {
        if (!raw.trim()) continue;
        const indent = raw.length - raw.trimStart().length;
        const line = raw.trim();
        while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
        const parent = stack.map((s) => s.key).join('.');
        if (line === '-' || line.startsWith('- ')) {
            const idx = listCounts.get(parent) ?? 0;
            listCounts.set(parent, idx + 1);
            entries.push(`FM ${parent}[${idx}]=${canonValue(line.slice(1))}`);
            continue;
        }
        const m = /^([^:]+?):(?:\s+(.*))?$/.exec(line);
        const key = m ? m[1].trim() : line;
        const value = m ? (m[2] ?? '') : '';
        const dotted = [parent, key].filter(Boolean).join('.');
        if (value.startsWith('[') && value.endsWith(']')) {
            value
                .slice(1, -1)
                .split(',')
                .map((x) => x.trim())
                .filter(Boolean)
                .forEach((item, idx) => entries.push(`FM ${dotted}[${idx}]=${canonValue(item)}`));
            continue;
        }
        entries.push(`FM ${dotted}=${canonValue(value)}`);
        if (value === '') stack.push({indent, key});
    }
    return entries.sort();
}

export function tokenize(src) {
    const text = src.replace(/\r\n?/g, '\n');
    const tokens = [];
    let body = text;
    const fm = /^---\n(?:([\s\S]*?)\n)?---\n?/.exec(text);
    if (fm) {
        tokens.push(...frontMatterTokens(fm[1] ?? ''));
        body = text.slice(fm[0].length);
    }
    tokenizeBody(body, tokens);
    return tokens;
}

// Returns {same: true} or {same: false, index, orig, dist} for the first differing token.
export function compare(originalSrc, distSrc) {
    const a = tokenize(originalSrc);
    const b = tokenize(distSrc);
    const n = Math.max(a.length, b.length);
    for (let k = 0; k < n; k++) {
        if (a[k] !== b[k]) return {same: false, index: k, orig: a[k] ?? '<end>', dist: b[k] ?? '<end>'};
    }
    return {same: true};
}

function walkHtml(dir, base = dir) {
    const out = [];
    for (const ent of readdirSync(dir, {withFileTypes: true})) {
        const full = path.join(dir, ent.name);
        if (ent.isDirectory()) out.push(...walkHtml(full, base));
        else if (ent.name.endsWith('.html')) out.push(path.relative(base, full).split(path.sep).join('/'));
    }
    return out.sort();
}

// Compares every original under templates/ (or only those with a src/templates twin under --ported).
// An original without a dist counterpart counts as missing. A file that fails to parse counts as differs.
export function runParity(argv, root = ROOT, log = console.log) {
    const ported = argv.includes('--ported');
    const prefixes = argv
        .filter((a) => !a.startsWith('--'))
        .map((p) => p.replace(/\\/g, '/').replace(/^\.?\/?templates\//, '').replace(/^\//, ''));
    const counts = {identical: 0, differs: 0, missing: 0};
    for (const rel of walkHtml(path.join(root, 'templates'))) {
        if (prefixes.length && !prefixes.some((p) => rel.startsWith(p))) continue;
        if (ported && !existsSync(path.join(root, 'src/templates', rel.replace(/\.html$/, '.tsx')))) continue;
        const dist = path.join(root, 'dist/templates', rel);
        if (!existsSync(dist)) {
            counts.missing++;
            log(`missing    ${rel}`);
            continue;
        }
        try {
            const res = compare(readFileSync(path.join(root, 'templates', rel), 'utf8'), readFileSync(dist, 'utf8'));
            if (res.same) {
                counts.identical++;
                log(`identical  ${rel}`);
            } else {
                counts.differs++;
                log(`differs    ${rel}  first diff at token #${res.index}`);
                log(`             orig: ${res.orig}`);
                log(`             dist: ${res.dist}`);
            }
        } catch (err) {
            counts.differs++;
            log(`differs    ${rel}  parse error: ${err.message}`);
        }
    }
    log(`identical=${counts.identical} differs=${counts.differs} missing=${counts.missing}`);
    return counts;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const counts = runParity(process.argv.slice(2));
    process.exitCode = counts.differs || counts.missing ? 1 : 0;
}
