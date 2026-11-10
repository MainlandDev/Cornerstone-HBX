/**
 * Source: templates/components/cart/status-messages.html (4 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $Partial} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageCart} from '@mainlanddev/bigcommerce-react/theme';

export default $asPartial<{ cart: ThemeContextHint<ThemePageCart>['cart'] }>(({cart}) => (
    /* html L1: {{#each cart.status_messages}} */
    <$Each
        list={cart.status_messages}
        $then={(status) => /* html L2: {{> components/common/alert/alert-info message}} */ <$Partial name="components/common/alert/alert-info" context={status.message}/>}
    />
));
