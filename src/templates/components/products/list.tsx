"use server";
import ProductsListItem from "./list-item.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$add, $Each, $number, $pointer} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <ul className="productList">
        <$Each
            list={$pointer<unknown[]>("products")}
            $then={() => (
                <li className="product">
                    <ProductsListItem show_compare={$pointer("../show_compare")} show_rating={$pointer("../settings.show_product_rating")} theme_settings={$pointer("../theme_settings")} customer={$pointer("../customer")} event={$pointer("../event")} settings={$pointer("../settings")} position={$add($pointer<number>("@index"), $number(1))} />
                </li>
            )}
        />
    </ul>
);
