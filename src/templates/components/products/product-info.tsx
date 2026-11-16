import {$partial, $pointer, $raw} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        {$raw("{{#or customer (unless settings.hide_price_from_guests)}}")}
        {$pointer("name")}, {$partial("components/products/product-aria-label")}
        {$raw("{{else}}")}
        {$pointer("name")}
        {$raw("{{/or}}")}
    </>
);
