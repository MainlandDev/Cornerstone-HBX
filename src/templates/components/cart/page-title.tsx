/**
 * Source: templates/components/cart/page-title.html (4 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageCart} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $asPartial<{ cart: ThemeContextHint<ThemePageCart>['cart'] }>(({cart}) => (
    /* html L1: <h1 class="page-heading" data-cart-page-title> */
    <h1 className="page-heading" data-cart-page-title="">
        {/* html L2: {{lang 'cart.label' quantity=cart.quantity}} */}
        <$Lang translationKey={$string('cart.label')} params={{quantity: cart.quantity}}/>
    </h1>
));
