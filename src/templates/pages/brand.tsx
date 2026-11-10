/**
 * Source: templates/pages/brand.html (50 lines). Per-element comments below quote the original lines (`html L<n>`).
 * Front matter of the original (lines 1-5):
 *   ---
 *   brand:
 *       products:
 *           limit: {{theme_settings.brandpage_products_per_page}}
 *   ---
 */
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
            {/* html L6: {{inject "brandProductsPerPage" theme_settings.brandpage_products_per_page}} */}
            <$Inject keyName={$string('brandProductsPerPage')} value={ctx.theme_settings.brandpage_products_per_page}/>
            {/* html L7: {{#partial "head"}} */}
            <$StencilPartial
                name={$string('head')}
                $then={() => (
                    <>
                        {/* html L8: {{#if pagination.brand.previous}} */}
                        <$If
                            query={[ctx.pagination.brand.previous]}
                            $then={() => /* html L9: <link rel="prev" href="{{{pagination.brand.previous}}}"> */ <link rel="prev" href={$unescaped(ctx.pagination.brand.previous)}/>}
                        />
                        {/* html L11: {{#if pagination.brand.next}} */}
                        <$If
                            query={[ctx.pagination.brand.next]}
                            $then={() => /* html L12: <link rel="next" href="{{{pagination.brand.next}}}"> */ <link rel="next" href={$unescaped(ctx.pagination.brand.next)}/>}
                        />
                    </>
                )}
            />
            {/* html L16: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L17: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        {/* html L18: {{#if brand.image}} */}
                        <$If
                            query={[ctx.brand.image]}
                            $then={() => (
                                /* html L19: <div class="brand-image-container"> */
                                <div className="brand-image-container">
                                    {/* html L20-24:
                                       {{> components/common/responsive-img
                                           image=brand.image
                                           fallback_size=theme_settings.thumb_size
                                           lazyload='disabled'
                                       }}
                                    */}
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
                        {/* html L27: <h1 class="page-heading">{{brand.name}}</h1> */}
                        <h1 className="page-heading">{/* html L27: {{brand.name}} */}{ctx.brand.name}</h1>
                        {/* html L28: {{{region name="brand_below_header"}}} */}
                        <$_Region name={$string('brand_below_header')}/>
                        {/* html L29: <div class="page"> */}
                        <div className="page">
                            {/* html L30: <aside class="page-sidebar" id="faceted-search-container"> */}
                            <aside className="page-sidebar" id="faceted-search-container">
                                {/* html L31: {{> components/brand/sidebar}} */}
                                <BrandSidebar brand={ctx.brand} shop_by_brand={ctx.shop_by_brand} urls={ctx.urls}/>
                            </aside>

                            {/* html L34: <main class="page-content" id="product-listing-container"> */}
                            <main className="page-content" id="product-listing-container">
                                {/* html L35: {{#if brand.search_error }} */}
                                <$If
                                    query={[ctx.brand.search_error]}
                                    $then={() => (
                                        /* html L36: <p>{{lang 'search.errorMessage'}}</p> */
                                        <p>
                                            {/* html L36: {{lang 'search.errorMessage'}} */}
                                            <$Lang translationKey={$string('search.errorMessage')}/>
                                        </p>
                                    )}
                                    $else={() => (
                                        <>
                                            {/* html L37: {{else}}
                                                                                              html L38: {{#if brand.products}}
                                            */}
                                            <$If
                                                query={[ctx.brand.products]}
                                                $then={() => (
                                                    /* html L39: {{> components/brand/product-listing}} */
                                                    <$Partial
                                                        name="components/brand/product-listing"
                                                        hash={{brand: ctx.brand, pagination: ctx.pagination, theme_settings: ctx.theme_settings}}
                                                    />
                                                )}
                                                $else={() => (
                                                    /* html L40: {{else}}
                                                                                                              html L41: <p>{{lang 'brands.no_products'}}</p>
                                                    */
                                                    <p>
                                                        {/* html L41: {{lang 'brands.no_products'}} */}
                                                        <$Lang translationKey={$string('brands.no_products')}/>
                                                    </p>
                                                )}
                                            />
                                            {/* html L43: {{{region name="brand_below_content"}}} */}
                                            <$_Region name={$string('brand_below_content')}/>
                                        </>
                                    )}
                                />
                            </main>
                        </div>
                    </>
                )}
            />
            {/* html L49: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
