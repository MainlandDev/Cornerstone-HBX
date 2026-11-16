"use server";
import ProductsProductView from "./product-view.tsx";
import ProductsReviews from "./reviews.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$pointer, $string, $boolean, $ifExpression, $All} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div className="modal-body quickView">
        <ProductsProductView />

        <$All values={[$pointer("settings.show_product_reviews"), $pointer("theme_settings.show_product_reviews"), $ifExpression($pointer("theme_settings.show_product_details_tabs"), $string("!=="), $boolean(true))]} $then={() => (<><ProductsReviews reviews={$pointer("product.reviews")} product={$pointer("product")} urls={$pointer("urls")} /></>)} />
    </div>
);
