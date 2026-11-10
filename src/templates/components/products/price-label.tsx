/**
 * Source: templates/components/products/price-label.html (6 lines).
 *
 * One raw fragment, copied verbatim. The partial is used inside `aria-label` text (product-aria-label), where the original's
 * surrounding whitespace is part of the output and JSX cannot reproduce it (DEVIATIONS.md section 8.2).
 */
import {$parseHandlebarsDangerously} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {ThemeSettingsHint} from '@/context-products';

export default $asPartial<{
    label_value: ThemeSettingsHint['pdp-retail-price-label'];
    fallback: HandlebarsInlineValueToken<string>;
}>(() => (
    <>
        {$parseHandlebarsDangerously(`{{#if label_value '===' ''}}
    {{fallback}}
{{else}}
    {{label_value}}
{{/if}}`)}
    </>
));
