"use server";
import ProductsCarousel from "./carousel.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <>
        <h2 className="page-heading">
            <$Lang keyName={$string("products.new")} />
        </h2>
        <ProductsCarousel products={$pointer("products")} list={$string("New Products")} />
    </>
);
