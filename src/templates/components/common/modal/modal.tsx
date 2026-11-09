import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import ModalCloseBtn from '@/templates/components/common/modal/modal-close-btn';

export default $asPartial(() => (
    <div id="modal" className="modal" data-reveal="" data-prevent-quick-search-close="">
        <ModalCloseBtn/>
        <div id="modal-content" className="modal-content"></div>
        <div className="loadingOverlay"></div>
    </div>
));
