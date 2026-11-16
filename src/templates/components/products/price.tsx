"use server";
import ProductsPriceRange from "./price-range.tsx";
import ProductsPriceLabel from "./price-label.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {
    $$themeSettings,
    $If,
    $Lang,
    $lang,
    $pointer,
    $raw,
    $string,
    $Unless,
} from "@mainlanddev/hbx-bigcommerce";

interface Money {
    formatted: string;
}

interface Price {
    price_range: {min: {with_tax: Money; without_tax: Money; tax_label: string}; max: {with_tax: Money; without_tax: Money; tax_label: string}};
    rrp_with_tax: Money;
    non_sale_price_with_tax: Money;
    with_tax: Money;
    without_tax: Money;
    rrp_without_tax: Money;
    non_sale_price_without_tax: Money;
    saved: Money;
    tax_label: string;
}

export default (_props: PartialProps) => {
    const settings = $$themeSettings();
    const price = $pointer<Price>("price");
    return (
        <>
            {$raw("{{#and price.price_range (if theme_settings.price_ranges '==' true)}}")}
            <ProductsPriceRange price={price} />
            {$raw("{{else}}")}
            <div
                className="price-section price-section--withTax rrp-price--withTax"
                dangerouslyInlineAttributes={{
                    attributes: `${$Unless({test: price.rrp_with_tax, $then: () => $raw('style="display: none;"')})}`,
                }}
            >
                <span>
                    <ProductsPriceLabel label_value={settings["pdp-retail-price-label"]} fallback={$lang($string("page_builder.pdp-retail-price-label"))} />
                </span>
                <span data-product-rrp-with-tax={""} className="price price--rrp">
                    {price.rrp_with_tax.formatted}
                </span>
            </div>
            <div
                className="price-section price-section--withTax non-sale-price--withTax"
                dangerouslyInlineAttributes={{
                    attributes: `${$Unless({test: price.non_sale_price_with_tax, $then: () => $raw('style="display: none;"')})}`,
                }}
            >
                <span>
                    <ProductsPriceLabel label_value={settings["pdp-non-sale-price-label"]} fallback={$lang($string("page_builder.pdp-non-sale-price-label"))} />
                </span>
                <span data-product-non-sale-price-with-tax={""} className="price price--non-sale">
                    {price.non_sale_price_with_tax.formatted}
                </span>
            </div>
            <div className="price-section price-section--withTax price--withTax" dangerouslyInlineAttributes={{attributes: `${$Unless({test: price.with_tax, $then: () => $raw('style="display: none;"')})}`}}>
                <span className="price-label" dangerouslyInlineAttributes={{attributes: `${$If({test: price.non_sale_price_with_tax, $then: () => $raw('style="display: none;"')})}`}}>
                    {settings["pdp-price-label"]}
                </span>
                <span className="price-now-label" dangerouslyInlineAttributes={{attributes: `${$Unless({test: price.non_sale_price_with_tax, $then: () => $raw('style="display: none;"')})}`}}>
                    <ProductsPriceLabel label_value={settings["pdp-sale-price-label"]} fallback={$lang($string("page_builder.pdp-sale-price-label"))} />
                </span>
                <span data-product-price-with-tax={""} className="price">
                    {price.with_tax.formatted}
                </span>
                <$If
                    test={price.without_tax}
                    $then={() => (
                        <abbr title={$lang($string("products.including_tax"))}>
                            <$Lang keyName={$string("products.price_with_tax")} tax_label={price.tax_label} />
                        </abbr>
                    )}
                />
            </div>
            <div
                className={`price-section price-section--withoutTax rrp-price--withoutTax${$If({test: price.with_tax, $then: () => $raw(" price-section--minor")})}`}
                dangerouslyInlineAttributes={{
                    attributes: `${$Unless({test: price.rrp_without_tax, $then: () => $raw('style="display: none;"')})}`,
                }}
            >
                <span>
                    <ProductsPriceLabel label_value={settings["pdp-retail-price-label"]} fallback={$lang($string("page_builder.pdp-retail-price-label"))} />
                </span>
                <span data-product-rrp-price-without-tax={""} className="price price--rrp">
                    {price.rrp_without_tax.formatted}
                </span>
            </div>
            <div
                className={`price-section price-section--withoutTax non-sale-price--withoutTax${$If({test: price.with_tax, $then: () => $raw(" price-section--minor")})}`}
                dangerouslyInlineAttributes={{
                    attributes: `${$Unless({test: price.non_sale_price_without_tax, $then: () => $raw('style="display: none;"')})}`,
                }}
            >
                <span>
                    <ProductsPriceLabel label_value={settings["pdp-non-sale-price-label"]} fallback={$lang($string("page_builder.pdp-non-sale-price-label"))} />
                </span>
                <span data-product-non-sale-price-without-tax={""} className="price price--non-sale">
                    {price.non_sale_price_without_tax.formatted}
                </span>
            </div>
            <div className="price-section price-section--withoutTax price--withoutTax" dangerouslyInlineAttributes={{attributes: `${$Unless({test: price.without_tax, $then: () => $raw('style="display: none;"')})}`}}>
                <span className="price-label" dangerouslyInlineAttributes={{attributes: `${$If({test: price.non_sale_price_without_tax, $then: () => $raw('style="display: none;"')})}`}}>
                    {settings["pdp-price-label"]}
                </span>
                <span className="price-now-label" dangerouslyInlineAttributes={{attributes: `${$Unless({test: price.non_sale_price_without_tax, $then: () => $raw('style="display: none;"')})}`}}>
                    <ProductsPriceLabel label_value={settings["pdp-sale-price-label"]} fallback={$lang($string("page_builder.pdp-sale-price-label"))} />
                </span>
                <span data-product-price-without-tax={""} className={`price${$If({test: price.with_tax, $then: () => $raw(" price-section--minor")})}`}>
                    {price.without_tax.formatted}
                </span>
                <$If
                    test={price.with_tax}
                    $then={() => (
                        <abbr title={$lang($string("products.excluding_tax"))}>
                            <$Lang keyName={$string("products.price_without_tax")} tax_label={price.tax_label} />
                        </abbr>
                    )}
                />
            </div>
            <$If
                test={$pointer("page_type")}
                operator={$string("===")}
                rvalue={$string("product")}
                $then={() => (
                    <div className="price-section price-section--saving price" dangerouslyInlineAttributes={{attributes: `${$Unless({test: price.saved, $then: () => $raw('style="display: none;"')})}`}}>
                        <span className="price">
                            <$Lang keyName={$string("products.you_save_opening_text")} />
                        </span>
                        <span data-product-price-saved={""} className="price price--saving">
                            {price.saved.formatted}
                        </span>
                        <span className="price">
                            <$Lang keyName={$string("products.you_save_closing_bracket")} />
                        </span>
                    </div>
                )}
            />
            {$raw("{{/and}}")}
        </>
    );
};
