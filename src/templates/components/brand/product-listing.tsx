import {$If, $Inject, $lang, $partial, $pointer, $string, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$Inject keyName={$string("noCompareMessage")} value={$lang($string("compare.no_compare"))} />

        {place($partial("components/products/filter", {sort: $pointer("pagination.brand.sort")}))}

        <div data-list-name={`Brand: ${$pointer("brand.name")}`}>
            <$If
                test={$pointer("theme_settings.product_list_display_mode")}
                operator={$string("===")}
                rvalue={$string("grid")}
                $then={() => (
                    <>
                        {place(
                            $partial("components/products/grid", {
                                products: $pointer("brand.products"),
                                show_compare: $pointer("brand.show_compare"),
                                theme_settings: $pointer("theme_settings"),
                                event: $string("list"),
                            }),
                        )}
                    </>
                )}
                $else={() => (
                    <>
                        {place(
                            $partial("components/products/list", {
                                products: $pointer("brand.products"),
                                show_compare: $pointer("brand.show_compare"),
                                theme_settings: $pointer("theme_settings"),
                                event: $string("list"),
                            }),
                        )}
                    </>
                )}
            />
        </div>

        {place($partial("components/common/paginator", $pointer("pagination.brand")))}
    </>
);
