"use server";
import ProductsCard from "./card.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$add, $Each, $Lang, $number, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <>
        <h2 className="page-heading">
            <$Lang keyName={$string("products.featured")} />
        </h2>

        <ul className={`productGrid productGrid--maxCol${$pointer("columns")}`} data-product-type="featured" data-list-name="Featured Products">
            <$Each
                list={$pointer<unknown[]>("products")}
                $then={() => (
                    <li className="product">
                        <ProductsCard settings={$pointer("../settings")} theme_settings={$pointer("../theme_settings")} customer={$pointer("../customer")} event={$string("list")} position={$add($pointer<number>("@index"), $number(1))} />
                    </li>
                )}
            />
        </ul>
    </>
);
