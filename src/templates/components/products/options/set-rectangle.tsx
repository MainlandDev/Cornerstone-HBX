import {$Each, $If, $Lang, $partial, $pointer, $string, $Unless, place} from "@mainlanddev/hbx-bigcommerce";

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
        <div className="form-field" data-product-attribute="set-rectangle" role="radiogroup" aria-labelledby="rectangle-group-label">
            <label className="form-label form-label--alternate form-label--inlineSmall" id="rectangle-group-label">
                {$pointer("display_name")}:{" "}
                <span data-option-value={""} />{" "}
                {place($partial("components/common/requireness-msg"))}
            </label>
            <$Unless
                test={required}
                $then={() => (
                    <>
                        <input
                            className="form-radio"
                            type="radio"
                            id={`attribute_rectangle__${id}_none`}
                            dangerouslyInlineAttributes={{
                                attributes: `name="attribute[${id}]" value="" checked="${$If({test: $pointer("defaultValue"), operator: $string("=="), rvalue: $string(""), $then: () => "checked"})}"`,
                            }}
                        />{" "}
                        <label className="form-option" htmlFor={`attribute_rectangle__${id}_none`}>
                            <span className="form-option-variant">
                                <$Lang keyName={$string("products.none")} />
                            </span>
                        </label>{" "}
                    </>
                )}
            />
            <$Each
                list={$pointer<Value[]>("values")}
                $then={(item) => (
                    <div className="form-option-wrapper">
                        <input
                            className="form-radio"
                            type="radio"
                            id={`attribute_rectangle__${id}_${item.id}`}
                            dangerouslyInlineAttributes={{
                                attributes: `name="attribute[${id}]" value="${item.id}"${$If({test: item.selected, $then: () => " checked data-default"})}${$If({test: required, $then: () => " required"})}`,
                            }}
                        />{" "}
                        <label className="form-option" htmlFor={`attribute_rectangle__${id}_${item.id}`} data-product-attribute-value={item.id}>
                            <span className="form-option-variant">{item.label}</span>
                        </label>{" "}
                    </div>
                )}
            />
        </div>
    );
};
