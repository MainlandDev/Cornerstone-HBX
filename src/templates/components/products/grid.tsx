import {$add, $Each, $number, $partial, $pointer, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <ul className="productGrid">
        <$Each
            list={$pointer<unknown[]>("products")}
            $then={() => (
                <li className="product">
                    {place(
                        $partial("components/products/card", {
                            settings: $pointer("../settings"),
                            show_compare: $pointer("../show_compare"),
                            show_rating: $pointer("../settings.show_product_rating"),
                            theme_settings: $pointer("../theme_settings"),
                            customer: $pointer("../customer"),
                            event: $pointer("../event"),
                            position: $add($pointer<number>("@index"), $number(1)),
                        }),
                    )}
                </li>
            )}
        />
    </ul>
);
