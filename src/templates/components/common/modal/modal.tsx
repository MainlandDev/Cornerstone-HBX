"use server";
import ModalModalCloseBtn from "./modal-close-btn.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div id="modal" className="modal" data-reveal={""} data-prevent-quick-search-close={""}>
        <ModalModalCloseBtn />
        <div id="modal-content" className="modal-content"></div>
        <div className="loadingOverlay"></div>
    </div>
);
