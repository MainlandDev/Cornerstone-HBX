import {$Inject, $If, $lang, $partial, $pointer, $string, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$Inject keyName={$string("noCompareMessage")} value={$lang($string("compare.no_compare"))} />

        <$If
            test={$pointer("product_results.products.length")}
            $then={() => place($partial("components/products/filter", {sort: $pointer("pagination.product_results.sort")}))}
        />
        <div data-list-name="Search Results">
            <$If
                test={$pointer("theme_settings.product_list_display_mode")}
                operator={$string("===")}
                rvalue={$string("grid")}
                $then={() => (
                    <>
                        {place(
                            $partial("components/products/grid", {
                                products: $pointer("product_results.products"),
                                show_compare: $pointer("product_results.show_compare"),
                                event: $string("list"),
                                theme_settings: $pointer("theme_settings"),
                            }),
                        )}
                    </>
                )}
                $else={() => (
                    <>
                        {place(
                            $partial("components/products/list", {
                                products: $pointer("product_results.products"),
                                show_compare: $pointer("product_results.show_compare"),
                                event: $string("list"),
                                theme_settings: $pointer("theme_settings"),
                            }),
                        )}
                    </>
                )}
            />
        </div>

        {place($partial("components/common/paginator", $pointer("pagination.product_results")))}
    </>
);
