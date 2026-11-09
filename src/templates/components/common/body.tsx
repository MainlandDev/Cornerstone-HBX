import {$string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$StencilBlock} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {Hint} from '@/context-common';
import Modal from '@/templates/components/common/modal/modal';
import AlertModal from '@/templates/components/common/alert/alert-modal';

export default $asPartial<{currency_selector: Hint['currency_selector']}>(({currency_selector}) => (
    <div className="body" id="main-content" data-currency-code={currency_selector.active_currency_code}>
        <$StencilBlock name={$string('hero')} $then={() => ' '}/>
        <div className="container">
            <$StencilBlock name={$string('page')} $then={() => ' '}/>
        </div>
        <Modal/>
        <AlertModal/>
    </div>
));
