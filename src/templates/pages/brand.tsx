import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import BrandSidebar from "../components/brand/sidebar.tsx";
import BrandProductListing from "../components/brand/product-listing.tsx";
import Breadcrumbs from "../components/common/breadcrumbs.tsx";
import ResponsiveImg from "../components/common/responsive-img.tsx";
import {
    $frontmatter,
    $If,
    $Inject,
    $Lang,
    $Page,
    $pointer,
    $raw,
    $region,
    $string,
    $unescaped,
} from "@mainlanddev/hbx-bigcommerce";

const {setting} = $frontmatter;

export const frontmatter = $frontmatter.brand({brand: {products: {limit: setting("brandpage_products_per_page")}}});

/** `{{{region name="…"}}}` */
const region = (name: string) => $unescaped($region({name: $string(name)}));

export default () => {
    const settings = $pointer<ThemeSettingsObject>("theme_settings");
    return (
        <>
            <$Inject keyName={$string("brandProductsPerPage")} value={settings.brandpage_products_per_page} />
            <$Page
                blocks={{
                    head: () => (
                        <>
                            <$If
                                test={$pointer("pagination.brand.previous")}
                                $then={() => (
                                    <link rel="prev" dangerouslyInlineAttributes={{attributes: `href="${$raw("{{{pagination.brand.previous}}}")}"`}} />
                                )}
                            />
                            <$If
                                test={$pointer("pagination.brand.next")}
                                $then={() => (
                                    <link rel="next" dangerouslyInlineAttributes={{attributes: `href="${$raw("{{{pagination.brand.next}}}")}"`}} />
                                )}
                            />
                        </>
                    ),
                    page: () => (
                        <>
                            <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                            <$If
                                test={$pointer("brand.image")}
                                $then={() => (
                                    <div className="brand-image-container">
                                        <ResponsiveImg image={$pointer("brand.image")} fallback_size={settings.thumb_size} lazyload={$string("disabled")} />
                                    </div>
                                )}
                            />
                            <h1 className="page-heading">{$pointer("brand.name")}</h1>
                            {region("brand_below_header")}
                            <div className="page">
                                <aside className="page-sidebar" id="faceted-search-container">
                                    <BrandSidebar />
                                </aside>
                                <main className="page-content" id="product-listing-container">
                                    <$If
                                        test={$pointer("brand.search_error")}
                                        $then={() => (
                                            <p>
                                                <$Lang keyName={$string("search.errorMessage")} />
                                            </p>
                                        )}
                                        $else={() => (
                                            <>
                                                <$If
                                                    test={$pointer("brand.products")}
                                                    $then={() => <BrandProductListing />}
                                                    $else={() => (
                                                        <p>
                                                            <$Lang keyName={$string("brands.no_products")} />
                                                        </p>
                                                    )}
                                                />
                                                {region("brand_below_content")}
                                            </>
                                        )}
                                    />
                                </main>
                            </div>
                        </>
                    ),
                }}
                layout="layout/base"
            />
        </>
    );
};
