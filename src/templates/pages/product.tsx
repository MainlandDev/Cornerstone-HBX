/**
 * Source: templates/pages/product.html (41 lines). Per-element comments below quote the original lines (`html L<n>`).
 * Front matter of the original (lines 1-11):
 *   ---
 *   product:
 *       videos:
 *           limit: {{theme_settings.productpage_videos_count}}
 *       reviews:
 *           limit: {{theme_settings.productpage_reviews_count}}
 *       related_products:
 *           limit: {{theme_settings.productpage_related_products_count}}
 *       similar_by_views:
 *           limit: {{theme_settings.productpage_similar_by_views_count}}
 *   ---
 */
import {$boolean, $Each, $if, $If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page, $theme} from '@mainlanddev/bigcommerce-react/theme';
import {$All, $Inject, $StencilPartial, $_Region} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {ExtendedThemePageProduct} from '@/context-pagesA';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

const theme = $theme<ExtendedThemePageProduct>();

export default $page<ExtendedThemePageProduct>({
    frontmatter: {
        product: {
            videos: {
                limit: theme.theme_settings.productpage_videos_count,
            },
            reviews: {
                limit: theme.theme_settings.productpage_reviews_count,
            },
            related_products: {
                limit: theme.theme_settings.productpage_related_products_count,
            },
            similar_by_views: {
                limit: theme.theme_settings.productpage_similar_by_views_count,
            },
        },
    },
    content: (ctx) => (
        <>
            {/* html L12: {{inject 'productId' product.id}} */}
            <$Inject keyName={$string('productId')} value={ctx.product.id}/>
            {/* html L14: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L16: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>

                        {/* html L18: {{#each product.shipping_messages}} */}
                        <$Each
                            list={ctx.product.shipping_messages}
                            $then={(item) => /* html L19: {{> components/common/alert/alert-info message}} */ <$Partial name="components/common/alert/alert-info" context={item.message}/>}
                        />

                        {/* html L22: <div> */}
                        <div>
                            {/* html L23: {{> components/products/product-view}} */}
                            <$Partial
                                name="components/products/product-view"
                                hash={{
                                    product: ctx.product,
                                    settings: ctx.settings,
                                    theme_settings: ctx.theme_settings,
                                    customer: ctx.customer,
                                    is_ajax: ctx.is_ajax,
                                }}
                            />

                            {/* html L25: {{{region name="product_below_content"}}} */}
                            <$_Region name={$string('product_below_content')}/>

                            {/* html L27: {{#if product.videos.list.length}} */}
                            <$If
                                query={[ctx.product.videos.list.length]}
                                $then={() => /* html L28: {{> components/products/videos product.videos}} */ <$Partial name="components/products/videos" context={ctx.product.videos}/>}
                            />

                            {/* html L31: {{#all settings.show_product_reviews theme_settings.show_product_reviews (if theme_settings.show_product_details_tabs '!==' true)}} */}
                            <$All
                                values={[
                                    ctx.settings.show_product_reviews,
                                    ctx.theme_settings.show_product_reviews,
                                    $if(ctx.theme_settings.show_product_details_tabs, '!==', $boolean(true)),
                                ]}
                                $then={() => (
                                    /* html L32: {{> components/products/reviews reviews=product.reviews product=product urls=urls}} */
                                    <$Partial
                                        name="components/products/reviews"
                                        hash={{reviews: ctx.product.reviews, product: ctx.product, urls: ctx.urls, theme_settings: ctx.theme_settings}}
                                    />
                                )}
                            />

                            {/* html L35: {{> components/products/tabs}} */}
                            <$Partial name="components/products/tabs" hash={{product: ctx.product}}/>
                        </div>

                        {/* html L38: {{> components/products/schema}} */}
                        <$Partial name="components/products/schema" hash={{product: ctx.product, settings: ctx.settings, currency_selector: ctx.currency_selector}}/>
                    </>
                )}
            />
            {/* html L40: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
