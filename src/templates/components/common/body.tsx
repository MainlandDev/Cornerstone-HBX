"use server";
import ModalModal from "./modal/modal.tsx";
import AlertAlertModal from "./alert/alert-modal.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$pointer, $string, $StencilBlock} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div className="body" id="main-content" data-currency-code={$pointer("currency_selector.active_currency_code")}>
        <$StencilBlock name={$string("hero")} $then={() => " "} />
        <div className="container">
            <$StencilBlock name={$string("page")} $then={() => " "} />
        </div>
        <ModalModal />
        <AlertAlertModal />
    </div>
);
