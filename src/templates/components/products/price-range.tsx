"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import ProductsPriceLabel from "./price-label.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$And, $If, $Lang, $lang, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

interface Money {
    formatted: string;
    tax_label: string;
}

interface Range {
    min: {with_tax: Money; without_tax: Money; tax_label: string};
    max: {with_tax: Money; without_tax: Money; tax_label: string};
}

interface Price {
    with_tax: Money;
    without_tax: Money;
    rrp_with_tax: Money;
    rrp_without_tax: Money;
    non_sale_price_with_tax: Money;
    non_sale_price_without_tax: Money;
    retail_price_range: Range;
    price_range: Range;
    saved: Money;
}

const hidden = 'style="display: none;"';

export default (_props: PartialProps) => {
    const settings = $pointer<ThemeSettingsObject>("theme_settings");
    const price = $pointer<Price>("price");
    const ambientRange = $pointer<Range>("price_range");
    const label = (themeKey: "pdp-retail-price-label" | "pdp-non-sale-price-label" | "pdp-sale-price-label", fallback: string) =>
        <ProductsPriceLabel label_value={settings[themeKey]} fallback={$lang($string(fallback))} />;
    return (
        <>
            <$And
                a={price.retail_price_range.min.with_tax}
                b={price.retail_price_range.max.with_tax}
                $then={() => (
                    <div className="price-section price-section--withTax rrp-price--withTax">
                        <span>{label("pdp-retail-price-label", "page_builder.pdp-retail-price-label")}</span>
                        <span data-product-rrp-price-with-tax={""} className="price price--rrp">
                            {price.retail_price_range.min.with_tax.formatted} - {price.retail_price_range.max.with_tax.formatted}
                        </span>
                    </div>
                )}
                $else={() => (
                    <$If
                        test={price.with_tax}
                        $then={() => (
                            <div className="price-section price-section--withTax rrp-price--withTax" dangerouslyInlineAttributes={{attributes: hidden}}>
                                <span>{label("pdp-retail-price-label", "page_builder.pdp-retail-price-label")}</span>
                                <span data-product-rrp-with-tax={""} className="price price--rrp">
                                    {price.rrp_with_tax.formatted}
                                </span>
                            </div>
                        )}
                    />
                )}
            />
            <$And
                a={price.price_range.min.with_tax}
                b={price.price_range.max.with_tax}
                $then={() => (
                    <>
                        {/* Never display the "non-sales price" if there is a price range to be shown, but we do want the element on the page */}
                        <div className="price-section price-section--withTax non-sale-price--withTax" dangerouslyInlineAttributes={{attributes: hidden}}>
                            <span>{label("pdp-non-sale-price-label", "page_builder.pdp-non-sale-price-label")}</span>
                            <span data-product-non-sale-price-with-tax={""} className="price price--non-sale">
                                {price.non_sale_price_with_tax.formatted}
                            </span>
                        </div>
                        <div className="price-section price-section--withTax price--withTax">
                            <span className="price-label">{settings["pdp-price-label"]}</span>
                            <span className="price-now-label" dangerouslyInlineAttributes={{attributes: hidden}}>
                                {label("pdp-sale-price-label", "page_builder.pdp-sale-price-label")}
                            </span>
                            <span data-product-price-with-tax={""} className="price">
                                {price.price_range.min.with_tax.formatted} - {price.price_range.max.with_tax.formatted}
                            </span>
                            <$And
                                a={price.price_range.min.without_tax}
                                b={price.price_range.max.without_tax}
                                $then={() => (
                                    <abbr title={$lang($string("products.including_tax"))}>
                                        <$Lang keyName={$string("products.price_with_tax")} tax_label={price.price_range.min.tax_label} />
                                    </abbr>
                                )}
                            />
                        </div>
                    </>
                )}
            />
            <$And
                a={price.retail_price_range.min.without_tax}
                b={price.retail_price_range.max.without_tax}
                $then={() => (
                    <div
                        className={`price-section price-section--withoutTax rrp-price--withoutTax${$If({test: price.with_tax, $then: () => $raw(" price-section--minor")})}`}
                    >
                        <span>{label("pdp-retail-price-label", "page_builder.pdp-retail-price-label")}</span>
                        <span data-product-rrp-price-without-tax={""} className="price price--rrp">
                            {price.retail_price_range.min.without_tax.formatted} - {price.retail_price_range.max.without_tax.formatted}
                        </span>
                    </div>
                )}
                $else={() => (
                    <$If
                        test={price.without_tax}
                        $then={() => (
                            <div
                                className={`price-section price-section--withoutTax rrp-price--withoutTax${$If({test: price.with_tax, $then: () => $raw(" price-section--minor")})}`}
                                dangerouslyInlineAttributes={{attributes: hidden}}
                            >
                                <span>{label("pdp-retail-price-label", "page_builder.pdp-retail-price-label")}</span>
                                <span data-product-rrp-price-without-tax={""} className="price price--rrp">
                                    {price.rrp_without_tax.formatted}
                                </span>
                            </div>
                        )}
                    />
                )}
            />
            <$And
                a={price.price_range.min.without_tax}
                b={price.price_range.max.without_tax}
                $then={() => (
                    <>
                        {/* Never display the "non-sales price" if there is a price range to be shown, but we do want the element on the page */}
                        <div
                            className={`price-section price-section--withoutTax non-sale-price--withoutTax${$If({test: price.with_tax, $then: () => $raw(" price-section--minor")})}`}
                            dangerouslyInlineAttributes={{attributes: hidden}}
                        >
                            <span>{label("pdp-non-sale-price-label", "page_builder.pdp-non-sale-price-label")}</span>
                            <span data-product-non-sale-price-without-tax={""} className="price price--non-sale">
                                {price.non_sale_price_without_tax.formatted}
                            </span>
                        </div>
                        <div
                            className={`price-section price-section--withoutTax price--withoutTax${$And({a: ambientRange.min.with_tax, b: ambientRange.max.with_tax, $then: () => $raw(" price-section--minor")})}`}
                        >
                            <span className="price-label">{settings["pdp-price-label"]}</span>
                            <span className="price-now-label" dangerouslyInlineAttributes={{attributes: hidden}}>
                                {label("pdp-sale-price-label", "page_builder.pdp-sale-price-label")}
                            </span>
                            <span data-product-price-without-tax={""} className="price">
                                {price.price_range.min.without_tax.formatted} - {price.price_range.max.without_tax.formatted}
                            </span>
                            <$And
                                a={price.price_range.min.with_tax}
                                b={price.price_range.max.with_tax}
                                $then={() => (
                                    <abbr title={$lang($string("products.excluding_tax"))}>
                                        <$Lang keyName={$string("products.price_without_tax")} tax_label={price.price_range.min.tax_label} />
                                    </abbr>
                                )}
                            />
                        </div>
                    </>
                )}
            />
            {/* Never display the "saving price" element by default if there is a price range on the page to be shown */}
            <$If
                test={$pointer("page_type")}
                operator={$string("===")}
                rvalue={$string("product")}
                $then={() => (
                    <div className="price-section price-section--saving price" dangerouslyInlineAttributes={{attributes: hidden}}>
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
        </>
    );
};
