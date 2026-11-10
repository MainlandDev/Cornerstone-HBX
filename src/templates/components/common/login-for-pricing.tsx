/**
 * Source: templates/components/common/login-for-pricing.html (2 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$string} from '@mainlanddev/bigcommerce-react';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $asPartial(() => (
    /* html L1: <p translate>{{lang 'common.login_for_pricing'}}</p> */
    <p $$={$$raw('translate')}>
        {/* html L1: {{lang 'common.login_for_pricing'}} */}
        <$Lang translationKey={$string('common.login_for_pricing')}/>
    </p>
));
