import {$add, $Each, $number, $partial, $pointer} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <ul className="productList">
        <$Each
            list={$pointer<unknown[]>("products")}
            $then={() => (
                <li className="product">
                    {$partial("components/products/list-item", {
                            show_compare: $pointer("../show_compare"),
                            show_rating: $pointer("../settings.show_product_rating"),
                            theme_settings: $pointer("../theme_settings"),
                            customer: $pointer("../customer"),
                            event: $pointer("../event"),
                            settings: $pointer("../settings"),
                            position: $add($pointer<number>("@index"), $number(1)),
                        })}
                </li>
            )}
        />
    </ul>
);
