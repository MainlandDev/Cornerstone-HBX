"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <$If
        test={$pointer("label_value")}
        operator={$string("===")}
        rvalue={$string("")}
        $then={() => $pointer("fallback")}
        $else={() => $pointer("label_value")}
    />
);
