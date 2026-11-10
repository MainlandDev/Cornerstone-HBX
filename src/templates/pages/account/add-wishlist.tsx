/**
 * Source: templates/pages/account/add-wishlist.html (22 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import AddWishlist from '@/templates/components/account/add-wishlist';
import type {ExtendedThemePageAddWishlist} from '@/context-account';

export default $page<ExtendedThemePageAddWishlist>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    /* html L2: <div class="account"> */
                    <div className="account">
                        {/* html L3: {{#if settings.show_wishlist}} */}
                        <$If
                            query={[ctx.settings.show_wishlist]}
                            $then={() => (
                                <>
                                    {/* html L4: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                                    <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                                    {/* html L5: <h2 class="page-heading"> */}
                                    <h2 className="page-heading">
                                        {/* html L6: {{#if forms.wishlist.id}} */}
                                        <$If
                                            query={[ctx.forms.wishlist.id]}
                                            $then={() => /* html L7: {{lang 'account.wishlists.edit'}} */ <$Lang translationKey={$string('account.wishlists.edit')}/>}
                                            $else={() => (
                                                /* html L8: {{else}}
                                                                                                      html L9: {{#if forms.wishlist.action}}
                                                */
                                                <$If
                                                    query={[ctx.forms.wishlist.action]}
                                                    $then={() => /* html L10: {{lang 'account.wishlists.new'}} */ <$Lang translationKey={$string('account.wishlists.new')}/>}
                                                    $else={() => /* html L11: {{else}}
                                                                                                                                        html L12: {{lang 'account.wishlists.heading'}}
                                                                 */ <$Lang translationKey={$string('account.wishlists.heading')}/>}
                                                />
                                            )}
                                        />
                                    </h2>
                                    {/* html L16: {{> components/account/navigation account_page='wishlists'}} */}
                                    <$Partial
                                        name="components/account/navigation"
                                        hash={{account_page: $string('wishlists'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                                    />
                                    {/* html L17: {{> components/account/add-wishlist}} */}
                                    <AddWishlist forms={ctx.forms} urls={ctx.urls}/>
                                </>
                            )}
                        />
                    </div>
                )}
            />
            {/* html L21: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
