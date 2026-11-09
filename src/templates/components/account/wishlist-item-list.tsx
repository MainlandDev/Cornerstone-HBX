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
        <ul className="productGrid">
            <$Each
                list={wishlist.items}
                $then={(item) => (
                    <li className="product">
                        <$Partial name="components/products/card" hash={{id: item.product_id, theme_settings: theme_settings}}/>

                        <$If
                            query={[show_remove]}
                            $then={() => (
                                <form action={item.remove_url} className="form" method="post">
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
        <$Partial name="components/common/paginator" context={wishlist.pagination}/>
    </>
));
