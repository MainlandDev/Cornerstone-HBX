import {$If, $partial, $pointer, $raw, $Unless} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <div className="form-field" data-product-attribute="input-number">
        <label className="form-label form-label--alternate form-label--inlineSmall" htmlFor={`attribute_number_${$pointer("id")}`}>
            {$pointer("display_name")}:{" "}
            {$partial("components/common/requireness-msg")}
        </label>
        <input
            className="form-input"
            type="number"
            id={`attribute_number_${$pointer("id")}`}
            dangerouslyInlineAttributes={{
                attributes: `${$Unless({test: $pointer("integer_only"), $then: () => $raw('step="any"')})} name="attribute[${$pointer("id")}]" value="${$pointer("prefill")}" ${$If({test: $pointer("required"), $then: () => "required"})}`,
            }}
        />
    </div>
);
