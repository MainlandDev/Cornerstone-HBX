import {$If, $boolean, $if, $string, $unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$And} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import PriceLabel from '@/templates/components/products/price-label';
import PriceRange from '@/templates/components/products/price-range';
import type {ProductPageHint, ProductPriceHint, ThemeSettingsHint} from '@/context-products';

export default $asPartial<{
    price: ProductPriceHint;
    theme_settings: ThemeSettingsHint;
    page_type: ProductPageHint['page_type'];
}>(({price, theme_settings, page_type}) => (
    <$And
        a={price.price_range}
        b={$if(theme_settings.price_ranges, '==', $boolean(true))}
        $then={() => (
            <PriceRange price={price} theme_settings={theme_settings} page_type={page_type}/>
        )}
        $else={() => (
            <>
                <div className="price-section price-section--withTax rrp-price--withTax" $$={$unless(price.rrp_with_tax).then(() => $$raw('style="display: none;"'))}>
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
                <div className="price-section price-section--withTax non-sale-price--withTax" $$={$unless(price.non_sale_price_with_tax).then(() => $$raw('style="display: none;"'))}>
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
                <div className="price-section price-section--withTax price--withTax" $$={$unless(price.with_tax).then(() => $$raw('style="display: none;"'))}>
                    <span
                        className="price-label"
                        $$={$if(price.non_sale_price_with_tax).then(() => $$raw('style="display: none;"'))}
                    >
                        {theme_settings['pdp-price-label']}
                    </span>
                    <span
                        className="price-now-label"
                        $$={$unless(price.non_sale_price_with_tax).then(() => $$raw('style="display: none;"'))}
                    >
                        <PriceLabel
                            label_value={theme_settings['pdp-sale-price-label']}
                            fallback={$lang($string('page_builder.pdp-sale-price-label'))}
                        />
                    </span>
                    <span data-product-price-with-tax="" className="price">{price.with_tax.formatted}</span>
                    <$If
                        query={[price.without_tax]}
                        $then={() => (
                            <abbr title={$lang($string('products.including_tax'))}>
                                {$lang($string('products.price_with_tax'), {tax_label: price.tax_label})}
                            </abbr>
                        )}
                    />
                </div>
                <div
                    className={`price-section price-section--withoutTax rrp-price--withoutTax${$if(price.with_tax).then(() => $$raw(' price-section--minor'))}`}
                    $$={$unless(price.rrp_without_tax).then(() => $$raw('style="display: none;"'))}
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
                <div
                    className={`price-section price-section--withoutTax non-sale-price--withoutTax${$if(price.with_tax).then(() => $$raw(' price-section--minor'))}`}
                    $$={$unless(price.non_sale_price_without_tax).then(() => $$raw('style="display: none;"'))}
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
                <div className="price-section price-section--withoutTax price--withoutTax" $$={$unless(price.without_tax).then(() => $$raw('style="display: none;"'))}>
                    <span
                        className="price-label"
                        $$={$if(price.non_sale_price_without_tax).then(() => $$raw('style="display: none;"'))}
                    >
                        {theme_settings['pdp-price-label']}
                    </span>
                    <span
                        className="price-now-label"
                        $$={$unless(price.non_sale_price_without_tax).then(() => $$raw('style="display: none;"'))}
                    >
                        <PriceLabel
                            label_value={theme_settings['pdp-sale-price-label']}
                            fallback={$lang($string('page_builder.pdp-sale-price-label'))}
                        />
                    </span>
                    <span data-product-price-without-tax="" className={`price${$if(price.with_tax).then(() => $$raw(' price-section--minor'))}`}>
                        {price.without_tax.formatted}
                    </span>
                    <$If
                        query={[price.with_tax]}
                        $then={() => (
                            <abbr title={$lang($string('products.excluding_tax'))}>
                                {$lang($string('products.price_without_tax'), {tax_label: price.tax_label})}
                            </abbr>
                        )}
                    />
                </div>
                <$If
                    query={[page_type, '===', $string('product')]}
                    $then={() => (
                        <div className="price-section price-section--saving price" $$={$unless(price.saved).then(() => $$raw('style="display: none;"'))}>
                            <span className="price">{$lang($string('products.you_save_opening_text'))}</span>
                            <span data-product-price-saved="" className="price price--saving">
                                {price.saved.formatted}
                            </span>
                            <span className="price">{$lang($string('products.you_save_closing_bracket'))}</span>
                        </div>
                    )}
                />
            </>
        )}
    />
));
