/**
 * Source: templates/pages/home.html (46 lines). Per-element comments below quote the original lines (`html L<n>`).
 * Front matter of the original (lines 1-13):
 *   ---
 *   products:
 *       new:
 *           limit: {{theme_settings.homepage_new_products_count}}
 *       featured:
 *           limit: {{theme_settings.homepage_featured_products_count}}
 *       top_sellers:
 *           limit: {{theme_settings.homepage_top_products_count}}
 *   carousel: {{theme_settings.homepage_show_carousel}}
 *   blog:
 *       recent_posts:
 *           limit: {{theme_settings.homepage_blog_posts_count}}
 *   ---
 */
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
            {/* html L14: {{#partial "hero"}} */}
            <$StencilPartial
                name={$string('hero')}
                $then={() => (
                    <>
                        {/* html L15: {{{region name="home_below_menu"}}} */}
                        <$_Region name={$string('home_below_menu')}/>
                        {/* html L16: {{#and carousel carousel.slides.length}} */}
                        <$And
                            a={ctx.carousel}
                            b={ctx.carousel.slides.length}
                            $then={() => (
                                /* html L17: {{> components/carousel arrows=theme_settings.homepage_show_carousel_arrows play_pause_button=theme_settings.homepage_show_carousel_play_pause_button}} */
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
                        {/* html L19: {{{region name="home_below_carousel"}}} */}
                        <$_Region name={$string('home_below_carousel')}/>
                    </>
                )}
            />
            {/* html L22: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L24: {{#each shipping_messages}} */}
                        <$Each
                            list={ctx.shipping_messages}
                            $then={(item) => /* html L25: {{> components/common/alert/alert-info message}} */ <$Partial name="components/common/alert/alert-info" context={item.message}/>}
                        />

                        {/* html L28: <div class="main full"> */}
                        <div className="main full">
                            {/* html L29: {{#if products.featured}} */}
                            <$If
                                query={[ctx.products.featured]}
                                $then={() => (
                                    /* html L30: {{> components/products/featured products=products.featured columns=theme_settings.homepage_featured_products_column_count}} */
                                    <$Partial
                                        name="components/products/featured"
                                        hash={{products: ctx.products.featured, columns: ctx.theme_settings.homepage_featured_products_column_count}}
                                    />
                                )}
                            />
                            {/* html L32: {{{region name="home_below_featured_products"}}} */}
                            <$_Region name={$string('home_below_featured_products')}/>

                            {/* html L34: {{#if products.top_sellers}} */}
                            <$If
                                query={[ctx.products.top_sellers]}
                                $then={() => (
                                    /* html L35: {{> components/products/top products=products.top_sellers columns=theme_settings.homepage_top_products_column_count}} */
                                    <$Partial
                                        name="components/products/top"
                                        hash={{products: ctx.products.top_sellers, columns: ctx.theme_settings.homepage_top_products_column_count}}
                                    />
                                )}
                            />
                            {/* html L37: {{{region name="home_below_top_products"}}} */}
                            <$_Region name={$string('home_below_top_products')}/>

                            {/* html L39: {{#if products.new}} */}
                            <$If
                                query={[ctx.products.new]}
                                $then={() => (
                                    /* html L40: {{> components/products/new products=products.new columns=theme_settings.homepage_new_products_column_count}} */
                                    <$Partial
                                        name="components/products/new"
                                        hash={{products: ctx.products.new, columns: ctx.theme_settings.homepage_new_products_column_count}}
                                    />
                                )}
                            />
                            {/* html L42: {{{region name="home_below_new_products"}}} */}
                            <$_Region name={$string('home_below_new_products')}/>
                        </div>
                    </>
                )}
            />
            {/* html L45: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
