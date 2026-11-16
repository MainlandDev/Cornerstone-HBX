import type {PageContext, ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import Carousel from "../components/carousel.tsx";
import ProductsFeatured from "../components/products/featured.tsx";
import ProductsTop from "../components/products/top.tsx";
import ProductsNew from "../components/products/new.tsx";
import AlertAlertInfo from "../components/common/alert/alert-info.tsx";
import {
    $And,
    $Each,
    $frontmatter,
    $If,
    $Page,
    $pointer,
    $region,
    $string,
    $unescaped,
} from "@mainlanddev/hbx-bigcommerce";

const {setting} = $frontmatter;

export const frontmatter = $frontmatter.home({
    products: {
        new: {limit: setting("homepage_new_products_count")},
        featured: {limit: setting("homepage_featured_products_count")},
        top_sellers: {limit: setting("homepage_top_products_count")},
    },
    carousel: setting("homepage_show_carousel"),
    blog: {recent_posts: {limit: setting("homepage_blog_posts_count")}},
});

/** `{{{region name="…"}}}` */
const region = (name: string) => $unescaped($region({name: $string(name)}));

/** The home page context; read through plain pointers (not `@root`), which is what the original template does. */
type Home = PageContext<"home">;

export default () => {
    const settings = $pointer<ThemeSettingsObject>("theme_settings");
    // `shipping_messages` is retyped in src/hbx/context.overrides.d.ts: the generated type hides `message`.
    const carousel = $pointer<Home["carousel"]>("carousel");
    const products = $pointer<Home["products"]>("products");
    const shippingMessages = $pointer<Home["shipping_messages"]>("shipping_messages");
    return (
        <$Page
            blocks={{
                hero: () => (
                    <>
                        {region("home_below_menu")}
                        <$And
                            a={carousel}
                            b={carousel.slides.length}
                            $then={() =>
                                <Carousel arrows={settings.homepage_show_carousel_arrows} play_pause_button={settings.homepage_show_carousel_play_pause_button} />
                            }
                        />
                        {region("home_below_carousel")}
                    </>
                ),
                page: () => (
                    <>
                        <$Each
                            list={shippingMessages}
                            $then={(item) => <AlertAlertInfo $positionalHash={item.message} />}
                        />
                        <div className="main full">
                            <$If
                                test={products.featured}
                                $then={() =>
                                    <ProductsFeatured products={products.featured} columns={settings.homepage_featured_products_column_count} />
                                }
                            />
                            {region("home_below_featured_products")}
                            <$If
                                test={products.top_sellers}
                                $then={() =>
                                    <ProductsTop products={products.top_sellers} columns={settings.homepage_top_products_column_count} />
                                }
                            />
                            {region("home_below_top_products")}
                            <$If
                                test={products.new}
                                $then={() =>
                                    <ProductsNew products={products.new} columns={settings.homepage_new_products_column_count} />
                                }
                            />
                            {region("home_below_new_products")}
                        </div>
                    </>
                ),
            }}
        />
    );
};
