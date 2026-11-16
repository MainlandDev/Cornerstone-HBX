import AlertAlertInfo from "../components/common/alert/alert-info.tsx";
import {
    $$themeSettings,
    $And,
    $context,
    $Each,
    $frontmatter,
    $If,
    $Page,
    $partial,
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

export default () => {
    const settings = $$themeSettings();
    // `shipping_messages` is retyped in src/hbx/context.overrides.d.ts: the generated type hides `message`.
    const {carousel, products, shipping_messages: shippingMessages} = $context("home");
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
                                $partial("components/carousel", {
                                        arrows: settings.homepage_show_carousel_arrows,
                                        play_pause_button: settings.homepage_show_carousel_play_pause_button,
                                    })
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
                                    $partial("components/products/featured", {
                                            products: products.featured,
                                            columns: settings.homepage_featured_products_column_count,
                                        })
                                }
                            />
                            {region("home_below_featured_products")}
                            <$If
                                test={products.top_sellers}
                                $then={() =>
                                    $partial("components/products/top", {
                                            products: products.top_sellers,
                                            columns: settings.homepage_top_products_column_count,
                                        })
                                }
                            />
                            {region("home_below_top_products")}
                            <$If
                                test={products.new}
                                $then={() =>
                                    $partial("components/products/new", {
                                            products: products.new,
                                            columns: settings.homepage_new_products_column_count,
                                        })
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
