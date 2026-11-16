"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div
        className="form-field"
        id={$pointer("id")}
        data-validation={$pointer("validation")}
        dangerouslyInlineAttributes={{attributes: `${$raw('{{#if private_id}}data-type="{{private_id}}"{{/if}}')}`}}
    >
        <label className="form-label" htmlFor={`${$pointer("id")}_input`}>
            {$pointer("label")}
            <$If test={$pointer("required")} $then={() => <small><$Lang keyName={$string("common.required")} /></small>} />
        </label>
        <input
            type="password"
            className="form-input"
            id={`${$pointer("id")}_input`}
            data-label={$pointer("label")}
            autoComplete="off"
            aria-required={$pointer("required")}
            aria-labelledby={$pointer("id")}
            aria-live="polite"
            dangerouslyInlineAttributes={{attributes: `name="${$pointer("name")}" value="${$pointer("value")}" ${$raw('{{#if private_id}}data-field-type="{{private_id}}"{{/if}}')}`}}
        />
    </div>
);
