import {$If, $Partial, $number, $string} from '@mainlanddev/bigcommerce-react';
import {$page, type ThemePageAccountWishlistDetails} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$concat, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ThemePageAccountWishlistDetails>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <div className="account" data-pagination-wishlist="">
                        <$If
                            query={[ctx.wishlist.is_editable]}
                            $then={() => (
                                <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                            )}
                        />
                        <h2 className="page-heading">
                            <$Lang translationKey={$string('account.wishlists.view_heading')} params={{name: ctx.wishlist.name}}/>
                        </h2>
                        <$If
                            query={[ctx.wishlist.is_editable]}
                            $then={() => (
                                <$Partial
                                    name="components/account/navigation"
                                    hash={{account_page: $string('wishlists'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                                />
                            )}
                        />

                        <$If
                            query={[ctx.wishlist.is_editable]}
                            $then={() => (
                                <$If
                                    query={[ctx.wishlist.is_public, '>', $number(0)]}
                                    $then={() => (
                                        <div className="panel share-wishlist">
                                            <div className="panel-body">
                                                <h5>
                                                    <$Lang translationKey={$string('account.wishlists.share_intro')}/>
                                                </h5>
                                                <input
                                                    className="form-input"
                                                    value={$concat(ctx.settings.base_url, ctx.wishlist.share_url)}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    )}
                                />
                            )}
                        />

                        <$If
                            query={[ctx.wishlist.items]}
                            $then={() => (
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
                                <$Partial
                                    name="components/common/alert/alert-info"
                                    context={$lang($string('account.wishlists.empty_wishlist'))}
                                />
                            )}
                        />
                    </div>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
