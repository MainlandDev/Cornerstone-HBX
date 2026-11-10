/**
 * Source: templates/components/common/alert/alert-modal.html (20 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $asPartial(() => (
    /* html L1: <div id="alert-modal" class="modal modal--alert modal--small" data-reveal data-prevent-quick-search-close> */
    <div id="alert-modal" className="modal modal--alert modal--small" data-reveal="" data-prevent-quick-search-close="">
        {/* html L2: <div class="alert-icon error-icon"> */}
        <div className="alert-icon error-icon">
            {/* html L3: <span class="icon-content"> */}
            <span className="icon-content">
                {/* html L4: <span class="line line-left"></span> */}
                <span className="line line-left"></span>
                {/* html L5: <span class="line line-right"></span> */}
                <span className="line line-right"></span>
            </span>
        </div>

        {/* html L9: <div class="alert-icon warning-icon"> */}
        <div className="alert-icon warning-icon">
            {/* html L10: <div class="icon-content">!</div> */}
            <div className="icon-content">!</div>
        </div>

        {/* html L13: <div class="modal-content"></div> */}
        <div className="modal-content"></div>

        {/* html L15: <div class="button-container"> */}
        <div className="button-container">
            {/* html L16: <button type="button" class="confirm button" data-reveal-close>{{lang 'common.ok'}}</button> */}
            <button type="button" className="confirm button" data-reveal-close="">
                {/* html L16: {{lang 'common.ok'}} */}
                <$Lang translationKey={$string('common.ok')}/>
            </button>
            {/* html L17: <button type="button" class="cancel button" data-reveal-close>{{lang 'common.cancel'}}</button> */}
            <button type="button" className="cancel button" data-reveal-close="">
                {/* html L17: {{lang 'common.cancel'}} */}
                <$Lang translationKey={$string('common.cancel')}/>
            </button>
        </div>
    </div>
));
