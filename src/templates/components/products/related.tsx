import {$add, $Each, $Lang, $number, $partial, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <h4>
            <$Lang keyName={$string("products.related_products")} />
        </h4>
        <ul className="product-list" data-list-name="Related Products">
            <$Each
                list={$pointer<unknown[]>("this")}
                $then={() => (
                    <li className="product-card">
                        {$partial("components/products/card", {
                                settings: $pointer("../settings"),
                                theme_settings: $pointer("../theme_settings"),
                                event: $string("list"),
                                position: $add($pointer<number>("@index"), $number(1)),
                            })}
                    </li>
                )}
            />
        </ul>
    </>
);
