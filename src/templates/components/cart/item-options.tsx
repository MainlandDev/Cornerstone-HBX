/**
 * Source: templates/components/cart/item-options.html (10 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint} from '@mainlanddev/bigcommerce-react/theme';
import type {ExtendedThemePageCart} from '@/context';
import {$_dynamicComponent} from '@mainlanddev/bigcommerce-react/bigcommerce';

type Hint = ThemeContextHint<ExtendedThemePageCart>;

// No caller in the theme: `item` / `product` types are inferred from the cart line item (see DEVIATIONS.md).
export default $asPartial<{ urls: Hint['urls']; item: Hint['cart']['items'][number]; product: { options: Hint['cart']['items'][number]['options'] } }>(
    ({urls, item, product}) => (
        /* html L1: <form method="post" action="{{urls.cart}}" enctype="multipart/form-data"> */
        <form method="post" action={urls.cart} encType="multipart/form-data">
            {/* html L2: <input type="hidden" name="item_id" value="{{item.id}}"> */}
            <input type="hidden" name="item_id" value={item.id}/>
            {/* html L3: <p> Options */}
            <p>
                {' '}
                Options
                {/* html L4: {{#each product.options}} */}
                <$Each
                    list={product.options}
                    $then={() => /* html L5: <div>{{{dynamicComponent 'components/products/options'}}}</div> */ <div>{/* html L5: {{{dynamicComponent 'components/products/options'}}} */}{$_dynamicComponent($string('components/products/options'))}</div>}
                />
            </p>
            {/* html L8: <input type="submit" class="btn btn-success" value="Save"> */}
            <input type="submit" className="btn btn-success" value="Save"/>
        </form>
    ),
);
