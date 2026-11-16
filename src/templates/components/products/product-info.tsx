"use server";
import ProductsProductAriaLabel from "./product-aria-label.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$pointer, $raw} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <>
        {$raw("{{#or customer (unless settings.hide_price_from_guests)}}")}
        {$pointer("name")}, <ProductsProductAriaLabel />
        {$raw("{{else}}")}
        {$pointer("name")}
        {$raw("{{/or}}")}
    </>
);
