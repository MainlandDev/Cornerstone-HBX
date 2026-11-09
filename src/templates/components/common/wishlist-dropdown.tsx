import {$Each, $If, $if, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint, ProductHint} from '@/context-common';

export default $asPartial<{
    customer: Hint['customer'];
    product: ProductHint;
}>(({customer, product}) => (
    <form action={product.add_to_wishlist_url} className="form form-wishlist form-action" data-wishlist-add="" method="post">
        <a aria-controls="wishlist-dropdown" aria-expanded="false" className="button dropdown-menu-button" data-dropdown="wishlist-dropdown" href="#">
            <span>
                <$Lang translationKey={$string('account.wishlists.add_item')}/>
            </span>
            <i aria-hidden="true" className="icon">
                <svg>
                    <use href="#icon-chevron-down"/>
                </svg>
            </i>
        </a>
        <ul aria-hidden="true" className="dropdown-menu" data-dropdown-content="" id="wishlist-dropdown">
            <$If
                query={[customer.wishlists]}
                $then={() => (
                    <$Each
                        list={customer.wishlists}
                        $then={(wishlist) => (
                            <li>
                                <input
                                    className={`button ${$if(wishlist.num_items, '!==', $string('0')).then(() => $$raw('button--has-items'))}`}
                                    formAction={`${wishlist.add_url}&product_id=${product.id}`}
                                    type="submit"
                                    value={wishlist.name}
                                />
                            </li>
                        )}
                    />
                )}
                $else={() => (
                    <li>
                        <input className="button" type="submit" value={$lang($string('account.wishlists.add_to_default'))}/>
                    </li>
                )}
            />
            <li>
                <a data-wishlist="" className="button" href={`/wishlist.php?action=addwishlist&product_id=${product.id}`}>
                    <$Lang translationKey={$string('account.wishlists.create_new')}/>
                </a>
            </li>
        </ul>
    </form>
));
