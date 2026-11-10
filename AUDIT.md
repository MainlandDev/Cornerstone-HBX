# HBX conversion audit: `templates/**/*.html` -> `src/templates/**/*.tsx`

Independent audit of the Cornerstone -> HBX port (commits `4ae4290`, `ea53edf`, `d528452`), run on branch
`claude/cornerstone-hbx-conversion-audit-moid24`. It complements `DEVIATIONS.md` (the porting agents' own record): this file records what an
**independent** check of the build output found, what was fixed, and what still needs a decision.

## 1. Verdict

| Check | Result |
|---|---|
| Templates with a TSX twin | 210 / 210, none missing |
| `vite build` / `tsc` on `src/` | exit 0 / no errors in `src/` (see 6. Limits for `vite.config.ts`) |
| Compiled output vs original, after normalisation (3.) | **186 identical**, 24 differ |
| Of the 24: equivalent / cosmetic | 24 (after the correction below; `price-range` is the only unverified one) |
| Behaviour changes found | 1, **fixed** (`navigation`, `navigation-menu`: section 4.1) |
| Defects found that were **fixed in this branch** | 2 (`&plus;` section 4.2, 2 files; `and` operands section 4.1, 2 files) |
| Dangling `{{> partial}}` references in compiled output | 0 |
| Partials requested by `assets/js` that have no compiled template | 0 |
| Dropped Handlebars comments (`{{! }}`, 28 in 7 files) | none lost: now quoted in the TSX comments (section 5) |
| `@ts-ignore` / `@ts-expect-error` / `any` in `src/` | none |

The `DEVIATIONS.md` claim "192 identical, 18 differ" is **broadly confirmed** (different normaliser: this audit's is stricter on front matter and
text entities, so the counts are not directly comparable). The new findings are the `&plus;` defect and the `and` helper semantics.

## 2. Method

1. Built `@mainlanddev/bigcommerce-stencil` 0.0.10 and `@mainlanddev/bigcommerce-jsx` / `-react` 0.0.31 from the attached repos and linked them into a
   scratch copy of this repo (the real `package.json` / `package-lock.json` were not touched).
2. `tsc -b` and `vite build` on the scratch copy. Compiled templates land in `dist/templates/**.html`.
3. Compared each compiled file with its original by tokenising both into Handlebars expressions, HTML tags (attributes parsed and sorted) and text,
   then comparing token by token. Normalised as equivalent: quote style, whitespace, `./x` / `this.x` / `../this.x` -> `x`, `items.[0]` -> `items.0`,
   quoted vs bare partial names, attribute order, `<x/>` vs `<x>`, `style` spacing, `&quot;`/`&#123;` in attribute values, closing tags of void/SVG
   elements, `data-x` vs `data-x=""`, front-matter indentation, and **hash arguments on partial calls** (the by-design "named arguments", section 3).
   Not normalised (so they surface): text entities, helper names, operands, block structure, wrapper helpers such as `as |ctx|`.
4. Checked every `{{> partial}}` in the output resolves to a compiled or original template, and every template path `assets/js` requests exists.
5. Read Stencil's own `and` helper source (`@bigcommerce/stencil-paper-handlebars/helpers/3p/comparison.js`) to settle the one semantic question (4.1).

## 3. By-design differences (not defects)

Per `CLAUDE.md` every partial call gains explicit named arguments, e.g. `{{> components/common/social-links social_media=social_media}}`, and
`{{#block "head" root=@root}}` / `{{#with x as |ctx|}}` are emitted by the library. These are expected and excluded from the table below.

## 4. Findings

### 4.1 Behaviour change, **fixed**: `{{#and a b '>' 1}}`

| File | Original | TSX output |
|---|---|---|
| `components/common/navigation` L2 | `{{#and language_selector language_selector.languages.length '>' 1}}` | `{{#and language_selector (if language_selector.languages.length ">" 1)}}` |
| `components/common/navigation-menu` L30 | same | same |

Stencil's helper is `helpers.and = function(a, b) { ... if (a && b) ... }`. It reads **two** operands; the trailing `'>' 1` of the original are ignored.
So the original shows the language selector whenever `languages.length` is truthy (**1 or more languages**). The TSX shows it only when there are
**more than one**. A store with exactly one language loses the selector. `DEVIATIONS.md` calls this "equivalent intent"; it is not equivalent output.
**Fix applied:** `b={language_selector.languages.length}`, which compiles to `{{#and language_selector language_selector.languages.length}}` and matches the original's behaviour (the dead `'>' 1` operands are dropped). If you actually want "more than one language", that is a deliberate change to make separately.

### 4.2 Defect, **fixed**: `&plus;` rendered literally

`components/account/address-list` and `components/account/payment-methods-list` wrote `&plus;` as JSX text. JSX does not decode that named entity, so the
compiled template contained `&amp;plus;` and shoppers would see the text `&plus;` instead of "+". Fixed with `{$$raw('&plus;')}` (the documented pattern).
Both files now compare identical to the originals. Commit `1b61b8d`.

### 4.3 Equivalent or cosmetic (22 files), listed so they are not re-audited

| File(s) | Difference | Assessment |
|---|---|---|
| `layout/base`, `layout/empty`, `components/common/body` | `{{#block "x" root=@root}}` | library workaround, equivalent |
| `components/cart/preview`, `components/common/payment-icons` | `{{#with x as \|ctx\|}}`, `ctx.` paths | equivalent |
| `pages/account/add-payment-method` | `../theme_settings.x` emitted as `theme_settings.x` | library computes the hop from scope; **verify at runtime** |
| `pages/account/edit-payment-method` | `{{../forms.action}}`, `ctx.token` | **verify at runtime** (scope hops under `as \|ctx\|`) |
| `components/common/navigation-dropdown`, `navigation-list-alternate`, `navigation-menu` | partial called with an explicit `this` argument | same context, equivalent |
| `components/products/related` | `{{#each this}}` -> `{{#each products}}` | no caller in the theme (see section 6) |
| `pages/account/wishlist-details` | `value="{{a}} {{b}}"` -> `{{concat a b}}` | equivalent (the original's space is whitespace noise) |
| `components/common/responsive-img` | tokens padded in `class=" ... "`; the 35-line usage doc comment dropped | cosmetic; the doc is preserved in the new TSX comment |
| `components/products/modals/writeReview`, `options/date`, `ratings` | `{{#for}}` bodies use `this.$index` | equivalent inside Stencil's `for`; **verify at runtime** |
| `pages/home`, `blog`, `brand`, `category`, `product`, `account/orders/all` | front-matter YAML re-indented, `{{./theme_settings.x}}` | equivalent YAML / Handlebars |
| `components/products/price-range` L91 | `{{#and price_range.min.with_tax price_range.max.with_tax}}` class `price-section--minor` dropped | claimed dead branch (`price_range` is not in scope; siblings read `price.price_range`). **Unverified**: the 1-1 rule would keep it via the raw escape hatch |

### 4.4 Risk areas the build cannot prove (unchanged from `DEVIATIONS.md` 8.4)

23 files use `$parseHandlebarsDangerously` (verbatim text, so they diff clean, but `tsc` does not check them), ~27 partials are rendered by JS at
runtime with no page context, and the loops/`as |ctx|` hops above. These need a real Stencil render (`npm run vite-dev` against a store), which this
audit environment did not have.

## 5. Per-line source comments (the second deliverable)

Every `src/templates/**/*.tsx` now starts with a header:

```
/**
 * Source: templates/<path>.html (<n> lines). Per-element comments below quote the original lines (`html L<n>`).
 * Front matter of the original (lines 1-N):   <- only for pages that have one
 */
```

and carries an `html L<n>: <original text>` comment immediately before each **element, helper component (`$If`, `$Each`, `$Lang`, `$Partial`...),
child expression (`{$unescaped(x)}`) and inline-script body**. Multi-line originals keep their lines (`html L16-19:`). Handlebars comments and
`{{else}}` lines that the port dropped are quoted in front of the next node, so no original documentation is lost.

* In JSX child position the comment is `{/* ... */}` (renders nothing); in expression position it is `/* ... */`.
* **Proof it is inert:** `tsc -b` is clean and `dist/templates/**` is byte-identical before and after the comments (210 files compared).
* 4,546 comments were added; 4,529 of 4,563 JSX units were aligned to an original line. Alignment is automatic (document-order match on tag, class,
  id, lang key, partial path, helper name); the 34 unaligned units are mostly `$AssignVar`, `$dynamic` and `{$$raw}` fragments.
* Attribute lines and closing tags are not annotated separately: the element comment already quotes the whole original start tag.
* 35 original tokens have no TSX counterpart and are not inside a verbatim raw fragment. They are the `{{#for}}`/`$index` loops in `writeReview`,
  `options/date` and `ratings` (documented, emitted as `$$raw`), `{{{dynamicComponent ...}}}` (carried as `$dynamic` props), `{{{this}}}` in
  `additional-checkout-buttons`/`cart/preview`/`cart-preview`, `{{value}}`/`{{prefill}}` in textareas (carried as `defaultValue`), and the maintenance
  `{{{stylesheet}}}`. None changes the compiled output (section 1).

## 6. Limits of this audit

* Static + build-output comparison only. No template was rendered against live BigCommerce data.
* Libraries were built from the attached source (`bigcommerce-react` 0.0.31, `bigcommerce-stencil` 0.0.10) with a dummy `config.stencil.json`.
* In the linked scratch setup `tsc -b` reports type errors in `vite.config.ts` only (duplicate Vite type copies through symlinks). This is believed to
  be an artefact of the linking, not a repo defect; `src/` itself type-checks. Not confirmed against a registry install.
* `components/products/related` and the three `components/social/*` stubs have no callers or are literal `brand.html` text (see `DEVIATIONS.md`).
* The comparison script and the annotator were kept out of the repo (scratch tooling). Re-running the annotator is only needed if comments drift; edit
  them by hand when you change a node.
