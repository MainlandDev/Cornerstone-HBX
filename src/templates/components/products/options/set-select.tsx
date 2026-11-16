"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import RequirenessMsg from "../../common/requireness-msg.tsx";
import {$Each, $If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

interface Value {
    id: string;
    label: string;
    selected: boolean;
}

export default (_props: PartialProps) => (
    <div className="form-field" data-product-attribute="set-select">
        <label className="form-label form-label--alternate form-label--inlineSmall" htmlFor={`attribute_select_${$pointer("id")}`}>
            {$pointer("display_name")}:{" "}
            <RequirenessMsg />
        </label>
        <select
            className="form-select form-select--small"
            id={`attribute_select_${$pointer("id")}`}
            dangerouslyInlineAttributes={{
                attributes: `name="attribute[${$pointer("id")}]" ${$If({test: $pointer("required"), $then: () => "required"})}`,
            }}
        >
            <option value="">
                <$Lang keyName={$string("products.choose_options")} />
            </option>
            <$Each
                list={$pointer<Value[]>("values")}
                $then={(item) => (
                    <option
                        dangerouslyInlineAttributes={{
                            attributes: `data-product-attribute-value="${item.id}" value="${item.id}"${$If({test: item.selected, $then: () => " selected data-default"})}`,
                        }}
                    >
                        {item.label}
                    </option>
                )}
            />
        </select>
    </div>
);
