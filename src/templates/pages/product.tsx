import {
    $Page,
    $raw,
    $Each,
    $frontmatter,
    $If,
    $Inject,
    $partial,
    $pointer,
    $region,
    $string,
    $unescaped,
} from "@mainlanddev/hbx-bigcommerce";

const {setting} = $frontmatter;

export const frontmatter = $frontmatter.product({
    product: {
        videos: {limit: setting("productpage_videos_count")},
        reviews: {limit: setting("productpage_reviews_count")},
        related_products: {limit: setting("productpage_related_products_count")},
        similar_by_views: {limit: setting("productpage_similar_by_views_count")},
    },
});

interface ShippingMessage {
    message: string;
}

/** `{{{region name="…"}}}` */
const region = (name: string) => $unescaped($region({name: $string(name)}));

export default () => {
    return (
        <>
            <$Inject keyName={$string("productId")} value={$pointer("product.id")} />
            <$Page
                blocks={{
                    page: () => (
                        <>
                            {$partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")})}
                            <$Each
                                list={$pointer<ShippingMessage[]>("product.shipping_messages")}
                                $then={(item) => $partial("components/common/alert/alert-info", item.message)}
                            />
                            <div>
                                {$partial("components/products/product-view")}
                                {region("product_below_content")}
                                <$If
                                    test={$pointer("product.videos.list.length")}
                                    $then={() => $partial("components/products/videos", $pointer("product.videos"))}
                                />
                                {$raw("{{#all settings.show_product_reviews theme_settings.show_product_reviews (if theme_settings.show_product_details_tabs '!==' true)}}")}
                                {$partial("components/products/reviews", {
                                        reviews: $pointer("product.reviews"),
                                        product: $pointer("product"),
                                        urls: $pointer("urls"),
                                    })}
                                {$raw("{{/all}}")}
                                {$partial("components/products/tabs")}
                            </div>
                            {$partial("components/products/schema")}
                        </>
                    ),
                }}
                layout="layout/base"
            />
        </>
    );
};
