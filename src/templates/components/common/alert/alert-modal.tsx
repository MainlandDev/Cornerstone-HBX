"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Lang, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div id="alert-modal" className="modal modal--alert modal--small" data-reveal={""} data-prevent-quick-search-close={""}>
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
            <button type="button" className="confirm button" data-reveal-close={""}>
                <$Lang keyName={$string("common.ok")} />
            </button>
            <button type="button" className="cancel button" data-reveal-close={""}>
                <$Lang keyName={$string("common.cancel")} />
            </button>
        </div>
    </div>
);
