"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {$ifAttribute} from "@/components/hbx/ifAttribute.ts";

interface SelectOption {
    value: string;
    label: string;
}

export default (_props: PartialProps) => (
    <div
        className="form-field"
        id={$pointer("id")}
        data-validation={$pointer("validation")}
        dangerouslyInlineAttributes={{attributes: `${$ifAttribute("data-type", "private_id")}`}}
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
                name={$pointer("name")}
                value={$pointer("value")}
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
                attributes: `name="${$pointer("name")}" ${$ifAttribute("data-field-type", "private_id")}`,
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
                                <option dangerouslyInlineAttributes={{attributes: `${$If({test: $pointer("selected"), $then: () => " selected "})}value="${item.value}"`}}>
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
