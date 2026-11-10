/**
 * Source: templates/components/account/wishlist-item-list.html (15 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $string, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageAccountWishlistDetails} from '@mainlanddev/bigcommerce-react/theme';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';

type Hint = ThemeContextHint<ThemePageAccountWishlistDetails>;

export default $asPartial<{
    wishlist: Hint['wishlist'];
    theme_settings: Hint['theme_settings'];
    show_remove: HandlebarsInlineValueToken<boolean>;
}>(({wishlist, theme_settings, show_remove}) => (
    <>
        {/* html L1: <ul class="productGrid"> */}
        <ul className="productGrid">
            {/* html L2: {{#each wishlist.items}} */}
            <$Each
                list={wishlist.items}
                $then={(item) => (
                    /* html L3: <li class="product"> */
                    <li className="product">
                        {/* html L4: {{> components/products/card id=product_id theme_settings=../theme_settings}} */}
                        <$Partial name="components/products/card" hash={{id: item.product_id, theme_settings: theme_settings}}/>

                        {/* html L6: {{#if ../show_remove}} */}
                        <$If
                            query={[show_remove]}
                            $then={() => (
                                /* html L7: <form action="{{remove_url}}" class="form" method="post"> */
                                <form action={item.remove_url} className="form" method="post">
                                    {/* html L8: <input type="submit" class="button button--primary button--small" value="{{lang 'account.wishlists.remove_item'}}" /> */}
                                    <input
                                        type="submit"
                                        className="button button--primary button--small"
                                        value={$lang($string('account.wishlists.remove_item'))}
                                    />
                                </form>
                            )}
                        />
                    </li>
                )}
            />
        </ul>
        {/* html L14: {{> components/common/paginator wishlist.pagination}} */}
        <$Partial name="components/common/paginator" context={wishlist.pagination}/>
    </>
));
