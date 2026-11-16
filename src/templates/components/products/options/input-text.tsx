"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import RequirenessMsg from "../../common/requireness-msg.tsx";
import {$If, $pointer, $raw} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div className="form-field" data-product-attribute="input-text">
        <label className="form-label form-label--alternate form-label--inlineSmall" htmlFor={`attribute_text_${$pointer("id")}`}>
            {$pointer("display_name")}:{" "}
            <RequirenessMsg />
        </label>
        <input
            className="form-input form-input--small"
            type="text"
            id={`attribute_text_${$pointer("id")}`}
            dangerouslyInlineAttributes={{
                attributes: `name="attribute[${$pointer("id")}]" value="${$pointer("prefill")}" ${$If({test: $pointer("required"), $then: () => "required"})} ${$If({test: $pointer("max_length"), $then: () => `${$raw('maxlength="')}${$pointer("max_length")}${$raw('"')}`})}`,
            }}
        />
    </div>
);
