import {$If, $unescaped, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';

export default $asPartial<{wallet_buttons: HandlebarsInlineValueToken<string>}>(({wallet_buttons}) => (
    <$If query={[wallet_buttons]} $then={() => $unescaped(wallet_buttons)}/>
));
