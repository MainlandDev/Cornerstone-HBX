/**
 * Source: templates/components/common/alert/alert-generic.html (9 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$this, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {Icon} from '@/components/icon';

export default $asPartial(() => (
    /* html L1: <div class="alertBox"> */
    <div className="alertBox">
        {/* html L2: <div class="alertBox-column alertBox-icon"> */}
        <div className="alertBox-column alertBox-icon">
            {/* html L3: <icon glyph="ic-success" class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg></icon> */}
            <Icon glyph="ic-success" className="icon">
                {/* html L3: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    {/* html L3: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"> */}
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                </svg>
            </Icon>
        </div>
        {/* html L5: <p class="alertBox-column alertBox-message"> */}
        <p className="alertBox-column alertBox-message">
            {/* html L6: <span>{{{this}}}</span> */}
            <span>{/* html L6: {{{this}}} */}{$unescaped($this())}</span>
        </p>
    </div>
));
