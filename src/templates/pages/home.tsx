import {
    $$themeSettings,
    $And,
    $Each,
    $frontmatter,
    $If,
    $partial,
    $pointer,
    $region,
    $StencilPartial,
    $string,
    $unescaped,
    place,
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
const region = (name: string) => place($unescaped($region({name: $string(name)})));

export default () => {
    const settings = $$themeSettings();
    const carousel = $pointer<{slides: {length: number}}>("carousel");
    const products = $pointer<Record<"featured" | "top_sellers" | "new", unknown>>("products");
    return (
        <>
            <$StencilPartial
                name={$string("hero")}
                $then={() => (
                    <>
                        {region("home_below_menu")}
                        <$And
                            a={carousel}
                            b={carousel.slides.length}
                            $then={() =>
                                place(
                                    $partial("components/carousel", {
                                        arrows: settings.homepage_show_carousel_arrows,
                                        play_pause_button: settings.homepage_show_carousel_play_pause_button,
                                    }),
                                )
                            }
                        />
                        {region("home_below_carousel")}
                    </>
                )}
            />
            <$StencilPartial
                name={$string("page")}
                $then={() => (
                    <>
                        <$Each
                            list={$pointer<Array<{message: unknown}>>("shipping_messages")}
                            $then={(item) => place($partial("components/common/alert/alert-info", item.message))}
                        />
                        <div className="main full">
                            <$If
                                test={products.featured}
                                $then={() =>
                                    place(
                                        $partial("components/products/featured", {
                                            products: products.featured,
                                            columns: settings.homepage_featured_products_column_count,
                                        }),
                                    )
                                }
                            />
                            {region("home_below_featured_products")}
                            <$If
                                test={products.top_sellers}
                                $then={() =>
                                    place(
                                        $partial("components/products/top", {
                                            products: products.top_sellers,
                                            columns: settings.homepage_top_products_column_count,
                                        }),
                                    )
                                }
                            />
                            {region("home_below_top_products")}
                            <$If
                                test={products.new}
                                $then={() =>
                                    place(
                                        $partial("components/products/new", {
                                            products: products.new,
                                            columns: settings.homepage_new_products_column_count,
                                        }),
                                    )
                                }
                            />
                            {region("home_below_new_products")}
                        </div>
                    </>
                )}
            />
            {place($partial("layout/base"))}
        </>
    );
};
