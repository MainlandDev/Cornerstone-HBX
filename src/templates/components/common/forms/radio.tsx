"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {$ifAttribute} from "@/components/hbx/ifAttribute.ts";

interface Radio {
    id: string;
    value: string;
    label: string;
    required: string;
}

export default (_props: PartialProps) => {
    // Read outside the loop, so inside it the path gains `../` (`{{../name}}`).
    const name = $pointer("name");
    return (
        <div className="form-field" id={$pointer("id")} data-validation={$pointer("validation")}>
            <label className="form-label">
                {$pointer("label")}
                <$If test={$pointer("required")} $then={() => <small><$Lang keyName={$string("common.required")} /></small>} />
            </label>
            <$If
                test={$pointer("radios")}
                $then={() => (
                    <$Each
                        list={$pointer<Radio[]>("radios")}
                        $then={(item, loop) => (
                            <>
                                <input
                                    type="radio"
                                    className="form-radio"
                                    id={`${name}_${loop["@index"]}`}
                                    data-label={item.label}
                                    data-input={""}
                                    aria-required={item.required}
                                    aria-labelledby={item.id}
                                    aria-live="polite"
                                    dangerouslyInlineAttributes={{
                                        attributes: `name="${name}" value="${item.value}" ${$If({test: $pointer("checked"), $then: () => "checked"})} ${$ifAttribute("data-field-type", "private_id")}`,
                                    }}
                                />
                                <label className="form-label" htmlFor={`${name}_${loop["@index"]}`}>
                                    {item.label}
                                </label>
                            </>
                        )}
                    />
                )}
            />
        </div>
    );
};
