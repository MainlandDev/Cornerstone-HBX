/**
 * Source: templates/components/common/requireness-msg.html (8 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $string, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $asPartial<{required: HandlebarsInlineValueToken<boolean>}>(({required}) => (
    /* html L1: <small> */
    <small>
        {/* html L2: {{#if required}} */}
        <$If
            query={[required]}
            $then={() => (
                <>
                    ({/* html L3: ({{lang 'common.required'}}) */}<$Lang translationKey={$string('common.required')}/>)
                </>
            )}
            $else={() => /* html L4: {{else}}
                                                        html L5: {{lang 'common.optional'}}
                         */ <$Lang translationKey={$string('common.optional')}/>}
        />
    </small>
));
