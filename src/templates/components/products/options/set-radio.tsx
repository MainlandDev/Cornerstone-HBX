import {$Each, $If, $Lang, $partial, $pointer, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";

interface Value {
    id: string;
    label: string;
    selected: boolean;
}

export default () => {
    // Read outside the loop, so inside it the path gains `../` (`{{../id}}`, `{{../required}}`).
    const id = $pointer("id");
    const required = $pointer("required");
    return (
        <div className="form-field" data-product-attribute="set-radio" role="radiogroup" aria-labelledby={`radio-group-label-${id}`}>
            <label className="form-label form-label--alternate form-label--inlineSmall" id={`radio-group-label-${id}`}>
                {$pointer("display_name")}:{" "}
                {$partial("components/common/requireness-msg")}
            </label>
            <$Unless
                test={required}
                $then={() => (
                    <>
                        <input
                            className="form-radio"
                            type="radio"
                            id={`attribute_radio_${id}_none`}
                            dangerouslyInlineAttributes={{
                                attributes: `name="attribute[${id}]" value="" checked="${$If({test: $pointer("defaultValue"), operator: $string("=="), rvalue: $string(""), $then: () => "checked"})}"`,
                            }}
                        />{" "}
                        <label className="form-label" htmlFor={`attribute_radio_${id}_none`}>
                            <$Lang keyName={$string("products.none")} />
                        </label>{" "}
                    </>
                )}
            />
            <$Each
                list={$pointer<Value[]>("values")}
                $then={(item) => (
                    <>
                        <input
                            className="form-radio"
                            type="radio"
                            id={`attribute_radio_${id}_${item.id}`}
                            dangerouslyInlineAttributes={{
                                attributes: `name="attribute[${id}]" value="${item.id}"${$If({test: item.selected, $then: () => " checked data-default"})}${$If({test: required, $then: () => " required"})}`,
                            }}
                        />{" "}
                        <label data-product-attribute-value={item.id} className="form-label" htmlFor={`attribute_radio_${id}_${item.id}`}>
                            {item.label}
                        </label>{" "}
                    </>
                )}
            />
        </div>
    );
};
