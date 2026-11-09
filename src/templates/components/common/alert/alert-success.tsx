import {$this, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {Icon} from '@/components/icon';

export default $asPartial(() => (
    <div className="alertBox alertBox--success">
        <div className="alertBox-column alertBox-icon">
            <Icon glyph="ic-success" className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                </svg>
            </Icon>
        </div>
        <p className="alertBox-column alertBox-message">
            <span id="alertBox-message-text">{$unescaped($this())}</span>
        </p>
    </div>
));
