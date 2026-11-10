/**
 * Source: templates/components/common/body.html (9 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$StencilBlock} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {Hint} from '@/context-common';
import Modal from '@/templates/components/common/modal/modal';
import AlertModal from '@/templates/components/common/alert/alert-modal';

export default $asPartial<{currency_selector: Hint['currency_selector']}>(({currency_selector}) => (
    /* html L1: <div class="body" id="main-content" data-currency-code="{{currency_selector.active_currency_code}}"> */
    <div className="body" id="main-content" data-currency-code={currency_selector.active_currency_code}>
        {/* html L2: {{#block "hero"}} {{/block}} */}
        <$StencilBlock name={$string('hero')} $then={() => ' '}/>
        {/* html L3: <div class="container"> */}
        <div className="container">
            {/* html L4: {{#block "page"}} {{/block}} */}
            <$StencilBlock name={$string('page')} $then={() => ' '}/>
        </div>
        {/* html L6: {{> components/common/modal/modal}} */}
        <Modal/>
        {/* html L7: {{> components/common/alert/alert-modal}} */}
        <AlertModal/>
    </div>
));
