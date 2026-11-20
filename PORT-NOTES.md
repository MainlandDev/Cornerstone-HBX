# HBX template port notes

Originals live in `templates/**/*.html`; TSX ports live in `src/templates/**/*.tsx` and compile to `dist/templates/**/*.html` via `npx vite build`. Check a port with `node scripts/hbx-parity.mjs --ported`.

## Idioms

Taken from the pilots `src/templates/pages/home.tsx` and `src/templates/pages/account/orders/completed.tsx`.

| Handlebars | TSX |
| --- | --- |
| `{{#partial "page"}}…{{/partial}}` | `<$StencilPartial name={$string("page")} $then={() => (<>…</>)} />` |
| a page template: `{{#partial "head"}}…{{/partial}}{{#partial "page"}}…{{/partial}}{{> layout/empty}}` | `export default () => (<$Page blocks={{head: () => …, page: () => …}} layout="layout/empty" />)`, blocks in source order, the layout last; a top-level element that is not a partial (an inject) goes in a `<>` wrapper before `<$Page>` |
| `{{> components/x a=b}}` | `$partial("components/x", {a: b})` |
| `{{> components/x item}}` (positional context) | `$partial("components/x", item)` |
| `{{> layout/base}}` | `<$Page … />` (it calls the layout) |
| `{{theme_settings.x}}` | `const settings = $$themeSettings();` then `settings.x` |
| typed data read, e.g. `carousel.slides.length` | `const carousel = $pointer<{slides: {length: number}}>("carousel");` |
| `{{#if x}}…{{/if}}` | `<$If test={x} $then={() => …} />` |
| `{{#if x '==' 'y'}}…{{else if x '===' 0}}…{{/if}}` | `<$If test={x} operator={$string("==")} rvalue={$string("y")} $then={() => …} $elseThen={[{test: x, operator: $string("==="), rvalue: $number(0), $then: () => …}]} />`; in a class or attribute string, `${$If({test, operator, rvalue, $then: () => "…"})}` |
| `{{#each list}}…{{/each}}` | `<$Each list={$pointer<T[]>("list")} $then={(item) => …} />` |
| `{{#and a b}}…{{/and}}` | `<$And a={a} b={b} $then={() => …} />` |
| `{{lang 'a.b'}}` | `<$Lang keyName={$string("a.b")} />` |
| `{{{region name="n"}}}` | `$unescaped($region({name: $string("n")}))` |
| `{{{region name="n"}}}` inside JSX | wrap in a local helper, e.g. `const region = (name: string) => $unescaped($region({name: $string(name)}));` |
| front matter `products: {new: {limit: {{theme_settings.x}}}}` | `export const frontmatter = $frontmatter.home({products: {new: {limit: setting("x")}}});` with `const {setting} = $frontmatter;` |

Notes:

- Use `$$themeSettings()` once per template and read keys from it; the original `theme_settings.` prefix maps to that result.
- Page templates are `<$Page blocks={{…}} layout="…" />`; `<$StencilPartial>` is still the form for a partial the page does not own.
- The `$frontmatter` call in the pilots uses `.home` for the home page and `.other` for the orders page.


## Partials as components (`components/common/**` done)

A `.tsx` file under the template root that starts with `"use server";` makes every function export a partial: `export default (_props: PartialProps) => …` renders `components/x.html`, and `import X from "…/components/x.tsx"` then `<X a={b} />` prints `{{> "components/x" a=b}}`. Only HBX values (`$string(..)`, a pointer, any token) may be passed; a JS value throws. The reserved prop `$positionalHash` is the call's positional context: `<AlertInfo $positionalHash={item.message} />` prints `{{> "…" item.message}}`. `$asInline(fn)` opts a small snippet out (no template, inlined where used). Converted with a one-off codemod; `vite build` plus `node scripts/hbx-parity.mjs --ported` is unchanged (204 identical, 3 pre-existing differs). Remaining `$partial("components/<other>/…")` calls are converted folder by folder.

## Raw fragments

Template fragments kept as raw Handlebars because no typed equivalent exists yet.

| file | fragment | reason |
| --- | --- | --- |
| components/common/modal/modal-close-btn.tsx:13 | `&#215;` via `dangerouslySetInnerHTML` | JSX text would emit the literal `×` character, not the entity `&#215;` |
| components/common/modal/modal-close-btn.tsx:8 | `{{additional_attr}}` as `dangerouslyInlineAttributes` carrier | attribute-position expression with no attribute name; the library carrier is the only way to print it |
| components/carousel.tsx:15-17 | `data-slick` JSON as `dangerouslyInlineAttributes` carrier | a plain attribute value would have `{` escaped to `&#123;` and its JSON quotes escaped; the JSON is reflowed onto one line (harness collapses whitespace, so the tokens match) |
| layout/base.tsx | `<!DOCTYPE html>` | React 19 moves text placed before `<html>` into `<body>`; the plugin now hoists it back (`hoistDoctype`, see Library gaps) |
| layout/base.tsx | `<meta name="viewport" …>` | React 19 hoists `<meta>` to the top of `<head>`, ahead of `<title>`; the raw tag keeps the original position |
| layout/empty.tsx | `<!DOCTYPE html>` | as layout/base.tsx |
| components/carousel.tsx | `{{#if button_text}}` branches that open or close `<div>` / `<a>` tags, plus the `heroCarousel-image-wrapper` tags | the Handlebars branches open and close different tags, so no single JSX element tree holds them; tag text is raw, slide content is typed |
| components/carousel.tsx, components/carousel-content.tsx | `{{#if ../theme_settings…}}`, `{{#if @first}}` inside `class`; `{{#and (if …)}}` | conditionals inside attribute values; `$If` prints no attribute text |
| components/carousel-content.tsx | `{{#and (if heading '==' false) (if text '==' false)}}` and `{{/and}}` | sub-expression `if` with an operator (see Library gaps) |
| components/common/forms/* (checkbox, date-options, date, multiline, number, password, radio, select, selectortext, text) | `{{#if private_id}}data-…{{/if}}`, `{{#if checked}}checked{{/if}}`, `{{#if selected}} selected {{/if}}`, `{{#if value}}`, `{{#if maxlength}}`, `{{#if placeholder}}` | conditional attributes; written as raw Handlebars inside `dangerouslyInlineAttributes`, the library escape hatch for attribute text |

## Notes from Task 1

- Valueless `data-*` attributes print `="true"` under React; write `data-x={""}` to keep the original `data-x`.
- Script bodies go through `dangerouslySetInnerHTML` as template literals; a `${element}` inside prints its Handlebars.
- Source JSX in `layout/*.tsx` and `components/**` shadows the hand-written originals in the build (plugin warning); the originals are untouched.

## Library gaps

Features the HBX library does not cover yet, so the port needs a workaround or a library change.

| file | fragment | reason |
| --- | --- | --- |
| components/common/forms/text.tsx:24, select.tsx:28, selectortext.tsx:29, selectortext.tsx:46 | `name` / `value` inside an inline carrier | React moves `name`/`value` on `<input>` and `<select>` after the inline carrier; written in the carrier to keep document order |
| layout/base.tsx, layout/empty.tsx | `<!DOCTYPE html>` placed before `<html>` | FIXED in hbx-bigcommerce: `renderTemplates` renders with React 19, which moved the text into `<body>`; `hoistDoctype` (`src/runtime/templates/renderTemplates.ts`) now puts it back before `<html>`, covered by `tests/js/templates.test.ts`. The raw `$raw("<!DOCTYPE html>")` stays because JSX text cannot express a doctype. |
| components/common/forms/checkbox.tsx, radio.tsx, number.tsx, password.tsx, multiline.tsx | `name`, `value`, `rows` attributes | React moves `name` and `value` on `<input>` to the end of the start tag, after the inline-attribute carrier; they are written inside `dangerouslyInlineAttributes` to keep document order. Textarea content goes through `value`, since children print `[object Object]`. |
| layout/base.tsx | `{{~inject …}}` whitespace control | `scripts/hbx-parity.mjs` does not model `~`. The port prints no whitespace between those injects, which matches Handlebars output, so the harness reports whitespace-only TEXT tokens there (reasoned difference). |
| types/context/customer.ts:21 (edit-payment-method.tsx) | `customer.edit_stored_instrument` typed `string` | the original reads `token`, `type`, `last_4`, `expiry_month`, `expiry_year`, `email`, `is_default` from it. The port types the `$With` context with a local `StoredInstrument` via `$pointer<T>` (no cast). Fix the library type. |
| types/context/downloads.ts (download-item.tsx) | `downloads` typed `Record<string, unknown>` | `DownloadImage` / `DownloadItem` are read from download-item.html, not from library docs: images[], product_name, order_id, items[] with name, size, url, expired, description, days_remaining, downloads_remaining. Fix the library type. |
| types/context/forms.ts (add-return.tsx) | `forms.return` absent from `Forms` | `ReturnProduct` / `ReturnOption` are read from add-return.html (order_products[]: id, name, price.formatted, quantity, options[]; reasons[], actions[], order_id). Add the key to the library type. |
| top-level `return` (return-saved.tsx) | no `return` key in the context types | `return.instructions` is read with a plain `$pointer<string>` and no local shape. |

## Operator if rollout

The typed `$If` / `$Unless` take the operator form (`operator`, `rvalue`, and `operator` / `rvalue` on `$elseThen` entries), in the JSX element and the function form. Batch 1 (components/common/*, carousel.tsx, gift-certificate/navigation.tsx) converted every operator `{{#if}}` / `{{else if}}` there except the two kept raw below. The compiled output is byte-identical to the pre-change build (dist-compare: 210 same, 0 differ; `hbx-parity --ported`: differs=3, the known ones).

Still raw after batch 1:

| file | fragment | reason |
| --- | --- | --- |
| currency-selector.tsx, navigation-menu.tsx | `{{#if cart_currency_switch_url.length '>' 0 }}…{{/if}}` in the currency `<a>` attribute | the original tag has a space before `}}`; the typed form prints `0}}`, so the bytes differ. Kept raw rather than accept the diff. |
| responsive-img.tsx | the whole `<img>` attribute text (`{{#unless lazyload '=='}}`, `{{#if lazyload '=='}}`, `(default …)`) | one verbatim carrier. The operator blocks could become function-form segments, but splitting the text exactly was deferred to a later batch. |

Batch 2 (components/products/*, including options/, modals/, product-view.tsx and schema.tsx) converted every operator `{{#if}}` / `{{else if}}` / `{{else}}` there except one. Output is byte-identical (dist-compare: 210 same, 0 differ; `hbx-parity --ported`: differs=3, the known ones).

Idioms added here:

- A `$For` index on the right-hand side is `rvalue={$pointer("$index")}`: the raw text is the bare `$index`. `ctx.$index` would print `this.$index`.
- Boolean literals are `$boolean(false)` / `$boolean(true)` (`'===' false` prints `false`).
- Attribute carriers keep the quotes outside the `${…}`: `checked="${$If({…, $then: () => "checked"})}"`. Plain text bodies need no `$raw`.
- A chain with an operator branch in a text carrier uses the function form with `$elseThen` (schema.tsx availability).
- Local interfaces that do not list a field (schema.tsx `Product` has no `pre_order`) use `$pointer("product.pre_order")`, which prints the same path.

Still raw after batch 2:

| file | fragment | reason |
| --- | --- | --- |
| product-view.tsx | `{{#if product.images.length '>' 1 }}` … `{{/if}}` | the tag has a space before `}}`; `$number(1)` prints `1}}`, so the bytes differ (same trap as currency-selector.tsx). Kept raw. |

Not operator ifs and left alone: `{{#and … (if … '==' …)}}` heads (price.tsx, product-aria-label.tsx), `{{#or … (unless …)}}` heads, the `{{#all … (if … '!==' …)}}` head in quick-view.tsx.

Batch 3 (components/account, brand, cart, category, faceted-search, search, carousel-content.tsx; the folders batches 1-2 did not touch) converted every operator `{{#if}}` / `{{#unless}}` / `{{else if}}` there, 56 tokens in 19 files. Output is byte-identical (dist-compare: 210 same, 0 differ; `hbx-parity --ported`: differs=3, the known ones). No operator if is left raw in this batch, so the `product-view.tsx` and `currency-selector.tsx` traps did not recur.

Idioms added here:

- A `{{#if (lang 'key') '!==' 'Label'}}` test is `test={$lang($string("key"))}`: `$lang` is an expression operand, so it takes the element form (edit-account.tsx).
- A seven-branch `{{else if}}` chain is one `$If` with `$elseThen` entries, each carrying `test`, `operator`, `rvalue` and `$then` (returns-list.tsx, payment-methods-list.tsx). A nested block inside a `$then` keeps its own `$elseThen` (the `stored_bank_account` block in payment-methods-list.tsx).
- A `this.` pointer in a test prints as written: `$pointer("this.alt_text.length")` (carousel-content.tsx). The function form's `$then` and `$else` are template strings there, so the pointer and the `$lang` output print as text.
- A quoted attribute in a function-form body needs `$raw('style="display:none"')`: a plain string is escaped to `&quot;` (gift-wrapping-form.tsx). The same rule as Task 6 for `$Unless`.
- `{{#if discount.value '===' 0}}-{{/if}}` is `$If` with a fragment body `<>-</>` (cart/totals.tsx).
- Converted blocks are re-indented one level for the `$then={() => ( <> … </> )}` wrapper. Bodies keep their JSX whitespace, so no `{" "}` changed.

Still raw after batch 3 (not operator ifs, so out of this rollout):

| file | fragment | reason |
| --- | --- | --- |
| carousel-content.tsx | `{{#and (if heading '==' false) (if text '==' false)}}` … `{{/and}}` | `{{#and}}` head with an `if` sub-expression (listed in the task sections) |
| cart/content.tsx, cart/totals.tsx, cart/preview.tsx | `{{#or … (unless …)}}` and `{{#or … (if type '==' …)}}` heads with their `{{else}}` / `{{/or}}` | `{{#or}}` heads (listed in the task sections) |
| cart/shipping-estimator.tsx | `{{#and shipping_cost_discounted (if shipping_cost_discounted.formatted '!==' shipping_cost.formatted)}}` | `{{#and}}` head with an operator `if` sub-expression (listed in the task sections) |


Batch 4A (`pages/*`, root pages, auth, errors, gift-certificate, unavailable; account and home excluded) converted the operator conditionals there: the theme radio in gift-certificate/purchase.tsx (`this.value '=='` with a `../` hop, function form in a carrier), the aside class and the two tabpanel carriers in search.tsx (`'!='`, with `$raw('class="u-hidden"')` as the quoted body), and the two `result_count '===' 0` blocks in search.tsx (element form, `rvalue={$number(0)}`). Output is byte-identical (dist-compare: 210 same, 0 differ; `hbx-parity --ported`: differs=3, the known ones).

Trap: a `{{#if}}` opened and closed as sibling raw nodes (`{$raw("{{#if …}}")}` … `{$raw("{{/if}}")}`) becomes one `<$If>` only when both raw nodes sit under the same parent. Drop the two raw nodes and move the siblings between them into `$then`.

Still raw in pages (`{{#or}}` and `{{#all}}` heads, out of this rollout): cart.tsx and compare.tsx (`{{#or … (unless …)}}` with `{{else}}` / `{{/or}}`), product.tsx (`{{#all … (if … '!==' true)}}`).

Batch 4B (`pages/account/*`, orders/ included) converted the six operator conditionals there in four files: `orders/all.tsx` (`'>' 0`), `wishlist-details.tsx` (`'>' 0`), `edit-payment-method.tsx` (`'==='` on `stored_card` x2 and `stored_paypal_account`, three blocks) and `orders/invoice.tsx` (`'===' 'original'` with `{{else}}`, two branches of different tags, `$else`). Output is byte-identical (dist-compare: 210 same, 0 differ; `hbx-parity --ported`: differs=3, the known ones). No operator if is left raw in account, and no `{{#or}}` / `{{#all}}` head is left there either.

Idioms added here:

- A sibling `{$raw("{{#if …}}")}` / `{$raw("{{else}}")}` / `{$raw("{{/if}}")}` run under one parent becomes `<$If test operator rvalue $then $else />`, with each body in a `<>` wrapper. `'>' 0` is `rvalue={$number(0)}`; a quoted operand is `$string("…")`, as in 4A.
- The account `$Page` shape covers 19 of 19 files. `orders/invoice` is the `head` + `page` pair with `layout/empty`. `orders/details` and `orders/invoice` keep their statements before `return` inside the function. `edit.tsx`'s top-level `<$Inject>` stays in a `<>` wrapper before `<$Page>`.

## Task 2: components/common (raw fragments and gaps)

Idioms added here:

- Whitespace between two expressions is kept by the harness (`trimAtBoundaries`), but a whitespace-only `$raw("\n")` prints nothing. Write `{" "}` there (header.tsx, share.tsx, product-options.tsx).
- `{{else if …}}` is an expression token to the harness, so whitespace between it and a neighbouring expression is kept: write `{" "}` around it (product-options.tsx).
- `{{{x}}}` inside an attribute: carry it as `${$raw("{{{x}}}")}` in the `dangerouslyInlineAttributes` string (channel-selector, share, language-selector-mobile).
- `{{../x}}` / `{{theme_settings.x}}` inside `$Each`: `$$themeSettings()` and `$pointer("theme_settings.x")` print without `../`; write `$pointer("../theme_settings.x")` (cart-preview.tsx).
- `{{` inside `dangerouslySetInnerHTML` is escaped to `\{{`; print Handlebars comments through `${$raw(…)}` (polyfill-script.tsx).
- Tested: the function form `${$If({test, $then: () => $raw(" x")})}` (and `$Unless`) prints the same Handlebars inside a `dangerouslyInlineAttributes` template string or a `className` template string. Parity-verified on cart-preview, navigation-list, navigation-list-alternate and navigation-dropdown. A `<$If>` JSX element cannot sit inside a string, so use the function form there.

| file | fragment | reason |
| --- | --- | --- |
| navigation.tsx | `{{#and language_selector language_selector.languages.length '>' 1}}` … `{{/and}}` | `$And` takes two operands; Stencil `and` here takes four (`x y '>' 1`). Kept verbatim as the original semantics; no comparison invented. |
| navigation.tsx | `{{#or customer (unless settings.hide_price_from_guests)}}` … `{{/or}}` | `(unless …)` is a block sub-expression; `$Or` takes expression operands only. |
| footer.tsx | `{{moment format="YYYY"}}` | `$Moment` requires `date`, and a hash-only `moment` is the form the component cannot print without a date. |
| footer.tsx | `&copy;` | JSX text would emit the `©` character, not the entity. |
| cart-preview.tsx | `{{#if price_discounted}}` (text and `class`) and `{{#unless …}}` in `className` | now `$If` / `$Unless` in function form (see idioms). Operator ifs converted in the operator-if rollout. |
| cart-preview.tsx | `{{#or ../customer (unless …) (if type '==' 'GiftCertificate')}}` … `{{/or}}` | sub-expression `unless` / `if` with an operator inside `or`. |
| cart-preview.tsx | `&times;` | JSX text would emit `×`, not the entity. |
| share.tsx | `{{assignVar 'encodedUrl' (encodeURI url)}}`, `{{assignVar 'encodedTitle' …}}` | the value is a sub-expression (`encodeURI url`); `$assignVar` takes only a string or number value, so both lines are raw (the `$getVar` reads are typed). |
| share.tsx | `{{getImageSrcset ../product.main_image (cdn …) 1x=…}}` inside the Pinterest `href` | a sub-expression with a `../` hop and a `1x=` hash argument; kept verbatim inside the carrier (not checked whether the typed `$getImageSrcset` covers it). |
| share.tsx | `{{{annotation}}}`, `{{{capitalize service}}}` in attributes | triple-stash in attribute position; carried in the `dangerouslyInlineAttributes` string. |
| breadcrumbs.tsx | `{{#if @last}}` in `class` and `aria-current`, `{{#each breadcrumbs}}` / `{{add @index 1}}` / `{{{JSONstringify …}}}` / `{{#unless @last}}` inside the JSON-LD script | `@last`/`@index` are loop data with no typed handle; the JSON-LD body is one script, so its loop is raw inside the template literal. |
| channel-selector.tsx, channel-selector-mobile.tsx, currency-selector.tsx, language-selector-mobile.tsx | `{{{switch_url}}}`, `{{{code}}}` | triple-stash in attribute position (carried in the attribute string). |
| currency-selector.tsx | `{{#if cart_currency_switch_url.length '>' 0 }}` in the currency `<a>` carrier | operator `if` in an attribute, kept raw: the tag has a space before `}}`, which the typed form cannot print (see Operator if rollout). |
| channel-selector-mobile.tsx | the `aria-label` multi-line `{{#each theme_settings.channels}}` block | a block inside an attribute value; no typed form prints block output in an attribute. |
| navigation-list.tsx | `data-collapsible*` attributes on `<span>` | kept as one carrier so the attribute set prints in document order. |
| paginator.tsx | `{{#unless reload}}`, `{{lang … total=../links.length}}` inside attributes | conditional attribute text (`{{#unless}}` with no operator) and a `../` hop in a `lang` hash argument. The `{{#if this.number '==' ../current}}` parts are typed (see Operator if rollout). |
| payment-icons.tsx | `{{#with theme_settings}}` … `{{/with}}` | `$With` is not used: the `$Or` under it reads the theme keys relative to `with`, and `$With` would add a frame the original did not. |
| quick-search.tsx | `{{{lang 'search.results.quick_count_live'}}}` in an attribute | triple-stash in attribute position. |
| store-logo.tsx | `{{getImage settings.store_logo.image 'logo_size'}}` in `src` | `$getImage` with a preset always prints a trailing `""` default (library behaviour, see below), which the original does not. |
| wishlist-dropdown.tsx | `{{../product.id}}` in `formaction`, `&product_id=` in `href` | `../` hop; the literal `&` in `href` must not be escaped to `&amp;` (carrier keeps it). |
| responsive-img.tsx | the whole `<img>` attribute list and its leading comment, kept verbatim | still one raw carrier. Its operator blocks (`lazyload '=='`) are expressible as function-form segments, but splitting the verbatim text is deferred (see Operator if rollout). This is the largest raw fragment in Task 2. |
| polyfill-script.tsx | the `{{!-- … --}}` comment | escaped inside `dangerouslySetInnerHTML` otherwise (see idioms). |
| login-for-pricing.tsx | `translate` attribute carrier | valueless `translate`; a `translate={""}` prop would print `translate=""`, so the bare name is carried as text. |
| footer.tsx | the banner `<div class="banner">` attributes (`data-name` appears twice) | JSX cannot repeat a prop, and the original repeats `data-name`; the whole attribute list is one carrier. |
| header.tsx | the banner `<div class="banner">` attributes | same as footer.tsx, with `data-banner-id` in place of the second `data-name`. |

Library gaps found in Task 2:

| file | fragment | reason |
| --- | --- | --- |
| store-logo.tsx | `$getImage(image, preset)` | the library always adds a trailing `""` default when a preset has no default image; Paper's `{{getImage image 'logo_size'}}` does not print it. Raw until the helper matches Paper. |
| navigation.tsx | `{{#and a b c '>' d}}` (four operands) | `$And` takes two. A typed `$And` with four operands would need a new helper or a comparison in the typed tree; raw kept. |

## Task 3: components/products (raw fragments and gaps)

29 files ported (every `templates/components/products/*.html` except `product-view.html`, which is Task 9, and the `options/` and `modals/` subfolders, which are Task 4). All 29 are identical under `scripts/hbx-parity.mjs --ported components/products`.

Idioms added here:

- A string returned from a `$If` / `$Unless` / `$And` body is escaped, so a `"` in literal text prints as `&quot;`. Keep quoted literal text in its own `${$raw('"sku": "')}` segment. Wrapping a whole body in `$raw(...)` does not work when the body also holds typed placeholders: they print as their encoded token (schema.tsx, bulk-discount-rates.tsx, ratings.tsx).
- Valueless attributes (`data-tab`, `data-reveal`, `data-video-item`, `webkitAllowFullScreen`) use `={""}`; React's boolean attributes that the original does not carry (`controls`) are written in a carrier.
- Partial hash values must be typed expressions (`AbstractTemplateElement`), so a helper that takes `unknown` for a hash value fails to compile. Inline the `$partial` call where the value is a pointer.
- Whitespace between two partials on separate lines is a newline in the original; JSX drops it, so write the separator as `{", "}` (product-aria-label.tsx, after the non-sale and non-sale-without-tax prices). Checked in dist/templates/components/products/product-aria-label.html.
- A loop that needs `@last` in an attribute is a typed `$Each({list, $then: (item, loop) => …})` in function form; `loop["@last"]` and `loop["@first"]` are typed.
- `{{#and a (if … '==' x)}}` and `{{#or a (unless …)}}` put the sub-expression inside the block head, so the block head is raw and its body typed (price.tsx, price-range.tsx, product-aria-label.tsx, card.tsx, list-item.tsx, product-info.tsx, add-to-cart.tsx).

| file | fragment | reason |
| --- | --- | --- |
| price.tsx, product-aria-label.tsx | `{{#and price.price_range (if theme_settings.price_ranges '==' true)}}` … `{{else}}` … `{{/and}}` | operator `if` as an `and` operand (library gap, see Task 2); body stays typed |
| card.tsx, list-item.tsx, product-info.tsx, add-to-cart.tsx | `{{#or customer (unless settings.hide_price_from_guests)}}` … `{{else}}` … `{{/or}}`, and the same head inside `data-product-price` | `(unless …)` sub-expression inside `or`; `$Or` takes expression operands only (as cart-preview.tsx) |
| card.tsx, list-item.tsx | `" {{else}} "` / `" {{/or}}"` in `data-product-price` | the `or` head and close are raw; the `if price.with_tax` value in between is `$If` in function form |
| card.tsx | `$raw(" card--alternate")` etc. | not raw Handlebars: literal class text inside a `$If` body |
| quick-view.tsx | `{{#all settings.show_product_reviews theme_settings.show_product_reviews (if theme_settings.show_product_details_tabs '!==' true)}}` … `{{/all}}` | `if` with an operator as an `all` operand (library gap); the `reviews` partial call is typed |
| tabs.tsx | `$raw(" is-active")` in `$Unless` bodies | literal text, not Handlebars: a class suffix |
| schema.tsx | `{{{JSONstringify …}}}` (product.title, brand.name, review name/text/title) | triple-stash JSON helper. `$jsonStringify` is typed `HandlebarsPointer<object>`, so a string title cannot pass; the helper also prints the double-stash form, not the triple-stash one |
| schema.tsx | `{{moment (moment add='31536000000') 'YYYY-MM-DD' }}` | `$moment` takes a date; the `add` sub-expression has no typed form here |
| schema.tsx | JSON punctuation and `"` literal text | written in `$raw` segments (see the idiom above); the JSON structure is otherwise typed, with `$If`/`$And`/`$Each`/`$Unless` |
| videos.tsx | `webkitAllowFullScreen mozallowfullscreen allowFullScreen` | valueless boolean attributes React would print as `=""`, so they are carried as text |
| tabs.tsx | `controls="tab-related"`, `controls="tab-similar"` | React treats `controls` as a boolean (prints `controls=""`); carried as text |
| description-tabs.tsx | `$dashcase($lowercase($sanitize(...)))` | typed function forms (no raw) |

Library gaps noted in Task 3: the operator `if` (already a gap in Task 2) appears in about 15 of the 29 files; each keeps its typed branches, so the raw part is only the head and the `{{else}}` / `{{/if}}` tokens. `$jsonStringify` is typed `HandlebarsPointer<object>`, so string titles cannot pass; the triple-stash JSON helpers stay raw.

## Task 4: products options and writeReview (raw fragments and gaps)

12 files ported (`components/products/options/*`, 11, and `components/products/modals/writeReview`). All 12 are identical under `scripts/hbx-parity.mjs --ported components/products/options components/products/modals`.

Idioms added here:

- A pointer created outside a loop gains `../` when it is read inside the loop, so `id` and `required` are hoisted (set-radio, set-rectangle, swatch, product-list) and `{{../id}}` / `{{../required}}` print on their own.
- A `$For` body's `ctx.$index` prints `{{this.$index}}`. A `{{concat 'x.' $index}}` sub-expression is `$concat($string("x."), ctx.$index)` (date.tsx, writeReview.tsx).
- Whitespace between two expressions is kept by the harness and gives a visible space in the browser, so `{" "}` goes after `<$Inject />` (writeReview.tsx) and after each input/label pair and each span pair where the original has a newline between them (set-radio, set-rectangle, swatch, product-list, date.tsx's label).
- A `$If` / `$Unless` body that returns plain text with no `"` needs no `$raw` (`"required"`, `" checked data-default"`); quoted text keeps its own `$raw` segment (`$raw('maxlength="')`, `$raw('style="')`).
- Valueless attributes: `data-option-value={""}`, `data-reveal={""}`.

| file | fragment | reason |
| --- | --- | --- |
| options/input-file.tsx | `{{#and required (unless prefill)}}required{{/and}}` | `(unless …)` sub-expression inside `and`; `$And` takes expression operands only (as cart-preview.tsx) |
| options/swatch.tsx | `{{getImage image "swatch_option_size"}}`, `{{getImage image 'core-swatch'}}` inside `style` | `$getImage` with a preset adds a trailing `""` default (library gap, as store-logo.tsx) |
| modals/writeReview.tsx | `<!-- Stars -->`, `<!-- TODO: … -->`, `<!-- Name -->`, `<!-- Email -->`, `<!-- Review Subject -->`, `<!-- Comments -->` | JSX has no HTML comment form (`{/* */}` prints nothing); printed through `$raw`, which the harness compares token by token |

Library gaps noted in Task 4: none new. The operator `if` and the `$getImage` preset default are the two already listed in Tasks 2 and 3.

## Task 5: components/cart (raw fragments and gaps)

15 files ported (`components/cart/*` except `content` and `totals`, which are Task 9, and `cart/modals/*`, 2). All 15 are identical under `scripts/hbx-parity.mjs --ported components/cart`.

Idioms added here:

- `style` values are compared without case, spacing or a trailing semicolon (`canonStyle` in `scripts/hbx-parity.mjs`, pinned in `scripts/hbx-parity.test.mjs`), so `style={{display: "none"}}` matches the original `display: none;`. Plain props are used.
- `encType` for `enctype` and `hidden={true}` for a valueless `hidden`: React prints the camel-case name and `hidden=""`. HTML attribute names are case-insensitive, so browsers read them as the original; the harness compares them equal.
- A pointer read inside a `$For` body with `ctx` (the given context) must be created inside the body to print without `../`; a `$index` of the outer `$For` read inside a nested `$Each` is `$pointer("../$index")` (gift-wrapping-form.tsx).
- A `$Unless` / `$If` body that holds a quoted attribute uses `$raw('style="…"')` in the carrier (gift-wrapping-form.tsx, shipping-quotes.tsx); plain text bodies such as `"cart-total-value"` need no raw.
- `<$With context={…} $then={…} />` is used for `{{#with cart.added_item}}`; the pointers inside the body print plain, and `../theme_settings.x` / `../settings` are written as `$pointer` paths (preview.tsx), as in cart-preview.tsx.
- Inline whitespace the original prints between two tags (a newline that renders as a space) is `{" "}` after the element: preview.tsx (label then strong), item-giftwrap.tsx (price then the actions span), shipping-estimator.tsx (adjacent price spans), shipping-quotes.tsx (logo then provider name), gift-wrapping-form.tsx (each radio then its label). Checked in dist.
- `$Gt` / `$Eq` exist in the library, but print `{{#gt}}` / `{{#eq}}`, not `{{#if a '>' b}}`, so operator `if` stays raw.

| file | fragment | reason |
| --- | --- | --- |
| preview.tsx | `{{#or customer (unless settings.hide_price_from_guests)}}` … `{{else}}` … `{{/or}}`, and the `../customer (unless ../settings…)` form inside `with` | `(unless …)` is a block sub-expression inside `or`; `$Or` takes expression operands only (see Task 2/3). Heads are raw; the bodies are typed. |
| preview.tsx | `&times;`, `&hellip;` | JSX text would emit the character, not the entity (as in cart-preview.tsx and footer.tsx) |
| shipping-quotes.tsx | `&mdash;` | as above |
| shipping-estimator.tsx | `{{#and shipping_cost_discounted (if shipping_cost_discounted.formatted '!==' shipping_cost.formatted)}}` … `{{else}}` … `{{/and}}` | `if` with an operator as an `and` operand (library gap); the branches are typed |
| shipping-estimator.tsx | `selected="selected"` in the country and state `<option>` carriers (lines 66, 95) | conditional attribute with a quoted body, so `$raw` in a carrier; the value stays a typed `${country.id}` |
| shipping-estimator.tsx | `autoComplete="postal-code"` | original `autocomplete`; React prints the camel-case name, browsers read it the same (as encType above) |
| modals/gift-wrapping-form.tsx | `checked="checked"` on the first radio | literal-only; React turns `checked` into a boolean (`checked=""`), so that input's attribute list is one carrier. The second radio is plain props. |
| modals/gift-wrapping-form.tsx | `{{#unless selected}}style="display:none"{{/unless}}` on the single `<a>`, and `{{#unless selected_wrapping}}` on the single message `<div>` | conditional `style`; a React style object cannot depend on a Handlebars value, so the attribute list is one carrier |
| modals/gift-wrapping-form.tsx | `{{#if selected}}selected{{/if}}` on each `<option>` (single and multiple) | conditional attribute; carrier with the plain text body `selected ` (no quotes) |
| shipping-quotes.tsx | `class="estimator-form--ups u-hiddenVisually"` in `{{#if quotes.shipping_methods}}` | conditional attribute on a `<div>`; carrier with `$raw` for the quoted class |

## Task 6: feature components (raw fragments and gaps)

25 files ported: `components/account` (12), `blog/post`, `brand` (3), `category` (5), `gift-certificate/navigation`, `page` (2), `sitemap/links`. `components/social/*` is not ported (stubs; user decides). All 25 are identical under `node scripts/hbx-parity.mjs --ported components/account components/blog components/brand components/category components/gift-certificate components/page components/sitemap`.

Idioms added here:

- A partial called with no arguments inside a loop inherits the loop item: `$partial("components/common/product-options")` (order-contents.tsx, returns-list.tsx) and the recursive `components/sitemap/links` (links.tsx).
- A dynamic partial in a triple-stash: `$unescaped($dynamicComponent($string("components/common/forms")))` (edit-account.tsx).
- A `../../` hop from an inner loop to the root is `$pointer("../../theme_settings.x")`, created inside the inner body (payment-methods-list.tsx), the same rule as the one-level `../` in Task 5.
- `{{inject}}` expressions that follow each other keep the newline as a space: `{" "}` between them (edit-account.tsx, messages-form.tsx, contact-us-form.tsx).
- Whitespace the original prints between inline siblings is `{" "}` (checked in dist, e.g. `forms.wishlist.name"}} <small`): a label's text before `<small>`, a checkbox before its label, submit/reset and edit/delete controls, an `<img>` before its brand span, a billing label before its description, and a reset link before its span. Block boundaries (`div`, `li`, `p`, `h*`) get no space.
- A `$If` body that holds `&` or a quote needs `$raw`: literal text in a `$If` body is escaped (add-wishlist.tsx, form `action`).

| file | fragment | reason |
| --- | --- | --- |
| account/add-wishlist.tsx | `action` attribute: `{{#if forms.wishlist.id}}…{{else}}…&product_id={{…}}{{/if}}` in a carrier, `$If` function form | truthy block inside an attribute value; the `&product_id=` literal goes through `$raw` so it is not escaped |
| account/add-wishlist.tsx | checkbox `checked`: `$If` function form in the carrier | conditional attribute with a plain text body |
| account/address-list.tsx | `&plus;` | JSX text would emit `+` |
| account/order-contents.tsx | `&#215;` between quantity and name | JSX text would emit `×` |
| account/payment-methods-list.tsx | `&plus;` in the new-method tile | JSX text |
| blog/post.tsx | heading: `{{#if is_blog_post}}` as `$If` with an `h1` branch and an `h2` branch, each holding the same typed link and title | Reasoned parity difference. The original `<h{{#if}}1{{else}}2{{/if}}>` splits the tag name with a block; `hbx-parity.mjs` reads `1=""` / `2=""` as attributes at token #12, so no typed form can match those tokens. The rendered markup is the same `h1` or `h2` element. |
| blog/post.tsx | `&hellip; ` before the read-more link | JSX text would emit `…` |
| gift-certificate/navigation.tsx | `{{#if gift_page '===' 'purchase'}}`, `'redeem'`, `'balance'` with `{{else}}` / `{{/if}}` | operator `if` (library gap); the `li` bodies are typed |

Library gaps noted in Task 6: none new. The operator `if` (Task 2) accounts for every raw conditional here. The `$If` body escaping (Task 3) and the entity `$raw` form (Tasks 1 and 5) also recur. The blog heading is a `$If` pair with a parity difference at token #12, a harness tokenisation of the split tag name (see the row above), not a helper gap.

## Task 7: search and faceted search (raw fragments and gaps)

20 files ported: `components/search/*` (10), `components/faceted-search/*` (5), `components/faceted-search/facets/*` (5). All 20 are identical under `node scripts/hbx-parity.mjs --ported components/search components/faceted-search`.

Idioms added here:

- `{{join (pluck facets 'title') ', ' limit=2}}` is typed: `$join($pluck($pointer<Facet[]>("facets"), $string("title")), $string(", "), {limit: $number(2)})`. `$pluck` is accepted as the array operand (faceted-search/index.tsx).
- `{{{dynamicComponent '…'}}}` inside a loop body: `$unescaped($dynamicComponent($string("…")))` (faceted-search/index.tsx).
- `{{> partial ctx reload=true}}`: `$partial(name, ctx, {reload: $boolean(true)})` (search/content-listing.tsx).
- `{{#any list visible=true}}`: `<$Any list predicate={{visible: $boolean(true)}}>` (faceted-search/index.tsx).
- `{{this.x}}` is `$pointer("this.x")`; `{{#each this}}` is `<$Each list={$this<T[]>()}>` (faceted-search/range-form.tsx, facets/hierarchy-children.tsx).
- A conditional attribute value on a plain prop uses the function form inside a template literal: `name={`${$If({test, $then: () => "price_min", $else: () => "min_price"})}`}` (faceted-search/range-form.tsx). Plain props replace the attribute carrier there.
- An `<option>` with a conditional `selected` keeps `value` as a plain prop and carries only `selected` (search/advanced-search.tsx, search/content-sort-box.tsx). The harness reports the same tokens.
- Count spans (`{{lang}}` alone inside a span with newlines either side) keep `{" "}` on both sides (search/content-count.tsx, product-count.tsx), checked in dist.
- A conditional class suffix in a `className` template: `${$Unless({test, $then: () => " is-open"})}`. Plain text with no quotes needs no `$raw` (faceted-search/faceted-search-navigation.tsx, facets/*).
- Recursive partial: `$partial("components/faceted-search/facets/hierarchy-children", item.children)` (facets/hierarchy-children.tsx, facets/hierarchy.tsx).
- `../` hops from inside a loop: `$pointer("../show_product_counts")` created inside the `$Each` body (facets/hierarchy, multi, rating, hierarchy-children, show-more-facets). In show-more-facets the inner loop's `../` reads the outer facet, as the original does.
- Valueless booleans: `checked={true}`, `noValidate={true}`; valueless `data-*`: `={""}`.
- Whitespace between inline siblings is `{" "}`, checked in dist: label text and `<small>` (advanced-search); checkbox and its label; the two price-label spans; the toggle-text, indicator, on and off spans and the `<i>` icons after their labels (faceted-search/index); the accordion-title span and icon spans and the two icon `<svg>`s (faceted-search-navigation); the input and hint span in range-form; the rating `</span>` and its label (facets/rating); the facet title and count, and the count and close span in multi (facets/*); `{{/if}}` and the svg in selected-facets.

| file | fragment | reason |
| --- | --- | --- |

Reasoned difference, not raw: React prints `name` after `aria-describedby` on the range-form `<input>`s (the original has it first). Attribute order does not change rendering, and the harness reports the two identical. The `&` in the browse-by text is a plain `" & "` string (dist prints `&amp;`), so it needs no raw.

Library gaps noted in Task 7: none new. The operator `if` (Task 2) accounts for every raw conditional here.

## Task 8a: root pages (raw fragments and gaps)

16 files ported: `pages/{blog-post,blog,brand,brands,cart,category,checkout,compare,contact-us,order-confirmation,page,product,search,sitemap,subscribed,unsubscribe}.tsx`. Fifteen are identical under `node scripts/hbx-parity.mjs --ported pages`; `brands` differs on one token (see the reasoned difference below). `pages/home` and `pages/account/orders/completed` stay identical.

Idioms added here:

- A block head the typed API cannot express, with typed bodies, is written as child expressions: `{$raw("{{#or …}}")}`, `{$raw("{{else}}")}`, `{$raw("{{/or}}")}` (cart.tsx, compare.tsx), and `{$raw("{{#all …}}")}` / `{$raw("{{/all}}")}` (product.tsx).
- A plain truthy `{{#if a}}…{{else if b}}…{{/if}}` chain whose bodies are the same element is typed with `$If` and `$elseThen` (category.tsx), so the `{{else if}}` tokens print. Nested `$If` would print `{{else}}{{#if}}` instead.
- `{{inject}}` tags that follow each other, and `{{{ x }}}` lines that follow each other in checkout / order-confirmation head, keep `{" "}` between them (checked by parity).
- Valueless attributes use `={""}`: `data-cart*`, `data-search-page-tabs`, `data-product-results-toggle`, `data-comparison-remove`, `data-product-id` stays a plain prop.
- A `$If` / `$Unless` body that returns `>` prints `&gt;`; literal ` > ` is `$raw(" > ")` (search.tsx). `"` in a literal body needs `$raw('"')` as before.
- `{{{x}}}` in an attribute: `<link rel="prev" dangerouslyInlineAttributes={{attributes: `href="${$raw("{{{x}}}")}"`}} />` (blog.tsx, brand.tsx, category.tsx).
- `{{#replace}}` is `<$Replace needle haystack $then $else />` (page.tsx).

| file | fragment | reason |
| --- | --- | --- |
| blog.tsx, brand.tsx, category.tsx | `href="{{{pagination.X.previous}}}"` / `next` on `<link>` | triple-stash in attribute position; carried in `dangerouslyInlineAttributes` (Task 2) |
| search.tsx | `$raw('"')` around the `<strong>` query; `$raw(" > ")` in the category crumbs | quoted or `>` literal text (not Handlebars); a `"` or `>` in a text body is escaped otherwise |
| cart.tsx | `{{#or customer (unless settings.hide_price_from_guests)}}` / `{{else}}` / `{{/or}}` | `(unless …)` sub-expression inside `or`; `$Or` takes expression operands only (Task 2). Heads raw, bodies typed |
| compare.tsx | `{{#or ../customer (unless ../settings.hide_price_from_guests)}}` / `{{else}}` / `{{/or}}` in the product loop | same as cart.tsx, inside a `$Each` with a `../` hop. Heads raw, bodies typed |
| product.tsx | `{{#all settings.show_product_reviews theme_settings.show_product_reviews (if theme_settings.show_product_details_tabs '!==' true)}}` / `{{/all}}` | `if` with an operator as an `all` operand (library gap). Body typed |

Reasoned difference:

- `brands.tsx` front matter: the original has `brands:` with an empty value, which YAML reads as null. The typed builder (`$frontmatter.brands({brands: null})`) emits `brands: null`, so the harness reports token #0 (`FM brands=` vs `FM brands=null`). The key tree is identical and the value is the same null. Left as is; a builder change to print an empty value would clear it.

Library gaps noted in Task 8a: none new. The operator `if` (Task 2) and the `(unless …)` sub-expression inside `or` / `all` (Task 2, 3) account for every raw conditional here.

## Task 8b: account pages (raw fragments and gaps)

16 files ported under `src/templates/pages/account/`: `add-address`, `add-payment-method`, `add-return`, `add-wishlist`, `addresses`, `download-item`, `edit-payment-method`, `edit`, `inbox`, `payment-methods`, `recent-items`, `return-saved`, `returns`, `wishlist-details`, `wishlists`, `orders/all`. All sixteen are identical under `node scripts/hbx-parity.mjs --ported pages/account` (17 with the pilot `orders/completed`). `orders/details` and `orders/invoice` stay for Task 9.

Idioms added here:

- `$With` (`<$With context={$pointer<T>("...")} $then={() => …} />`) for `{{#with}}` (edit-payment-method). Paths inside the body keep the original text: `forms.action` stays as is and outer paths take an explicit `../` (`../currency_selector…`, `../urls…`).
- `{{#each ../theme_settings.x}}` (add-payment-method card icons): the list is `$pointer("../theme_settings.x")` outside the `$Each`, and the item is read with `$this<string>()`.
- Valueless `readonly` prints as `readOnly={true}`; `readOnly={""}` drops the attribute under React.
- `{{#for 0 quantity}}` is `<$For from={$number(0)} to={…} $then={(ctx) => … ctx.$index …} />` (add-return).
- `{{{x}}}` triple-stash as a child is `{$unescaped($x)}`; `{{{sanitize value}}}` is `{$unescaped($sanitize(option.value))}`.
- Partial hash booleans (`required=true`) are `$boolean(true)` / `$boolean(false)`, not `$string("true")`.
- Consecutive `{{inject}}` tags keep `{" "}` between them (checked by parity). The `{{inject}}` at top level of `edit.html` (outside `{{#partial}}`) stays in a `<>` wrapper before `<$Page>` (batch 4B).
- A plain `checked` in an attribute position (edit-payment-method `is_default`) is a function-form `${$If({test, $then: () => "checked"})}` in the carrier, as in add-wishlist.

| file | fragment | reason |
| --- | --- | --- |
| edit-payment-method.tsx | `is_default` checkbox attributes in `dangerouslyInlineAttributes`, with `${$If(...)}` for `checked` | `{{#if is_default}}checked{{/if}}` is a block in attribute position; `$If` prints no attribute text, so the attributes go in the carrier |

Library types (typed local extensions, not casts):

- download-item.tsx: `DownloadImage`, `DownloadItem` interfaces type the `downloads.*` pointers. The library types `downloads` as `Record<string, unknown>` (types/context/downloads.ts); the fields come from reading download-item.html. See Library gaps.
- add-return.tsx: `ReturnOption`, `ReturnProduct` type the `forms.return.*` pointers (`Forms` in types/context/forms.ts has no `return` key). See Library gaps.
- edit-payment-method.tsx: `StoredInstrument` types the `$With` context (`customer.edit_stored_instrument`), which the library types as `string`. See Library gaps.
- No `any`, `@ts-ignore`, casts or non-null assertions.

Reasoned differences: none. Known issue carried from 8a: `pages/brands.html` (front matter `brands:` null) still differs on token #0.

## Task 8c: auth, errors, gift-certificate, unavailable (raw fragments and gaps)

13 files ported: `pages/auth/{account-created,create-account,forgot-password,login,new-password}`, `pages/errors/{403,404,generic}`, `pages/gift-certificate/{balance,purchase,redeem}`, `pages/unavailable/{hibernation,maintenance}`. All 13 are identical under `node scripts/hbx-parity.mjs --ported pages/auth pages/errors pages/gift-certificate pages/unavailable`. None has front matter, so none exports `frontmatter`. `unavailable/maintenance` uses `layout/empty`, the rest use `layout/base`. `create-account` keeps its top-level injects outside `$StencilPartial`.

Idioms added here:

- Attributes in a carrier must not be repeated as props. React prints a prop and the carrier value, so `name`, `id` and `type` appear twice. When an `<input>` has a carrier, the whole attribute list goes in the carrier (purchase.tsx agree2 and theme radios).
- Consecutive top-level `{{inject}}` tags keep `{" "}` between them (create-account.tsx), checked by parity.
- A `$Each` item used as a partial argument (`{{> components/common/alert/alert-error this}}`) is passed as the item itself (purchase.tsx errors).

| file | fragment | reason |
| --- | --- | --- |
| gift-certificate/purchase.tsx | agree2 `<input>` attributes in `dangerouslyInlineAttributes`, with `${$If({test, $then: () => " checked"})}` | `{{#if forms.gift_certificate.editing}} checked{{/if}}` is a block in attribute position; `$If` prints no attribute text (function form, as edit-payment-method.tsx) |

Library gaps found in Task 8c:

| file | fragment | reason |
| --- | --- | --- |
| gift-certificate/purchase.tsx | `Theme` and `AmountOption` interfaces typing `forms.gift_certificate.themes` and `forms.gift_certificate.amount_options`; `string[]` for `forms.gift_certificate.errors` | `Forms` (node_modules/@mainlanddev/hbx-bigcommerce/src/types/context/forms.ts) has no `gift_certificate` key; the local shapes are read from purchase.html (`value`, `display`, `formatted`). Add the key to the library type. |
| auth/login.tsx, auth/forgot-password.tsx, auth/new-password.tsx, gift-certificate/balance.tsx, gift-certificate/redeem.tsx, gift-certificate/purchase.tsx | `forms.login`, `forms.forgot_password`, `forms.new_password`, `forms.gift_certificate` read by untyped `$pointer("…")` | `Forms` has only `contact`, `create_account` and `edit_account`; the paths compile as untyped strings but have no typed shape. Add the keys to the library type. |

- React camel-case output for `autoComplete` and `formNoValidate` (login.tsx, new-password.tsx, forgot-password.tsx) follows the `encType` convention (Task 1); browsers read these names case-insensitively.
- `Theme` and `AmountOption` in purchase.tsx are inferred from the template's own references (`value`, `display`, `formatted`), not from library data; they are typed local shapes, not checked against the API.

Reasoned differences: none.

## Task 9 (part A): product-view, cart/totals, cart/content (raw fragments and gaps)

3 files ported: `components/products/product-view`, `components/cart/totals`, `components/cart/content`. All identical under `node scripts/hbx-parity.mjs --ported components/products/product-view components/cart/totals components/cart/content`. Full `--ported` run: 200 identical, 2 differ (`components/blog/post`, `pages/brands`, the reasoned differences from Tasks 6 and 8a).

Idioms added here:

- `$getImageSrcset(image, {"1x": size}, $cdn(default))` is typed and prints inside a `dangerouslyInlineAttributes` template string, a plain prop template string (`href={`${…}`}`) and as a JSX child. `{use_default_sizes: $boolean(true)}` prints `use_default_sizes=true`.
- `{{#gt a 5}}…{{/gt}}` in attribute position is `$Gt({a, b: $number(5), $then: () => $raw(…)})` inside the carrier (the `data-slick` JSON is one line; `$raw` keeps its quotes).
- A truthy block that opens and closes a tag across siblings (`{{#if product.main_image}}<a …>{{/if}}` … `{{#if product.main_image}}</a>{{/if}}`) is two `<$If>` elements whose bodies are `$raw` tag text, so the tokens match the original; the typed `getImageSrcset` sits between the raws.
- A `$Unless` child that prints only text (`{{#unless x}}:{{/unless}}`) is `<$Unless test={x} $then={() => ":"} />` (totals.tsx `colon`).
- `{{#all …}}{{assignVar …}}{{else}}{{assignVar …}}{{/all}}` is typed: `<$All values={[…]} $then={() => <$AssignVar … />} $else={…} />`; `(getVar "k")` operands are `$getVar($string("k"))` (content.tsx).
- When an `<input>` has an attribute carrier, `name` and `value` go inside the carrier (as Task 1 notes): `attributes: `name="qty-${id}" value="${quantity}"${$Unless(…)}``.
- Whitespace verified in dist: `{" "}` after the ratings partial and between the review links (productView-rating), between the stock span and the backorder prompt span, between `product.width/height/depth` and its `({{lang}})`, between the three `assignVar` blocks, and between inline siblings in `cart-total-gift-certificate-list-item`. The `shipping-estimator-trigger` and `gift-certificate` partials are block `div`s, so no space is added before them.
- `<$Each>` items print as `this.x` where the original prints `x`; the harness reports them equal (same semantics).

| file | fragment | reason |
| --- | --- | --- |
| product-view.tsx | `{{#if product.images.length '>' 1 }}` … `{{/if}}` (space before `}}` kept) | operator `if` with a trailing space in the tag; the typed form prints `1}}`, so it stays raw (see Operator if rollout, batch 2). The partial inside is typed |
| product-view.tsx | `{{#or customer (unless settings.hide_price_from_guests)}}` / `{{else}}` / `{{/or}}` (price block), and the same head inside `data-product-price` | `(unless …)` sub-expression inside `or` (Task 2); bodies typed, `with_tax` `$If` in function form |
| product-view.tsx | `$raw('<a href="')` … `$raw('" target="_blank">')` and `$raw("</a>")`, each under a typed `<$If test={product.main_image}>` | the `{{#if}}` opens and closes the `<a>` tag in separate blocks; the tag text is raw, the `$If`, the `getImageSrcset` and the partial are typed |
| product-view.tsx | `data-slick='{ "infinite": false, … }'` as `$raw` inside `$Gt` in the `<ul>` carrier | quoted JSON attribute value; the block is typed `$Gt`, the JSON is reflowed onto one line (harness collapses whitespace) |
| product-view.tsx | `style="display: none;"` via `$raw` in `$Unless` (sku and upc `<dt>`) | conditional attribute with a quoted body |
| product-view.tsx | `data-reveal-id="modal-review-form"` via `$raw` in `$Unless` | conditional attribute with a quoted body |
| product-view.tsx | the root `<div class="productView">` attribute list from `data-product-category` on, as one carrier | `{{#each}}` and `{{#or}}` blocks inside attribute values (as card.tsx) |
| cart/totals.tsx | `{{#or customer (unless settings.hide_price_from_guests)}}` / `{{else}}` / `{{/or}}` (subtotal and non-multi total) and `{{#or customer (unless settings.hide_price_from_guests) }}` (multi-coupon total, trailing space kept verbatim) | `(unless …)` sub-expression inside `or` (Task 2); bodies typed |
| cart/content.tsx | `{{#or ../customer (unless ../settings.hide_price_from_guests) (if type '==' 'GiftCertificate')}}` / `{{else}}` / `{{/or}}` (price and total cells); `{{#or can_modify (if type '==' 'GiftCertificate')}}` / `{{/or}}` (remove button) | `(unless …)` and `(if … '==' …)` sub-expressions inside `or` (Task 2); bodies typed, `--` is plain text |
| cart/content.tsx | `href="/viewfile.php?attributeId={{id}}&cartitem={{../id}}"` carrier | the literal `&` must not be escaped to `&amp;` (as wishlist-dropdown.tsx); ids typed `$pointer` |
| cart/content.tsx | `colSpan={2}` | React prints `colSpan`; the original `colspan` (HTML names are case-insensitive, as `encType`) |

Library gaps found in Task 9 (part A):

| file | fragment | reason |
| --- | --- | --- |
| product-view.tsx | `$getImageSrcset` `sizes` `{"1x": theme_settings.zoom_size}` | `$getImageSrcset` takes `HandlebarsString<`${bigint}x${bigint}` or `${bigint}w`>`, and `theme_settings.*` is typed `HandlebarsString<string>`. Evidence: tsc TS2345 "Type 'string' is not assignable to type '`${bigint}w` or `${bigint}x${bigint}`'". The port uses a local `SrcsetSize` template-literal type through `$pointer<SrcsetSize>("theme_settings.zoom_size")` (no cast). Fix: type the size settings, or widen `SrcsetSizes` for pointers. |
| product-view.tsx, cart/totals.tsx, cart/content.tsx | `product`, `settings`, `cart` and `cart.items[]` shapes | local interfaces (`Product`, `Settings`, `Cart`, `Item`, `Coupon`, `Tax`, …) typed from the fields each template reads; the fields are inferred from the templates, not checked against the API. |

## Task 9 (part B): navigation-menu, orders/details, orders/invoice (raw fragments and gaps)

3 files ported: `components/common/navigation-menu`, `pages/account/orders/details`, `pages/account/orders/invoice`. All identical under `node scripts/hbx-parity.mjs --ported`. Full run: 203 identical, 2 differ (`components/blog/post`, `pages/brands`, the reasoned differences from Tasks 6 and 8a). Neither orders page has front matter. `invoice` calls `layout/empty` (original), `details` calls `layout/base`.

Idioms added here:

- `details.tsx` / `invoice.tsx` read `order` through a local typed shape, `$pointer<Order>("order")`; a helper that takes a part of it (an address) types its parameter as `typeof order.shipping_address` (the pointer type), not the plain interface.
- `{{{ sanitize x.address_lines.[0] }}}` is `$unescaped($sanitize(address.address_lines[0]))` with `address_lines: string[]`; it prints `address_lines.[0]`.
- `{{> alert-info message}}` in a loop over objects with a `message` key is `$partial(name, status.message)`.
- A tag opened and closed in separate truthy blocks (`<a href="{{shipping_track.url}}">` … `</a>`) is two `<$If>` elements: `$raw('<a href="')` + typed url + `$raw('">')`, and `$raw("</a>")` (as product-view.tsx).
- `colspan="{{#if ../x}}5{{else}}4{{/if}}"` is a plain `colSpan` template string with `$If` in function form; the `../` pointer is created inside the `$Each` body.
- `<tr {{#if new_address}}class="NewAddress"{{/if}}>` is a carrier holding `${$If({test, $then: () => $raw('class="NewAddress"')})}`.
- Whitespace verified in dist: `{" "}` after each `$Lang` that precedes an `<i>` / `<span>` and after the login `</a>` (navigation-menu); after `order.payment_method` before the card-ending block (details).

| file | fragment | reason |
| --- | --- | --- |
| navigation-menu.tsx | `{{#and language_selector language_selector.languages.length '>' 1}}` … `{{/and}}` | Stencil `and` takes 4 operands here; `$And` takes 2. Kept verbatim, original semantics (as navigation.tsx). Body typed. |
| navigation-menu.tsx | currency `<a>` carrier: `{{{switch_url}}}`, `{{{code}}}`, `{{#if cart_currency_switch_url.length '>' 0 }}data-cart-currency-switch-url="{{{cart_currency_switch_url}}}"{{/if}}` | triple-stash, and the operator `if` kept raw for the trailing-space reason (as currency-selector.tsx, see Operator if rollout); `href` and `aria-label` sit in the carrier to keep document order |
| orders/invoice.tsx | `{{getImage settings.store_logo.image 'logo_size'}}` in the `src` carriers | `$getImage` with a preset adds a trailing `""` default (see Task 2 gap, store-logo.tsx) |
| orders/invoice.tsx | `&nbsp;` x3 via `$raw` | JSX text would emit the U+00A0 character, not the entity |
| orders/invoice.tsx | `<tr {{#if new_address}}class="NewAddress"{{/if}}>` carrier, `$raw('class="NewAddress"')` | conditional attribute with a quoted body |
| orders/details.tsx | `$raw("&mdash;")` | JSX text would emit the character, not the entity |
| orders/details.tsx | `$raw('<a href="')` / `$raw('">')` / `$raw("</a>")` under typed `$If` | the `{{#if}}` opens and closes the `<a>` across blocks (see idiom) |

Library gaps found in Task 9 (part B):

| file | fragment | reason |
| --- | --- | --- |
| orders/details.tsx | `Order` (node_modules/@mainlanddev/hbx-bigcommerce/src/types/context/order.ts) | has no `card_number_last_four`, `backorder_shipping_expectation_message`, `pickup_addresses` (it has a single `pickup_address`), per-row `shipping_discounts`; `status_messages` is `unknown[]`; `address_lines` is `unknown[]`, which `$sanitize` rejects. The port uses a local `Order` shape (no cast) read from details.html. Fix the library type. |
| orders/details.tsx | `Shipments = Record<string, unknown>` (types/context/shipments.ts) | the original reads `date_shipped`, `shipping_provider`, `shipping_track.{url,number}`, `show_shipping_method`, `shipping_method`; typed locally as `Shipment[]` via `$pointer`. Fix the library type. |
| orders/invoice.tsx | `Order` / `OrderItemsItem` types | missing `pickup_addresses`, `customizations`, `new_address`, `pre_ordered`, `shipping_rows` fields (`is_pickup`, `is_shipping`, `is_digital`, `address`, ...), `total_rows[].shipping_discounts`, address `phone`/`email` on the shapes used; local interfaces read from invoice.html. Fix the library type. |
| orders/details.tsx, orders/invoice.tsx, navigation-menu.tsx | local shapes | inferred from the templates, not checked against the API |

## Context overrides and typing (after the rollout)

- `$context(route)` reads the page's root as `@root`; a page that uses it prints `{{#each @root.shipping_messages}}` where the original has `{{#each shipping_messages}}` (same value at a page's root context; `pages/home` is the first).
- Retype a loose generated context key in `src/hbx/context.overrides.d.ts` (`HBXContextOverrides`, tracked); retype theme settings in `src/hbx/theme-settings.overrides.d.ts` (`HBXThemeSettingOverrides`). The `.hbx/` folder is regenerated and git-ignored, so overrides do not live there.
- LIBRARY GAP (packaging): hbx-bigcommerce's declaration files import types from `@mainlanddev/hbx-core/grammar`, which a consumer cannot resolve (it is nested under hbx-handlebars-v4). Until it is fixed in the library, `tsconfig.app.json` maps `@mainlanddev/hbx-core/*` the way it maps `@mainlanddev/hbx-handlebars-v4/*`. Without the mapping, `$context(...)`, `$$themeSettings()` and other helpers typed through core silently become `any` in the theme (skipLibCheck hides the error). With it, one latent type error appeared (description-tabs `$sanitize(theme[...])`), now fixed.

- NO `place(...)` in templates. The JSX runtime encodes a template element used as a child, as the return of a `$then`/`$else` body, or as an attribute value, so a partial, region or other element is written bare. `place` (from hbx-handlebars-v4) is only for a component *function* that returns an element itself instead of JSX; no theme template does. All 384 calls (copied from the first pilots) were removed with a byte-identical compiled output.

## No `@root.` in templates (`forwardRoot` stays off)

`@root.x` prints empty inside `{{#block}}` fills (every page body), so a port that reads `@root.theme_settings.x` or `@root.products` loses content (home lost its product sections; cards lost Quick view and the MSRP / Was / Now labels). The originals read `theme_settings.x` / `products` directly, and the ports now do too: use `$pointer<ThemeSettingsObject>("theme_settings")` instead of `$$themeSettings()`, and plain `$pointer("name")` instead of `$context()`. `forwardRoot` stays `false` in `vite.config.ts`. `scripts/hbx-parity.mjs` ignores `@root.` prefixes, so it cannot see this; check rendered output instead (render `templates/` and `dist/templates` with stencil-paper against `?debug=context` from `vite dev` and compare the DOM). Checked identical this way: home (also with a synthetic carousel), category (pages 1 and 2), brand, brands, product, cart, search (with and without results), blog, blog post, sitemap, login, compare, 404, and the signed-in orders, addresses, edit, inbox, payment methods, recent items, add address, edit address, wishlists, add wishlist, create-account and forgot-password pages.

## Second pass: escape hatches replaced

Checked with `npx vite build` and the token-compare parity script (restored from git history, `124a329f^`): 206 identical, 3 differs, the same as before the pass.

- `$ifAttribute(name, path, before?, after?)` (`src/components/hbx/ifAttribute.ts`) prints `{{#if path}}name="{{path}}"{{/if}}` inside an inline-attribute carrier. Replaces the raw `private_id`, `value`, `maxlength`, `placeholder` fragments in `components/common/forms/*`.
- `$raw("{{#if x}}…{{/if}}")` / `unless` / `or` became `$If` / `$Unless` / `$Or`; `{{#with}}` became `$With`; `getImage`, `getImageSrcset`, `moment`, `assignVar`, `encodeURI`, `lang` and `{{{x}}}` reads became `$getImage`, `$getImageSrcset`, `$moment`, `$AssignVar`, `$encodeURI`, `$lang` and `$unescaped(pointer)`.
- Carriers that held only plain `name="…"` pairs became ordinary JSX props, except where the value holds `&` (`href` / `formaction` with a query string), because a prop prints `&amp;`.
- Handlebars comments (`{{!-- --}}`) became JSX comments, so they no longer appear in `dist` (they printed nothing; the parity script ignores them). HTML entities in JSX text stay `$raw("&times;")`, because the parity script compares entity text.
- Byte differences that the parity script normalises: quote style (`'x'` vs `"x"`) and `{{{this.code}}}` for `{{{code}}}`.
- `$getImage` stays out of `store-logo`, `swatch` and `invoice`: it prints a trailing `""` default image, which the parity script reports as a difference.

Still raw, and why:

| fragment | reason |
| --- | --- |
| `{{{JSONstringify x}}}` (breadcrumbs, products/schema) | `$jsonStringify` is typed for objects, and these are string pointers. Library typing gap. |
| `{{#each}}{{#if}}{{lang}}` inside the `aria-label` of channel-selector-mobile | whitespace between the standalone block tags is part of the output |
| conditional attributes (`checked`, `selected`, `required`, `disabled`, `style`, `data-slick`) inside `dangerouslyInlineAttributes` | no typed conditional attribute exists; `$ifAttribute` covers the `name="{{x}}"` shape only |
| `<!DOCTYPE html>`, `<meta viewport>`, `</a>`, `<!-- … -->` comments, `&amp;` inside attribute strings | not expressible as JSX |
