import {$If, $pointer, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$If test={$pointer("wallet_buttons")} $then={() => $unescaped($pointer("wallet_buttons"))} />
);
