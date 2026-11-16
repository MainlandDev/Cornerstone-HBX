import RequirenessMsg from "../../common/requireness-msg.tsx";
import ResponsiveImg from "../../common/responsive-img.tsx";
import {$Each, $If, $Lang, $pointer, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";

interface Value {
    id: string;
    label: string;
    selected: boolean;
    image: {data: string};
}

export default () => {
    // Read outside the loops, so inside them the path gains `../` (`{{../id}}`, `{{../required}}`).
    const id = $pointer("id");
    const required = $pointer("required");
    return (
        <div className="form-field" data-product-attribute="product-list" role="radiogroup" aria-labelledby="product-list-label">
            <label className="form-label form-label--alternate form-label--inlineSmall" id="product-list-label">
                {$pointer("display_name")}:{" "}
                <span data-option-value={""} />{" "}
                <RequirenessMsg />
            </label>
            <$If
                test={$pointer("values.0.image")}
                $then={() => (
                    <ul className="productOptions-list">
                        <$Unless
                            test={required}
                            $then={() => (
                                <li className="productOptions-list-item">
                                    <input
                                        className="form-radio"
                                        type="radio"
                                        id={`attribute_productlist_${id}_none`}
                                        dangerouslyInlineAttributes={{
                                            attributes: `name="attribute[${id}]" value="" ${$Unless({test: $pointer("defaultValue"), $then: () => "checked"})}`,
                                        }}
                                    />{" "}
                                    <label className="form-label" htmlFor={`attribute_productlist_${id}_none`}>
                                        <$Lang keyName={$string("products.none")} />
                                    </label>
                                </li>
                            )}
                        />
                        <$Each
                            list={$pointer<Value[]>("values")}
                            $then={(item) => (
                                <li className="productOptions-list-item" data-product-attribute-value={item.id}>
                                    <$If
                                        test={item.image}
                                        $then={() => (
                                            <figure className="productOptions-list-item-figure">
                                                <ResponsiveImg image={item.image} class={$string("productOptions-list-item-image")} lazyload={$string("lazyload+lqip")} />
                                            </figure>
                                        )}
                                    />
                                    <div className="productOptions-list-item-content">
                                        <input
                                            className="form-radio"
                                            type="radio"
                                            id={`attribute_productlist_${id}_${item.id}`}
                                            dangerouslyInlineAttributes={{
                                                attributes: `name="attribute[${id}]" value="${item.id}"${$If({test: item.selected, $then: () => " checked data-default"})}${$If({test: required, $then: () => " required"})}`,
                                            }}
                                        />{" "}
                                        <label data-product-attribute-value={item.id} className="form-label" htmlFor={`attribute_productlist_${id}_${item.id}`}>
                                            {item.label}
                                        </label>
                                    </div>
                                </li>
                            )}
                        />
                    </ul>
                )}
                $else={() => (
                    <>
                        <$Unless
                            test={required}
                            $then={() => (
                                <>
                                    <input
                                        className="form-radio"
                                        type="radio"
                                        id={`attribute_productlist_0_${id}`}
                                        dangerouslyInlineAttributes={{
                                            attributes: `name="attribute[${id}]" value="0" ${$Unless({test: $pointer("defaultValue"), $then: () => "checked"})}`,
                                        }}
                                    />{" "}
                                    <label className="form-label" htmlFor={`attribute_productlist_0_${id}`}>
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
                                        id={`attribute_productlist_${id}_${item.id}`}
                                        dangerouslyInlineAttributes={{
                                            attributes: `name="attribute[${id}]" value="${item.id}"${$If({test: item.selected, $then: () => " checked data-default"})}${$If({test: required, $then: () => " required"})}`,
                                        }}
                                    />{" "}
                                    <label data-product-attribute-value={item.id} className="form-label" htmlFor={`attribute_productlist_${id}_${item.id}`}>
                                        {item.label}
                                    </label>{" "}
                                </>
                            )}
                        />
                    </>
                )}
            />
        </div>
    );
};
