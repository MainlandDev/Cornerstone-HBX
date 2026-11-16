"use server";
import ProductsProductView from "./product-view.tsx";
import ProductsReviews from "./reviews.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$pointer, $raw} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div className="modal-body quickView">
        <ProductsProductView />

        {$raw("{{#all settings.show_product_reviews theme_settings.show_product_reviews (if theme_settings.show_product_details_tabs '!==' true)}}")}
        <ProductsReviews reviews={$pointer("product.reviews")} product={$pointer("product")} urls={$pointer("urls")} />
        {$raw("{{/all}}")}
    </div>
);
