import {$If, $boolean, $if, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$And} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import PriceLabel from '@/templates/components/products/price-label';
import type {ProductPriceHint, ThemeSettingsHint} from '@/context-products';

export default $asPartial<{
    price: ProductPriceHint;
    theme_settings: ThemeSettingsHint;
}>(({price, theme_settings}) => (
    <$And
        a={price.price_range}
        b={$if(theme_settings.price_ranges, '==', $boolean(true))}
        $then={() => (
            <$And
                a={price.price_range.min.with_tax}
                b={price.price_range.max.with_tax}
                $then={() => (
                    <>{$lang($string('category.shop_by_price_range_aria'), {from: price.price_range.min.with_tax.formatted, to: price.price_range.max.with_tax.formatted})}</>
                )}
                $else={() => (
                    <>{$lang($string('category.shop_by_price_range_aria'), {from: price.price_range.min.without_tax.formatted, to: price.price_range.max.without_tax.formatted})}</>
                )}
            />
        )}
        $else={() => (
            <$If
                query={[price.with_tax]}
                $then={() => (
                    <$If
                        query={[price.non_sale_price_with_tax]}
                        $then={() => (
                            <>
                                <PriceLabel
                                    label_value={theme_settings['pdp-non-sale-price-label']}
                                    fallback={$lang($string('page_builder.pdp-non-sale-price-label'))}
                                />
                                {price.non_sale_price_with_tax.formatted},
                                <PriceLabel
                                    label_value={theme_settings['pdp-sale-price-label']}
                                    fallback={$lang($string('page_builder.pdp-sale-price-label'))}
                                />
                                {price.with_tax.formatted}
                            </>
                        )}
                        $else={() => <>{price.with_tax.formatted}</>}
                    />
                )}
                $else={() => (
                    <$If
                        query={[price.non_sale_price_without_tax]}
                        $then={() => (
                            <>
                                <PriceLabel
                                    label_value={theme_settings['pdp-non-sale-price-label']}
                                    fallback={$lang($string('page_builder.pdp-non-sale-price-label'))}
                                />
                                {price.non_sale_price_without_tax.formatted},
                                <PriceLabel
                                    label_value={theme_settings['pdp-sale-price-label']}
                                    fallback={$lang($string('page_builder.pdp-sale-price-label'))}
                                />
                                {price.without_tax.formatted}
                            </>
                        )}
                        $else={() => <>{price.without_tax.formatted}</>}
                    />
                )}
            />
        )}
    />
));
