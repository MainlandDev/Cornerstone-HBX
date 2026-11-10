/**
 * Source: templates/pages/category.html (58 lines). Per-element comments below quote the original lines (`html L<n>`).
 * Front matter of the original (lines 1-5):
 *   ---
 *   category:
 *       products:
 *           limit: {{theme_settings.categorypage_products_per_page}}
 *   ---
 */
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
            {/* html L6: {{inject "categoryProductsPerPage" theme_settings.categorypage_products_per_page}} */}
            <$Inject keyName={$string('categoryProductsPerPage')} value={ctx.theme_settings.categorypage_products_per_page}/>
            {/* html L7: {{#partial "head"}} */}
            <$StencilPartial
                name={$string('head')}
                $then={() => (
                    <>
                        {/* html L8: {{#if pagination.category.previous}} */}
                        <$If
                            query={[ctx.pagination.category.previous]}
                            $then={() => /* html L9: <link rel="prev" href="{{{pagination.category.previous}}}"> */ <link rel="prev" href={$unescaped(ctx.pagination.category.previous)}/>}
                        />
                        {/* html L11: {{#if pagination.category.next}} */}
                        <$If
                            query={[ctx.pagination.category.next]}
                            $then={() => /* html L12: <link rel="next" href="{{{pagination.category.next}}}"> */ <link rel="next" href={$unescaped(ctx.pagination.category.next)}/>}
                        />
                    </>
                )}
            />
            {/* html L16: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L18: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        {/* html L19: {{#if category.image}} */}
                        <$If
                            query={[ctx.category.image]}
                            $then={() => (
                                /* html L20-25:
                                   {{> components/common/responsive-img
                                       image=category.image
                                       fallback_size=theme_settings.zoom_size
                                       lazyload=theme_settings.lazyload_mode
                                       class="category-header-image"
                                   }}
                                */
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
                        {/* html L27: {{#unless theme_settings.hide_category_page_heading }} */}
                        <$Unless
                            query={[ctx.theme_settings.hide_category_page_heading]}
                            $then={() => (
                                <>
                                    {/* html L28: <h1 class="page-heading">{{category.name}}</h1> */}
                                    <h1 className="page-heading">{/* html L28: {{category.name}} */}{ctx.category.name}</h1>
                                    {/* html L29: {{{region name="category_below_header"}}} */}
                                    <$_Region name={$string('category_below_header')}/>
                                </>
                            )}
                        />
                        {/* html L31: {{{category.description}}} */}
                        {$unescaped(ctx.category.description)}
                        {/* html L32: <div class="page"> */}
                        <div className="page">
                            {/* html L33: {{#if category.faceted_search_enabled}} */}
                            <$If
                                query={[ctx.category.faceted_search_enabled]}
                                $then={() => (
                                    /* html L34: <aside class="page-sidebar" id="faceted-search-container"> */
                                    <aside className="page-sidebar" id="faceted-search-container">
                                        {/* html L35: {{> components/category/sidebar}} */}
                                        <CategorySidebar category={ctx.category} theme_settings={ctx.theme_settings}/>
                                    </aside>
                                )}
                                $elseThen={[
                                    {
                                        query: [ctx.category.subcategories],
                                        $then: () => (
                                            /* html L37: {{else if category.subcategories}}
                                                                                              html L38: <aside class="page-sidebar" id="faceted-search-container">
                                            */
                                            <aside className="page-sidebar" id="faceted-search-container">
                                                {/* html L39: {{> components/category/sidebar}} */}
                                                <CategorySidebar category={ctx.category} theme_settings={ctx.theme_settings}/>
                                            </aside>
                                        ),
                                    },
                                    {
                                        query: [ctx.theme_settings.shop_by_price_visibility],
                                        $then: () => (
                                            /* html L41: {{else if theme_settings.shop_by_price_visibility}}
                                                                                              html L42: <aside class="page-sidebar" id="faceted-search-container">
                                            */
                                            <aside className="page-sidebar" id="faceted-search-container">
                                                {/* html L43: {{> components/category/sidebar}} */}
                                                <CategorySidebar category={ctx.category} theme_settings={ctx.theme_settings}/>
                                            </aside>
                                        ),
                                    },
                                ]}
                            />

                            {/* html L47: <main class="page-content" id="product-listing-container"> */}
                            <main className="page-content" id="product-listing-container">
                                {/* html L48: {{> components/category/product-listing}} */}
                                <CategoryProductListing
                                    category={ctx.category}
                                    pagination={ctx.pagination}
                                    theme_settings={ctx.theme_settings}
                                />
                            </main>

                            {/* html L51: <div class="page-region"> */}
                            <div className="page-region">
                                {/* html L52: {{{region name="category_below_content"}}} */}
                                <$_Region name={$string('category_below_content')}/>
                            </div>
                        </div>
                    </>
                )}
            />
            {/* html L57: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
