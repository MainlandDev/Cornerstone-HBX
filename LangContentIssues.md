# Lang content issues

Found by the strict translation-key check in `@mainlanddev/hbx-bigcommerce`: `hbx-bigcommerce generate` writes `.hbx/lang-keys.d.ts` from `lang/en.json`
(814 keys, with the arguments each message takes), and `$lang`, `<$Lang>` and `$langJson` check against it. `tsc -p tsconfig.app.json` reports 11 findings.
Nothing here is fixed yet; this file only reports. Only `lang/en.json` was checked, not the other locale files.

Keys built at render time (a path or a sub-expression) are accepted unchecked, so they are not listed.

## A. Keys the templates use that `lang/en.json` does not have (3)

A missing key prints the key itself in Stencil, so these are content gaps, not type noise.

| Key | Used at | Original template | Notes |
| :--- | :--- | :--- | :--- |
| `forgot_password.recaptcha_title` | `src/templates/pages/auth/forgot-password.tsx:5` | `templates/pages/auth/forgot-password.html:1` | `create_account.recaptcha_title` exists ("Google recaptcha"); `forgot_password` has no such key. |
| `forms.validate.gift.amount` | `src/templates/pages/gift-certificate/purchase.tsx:218` | `templates/pages/gift-certificate/purchase.html:102` | `forms.validate.gift` exists with `to_name`, `to_email`, `from_name`, `from_email`... but no `amount`. |
| `optimized_checkout` (a `langJson` group) | `src/templates/pages/checkout.tsx:28`, `src/templates/pages/order-confirmation.tsx:27` | `templates/pages/checkout.html:8`, `templates/pages/order-confirmation.html:7` | No key starts with `optimized_checkout`, so `{{langJson 'optimized_checkout'}}` prints `{}` here. Likely intentional (the Optimized Checkout app supplies its own strings), but worth confirming. |

## B. Plural counts the ports type as `string | number` (7)

The message takes a plural count, which the translator needs as a number. The data is numeric at render time; the ports read it through loosely typed pointers.
The fix is in the templates (type the pointer as `number`), with no change to the output. Not a content problem.

| Key | Message | Passed at | Value |
| :--- | :--- | :--- | :--- |
| `cart.label` | `Your Cart ({quantity, plural, ...})` | `src/templates/components/cart/page-title.tsx:5` | `quantity={$pointer("cart.quantity")}` |
| `cart.added_to_cart.what_next` | `Ok, {num_products, plural, ...} added to your cart...` | `src/templates/components/cart/preview.tsx:15` | `num_products={$pointer("cart.quantity")}` |
| `cart.added_to_cart.your_cart_contains` | `Your cart contains {num_products, plural, ...}` | `src/templates/components/cart/preview.tsx:58` | `num_products={$pointer("cart.quantity")}` |
| `search.faceted.selected.rating-label` | `Rated {rating, plural, ...} Or More` | `src/templates/components/faceted-search/selected-facets.tsx:29` | `rating={item.title}` (a string) |
| `products.bulk_pricing.range` | `Buy {min} {max, plural, =0{or above} other {- #}}` | `src/templates/components/products/bulk-discount-rates.tsx:56` | `max={rate.max}` (typed string) |
| `products.reviews.header` | `{total, plural, =0{0 Reviews} ...}` | `src/templates/components/products/reviews.tsx:18` | `total={$pointer("reviews.total")}` |
| `forms.gift_certificate.purchase.agree` | takes `days` | `src/templates/pages/gift-certificate/purchase.tsx:158` | `days: $pointer("forms.gift_certificate.expires_in_days")` |

`search.faceted.selected.rating-label` passes the rating's `title` into a plural `rating`: check what `item.title` holds (a number as text, or a label). If it is text, the plural branch cannot match and the message always falls to its `other` case.

## Notes

- `search.results.count` is `"{ count, plural, ... } for '{ search_query }'"`. The generator reads `search_query` as an argument, because Stencil's translator substitutes it inside the apostrophes (checked against the real translator: `"2 results for 'shoes'"`). It is not an ICU-quoted literal. The three `search_query` calls (`search/heading.tsx`, `search/quick-results.tsx`, `pages/search.tsx`) are correct.
- Keys that exist only in other locale files are not reported.
- Regenerate with `npm run hbx-hints`; re-check with `npx tsc -p tsconfig.app.json --noEmit`.
