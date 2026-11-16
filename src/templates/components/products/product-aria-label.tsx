import {$$themeSettings, $And, $If, $Lang, $lang, $partial, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

interface Money {
    formatted: string;
}

interface Taxed {
    with_tax: Money;
    without_tax: Money;
}

interface Price {
    price_range: {min: Taxed; max: Taxed};
    with_tax: Money;
    without_tax: Money;
    non_sale_price_with_tax: Money;
    non_sale_price_without_tax: Money;
}

export default () => {
    const settings = $$themeSettings();
    const price = $pointer<Price>("price");
    const label = (themeValue: "pdp-non-sale-price-label" | "pdp-sale-price-label", fallback: string) =>
        $partial("components/products/price-label", {
                label_value: settings[themeValue],
                fallback: $lang($string(fallback)),
            });
    return (
        <>
            {$raw("{{#and price.price_range (if theme_settings.price_ranges '==' true)}}")}
            <$And
                a={price.price_range.min.with_tax}
                b={price.price_range.max.with_tax}
                $then={() => (
                    <$Lang
                        keyName={$string("category.shop_by_price_range_aria")}
                        from={price.price_range.min.with_tax.formatted}
                        to={price.price_range.max.with_tax.formatted}
                    />
                )}
                $else={() => (
                    <$Lang
                        keyName={$string("category.shop_by_price_range_aria")}
                        from={price.price_range.min.without_tax.formatted}
                        to={price.price_range.max.without_tax.formatted}
                    />
                )}
            />
            {$raw("{{else}}")}
            <$If
                test={price.with_tax}
                $then={() => (
                    <$If
                        test={price.non_sale_price_with_tax}
                        $then={() => (
                            <>
                                {label("pdp-non-sale-price-label", "page_builder.pdp-non-sale-price-label")}
                                {price.non_sale_price_with_tax.formatted}{", "}
                                {label("pdp-sale-price-label", "page_builder.pdp-sale-price-label")}
                                {price.with_tax.formatted}
                            </>
                        )}
                        $else={() => <>{price.with_tax.formatted}</>}
                    />
                )}
                $else={() => (
                    <$If
                        test={price.non_sale_price_without_tax}
                        $then={() => (
                            <>
                                {label("pdp-non-sale-price-label", "page_builder.pdp-non-sale-price-label")}
                                {price.non_sale_price_without_tax.formatted}{", "}
                                {label("pdp-sale-price-label", "page_builder.pdp-sale-price-label")}
                                {price.without_tax.formatted}
                            </>
                        )}
                        $else={() => <>{price.without_tax.formatted}</>}
                    />
                )}
            />
            {$raw("{{/and}}")}
        </>
    );
};
