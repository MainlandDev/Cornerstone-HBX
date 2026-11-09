import {$Each, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint} from '@mainlanddev/bigcommerce-react/theme';
import type {ExtendedThemePageCart} from '@/context';
import {$_dynamicComponent} from '@mainlanddev/bigcommerce-react/bigcommerce';

type Hint = ThemeContextHint<ExtendedThemePageCart>;

// No caller in the theme: `item` / `product` types are inferred from the cart line item (see DEVIATIONS.md).
export default $asPartial<{ urls: Hint['urls']; item: Hint['cart']['items'][number]; product: { options: Hint['cart']['items'][number]['options'] } }>(
    ({urls, item, product}) => (
        <form method="post" action={urls.cart} encType="multipart/form-data">
            <input type="hidden" name="item_id" value={item.id}/>
            <p>
                {' '}
                Options
                <$Each
                    list={product.options}
                    $then={() => <div>{$_dynamicComponent($string('components/products/options'))}</div>}
                />
            </p>
            <input type="submit" className="btn btn-success" value="Save"/>
        </form>
    ),
);
