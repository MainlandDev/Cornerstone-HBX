/**
 * Source: templates/components/common/modal/modal.html (6 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import ModalCloseBtn from '@/templates/components/common/modal/modal-close-btn';

export default $asPartial(() => (
    /* html L1: <div id="modal" class="modal" data-reveal data-prevent-quick-search-close> */
    <div id="modal" className="modal" data-reveal="" data-prevent-quick-search-close="">
        {/* html L2: {{> components/common/modal/modal-close-btn}} */}
        <ModalCloseBtn/>
        {/* html L3: <div id="modal-content" class="modal-content"></div> */}
        <div id="modal-content" className="modal-content"></div>
        {/* html L4: <div class="loadingOverlay"></div> */}
        <div className="loadingOverlay"></div>
    </div>
));
