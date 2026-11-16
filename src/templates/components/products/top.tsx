import {$add, $Each, $Lang, $number, $partial, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <h2 className="page-heading">
            <$Lang keyName={$string("products.top")} />
        </h2>

        <ul className={`productGrid productGrid--maxCol${$pointer("columns")}`} data-product-type="top_sellers" data-list-name="Most Popular Products">
            <$Each
                list={$pointer<unknown[]>("products")}
                $then={() => (
                    <li className="product">
                        {$partial("components/products/card", {
                                settings: $pointer("../settings"),
                                theme_settings: $pointer("../theme_settings"),
                                customer: $pointer("../customer"),
                                event: $string("list"),
                                position: $add($pointer<number>("@index"), $number(1)),
                            })}
                    </li>
                )}
            />
        </ul>
    </>
);
