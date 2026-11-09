import {$If, $string, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$_sanitize} from '@mainlanddev/bigcommerce-react/bigcommerce';

export default $asPartial<{value: HandlebarsInlineValueToken<string>}>(({value}) => (
    <$If
        query={[value, '==', $string('Yes')]}
        $then={() => <$Lang translationKey={$string('common.yes')}/>}
        $elseThen={[
            {
                query: [value, '==', $string('No')],
                $then: () => <$Lang translationKey={$string('common.no')}/>,
            },
        ]}
        $else={() => $_sanitize(value)}
    />
));
