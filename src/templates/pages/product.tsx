import ProductsProductView from "../components/products/product-view.tsx";
import ProductsVideos from "../components/products/videos.tsx";
import ProductsReviews from "../components/products/reviews.tsx";
import ProductsTabs from "../components/products/tabs.tsx";
import ProductsSchema from "../components/products/schema.tsx";
import Breadcrumbs from "../components/common/breadcrumbs.tsx";
import AlertAlertInfo from "../components/common/alert/alert-info.tsx";
import {
    $Page,
    $Each,
    $frontmatter,
    $If,
    $Inject,
    $pointer,
    $region,
    $string,
    $unescaped, $boolean, $ifExpression, $All,
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
                            <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                            <$Each
                                list={$pointer<ShippingMessage[]>("product.shipping_messages")}
                                $then={(item) => <AlertAlertInfo $positionalHash={item.message} />}
                            />
                            <div>
                                <ProductsProductView />
                                {region("product_below_content")}
                                <$If
                                    test={$pointer("product.videos.list.length")}
                                    $then={() => <ProductsVideos $positionalHash={$pointer("product.videos")} />}
                                />
                                <$All values={[$pointer("settings.show_product_reviews"), $pointer("theme_settings.show_product_reviews"), $ifExpression($pointer("theme_settings.show_product_details_tabs"), $string("!=="), $boolean(true))]} $then={() => (<><ProductsReviews reviews={$pointer("product.reviews")} product={$pointer("product")} urls={$pointer("urls")} /></>)} />
                                <ProductsTabs />
                            </div>
                            <ProductsSchema />
                        </>
                    ),
                }}
                layout="layout/base"
            />
        </>
    );
};
