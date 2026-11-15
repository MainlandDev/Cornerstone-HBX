import {
    $$themeSettings,
    $frontmatter,
    $If,
    $Inject,
    $partial,
    $pointer,
    $raw,
    $region,
    $StencilPartial,
    $string,
    $unescaped,
    $Unless,
    place,
} from "@mainlanddev/hbx-bigcommerce";

const {setting} = $frontmatter;

export const frontmatter = $frontmatter.category({category: {products: {limit: setting("categorypage_products_per_page")}}});

/** `{{{region name="…"}}}` */
const region = (name: string) => place($unescaped($region({name: $string(name)})));

export default () => {
    const settings = $$themeSettings();
    const sidebar = () => (
        <aside className="page-sidebar" id="faceted-search-container">
            {place($partial("components/category/sidebar"))}
        </aside>
    );
    return (
        <>
            <$Inject keyName={$string("categoryProductsPerPage")} value={settings.categorypage_products_per_page} />
            <$StencilPartial
                name={$string("head")}
                $then={() => (
                    <>
                        <$If
                            test={$pointer("pagination.category.previous")}
                            $then={() => (
                                <link rel="prev" dangerouslyInlineAttributes={{attributes: `href="${$raw("{{{pagination.category.previous}}}")}"`}} />
                            )}
                        />
                        <$If
                            test={$pointer("pagination.category.next")}
                            $then={() => (
                                <link rel="next" dangerouslyInlineAttributes={{attributes: `href="${$raw("{{{pagination.category.next}}}")}"`}} />
                            )}
                        />
                    </>
                )}
            />
            <$StencilPartial
                name={$string("page")}
                $then={() => (
                    <>
                        {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                        <$If
                            test={$pointer("category.image")}
                            $then={() =>
                                place(
                                    $partial("components/common/responsive-img", {
                                        image: $pointer("category.image"),
                                        fallback_size: settings.zoom_size,
                                        lazyload: settings.lazyload_mode,
                                        class: $string("category-header-image"),
                                    }),
                                )
                            }
                        />
                        <$Unless
                            test={settings.hide_category_page_heading}
                            $then={() => (
                                <>
                                    <h1 className="page-heading">{$pointer("category.name")}</h1>
                                    {region("category_below_header")}
                                </>
                            )}
                        />
                        {$unescaped($pointer("category.description"))}
                        <div className="page">
                            <$If
                                test={$pointer("category.faceted_search_enabled")}
                                $then={sidebar}
                                $elseThen={[
                                    {test: $pointer("category.subcategories"), $then: sidebar},
                                    {test: settings.shop_by_price_visibility, $then: sidebar},
                                ]}
                            />
                            <main className="page-content" id="product-listing-container">
                                {place($partial("components/category/product-listing"))}
                            </main>
                            <div className="page-region">{region("category_below_content")}</div>
                        </div>
                    </>
                )}
            />
            {place($partial("layout/base"))}
        </>
    );
};
