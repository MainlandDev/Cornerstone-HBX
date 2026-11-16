import Paginator from "../common/paginator.tsx";
import {$If, $Inject, $lang, $partial, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$Inject keyName={$string("noCompareMessage")} value={$lang($string("compare.no_compare"))} />

        {$partial("components/products/filter", {sort: $pointer("pagination.brand.sort")})}

        <div data-list-name={`Brand: ${$pointer("brand.name")}`}>
            <$If
                test={$pointer("theme_settings.product_list_display_mode")}
                operator={$string("===")}
                rvalue={$string("grid")}
                $then={() => (
                    <>
                        {$partial("components/products/grid", {
                                products: $pointer("brand.products"),
                                show_compare: $pointer("brand.show_compare"),
                                theme_settings: $pointer("theme_settings"),
                                event: $string("list"),
                            })}
                    </>
                )}
                $else={() => (
                    <>
                        {$partial("components/products/list", {
                                products: $pointer("brand.products"),
                                show_compare: $pointer("brand.show_compare"),
                                theme_settings: $pointer("theme_settings"),
                                event: $string("list"),
                            })}
                    </>
                )}
            />
        </div>

        <Paginator $positionalHash={$pointer("pagination.brand")} />
    </>
);
