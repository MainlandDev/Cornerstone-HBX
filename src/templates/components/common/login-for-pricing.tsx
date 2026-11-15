import {$Lang, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <p dangerouslyInlineAttributes={{attributes: "translate"}}>
        <$Lang keyName={$string("common.login_for_pricing")} />
    </p>
);
