import {$If, $partial, $pointer, $raw} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <div className="form-field" data-product-attribute="textarea">
        <label className="form-label form-label--alternate form-label--inlineSmall" htmlFor={`attribute_textarea_${$pointer("id")}`}>
            {$pointer("display_name")}:{" "}
            {$partial("components/common/requireness-msg")}
        </label>
        <textarea
            className="form-input"
            id={`attribute_textarea_${$pointer("id")}`}
            value={$pointer("prefill")}
            dangerouslyInlineAttributes={{
                attributes: `name="attribute[${$pointer("id")}]" ${$If({test: $pointer("required"), $then: () => "required"})} ${$If({test: $pointer("max_length"), $then: () => `${$raw("maxlength=")}${$pointer("max_length")}`})}`,
            }}
        />
    </div>
);
