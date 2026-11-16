import AlertAlertInfo from "../common/alert/alert-info.tsx";
import {$Each, $pointer} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Each
        list={$pointer<Array<{message: unknown}>>("cart.status_messages")}
        $then={(item) => <AlertAlertInfo $positionalHash={item.message} />}
    />
);
