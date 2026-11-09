import {$If, $Partial, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$page, $theme} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang, $StencilPartial, $_Region} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {ExtendedThemePageBrand} from '@/context-pagesA';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import BrandSidebar from '@/templates/components/brand/sidebar';

const theme = $theme<ExtendedThemePageBrand>();

export default $page<ExtendedThemePageBrand>({
    frontmatter: {
        brand: {
            products: {
                limit: theme.theme_settings.brandpage_products_per_page,
            },
        },
    },
    content: (ctx) => (
        <>
            <$Inject keyName={$string('brandProductsPerPage')} value={ctx.theme_settings.brandpage_products_per_page}/>
            <$StencilPartial
                name={$string('head')}
                $then={() => (
                    <>
                        <$If
                            query={[ctx.pagination.brand.previous]}
                            $then={() => <link rel="prev" href={$unescaped(ctx.pagination.brand.previous)}/>}
                        />
                        <$If
                            query={[ctx.pagination.brand.next]}
                            $then={() => <link rel="next" href={$unescaped(ctx.pagination.brand.next)}/>}
                        />
                    </>
                )}
            />
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <$If
                            query={[ctx.brand.image]}
                            $then={() => (
                                <div className="brand-image-container">
                                    <$Partial
                                        name="components/common/responsive-img"
                                        hash={{
                                            image: ctx.brand.image,
                                            fallback_size: ctx.theme_settings.thumb_size,
                                            lazyload: $string('disabled'),
                                        }}
                                    />
                                </div>
                            )}
                        />
                        <h1 className="page-heading">{ctx.brand.name}</h1>
                        <$_Region name={$string('brand_below_header')}/>
                        <div className="page">
                            <aside className="page-sidebar" id="faceted-search-container">
                                <BrandSidebar brand={ctx.brand} shop_by_brand={ctx.shop_by_brand} urls={ctx.urls}/>
                            </aside>

                            <main className="page-content" id="product-listing-container">
                                <$If
                                    query={[ctx.brand.search_error]}
                                    $then={() => (
                                        <p>
                                            <$Lang translationKey={$string('search.errorMessage')}/>
                                        </p>
                                    )}
                                    $else={() => (
                                        <>
                                            <$If
                                                query={[ctx.brand.products]}
                                                $then={() => (
                                                    <$Partial
                                                        name="components/brand/product-listing"
                                                        hash={{brand: ctx.brand, pagination: ctx.pagination, theme_settings: ctx.theme_settings}}
                                                    />
                                                )}
                                                $else={() => (
                                                    <p>
                                                        <$Lang translationKey={$string('brands.no_products')}/>
                                                    </p>
                                                )}
                                            />
                                            <$_Region name={$string('brand_below_content')}/>
                                        </>
                                    )}
                                />
                            </main>
                        </div>
                    </>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
