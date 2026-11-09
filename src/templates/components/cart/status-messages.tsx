import {$Each, $Partial} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageCart} from '@mainlanddev/bigcommerce-react/theme';

export default $asPartial<{ cart: ThemeContextHint<ThemePageCart>['cart'] }>(({cart}) => (
    <$Each
        list={cart.status_messages}
        $then={(status) => <$Partial name="components/common/alert/alert-info" context={status.message}/>}
    />
));
