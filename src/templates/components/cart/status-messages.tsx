import {$Each, $partial, $pointer, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Each
        list={$pointer<Array<{message: unknown}>>("cart.status_messages")}
        $then={(item) => place($partial("components/common/alert/alert-info", item.message))}
    />
);
