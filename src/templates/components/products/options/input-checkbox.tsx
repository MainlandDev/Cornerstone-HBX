import {$If, $partial, $pointer, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <div className="form-field" data-product-attribute="input-checkbox">
        <label className="form-label form-label--alternate form-label--inlineSmall">
            {$pointer("display_name")}:{" "}
            {place($partial("components/common/requireness-msg"))}
        </label>
        <input type="hidden" name={`attribute[${$pointer("id")}]`} value={$pointer("noValue")} />
        <div className="form-option-wrapper">
            <input
                className="form-checkbox"
                type="checkbox"
                id={`attribute-check-${$pointer("id")}`}
                dangerouslyInlineAttributes={{
                    attributes: `name="attribute[${$pointer("id")}]" value="${$pointer("value")}"${$If({test: $pointer("checked"), $then: () => " checked data-default"})}${$If({test: $pointer("required"), $then: () => " required"})}`,
                }}
            />
            <label className={`form-label ${$pointer("class")}`} htmlFor={`attribute-check-${$pointer("id")}`}>
                {$pointer("label")}
            </label>
        </div>
    </div>
);
