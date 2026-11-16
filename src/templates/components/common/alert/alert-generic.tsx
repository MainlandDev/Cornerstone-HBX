"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$this, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div className="alertBox">
        <div className="alertBox-column alertBox-icon">
            <icon glyph="ic-success" className="icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                </svg>
            </icon>
        </div>
        <p className="alertBox-column alertBox-message">
            <span>{$unescaped($this<string>())}</span>
        </p>
    </div>
);
