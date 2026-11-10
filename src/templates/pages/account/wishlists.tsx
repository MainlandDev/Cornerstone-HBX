/**
 * Source: templates/pages/account/wishlists.html (12 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page, type ThemePageAccountWishlists} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ThemePageAccountWishlists>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    /* html L2: {{#if settings.show_wishlist}} */
                    <$If
                        query={[ctx.settings.show_wishlist]}
                        $then={() => (
                            /* html L3: <div class="account account--fixedLarge"> */
                            <div className="account account--fixedLarge">
                                {/* html L4: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                                <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                                {/* html L5: <h2 class="page-heading">{{lang 'account.wishlists.heading' }}</h2> */}
                                <h2 className="page-heading">
                                    {/* html L5: {{lang 'account.wishlists.heading' }} */}
                                    <$Lang translationKey={$string('account.wishlists.heading')}/>
                                </h2>
                                {/* html L6: {{> components/account/navigation account_page='wishlists'}} */}
                                <$Partial
                                    name="components/account/navigation"
                                    hash={{account_page: $string('wishlists'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                                />
                                {/* html L7: {{> components/account/wishlist-list}} */}
                                <$Partial name="components/account/wishlist-list" hash={{customer: ctx.customer, urls: ctx.urls}}/>
                            </div>
                        )}
                    />
                )}
            />
            {/* html L11: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
