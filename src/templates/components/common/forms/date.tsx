"use server";
import FormsDateOptions from "./date-options.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {$ifAttribute} from "@/components/hbx/ifAttribute.ts";

export default (_props: PartialProps) => (
    <div className="form-field" id={$pointer("id")} data-validation={$pointer("validation")} dangerouslyInlineAttributes={{attributes: `${$ifAttribute("data-type", "private_id")}`}}>
        <label className="form-label" htmlFor={$pointer("id")}>
            {$pointer("label")}
            <$If test={$pointer("required")} $then={() => <small><$Lang keyName={$string("common.required")} /></small>} />
        </label>
        <div className="form-row form-row--third">
            <div className="form-field">
                <select
                    className="form-select"
                    name={$pointer("month.name")}
                    id={`${$pointer("id")}_month`}
                    data-label="month"
                    data-input={""}
                    aria-required={$pointer("required")}
                    aria-labelledby={$pointer("id")}
                    aria-live="polite"
                    dangerouslyInlineAttributes={{attributes: `${$ifAttribute("data-field-type", "private_id")}`}}
                >
                    <FormsDateOptions $positionalHash={$pointer("month")} isRequired={$pointer("required")} />
                </select>
            </div>
            <div className="form-field">
                <select
                    className="form-select"
                    name={$pointer("day.name")}
                    id={`${$pointer("id")}_day`}
                    data-label="day"
                    data-input={""}
                    aria-required={$pointer("required")}
                    aria-labelledby={$pointer("id")}
                    aria-live="polite"
                    dangerouslyInlineAttributes={{attributes: `${$ifAttribute("data-field-type", "private_id")}`}}
                >
                    <FormsDateOptions $positionalHash={$pointer("day")} isRequired={$pointer("required")} />
                </select>
            </div>
            <div className="form-field">
                <select
                    className="form-select"
                    name={$pointer("year.name")}
                    id={`${$pointer("id")}_year`}
                    data-label="year"
                    data-input={""}
                    aria-required={$pointer("required")}
                    aria-labelledby={$pointer("id")}
                    aria-live="polite"
                    dangerouslyInlineAttributes={{attributes: `${$ifAttribute("data-field-type", "private_id")}`}}
                >
                    <FormsDateOptions $positionalHash={$pointer("year")} isRequired={$pointer("required")} />
                </select>
            </div>
        </div>
    </div>
);
