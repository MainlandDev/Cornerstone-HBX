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
            <$Inject keyName={$string('productId')} value={ctx.product.id}/>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>

                        <$Each
                            list={ctx.product.shipping_messages}
                            $then={(item) => <$Partial name="components/common/alert/alert-info" context={item.message}/>}
                        />

                        <div>
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

                            <$_Region name={$string('product_below_content')}/>

                            <$If
                                query={[ctx.product.videos.list.length]}
                                $then={() => <$Partial name="components/products/videos" context={ctx.product.videos}/>}
                            />

                            <$All
                                values={[
                                    ctx.settings.show_product_reviews,
                                    ctx.theme_settings.show_product_reviews,
                                    $if(ctx.theme_settings.show_product_details_tabs, '!==', $boolean(true)),
                                ]}
                                $then={() => (
                                    <$Partial
                                        name="components/products/reviews"
                                        hash={{reviews: ctx.product.reviews, product: ctx.product, urls: ctx.urls, theme_settings: ctx.theme_settings}}
                                    />
                                )}
                            />

                            <$Partial name="components/products/tabs" hash={{product: ctx.product}}/>
                        </div>

                        <$Partial name="components/products/schema" hash={{product: ctx.product, settings: ctx.settings, currency_selector: ctx.currency_selector}}/>
                    </>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
