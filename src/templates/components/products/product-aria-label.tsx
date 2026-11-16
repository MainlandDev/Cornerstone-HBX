"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import ProductsPriceLabel from "./price-label.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$And, $If, $Lang, $lang, $pointer, $string, $boolean, $ifExpression} from "@mainlanddev/hbx-bigcommerce";

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

export default (_props: PartialProps) => {
    const settings = $pointer<ThemeSettingsObject>("theme_settings");
    const price = $pointer<Price>("price");
    const label = (themeValue: "pdp-non-sale-price-label" | "pdp-sale-price-label", fallback: string) =>
        <ProductsPriceLabel label_value={settings[themeValue]} fallback={$lang($string(fallback))} />;
    return (
        <>
            <$And a={$pointer("price.price_range")} b={$ifExpression($pointer("theme_settings.price_ranges"), $string("=="), $boolean(true))} $then={() => (<><$And
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
            /></>)} $else={() => (<><$If
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
            /></>)} />
        </>
    );
};
