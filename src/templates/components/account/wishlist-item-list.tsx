"use server";
import ProductsCard from "../products/card.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import Paginator from "../common/paginator.tsx";
import {$Each, $If, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

interface WishlistItem {
    product_id: string;
    remove_url: string;
}

export default (_props: PartialProps) => (
    <>
        <ul className="productGrid">
            <$Each
                list={$pointer<WishlistItem[]>("wishlist.items")}
                $then={(item) => (
                    <li className="product">
                        <ProductsCard id={item.product_id} theme_settings={$pointer("../theme_settings")} />

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
        <Paginator $positionalHash={$pointer("wishlist.pagination")} />
    </>
);
