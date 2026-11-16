import {$If, $Lang, $partial, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <div className="form-field" id={$pointer("id")} data-validation={$pointer("validation")} dangerouslyInlineAttributes={{attributes: `${$raw('{{#if private_id}}data-type="{{private_id}}"{{/if}}')}`}}>
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
                    dangerouslyInlineAttributes={{attributes: `${$raw('{{#if private_id}}data-field-type="{{private_id}}"{{/if}}')}`}}
                >
                    {$partial("components/common/forms/date-options", $pointer("month"), {isRequired: $pointer("required")})}
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
                    dangerouslyInlineAttributes={{attributes: `${$raw('{{#if private_id}}data-field-type="{{private_id}}"{{/if}}')}`}}
                >
                    {$partial("components/common/forms/date-options", $pointer("day"), {isRequired: $pointer("required")})}
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
                    dangerouslyInlineAttributes={{attributes: `${$raw('{{#if private_id}}data-field-type="{{private_id}}"{{/if}}')}`}}
                >
                    {$partial("components/common/forms/date-options", $pointer("year"), {isRequired: $pointer("required")})}
                </select>
            </div>
        </div>
    </div>
);
