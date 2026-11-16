import Breadcrumbs from "../components/common/breadcrumbs.tsx";
import ResponsiveImg from "../components/common/responsive-img.tsx";
import {
    $$themeSettings,
    $frontmatter,
    $If,
    $Inject,
    $Page,
    $partial,
    $pointer,
    $raw,
    $region,
    $string,
    $unescaped,
    $Unless,
} from "@mainlanddev/hbx-bigcommerce";

const {setting} = $frontmatter;

export const frontmatter = $frontmatter.category({category: {products: {limit: setting("categorypage_products_per_page")}}});

/** `{{{region name="…"}}}` */
const region = (name: string) => $unescaped($region({name: $string(name)}));

export default () => {
    const settings = $$themeSettings();
    const sidebar = () => (
        <aside className="page-sidebar" id="faceted-search-container">
            {$partial("components/category/sidebar")}
        </aside>
    );
    return (
        <>
            <$Inject keyName={$string("categoryProductsPerPage")} value={settings.categorypage_products_per_page} />
            <$Page
                blocks={{
                    head: () => (
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
                    ),
                    page: () => (
                        <>
                            <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                            <$If
                                test={$pointer("category.image")}
                                $then={() =>
                                    <ResponsiveImg image={$pointer("category.image")} fallback_size={settings.zoom_size} lazyload={settings.lazyload_mode} class={$string("category-header-image")} />
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
                                    {$partial("components/category/product-listing")}
                                </main>
                                <div className="page-region">{region("category_below_content")}</div>
                            </div>
                        </>
                    ),
                }}
                layout="layout/base"
            />
        </>
    );
};
