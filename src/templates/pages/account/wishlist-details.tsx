/**
 * Source: templates/pages/account/wishlist-details.html (32 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $number, $parseHandlebarsDangerously, $string} from '@mainlanddev/bigcommerce-react';
import {$page, type ThemePageAccountWishlistDetails} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ThemePageAccountWishlistDetails>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    /* html L2: <div class="account" data-pagination-wishlist> */
                    <div className="account" data-pagination-wishlist="">
                        {/* html L4: {{#if wishlist.is_editable}} */}
                        <$If
                            query={[ctx.wishlist.is_editable]}
                            $then={() => (
                                /* html L5: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */
                                <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                            )}
                        />
                        {/* html L7: <h2 class="page-heading">{{lang 'account.wishlists.view_heading' name=wishlist.name}}</h2> */}
                        <h2 className="page-heading">
                            {/* html L7: {{lang 'account.wishlists.view_heading' name=wishlist.name}} */}
                            <$Lang translationKey={$string('account.wishlists.view_heading')} params={{name: ctx.wishlist.name}}/>
                        </h2>
                        {/* html L8: {{#if wishlist.is_editable}} */}
                        <$If
                            query={[ctx.wishlist.is_editable]}
                            $then={() => (
                                /* html L9: {{> components/account/navigation account_page='wishlists'}} */
                                <$Partial
                                    name="components/account/navigation"
                                    hash={{account_page: $string('wishlists'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                                />
                            )}
                        />

                        {/* html L12: {{#if wishlist.is_editable}} */}
                        <$If
                            query={[ctx.wishlist.is_editable]}
                            $then={() => (
                                /* html L13: {{#if wishlist.is_public '>' 0}} */
                                <$If
                                    query={[ctx.wishlist.is_public, '>', $number(0)]}
                                    $then={() => (
                                        /* html L14: <div class="panel share-wishlist"> */
                                        <div className="panel share-wishlist">
                                            {/* html L15: <div class="panel-body"> */}
                                            <div className="panel-body">
                                                {/* html L16: <h5>{{lang 'account.wishlists.share_intro'}}</h5> */}
                                                <h5>
                                                    {/* html L16: {{lang 'account.wishlists.share_intro'}} */}
                                                    <$Lang translationKey={$string('account.wishlists.share_intro')}/>
                                                </h5>
                                                {/* html L17: <input class="form-input" value="{{settings.base_url}}{{wishlist.share_url}}" readonly> */}
                                                <input
                                                    className="form-input"
                                                    $$={$parseHandlebarsDangerously('value="{{settings.base_url}}{{wishlist.share_url}}"')}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    )}
                                />
                            )}
                        />

                        {/* html L23: {{#if wishlist.items}} */}
                        <$If
                            query={[ctx.wishlist.items]}
                            $then={() => (
                                /* html L24: {{> components/account/wishlist-item-list show_remove=wishlist.is_editable}} */
                                <$Partial
                                    name="components/account/wishlist-item-list"
                                    hash={{
                                        wishlist: ctx.wishlist,
                                        theme_settings: ctx.theme_settings,
                                        show_remove: ctx.wishlist.is_editable,
                                    }}
                                />
                            )}
                            $else={() => (
                                /* html L25: {{else}}
                                                                      html L26: {{> components/common/alert/alert-info (lang 'account.wishlists.empty_wishlist')}}
                                */
                                <$Partial
                                    name="components/common/alert/alert-info"
                                    context={$lang($string('account.wishlists.empty_wishlist'))}
                                />
                            )}
                        />
                    </div>
                )}
            />
            {/* html L31: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
