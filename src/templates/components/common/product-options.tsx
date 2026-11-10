/**
 * Source: templates/components/common/product-options.html (8 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $string, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$_sanitize} from '@mainlanddev/bigcommerce-react/bigcommerce';

export default $asPartial<{value: HandlebarsInlineValueToken<string>}>(({value}) => (
    /* html L1: {{#if value '==' 'Yes'}} */
    <$If
        query={[value, '==', $string('Yes')]}
        $then={() => /* html L2: {{lang 'common.yes'}} */ <$Lang translationKey={$string('common.yes')}/>}
        $elseThen={[
            {
                query: [value, '==', $string('No')],
                $then: () => /* html L3: {{else if value '==' 'No'}}
                                                                html L4: {{lang 'common.no'}}
                             */ <$Lang translationKey={$string('common.no')}/>,
            },
        ]}
        $else={() => $_sanitize(value)}
    />
));
