"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div className="form-field" id={$pointer("id")} data-validation={$pointer("validation")}>
        <label className="form-label" htmlFor={`${$pointer("id")}_input`}>
            {$pointer("label")}
            <$If test={$pointer("required")} $then={() => <small><$Lang keyName={$string("common.required")} /></small>} />
        </label>
        <textarea
            id={`${$pointer("id")}_input`}
            data-label={$pointer("label")}
            aria-required={$pointer("required")}
            aria-labelledby={$pointer("id")}
            aria-live="polite"
            data-input={""}
            className="form-input"
            value={$pointer("value")}
            dangerouslyInlineAttributes={{attributes: `name="${$pointer("name")}" rows="${$pointer("rows")}" ${$raw('{{#if private_id}}data-field-type="{{private_id}}"{{/if}}')}`}}
        />
    </div>
);
