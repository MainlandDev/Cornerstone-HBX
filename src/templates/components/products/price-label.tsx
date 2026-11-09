import {$If, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {ThemeSettingsHint} from '@/context-products';

export default $asPartial<{
    label_value: ThemeSettingsHint['pdp-retail-price-label'];
    fallback: HandlebarsInlineValueToken<string>;
}>(({label_value, fallback}) => (
    <$If
        query={[label_value, '===', $string('')]}
        $then={() => <>{fallback}</>}
        $else={() => <>{label_value}</>}
    />
));
