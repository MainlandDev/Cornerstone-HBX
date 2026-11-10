/**
 * Source: templates/components/products/price-label.html (6 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {ThemeSettingsHint} from '@/context-products';

export default $asPartial<{
    label_value: ThemeSettingsHint['pdp-retail-price-label'];
    fallback: HandlebarsInlineValueToken<string>;
}>(({label_value, fallback}) => (
    /* html L1: {{#if label_value '===' ''}} */
    <$If
        query={[label_value, '===', $string('')]}
        $then={() => <>{/* html L2: {{fallback}} */}{fallback}</>}
        $else={() => <>{/* html L3: {{else}}
                                                    html L4: {{label_value}}
                       */}{label_value}</>}
    />
));
