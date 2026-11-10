/**
 * Source: templates/components/common/wallet-buttons.html (4 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $unescaped, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';

export default $asPartial<{wallet_buttons: HandlebarsInlineValueToken<string>}>(({wallet_buttons}) => (
    /* html L1: {{#if wallet_buttons}} */
    <$If query={[wallet_buttons]} $then={() => $unescaped(wallet_buttons)}/>
));
