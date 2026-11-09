import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page, type ThemePageAccountWishlists} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ThemePageAccountWishlists>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <$If
                        query={[ctx.settings.show_wishlist]}
                        $then={() => (
                            <div className="account account--fixedLarge">
                                <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                                <h2 className="page-heading">
                                    <$Lang translationKey={$string('account.wishlists.heading')}/>
                                </h2>
                                <$Partial
                                    name="components/account/navigation"
                                    hash={{account_page: $string('wishlists'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                                />
                                <$Partial name="components/account/wishlist-list" hash={{customer: ctx.customer, urls: ctx.urls}}/>
                            </div>
                        )}
                    />
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
