"use server";
import ProductsProductAriaLabel from "./product-aria-label.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$pointer, $unlessExpression, $Or} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <>
        <$Or values={[$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))]} $then={() => (<>{$pointer("name")}, <ProductsProductAriaLabel /></>)} $else={() => (<>{$pointer("name")}</>)} />
    </>
);
