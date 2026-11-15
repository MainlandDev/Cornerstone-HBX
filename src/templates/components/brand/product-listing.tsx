import {$Inject, $lang, $partial, $pointer, $raw, $string, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$Inject keyName={$string("noCompareMessage")} value={$lang($string("compare.no_compare"))} />

        {place($partial("components/products/filter", {sort: $pointer("pagination.brand.sort")}))}

        <div data-list-name={`Brand: ${$pointer("brand.name")}`}>
            {$raw("{{#if theme_settings.product_list_display_mode '===' 'grid'}}")}
            {place(
                $partial("components/products/grid", {
                    products: $pointer("brand.products"),
                    show_compare: $pointer("brand.show_compare"),
                    theme_settings: $pointer("theme_settings"),
                    event: $string("list"),
                }),
            )}
            {$raw("{{else}}")}
            {place(
                $partial("components/products/list", {
                    products: $pointer("brand.products"),
                    show_compare: $pointer("brand.show_compare"),
                    theme_settings: $pointer("theme_settings"),
                    event: $string("list"),
                }),
            )}
            {$raw("{{/if}}")}
        </div>

        {place($partial("components/common/paginator", $pointer("pagination.brand")))}
    </>
);
