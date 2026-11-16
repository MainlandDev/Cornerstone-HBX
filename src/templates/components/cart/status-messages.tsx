"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import AlertAlertInfo from "../common/alert/alert-info.tsx";
import {$Each, $pointer} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <$Each
        list={$pointer<Array<{message: unknown}>>("cart.status_messages")}
        $then={(item) => <AlertAlertInfo $positionalHash={item.message} />}
    />
);
