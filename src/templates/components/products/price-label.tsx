import {$If, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$If
        test={$pointer("label_value")}
        operator={$string("===")}
        rvalue={$string("")}
        $then={() => $pointer("fallback")}
        $else={() => $pointer("label_value")}
    />
);
