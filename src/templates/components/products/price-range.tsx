import {$If, $if, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$And} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import PriceLabel from '@/templates/components/products/price-label';
import type {ProductPageHint, ProductPriceHint, ThemeSettingsHint} from '@/context-products';

export default $asPartial<{
    price: ProductPriceHint;
    theme_settings: ThemeSettingsHint;
    page_type: ProductPageHint['page_type'];
}>(({price, theme_settings, page_type}) => (
    <>
        <$And
            a={price.retail_price_range.min.with_tax}
            b={price.retail_price_range.max.with_tax}
            $then={() => (
                <div className="price-section price-section--withTax rrp-price--withTax">
                    <span>
                        <PriceLabel
                            label_value={theme_settings['pdp-retail-price-label']}
                            fallback={$lang($string('page_builder.pdp-retail-price-label'))}
                        />
                    </span>
                    <span data-product-rrp-price-with-tax="" className="price price--rrp">
                        {price.retail_price_range.min.with_tax.formatted} - {price.retail_price_range.max.with_tax.formatted}
                    </span>
                </div>
            )}
            $else={() => (
                <$If
                    query={[price.with_tax]}
                    $then={() => (
                        <div className="price-section price-section--withTax rrp-price--withTax" style={{display: 'none'}}>
                            <span>
                                <PriceLabel
                                    label_value={theme_settings['pdp-retail-price-label']}
                                    fallback={$lang($string('page_builder.pdp-retail-price-label'))}
                                />
                            </span>
                            <span data-product-rrp-with-tax="" className="price price--rrp">
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
                    <div className="price-section price-section--withTax non-sale-price--withTax" style={{display: 'none'}}>
                        <span>
                            <PriceLabel
                                label_value={theme_settings['pdp-non-sale-price-label']}
                                fallback={$lang($string('page_builder.pdp-non-sale-price-label'))}
                            />
                        </span>
                        <span data-product-non-sale-price-with-tax="" className="price price--non-sale">
                            {price.non_sale_price_with_tax.formatted}
                        </span>
                    </div>
                    <div className="price-section price-section--withTax price--withTax">
                        <span className="price-label">{theme_settings['pdp-price-label']}</span>
                        <span className="price-now-label" style={{display: 'none'}}>
                            <PriceLabel
                                label_value={theme_settings['pdp-sale-price-label']}
                                fallback={$lang($string('page_builder.pdp-sale-price-label'))}
                            />
                        </span>
                        <span data-product-price-with-tax="" className="price">
                            {price.price_range.min.with_tax.formatted} - {price.price_range.max.with_tax.formatted}
                        </span>
                        <$And
                            a={price.price_range.min.without_tax}
                            b={price.price_range.max.without_tax}
                            $then={() => (
                                <abbr title={$lang($string('products.including_tax'))}>
                                    {$lang($string('products.price_with_tax'), {tax_label: price.price_range.min.tax_label})}
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
                <div className={`price-section price-section--withoutTax rrp-price--withoutTax${$if(price.with_tax).then(() => $$raw(' price-section--minor'))}`}>
                    <span>
                        <PriceLabel
                            label_value={theme_settings['pdp-retail-price-label']}
                            fallback={$lang($string('page_builder.pdp-retail-price-label'))}
                        />
                    </span>
                    <span data-product-rrp-price-without-tax="" className="price price--rrp">
                        {price.retail_price_range.min.without_tax.formatted} - {price.retail_price_range.max.without_tax.formatted}
                    </span>
                </div>
            )}
            $else={() => (
                <$If
                    query={[price.without_tax]}
                    $then={() => (
                        <div
                            className={`price-section price-section--withoutTax rrp-price--withoutTax${$if(price.with_tax).then(() => $$raw(' price-section--minor'))}`}
                            style={{display: 'none'}}
                        >
                            <span>
                                <PriceLabel
                                    label_value={theme_settings['pdp-retail-price-label']}
                                    fallback={$lang($string('page_builder.pdp-retail-price-label'))}
                                />
                            </span>
                            <span data-product-rrp-price-without-tax="" className="price price--rrp">
                                {price.rrp_without_tax.formatted}
                            </span>
                        </div>
                    )}
                />
            )}
        />
        {/* Dead branch in the original: `price_range` is not in the caller's context, so the `price-section--minor` class is never added here. */}
        <$And
            a={price.price_range.min.without_tax}
            b={price.price_range.max.without_tax}
            $then={() => (
                <>
                    <div
                        className={`price-section price-section--withoutTax non-sale-price--withoutTax${$if(price.with_tax).then(() => $$raw(' price-section--minor'))}`}
                        style={{display: 'none'}}
                    >
                        <span>
                            <PriceLabel
                                label_value={theme_settings['pdp-non-sale-price-label']}
                                fallback={$lang($string('page_builder.pdp-non-sale-price-label'))}
                            />
                        </span>
                        <span data-product-non-sale-price-without-tax="" className="price price--non-sale">
                            {price.non_sale_price_without_tax.formatted}
                        </span>
                    </div>
                    <div className="price-section price-section--withoutTax price--withoutTax">
                        <span className="price-label">{theme_settings['pdp-price-label']}</span>
                        <span className="price-now-label" style={{display: 'none'}}>
                            <PriceLabel
                                label_value={theme_settings['pdp-sale-price-label']}
                                fallback={$lang($string('page_builder.pdp-sale-price-label'))}
                            />
                        </span>
                        <span data-product-price-without-tax="" className="price">
                            {price.price_range.min.without_tax.formatted} - {price.price_range.max.without_tax.formatted}
                        </span>
                        <$And
                            a={price.price_range.min.with_tax}
                            b={price.price_range.max.with_tax}
                            $then={() => (
                                <abbr title={$lang($string('products.excluding_tax'))}>
                                    {$lang($string('products.price_without_tax'), {tax_label: price.price_range.min.tax_label})}
                                </abbr>
                            )}
                        />
                    </div>
                </>
            )}
        />

        {/* Never display the "saving price" element by default if there is a price range on the page to be shown */}
        <$If
            query={[page_type, '===', $string('product')]}
            $then={() => (
                <div className="price-section price-section--saving price" style={{display: 'none'}}>
                    <span className="price">{$lang($string('products.you_save_opening_text'))}</span>
                    <span data-product-price-saved="" className="price price--saving">
                        {price.saved.formatted}
                    </span>
                    <span className="price">{$lang($string('products.you_save_closing_bracket'))}</span>
                </div>
            )}
        />
    </>
));
