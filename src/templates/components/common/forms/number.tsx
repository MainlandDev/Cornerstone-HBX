"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $lang, $Lang, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div className="form-field" id={$pointer("id")} data-validation={$pointer("validation")}>
        <label className="form-label" htmlFor={`${$pointer("id")}_input`}>
            {$pointer("label")}
            <$If test={$pointer("required")} $then={() => <small><$Lang keyName={$string("common.required")} /></small>} />
        </label>
        <input
            type="number"
            className="form-input"
            data-label={$pointer("label")}
            data-input={""}
            data-rule="lowerThan"
            min={$pointer("limitfrom")}
            max={$pointer("limitto")}
            title={$lang($string("forms.range"), {limitFrom: $pointer("limitfrom"), limitTo: $pointer("limitto")})}
            id={`${$pointer("id")}_input`}
            aria-required={$pointer("required")}
            aria-labelledby={$pointer("id")}
            aria-live="polite"
            dangerouslyInlineAttributes={{attributes: `name="${$pointer("name")}" value="${$pointer("value")}" ${$raw('{{#if private_id}}data-field-type="{{private_id}}"{{/if}}')}`}}
        />
    </div>
);
