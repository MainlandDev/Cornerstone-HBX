/**
 * Source: templates/components/cart/additional-checkout-buttons.html (6 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $this, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageCart} from '@mainlanddev/bigcommerce-react/theme';

export default $asPartial<{ cart: ThemeContextHint<ThemePageCart>['cart'] }>(({cart}) => (
    /* html L1: {{#if cart.additional_checkout_buttons}} */
    <$If
        query={[cart.additional_checkout_buttons]}
        $then={() => /* html L2: {{#each cart.additional_checkout_buttons}} */ <$Each list={cart.additional_checkout_buttons} $then={() => $unescaped($this())}/>}
    />
));
