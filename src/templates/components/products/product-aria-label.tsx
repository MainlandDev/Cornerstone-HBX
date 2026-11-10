/**
 * Source: templates/components/products/product-aria-label.html (42 lines).
 *
 * The whole template is one raw fragment, copied verbatim. The output is an `aria-label` string, so the original's
 * line breaks and spaces (`Was: $15, Now: $12`) are part of the result and JSX cannot reproduce them (DEVIATIONS.md section 8.2).
 * Context keys it reads (`price`, `theme_settings`) are the explicit props below.
 */
import {$parseHandlebarsDangerously} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductPriceHint, ThemeSettingsHint} from '@/context-products';

export default $asPartial<{
    price: ProductPriceHint;
    theme_settings: ThemeSettingsHint;
}>(() => (
    <>
        {$parseHandlebarsDangerously(`{{#and price.price_range (if theme_settings.price_ranges '==' true)}}
    {{#and price.price_range.min.with_tax price.price_range.max.with_tax}}
{{lang 'category.shop_by_price_range_aria'
       from=price.price_range.min.with_tax.formatted
       to=price.price_range.max.with_tax.formatted
}}
    {{else}}
{{lang 'category.shop_by_price_range_aria'
       from=price.price_range.min.without_tax.formatted
       to=price.price_range.max.without_tax.formatted
}}
    {{/and}}
{{else}}
    {{#if price.with_tax}}
        {{#if price.non_sale_price_with_tax}}
{{> components/products/price-label
    label_value=theme_settings.pdp-non-sale-price-label
    fallback=(lang "page_builder.pdp-non-sale-price-label")
}}{{price.non_sale_price_with_tax.formatted}},
{{> components/products/price-label
    label_value=theme_settings.pdp-sale-price-label
    fallback=(lang "page_builder.pdp-sale-price-label")
}}{{price.with_tax.formatted}}
        {{else}}
{{price.with_tax.formatted}}
        {{/if}}
    {{else}}
        {{#if price.non_sale_price_without_tax}}
{{> components/products/price-label
    label_value=theme_settings.pdp-non-sale-price-label
    fallback=(lang "page_builder.pdp-non-sale-price-label")
}}{{price.non_sale_price_without_tax.formatted}},
{{> components/products/price-label
    label_value=theme_settings.pdp-sale-price-label
    fallback=(lang "page_builder.pdp-sale-price-label")
}}{{price.without_tax.formatted}}
        {{else}}
{{price.without_tax.formatted}}
        {{/if}}
    {{/if}}
{{/and}}`)}
    </>
));
