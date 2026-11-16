import {$partial, $pointer, $raw} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <div className="modal-body quickView">
        {$partial("components/products/product-view")}

        {$raw("{{#all settings.show_product_reviews theme_settings.show_product_reviews (if theme_settings.show_product_details_tabs '!==' true)}}")}
        {$partial("components/products/reviews", {
                reviews: $pointer("product.reviews"),
                product: $pointer("product"),
                urls: $pointer("urls"),
            })}
        {$raw("{{/all}}")}
    </div>
);
