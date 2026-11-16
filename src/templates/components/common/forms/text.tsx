"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div
        className="form-field"
        id={$pointer("id")}
        data-validation={$pointer("validation")}
        dangerouslyInlineAttributes={{attributes: `${$raw("{{#if private_id}}data-type=\"{{private_id}}\"{{/if}}")}`}}
    >
        <label className="form-label" htmlFor={`${$pointer("id")}_input`}>
            {$pointer("label")}
            <$If test={$pointer("required")} $then={() => <small><$Lang keyName={$string("common.required")} /></small>} />
        </label>
        <input
            type="text"
            id={`${$pointer("id")}_input`}
            className="form-input"
            data-label={$pointer("label")}
            data-input={""}
            aria-required={$pointer("required")}
            aria-labelledby={$pointer("id")}
            aria-live="polite"
            dangerouslyInlineAttributes={{
                attributes: `name="${$pointer("name")}" ${$raw("{{#if value}} value=\"{{value}}\"{{/if}}")}${$raw("{{#if maxlength}}maxlength=\"{{maxlength}}\"{{/if}}")}${$raw("{{#if placeholder}} placeholder=\"{{placeholder}}\"{{/if}}")}${$raw("{{#if private_id}}data-field-type=\"{{private_id}}\"{{/if}}")}`,
            }}
        />
    </div>
);
