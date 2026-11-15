import {$Each, $If, $Lang, $pointer, $raw, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

interface SelectOption {
    value: string;
    label: string;
}

export default () => (
    <div
        className="form-field"
        id={$pointer("id")}
        data-validation={$pointer("validation")}
        dangerouslyInlineAttributes={{attributes: `${$raw("{{#if private_id}} data-type=\"{{private_id}}\" {{/if}}")}`}}
    >
        <label className="form-label" htmlFor={`${$pointer("id")}_select`}>
            {$pointer("label")}
            <$If test={$pointer("required")} $then={() => <small><$Lang keyName={$string("common.required")} /></small>} />
        </label>
        <select
            className={`${$pointer("class")} form-select`}
            id={`${$pointer("id")}_select`}
            data-label={$pointer("label")}
            data-input={""}
            aria-required={$pointer("required")}
            aria-labelledby={$pointer("id")}
            aria-live="polite"
            dangerouslyInlineAttributes={{
                attributes: `name="${$pointer("name")}" ${$raw("{{#if private_id}} data-field-type=\"{{private_id}}\" {{/if}}")}`,
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
                                    {$unescaped(item.label)}
                                </option>
                            )}
                        />
                    </>
                )}
            />
        </select>
    </div>
);
