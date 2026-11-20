"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {$ifAttribute} from "@/components/hbx/ifAttribute.ts";

export default (_props: PartialProps) => (
    <div
        className="form-field"
        id={$pointer("id")}
        data-validation={$pointer("validation")}
        dangerouslyInlineAttributes={{attributes: `${$ifAttribute("data-type", "private_id")}`}}
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
            dangerouslyInlineAttributes={{attributes: `name="${$pointer("name")}" value="${$pointer("value")}" ${$ifAttribute("data-field-type", "private_id")}`}}
        />
    </div>
);
