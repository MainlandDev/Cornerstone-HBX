import {$string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageCart} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $asPartial<{ cart: ThemeContextHint<ThemePageCart>['cart'] }>(({cart}) => (
    <h1 className="page-heading" data-cart-page-title="">
        <$Lang translationKey={$string('cart.label')} params={{quantity: cart.quantity}}/>
    </h1>
));
