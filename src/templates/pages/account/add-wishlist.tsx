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
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <div className="account">
                        <$If
                            query={[ctx.settings.show_wishlist]}
                            $then={() => (
                                <>
                                    <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                                    <h2 className="page-heading">
                                        <$If
                                            query={[ctx.forms.wishlist.id]}
                                            $then={() => <$Lang translationKey={$string('account.wishlists.edit')}/>}
                                            $else={() => (
                                                <$If
                                                    query={[ctx.forms.wishlist.action]}
                                                    $then={() => <$Lang translationKey={$string('account.wishlists.new')}/>}
                                                    $else={() => <$Lang translationKey={$string('account.wishlists.heading')}/>}
                                                />
                                            )}
                                        />
                                    </h2>
                                    <$Partial
                                        name="components/account/navigation"
                                        hash={{account_page: $string('wishlists'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                                    />
                                    <AddWishlist forms={ctx.forms} urls={ctx.urls}/>
                                </>
                            )}
                        />
                    </div>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
