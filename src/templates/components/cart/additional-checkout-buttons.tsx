"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $pointer, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <$If
        test={$pointer("cart.additional_checkout_buttons")}
        $then={() => <$Each list={$pointer<string[]>("cart.additional_checkout_buttons")} $then={(button) => $unescaped(button)} />}
    />
);
