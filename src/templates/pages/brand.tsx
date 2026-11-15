import {
    $$themeSettings,
    $frontmatter,
    $If,
    $Inject,
    $Lang,
    $partial,
    $pointer,
    $raw,
    $region,
    $StencilPartial,
    $string,
    $unescaped,
    place,
} from "@mainlanddev/hbx-bigcommerce";

const {setting} = $frontmatter;

export const frontmatter = $frontmatter.brand({brand: {products: {limit: setting("brandpage_products_per_page")}}});

/** `{{{region name="…"}}}` */
const region = (name: string) => place($unescaped($region({name: $string(name)})));

export default () => {
    const settings = $$themeSettings();
    return (
        <>
            <$Inject keyName={$string("brandProductsPerPage")} value={settings.brandpage_products_per_page} />
            <$StencilPartial
                name={$string("head")}
                $then={() => (
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
                )}
            />
            <$StencilPartial
                name={$string("page")}
                $then={() => (
                    <>
                        {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                        <$If
                            test={$pointer("brand.image")}
                            $then={() => (
                                <div className="brand-image-container">
                                    {place(
                                        $partial("components/common/responsive-img", {
                                            image: $pointer("brand.image"),
                                            fallback_size: settings.thumb_size,
                                            lazyload: $string("disabled"),
                                        }),
                                    )}
                                </div>
                            )}
                        />
                        <h1 className="page-heading">{$pointer("brand.name")}</h1>
                        {region("brand_below_header")}
                        <div className="page">
                            <aside className="page-sidebar" id="faceted-search-container">
                                {place($partial("components/brand/sidebar"))}
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
                                                $then={() => place($partial("components/brand/product-listing"))}
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
                )}
            />
            {place($partial("layout/base"))}
        </>
    );
};
