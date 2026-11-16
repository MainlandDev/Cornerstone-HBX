"use server";
import ProductsCard from "./card.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$add, $Each, $Lang, $number, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <>
        <h4>
            <$Lang keyName={$string("products.related_products")} />
        </h4>
        <ul className="product-list" data-list-name="Related Products">
            <$Each
                list={$pointer<unknown[]>("this")}
                $then={() => (
                    <li className="product-card">
                        <ProductsCard settings={$pointer("../settings")} theme_settings={$pointer("../theme_settings")} event={$string("list")} position={$add($pointer<number>("@index"), $number(1))} />
                    </li>
                )}
            />
        </ul>
    </>
);
