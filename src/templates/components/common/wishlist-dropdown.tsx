import {$Each, $If, $Lang, $lang, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

interface Wishlist {
    name: string;
    add_url: string;
    num_items: string;
}

export default () => (
    <form action={$pointer("product.add_to_wishlist_url")} className="form form-wishlist form-action" data-wishlist-add={""} method="post">
        <a aria-controls="wishlist-dropdown" aria-expanded="false" className="button dropdown-menu-button" data-dropdown="wishlist-dropdown" href="#">
            <span>
                <$Lang keyName={$string("account.wishlists.add_item")} />
            </span>
            <i aria-hidden="true" className="icon">
                <svg>
                    <use href="#icon-chevron-down" />
                </svg>
            </i>
        </a>
        <ul aria-hidden="true" className="dropdown-menu" data-dropdown-content={""} id="wishlist-dropdown">
            <$If
                test={$pointer("customer.wishlists")}
                $then={() => (
                    <$Each
                        list={$pointer<Wishlist[]>("customer.wishlists")}
                        $then={(wishlist) => (
                            <li>
                                <input
                                    className={`button ${$raw("{{#if this.num_items '!==' '0'}}button--has-items{{/if}}")}`}
                                    dangerouslyInlineAttributes={{
                                        attributes: `formaction="${wishlist.add_url}&product_id=${$raw("{{../product.id}}")}"`,
                                    }}
                                    type="submit"
                                    value={wishlist.name}
                                />
                            </li>
                        )}
                    />
                )}
                $else={() => (
                    <li>
                        <input className="button" type="submit" value={$lang($string("account.wishlists.add_to_default"))} />
                    </li>
                )}
            />
            <li>
                <a
                    data-wishlist={""}
                    className="button"
                    dangerouslyInlineAttributes={{attributes: `href="/wishlist.php?action=addwishlist&product_id=${$pointer("product.id")}"`}}
                >
                    <$Lang keyName={$string("account.wishlists.create_new")} />
                </a>
            </li>
        </ul>
    </form>
);
