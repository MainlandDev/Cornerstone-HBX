"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

interface Checkbox {
    id: string;
    name: string;
    value: string;
    label: string;
    class: string;
}

export default (_props: PartialProps) => (
    <div
        className="form-field"
        id={$pointer("id")}
        data-validation={$pointer("validation")}
        dangerouslyInlineAttributes={{attributes: `${$raw('{{#if private_id}}data-type="{{private_id}}"{{/if}}')}`}}
    >
        <label className="form-label" htmlFor={$pointer("id")}>
            {$pointer("label")}
            <$If test={$pointer("required")} $then={() => <small><$Lang keyName={$string("common.required")} /></small>} />
        </label>
        <$If
            test={$pointer("checkboxes")}
            $then={() => (
                <$Each
                    list={$pointer<Checkbox[]>("checkboxes")}
                    $then={(item) => (
                        <>
                            <input
                                type="checkbox"
                                id={item.name}
                                data-input={""}
                                data-label={item.label}
                                className="form-checkbox"
                                aria-labelledby={item.id}
                                aria-live="polite"
                                dangerouslyInlineAttributes={{
                                    attributes: `name="${item.name}" value="${item.value}" ${$raw("{{#if checked}}checked{{/if}}")} ${$raw('{{#if private_id}}data-field-type="{{private_id}}"{{/if}}')}`,
                                }}
                            />
                            <label className={`form-label ${item.class}`} htmlFor={item.name}>
                                {item.label}
                            </label>
                        </>
                    )}
                />
            )}
        />
    </div>
);
