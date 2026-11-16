import {$pointer, $string, $StencilBlock, $partial} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <div className="body" id="main-content" data-currency-code={$pointer("currency_selector.active_currency_code")}>
        <$StencilBlock name={$string("hero")} $then={() => " "} />
        <div className="container">
            <$StencilBlock name={$string("page")} $then={() => " "} />
        </div>
        {$partial("components/common/modal/modal")}
        {$partial("components/common/alert/alert-modal")}
    </div>
);
