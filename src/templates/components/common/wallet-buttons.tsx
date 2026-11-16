"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $pointer, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <$If test={$pointer("wallet_buttons")} $then={() => $unescaped($pointer("wallet_buttons"))} />
);
