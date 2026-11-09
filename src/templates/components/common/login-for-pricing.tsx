import {$string} from '@mainlanddev/bigcommerce-react';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $asPartial(() => (
    <p $$={$$raw('translate')}>
        <$Lang translationKey={$string('common.login_for_pricing')}/>
    </p>
));
