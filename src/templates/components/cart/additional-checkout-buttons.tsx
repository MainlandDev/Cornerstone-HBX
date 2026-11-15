import {$Each, $If, $pointer, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$If
        test={$pointer("cart.additional_checkout_buttons")}
        $then={() => <$Each list={$pointer<string[]>("cart.additional_checkout_buttons")} $then={(button) => $unescaped(button)} />}
    />
);
