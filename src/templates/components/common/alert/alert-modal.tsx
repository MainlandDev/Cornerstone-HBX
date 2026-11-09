import {$string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $asPartial(() => (
    <div id="alert-modal" className="modal modal--alert modal--small" data-reveal="" data-prevent-quick-search-close="">
        <div className="alert-icon error-icon">
            <span className="icon-content">
                <span className="line line-left"></span>
                <span className="line line-right"></span>
            </span>
        </div>

        <div className="alert-icon warning-icon">
            <div className="icon-content">!</div>
        </div>

        <div className="modal-content"></div>

        <div className="button-container">
            <button type="button" className="confirm button" data-reveal-close="">
                <$Lang translationKey={$string('common.ok')}/>
            </button>
            <button type="button" className="cancel button" data-reveal-close="">
                <$Lang translationKey={$string('common.cancel')}/>
            </button>
        </div>
    </div>
));
