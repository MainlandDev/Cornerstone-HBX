import {$Each, $If, $Lang, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

interface SelectOption {
    value: string;
    label: string;
}

export default () => (
    <div
        className="form-field"
        id={$pointer("id")}
        data-validation={$pointer("validation")}
        dangerouslyInlineAttributes={{attributes: `${$raw("{{#if private_id}}data-type=\"{{private_id}}\"{{/if}}")}`}}
    >
        <noscript>
            <label className="form-label" htmlFor={`${$pointer("id")}_input`}>
                {$pointer("label")}
                <$If test={$pointer("required")} $then={() => <small><$Lang keyName={$string("common.required")} /></small>} />
            </label>
            <input
                type="text"
                id={`${$pointer("id")}_input`}
                className="form-input"
                aria-required={$pointer("required")}
                aria-labelledby={$pointer("id")}
                aria-live="polite"
                data-label={$pointer("label")}
                data-input={""}
                dangerouslyInlineAttributes={{attributes: `name="${$pointer("name")}" value="${$pointer("value")}"`}}
            />
        </noscript>

        <label className="form-label" htmlFor={`${$pointer("id")}_select`}>
            {$pointer("label")}
            <$If test={$pointer("required")} $then={() => <small><$Lang keyName={$string("common.required")} /></small>} />
        </label>
        <select
            className="form-select"
            aria-required={$pointer("required")}
            aria-labelledby={$pointer("id")}
            aria-live="polite"
            id={`${$pointer("id")}_select`}
            data-label={$pointer("label")}
            data-input={""}
            dangerouslyInlineAttributes={{
                attributes: `name="${$pointer("name")}" ${$raw("{{#if private_id}}data-field-type=\"{{private_id}}\"{{/if}}")}`,
            }}
        >
            <$If
                test={$pointer("options")}
                $then={() => (
                    <>
                        <option value="">{$pointer("chooseprefix")}</option>
                        <$Each
                            list={$pointer<SelectOption[]>("options")}
                            $then={(item) => (
                                <option dangerouslyInlineAttributes={{attributes: `${$raw("{{#if selected}} selected {{/if}}")}value="${item.value}"`}}>
                                    {item.label}
                                </option>
                            )}
                        />
                    </>
                )}
            />
        </select>
    </div>
);
