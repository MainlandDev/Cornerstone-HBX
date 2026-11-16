"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import RequirenessMsg from "../../common/requireness-msg.tsx";
import {$If, $pointer, $raw, $Unless} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div className="form-field" data-product-attribute="input-number">
        <label className="form-label form-label--alternate form-label--inlineSmall" htmlFor={`attribute_number_${$pointer("id")}`}>
            {$pointer("display_name")}:{" "}
            <RequirenessMsg />
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
