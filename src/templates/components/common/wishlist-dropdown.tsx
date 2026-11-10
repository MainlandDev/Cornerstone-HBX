/**
 * Source: templates/components/common/wishlist-dropdown.html (36 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
    /* html L1: <form action="{{product.add_to_wishlist_url}}" class="form form-wishlist form-action" data-wishlist-add method="post"> */
    <form action={product.add_to_wishlist_url} className="form form-wishlist form-action" data-wishlist-add="" method="post">
        {/* html L2-7:
           <a aria-controls="wishlist-dropdown"
              aria-expanded="false"
              class="button dropdown-menu-button"
              data-dropdown="wishlist-dropdown"
              href="#"
           >
        */}
        <a aria-controls="wishlist-dropdown" aria-expanded="false" className="button dropdown-menu-button" data-dropdown="wishlist-dropdown" href="#">
            {/* html L8: <span>{{lang 'account.wishlists.add_item'}}</span> */}
            <span>
                {/* html L8: {{lang 'account.wishlists.add_item'}} */}
                <$Lang translationKey={$string('account.wishlists.add_item')}/>
            </span>
            {/* html L9: <i aria-hidden="true" class="icon"> */}
            <i aria-hidden="true" className="icon">
                {/* html L10: <svg> */}
                <svg>
                    {/* html L11: <use href="#icon-chevron-down" /> */}
                    <use href="#icon-chevron-down"/>
                </svg>
            </i>
        </a>
        {/* html L15: <ul aria-hidden="true" class="dropdown-menu" data-dropdown-content id="wishlist-dropdown"> */}
        <ul aria-hidden="true" className="dropdown-menu" data-dropdown-content="" id="wishlist-dropdown">
            {/* html L16: {{#if customer.wishlists}} */}
            <$If
                query={[customer.wishlists]}
                $then={() => (
                    /* html L17: {{#each customer.wishlists}} */
                    <$Each
                        list={customer.wishlists}
                        $then={(wishlist) => (
                            /* html L18: <li> */
                            <li>
                                {/* html L19-23:
                                   <input class="button {{#if this.num_items '!==' '0'}}button--has-items{{/if}}"
                                          formaction="{{this.add_url}}&product_id={{../product.id}}"
                                          type="submit"
                                          value="{{this.name}}"
                                   >
                                */}
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
                    /* html L26: {{else}}
                                              html L27: <li>
                    */
                    <li>
                        {/* html L28: <input class="button" type="submit" value="{{lang 'account.wishlists.add_to_default'}}"> */}
                        <input className="button" type="submit" value={$lang($string('account.wishlists.add_to_default'))}/>
                    </li>
                )}
            />
            {/* html L31: <li> */}
            <li>
                {/* html L32: <a data-wishlist class="button" href="/wishlist.php?action=addwishlist&product_id={{product.id}}">{{lang 'account.wishlists.create_new'}}</a> */}
                <a data-wishlist="" className="button" href={`/wishlist.php?action=addwishlist&product_id=${product.id}`}>
                    {/* html L32: {{lang 'account.wishlists.create_new'}} */}
                    <$Lang translationKey={$string('account.wishlists.create_new')}/>
                </a>
            </li>
        </ul>
    </form>
));
