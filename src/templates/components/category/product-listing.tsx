import {$If, $Inject, $Lang, $lang, $partial, $pointer, $raw, $string, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$Inject keyName={$string("noCompareMessage")} value={$lang($string("compare.no_compare"))} />

        <$If
            test={$pointer("category.products")}
            $then={() => (
                <>
                    {place($partial("components/products/filter", {sort: $pointer("pagination.category.sort")}))}

                    <div data-list-name={`Category: ${$pointer("category.name")}`} role="region" aria-label={$lang($string("category.product_label"))}>
                        {$raw("{{#if theme_settings.product_list_display_mode '===' 'grid'}}")}
                        {place(
                            $partial("components/products/grid", {
                                products: $pointer("category.products"),
                                show_compare: $pointer("category.show_compare"),
                                theme_settings: $pointer("theme_settings"),
                                event: $string("list"),
                            }),
                        )}
                        {$raw("{{else}}")}
                        {place(
                            $partial("components/products/list", {
                                products: $pointer("category.products"),
                                show_compare: $pointer("category.show_compare"),
                                theme_settings: $pointer("theme_settings"),
                                event: $string("list"),
                            }),
                        )}
                        {$raw("{{/if}}")}
                    </div>

                    {place($partial("components/common/paginator", $pointer("pagination.category")))}
                </>
            )}
            $else={() => (
                <$If
                    test={$pointer("category.search_error")}
                    $then={() => (
                        <p>
                            <$Lang keyName={$string("search.errorMessage")} />
                        </p>
                    )}
                    $else={() => (
                        <p data-no-products-notification={""} role="alert" aria-live="assertive" tabIndex={-1}>
                            <$Lang keyName={$string("categories.no_products")} />
                        </p>
                    )}
                />
            )}
        />
    </>
);
