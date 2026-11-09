import {$If, $Partial, $string, $unescaped, $Unless} from '@mainlanddev/bigcommerce-react';
import {$page, $theme, type ThemePageCategory} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $StencilPartial, $_Region} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import CategorySidebar from '@/templates/components/category/sidebar';
import CategoryProductListing from '@/templates/components/category/product-listing';

const theme = $theme<ThemePageCategory>();

export default $page<ThemePageCategory>({
    frontmatter: {
        category: {
            products: {
                limit: theme.theme_settings.categorypage_products_per_page,
            },
        },
    },
    content: (ctx) => (
        <>
            <$Inject keyName={$string('categoryProductsPerPage')} value={ctx.theme_settings.categorypage_products_per_page}/>
            <$StencilPartial
                name={$string('head')}
                $then={() => (
                    <>
                        <$If
                            query={[ctx.pagination.category.previous]}
                            $then={() => <link rel="prev" href={$unescaped(ctx.pagination.category.previous)}/>}
                        />
                        <$If
                            query={[ctx.pagination.category.next]}
                            $then={() => <link rel="next" href={$unescaped(ctx.pagination.category.next)}/>}
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
                            query={[ctx.category.image]}
                            $then={() => (
                                <$Partial
                                    name="components/common/responsive-img"
                                    hash={{
                                        image: ctx.category.image,
                                        fallback_size: ctx.theme_settings.zoom_size,
                                        lazyload: ctx.theme_settings.lazyload_mode,
                                        class: $string('category-header-image'),
                                    }}
                                />
                            )}
                        />
                        <$Unless
                            query={[ctx.theme_settings.hide_category_page_heading]}
                            $then={() => (
                                <>
                                    <h1 className="page-heading">{ctx.category.name}</h1>
                                    <$_Region name={$string('category_below_header')}/>
                                </>
                            )}
                        />
                        {$unescaped(ctx.category.description)}
                        <div className="page">
                            <$If
                                query={[ctx.category.faceted_search_enabled]}
                                $then={() => (
                                    <aside className="page-sidebar" id="faceted-search-container">
                                        <CategorySidebar category={ctx.category} theme_settings={ctx.theme_settings}/>
                                    </aside>
                                )}
                                $elseThen={[
                                    {
                                        query: [ctx.category.subcategories],
                                        $then: () => (
                                            <aside className="page-sidebar" id="faceted-search-container">
                                                <CategorySidebar category={ctx.category} theme_settings={ctx.theme_settings}/>
                                            </aside>
                                        ),
                                    },
                                    {
                                        query: [ctx.theme_settings.shop_by_price_visibility],
                                        $then: () => (
                                            <aside className="page-sidebar" id="faceted-search-container">
                                                <CategorySidebar category={ctx.category} theme_settings={ctx.theme_settings}/>
                                            </aside>
                                        ),
                                    },
                                ]}
                            />

                            <main className="page-content" id="product-listing-container">
                                <CategoryProductListing
                                    category={ctx.category}
                                    pagination={ctx.pagination}
                                    theme_settings={ctx.theme_settings}
                                />
                            </main>

                            <div className="page-region">
                                <$_Region name={$string('category_below_content')}/>
                            </div>
                        </div>
                    </>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
