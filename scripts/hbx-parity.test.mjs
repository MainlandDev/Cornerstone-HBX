// Self-check for scripts/hbx-parity.mjs. Run: node --test scripts/hbx-parity.test.mjs
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync, mkdirSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {compare, runParity} from './hbx-parity.mjs';

const same = (a, b) => assert.equal(compare(a, b).same, true, `expected identical:\n${a}\n${b}`);
const differs = (a, b) => assert.equal(compare(a, b).same, false, `expected a difference:\n${a}\n${b}`);

test('whitespace next to tags and block tags is ignored', () => {
    same('<div>\n    <p>\n        Hi there\n    </p>\n</div>\n', '<div><p>Hi there</p></div>');
    same('{{#each list}}\n    {{> components/x}}\n{{/each}}\n<div></div>', '{{#each list}}{{> components/x}}{{/each}}<div></div>');
});

test('partial name quote style is ignored', () => {
    same('{{> components/x a=1}}', '{{> "components/x" a=1}}');
    same('{{#partial "page"}}x{{/partial}}', '{{#partial page}}x{{/partial}}');
});

test('string literal quote style is ignored', () => {
    same("{{lang 'account.orders.heading' }}", '{{lang "account.orders.heading"}}');
    same("{{> components/account/navigation account_page='orders'}}", '{{> components/account/navigation account_page="orders"}}');
});

test('this././@root. path prefixes are ignored', () => {
    same('{{> components/alert-info message}}', '{{> "components/alert-info" this.message}}');
    same('{{> x arrows=theme_settings.a}}', '{{> x arrows=@root.theme_settings.a}}');
    same('{{> x ./message}}', '{{> x message}}');
});

test('self-closing and explicit-close tags match', () => {
    same('<x/>', '<x></x>');
    same('<br />', '<br>');
    same('<img src="a.png" />', '<img src="a.png">');
});

test('plain attribute order and attribute quote style are ignored', () => {
    same('<a href="x" class="y">z</a>', "<a class='y' href=\"x\">z</a>");
});

test('style values ignore case, spacing and a trailing semicolon', () => {
    same('<div style="display: none;"></div>', '<div style="display:none"></div>');
    same('<div style="DISPLAY:None"></div>', '<div style="display: none"></div>');
    differs('<div style="display: none;"></div>', '<div style="display: block;"></div>');
    differs('<div style="display:none"></div>', '<div style="display:block"></div>');
});

test('valueless attribute equals empty-valued attribute', () => {
    same('<input disabled>', '<input disabled="">');
    differs('<input disabled>', '<input disabled="disabled">');
});

test('hash argument order is ignored', () => {
    same('{{> p a=1 b=2}}', '{{> p b=2 a=1}}');
});

test('front matter indentation and mapping-key order are ignored', () => {
    same('---\nproducts:\n    new:\n        limit: {{a.b}}\ncarousel: {{c}}\n---\nbody', '---\ncarousel: {{c}}\nproducts:\n  new:\n    limit: {{a.b}}\n---\nbody');
});

test('real differences are detected', () => {
    differs('<p>Hello</p>', '<p>Goodbye</p>');
    differs('<div><p>x</p></div>', '<div><span>x</span></div>');
    differs('{{> components/a}}', '{{> components/b}}');
    differs('{{lang "a"}}', '{{lang x}}');
    differs('{{> p a=1}}', '{{> p a=2}}');
    differs('{{#if a}}x{{/if}}', '{{#unless a}}x{{/unless}}');
    differs('{{{region name="a"}}}', '{{{region name="b"}}}');
    differs('---\nlimit: 3\n---\nx', '---\nlimit: 4\n---\nx');
    differs('<p>x</p>', '<p>x</p><p>x</p>');
});

// Case 2: whitespace between two expressions prints, so it must count.
test('whitespace between two expressions is significant', () => {
    differs('<p>Hello {{first}} {{last}}</p>', '<p>Hello {{first}}{{last}}</p>');
    differs('<p>Hello {{first}}</p>', '<p>Hello{{first}}</p>');
});

// Case 3: spacing inside attribute values is significant.
test('spacing inside attribute values is significant', () => {
    differs('<div class="{{a}} {{b}}"></div>', '<div class="{{a}}{{b}}"></div>');
    differs('<div class="btn {{a}}"></div>', '<div class="btn{{a}}"></div>');
});

// Case 4: Handlebars blocks inside a tag keep their branch structure.
test('branch-swapped Handlebars blocks inside a tag are detected', () => {
    differs('<img {{#if a}}alt="x"{{else}}alt="y"{{/if}}>', '<img {{#if a}}alt="y"{{else}}alt="x"{{/if}}>');
});

// Case 5: list order in front matter is significant.
test('front matter list order is significant', () => {
    differs('---\nslides: [a, b]\n---\nx', '---\nslides: [b, a]\n---\nx');
    differs('---\nslides:\n  - a\n  - b\n---\nx', '---\nslides:\n  - b\n  - a\n---\nx');
});

test('reports first differing token', () => {
    const res = compare('<a>one</a><b>two</b>', '<a>one</a><b>three</b>');
    assert.equal(res.same, false);
    assert.equal(res.index, 4);
    assert.equal(res.orig, 'TEXT two');
    assert.equal(res.dist, 'TEXT three');
});

function fixture(files) {
    const root = mkdtempSync(path.join(tmpdir(), 'hbx-parity-test-'));
    for (const [rel, content] of Object.entries(files)) {
        const full = path.join(root, rel);
        mkdirSync(path.dirname(full), {recursive: true});
        writeFileSync(full, content);
    }
    return root;
}

test('default mode counts an original with no dist file as missing', () => {
    const root = fixture({'templates/pages/a.html': '<p>x</p>'});
    try {
        const lines = [];
        const counts = runParity([], root, (l) => lines.push(l));
        assert.deepEqual(counts, {identical: 0, differs: 0, missing: 1});
        assert.ok(lines.includes('missing    pages/a.html'));
        assert.equal(lines.at(-1), 'identical=0 differs=0 missing=1');
    } finally {
        rmSync(root, {recursive: true, force: true});
    }
});

test('a file that fails to parse reports differs and the summary still prints', () => {
    const root = fixture({
        'templates/pages/bad.html': '{{#if x}}<p>{{unclosed',
        'dist/templates/pages/bad.html': '<p>x</p>',
        'templates/pages/ok.html': '<p>x</p>',
        'dist/templates/pages/ok.html': '<p>x</p>',
    });
    try {
        const lines = [];
        const counts = runParity([], root, (l) => lines.push(l));
        assert.deepEqual(counts, {identical: 1, differs: 1, missing: 0});
        assert.ok(lines.some((l) => l.startsWith('differs    pages/bad.html') && l.includes('parse error')));
        assert.equal(lines.at(-1), 'identical=1 differs=1 missing=0');
    } finally {
        rmSync(root, {recursive: true, force: true});
    }
});

test('--ported skips originals without a src/templates twin', () => {
    const root = fixture({'templates/pages/a.html': '<p>x</p>'});
    try {
        const counts = runParity(['--ported'], root, () => {});
        assert.deepEqual(counts, {identical: 0, differs: 0, missing: 0});
    } finally {
        rmSync(root, {recursive: true, force: true});
    }
});
