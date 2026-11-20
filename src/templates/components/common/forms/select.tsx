"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";
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
        dangerouslyInlineAttributes={{attributes: `${$ifAttribute("data-type", "private_id", " ", " ")}`}}
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
                attributes: `name="${$pointer("name")}" ${$ifAttribute("data-field-type", "private_id", " ", " ")}`,
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
