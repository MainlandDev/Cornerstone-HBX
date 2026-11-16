import {$partial} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <div id="modal" className="modal" data-reveal={""} data-prevent-quick-search-close={""}>
        {$partial("components/common/modal/modal-close-btn")}
        <div id="modal-content" className="modal-content"></div>
        <div className="loadingOverlay"></div>
    </div>
);
