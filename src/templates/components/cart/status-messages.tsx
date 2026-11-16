import {$Each, $partial, $pointer} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Each
        list={$pointer<Array<{message: unknown}>>("cart.status_messages")}
        $then={(item) => $partial("components/common/alert/alert-info", item.message)}
    />
);
