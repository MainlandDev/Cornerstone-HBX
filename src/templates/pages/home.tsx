import {$Each, $If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page, $theme} from '@mainlanddev/bigcommerce-react/theme';
import type {ExtendedThemePageHome} from '@/context-pagesA';
import {$And, $StencilPartial, $_Region} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

const theme = $theme<ExtendedThemePageHome>();

export default $page<ExtendedThemePageHome>({
    frontmatter: {
        products: {
            new: {
                limit: theme.theme_settings.homepage_new_products_count,
            },
            featured: {
                limit: theme.theme_settings.homepage_featured_products_count,
            },
            top_sellers: {
                limit: theme.theme_settings.homepage_top_products_count,
            },
        },
        carousel: theme.theme_settings.homepage_show_carousel,
        blog: {
            recent_posts: {
                limit: theme.theme_settings.homepage_blog_posts_count,
            },
        },
    },
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('hero')}
                $then={() => (
                    <>
                        <$_Region name={$string('home_below_menu')}/>
                        <$And
                            a={ctx.carousel}
                            b={ctx.carousel.slides.length}
                            $then={() => (
                                <$Partial
                                    name="components/carousel"
                                    hash={{
                                        carousel: ctx.carousel,
                                        theme_settings: ctx.theme_settings,
                                        arrows: ctx.theme_settings.homepage_show_carousel_arrows,
                                        play_pause_button: ctx.theme_settings.homepage_show_carousel_play_pause_button,
                                    }}
                                />
                            )}
                        />
                        <$_Region name={$string('home_below_carousel')}/>
                    </>
                )}
            />
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <$Each
                            list={ctx.shipping_messages}
                            $then={(item) => <$Partial name="components/common/alert/alert-info" context={item.message}/>}
                        />

                        <div className="main full">
                            <$If
                                query={[ctx.products.featured]}
                                $then={() => (
                                    <$Partial
                                        name="components/products/featured"
                                        hash={{products: ctx.products.featured, columns: ctx.theme_settings.homepage_featured_products_column_count}}
                                    />
                                )}
                            />
                            <$_Region name={$string('home_below_featured_products')}/>

                            <$If
                                query={[ctx.products.top_sellers]}
                                $then={() => (
                                    <$Partial
                                        name="components/products/top"
                                        hash={{products: ctx.products.top_sellers, columns: ctx.theme_settings.homepage_top_products_column_count}}
                                    />
                                )}
                            />
                            <$_Region name={$string('home_below_top_products')}/>

                            <$If
                                query={[ctx.products.new]}
                                $then={() => (
                                    <$Partial
                                        name="components/products/new"
                                        hash={{products: ctx.products.new, columns: ctx.theme_settings.homepage_new_products_column_count}}
                                    />
                                )}
                            />
                            <$_Region name={$string('home_below_new_products')}/>
                        </div>
                    </>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
