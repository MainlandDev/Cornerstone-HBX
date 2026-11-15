import {$Each, $If, $lang, $partial, $pointer, $string, place} from "@mainlanddev/hbx-bigcommerce";

interface WishlistItem {
    product_id: string;
    remove_url: string;
}

export default () => (
    <>
        <ul className="productGrid">
            <$Each
                list={$pointer<WishlistItem[]>("wishlist.items")}
                $then={(item) => (
                    <li className="product">
                        {place($partial("components/products/card", {id: item.product_id, theme_settings: $pointer("../theme_settings")}))}

                        <$If
                            test={$pointer("../show_remove")}
                            $then={() => (
                                <form action={item.remove_url} className="form" method="post">
                                    <input type="submit" className="button button--primary button--small" value={$lang($string("account.wishlists.remove_item"))} />
                                </form>
                            )}
                        />
                    </li>
                )}
            />
        </ul>
        {place($partial("components/common/paginator", $pointer("wishlist.pagination")))}
    </>
);
