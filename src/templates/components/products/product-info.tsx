import {$partial, $pointer, $raw, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        {$raw("{{#or customer (unless settings.hide_price_from_guests)}}")}
        {$pointer("name")}, {place($partial("components/products/product-aria-label"))}
        {$raw("{{else}}")}
        {$pointer("name")}
        {$raw("{{/or}}")}
    </>
);
