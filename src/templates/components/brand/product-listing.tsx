"use server";
import ProductsFilter from "../products/filter.tsx";
import ProductsGrid from "../products/grid.tsx";
import ProductsList from "../products/list.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import Paginator from "../common/paginator.tsx";
import {$If, $Inject, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <>
        <$Inject keyName={$string("noCompareMessage")} value={$lang($string("compare.no_compare"))} />

        <ProductsFilter sort={$pointer("pagination.brand.sort")} />

        <div data-list-name={`Brand: ${$pointer("brand.name")}`}>
            <$If
                test={$pointer("theme_settings.product_list_display_mode")}
                operator={$string("===")}
                rvalue={$string("grid")}
                $then={() => (
                    <>
                        <ProductsGrid products={$pointer("brand.products")} show_compare={$pointer("brand.show_compare")} theme_settings={$pointer("theme_settings")} event={$string("list")} />
                    </>
                )}
                $else={() => (
                    <>
                        <ProductsList products={$pointer("brand.products")} show_compare={$pointer("brand.show_compare")} theme_settings={$pointer("theme_settings")} event={$string("list")} />
                    </>
                )}
            />
        </div>

        <Paginator $positionalHash={$pointer("pagination.brand")} />
    </>
);
