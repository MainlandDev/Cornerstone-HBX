import {$Each, $If, $this, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageCart} from '@mainlanddev/bigcommerce-react/theme';

export default $asPartial<{ cart: ThemeContextHint<ThemePageCart>['cart'] }>(({cart}) => (
    <$If
        query={[cart.additional_checkout_buttons]}
        $then={() => <$Each list={cart.additional_checkout_buttons} $then={() => $unescaped($this())}/>}
    />
));
