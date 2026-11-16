"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Lang, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <p dangerouslyInlineAttributes={{attributes: "translate"}}>
        <$Lang keyName={$string("common.login_for_pricing")} />
    </p>
);
