"use server";
import ProductsFilter from "../products/filter.tsx";
import ProductsGrid from "../products/grid.tsx";
import ProductsList from "../products/list.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import Paginator from "../common/paginator.tsx";
import {$Inject, $If, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <>
        <$Inject keyName={$string("noCompareMessage")} value={$lang($string("compare.no_compare"))} />

        <$If
            test={$pointer("product_results.products.length")}
            $then={() => <ProductsFilter sort={$pointer("pagination.product_results.sort")} />}
        />
        <div data-list-name="Search Results">
            <$If
                test={$pointer("theme_settings.product_list_display_mode")}
                operator={$string("===")}
                rvalue={$string("grid")}
                $then={() => (
                    <>
                        <ProductsGrid products={$pointer("product_results.products")} show_compare={$pointer("product_results.show_compare")} event={$string("list")} theme_settings={$pointer("theme_settings")} />
                    </>
                )}
                $else={() => (
                    <>
                        <ProductsList products={$pointer("product_results.products")} show_compare={$pointer("product_results.show_compare")} event={$string("list")} theme_settings={$pointer("theme_settings")} />
                    </>
                )}
            />
        </div>

        <Paginator $positionalHash={$pointer("pagination.product_results")} />
    </>
);
