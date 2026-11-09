import {$If, $string, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $asPartial<{required: HandlebarsInlineValueToken<boolean>}>(({required}) => (
    <small>
        <$If
            query={[required]}
            $then={() => (
                <>
                    (<$Lang translationKey={$string('common.required')}/>)
                </>
            )}
            $else={() => <$Lang translationKey={$string('common.optional')}/>}
        />
    </small>
));
