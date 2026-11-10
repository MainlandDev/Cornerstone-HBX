/**
 * Source: templates/components/products/product-aria-label.html (42 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
    /* html L1: {{#and price.price_range (if theme_settings.price_ranges '==' true)}} */
    <$And
        a={price.price_range}
        b={$if(theme_settings.price_ranges, '==', $boolean(true))}
        $then={() => (
            /* html L2: {{#and price.price_range.min.with_tax price.price_range.max.with_tax}} */
            <$And
                a={price.price_range.min.with_tax}
                b={price.price_range.max.with_tax}
                $then={() => (
                    <>{/* html L3-6:
                         {{lang 'category.shop_by_price_range_aria'
                                from=price.price_range.min.with_tax.formatted
                                to=price.price_range.max.with_tax.formatted
                         }}
                      */}{$lang($string('category.shop_by_price_range_aria'), {from: price.price_range.min.with_tax.formatted, to: price.price_range.max.with_tax.formatted})}</>
                )}
                $else={() => (
                    <>{/* html L7: {{else}}
                                                  html L8-11:
                         {{lang 'category.shop_by_price_range_aria'
                                from=price.price_range.min.without_tax.formatted
                                to=price.price_range.max.without_tax.formatted
                         }}
                      */}{$lang($string('category.shop_by_price_range_aria'), {from: price.price_range.min.without_tax.formatted, to: price.price_range.max.without_tax.formatted})}</>
                )}
            />
        )}
        $else={() => (
            /* html L13: {{else}}
                              html L14: {{#if price.with_tax}}
            */
            <$If
                query={[price.with_tax]}
                $then={() => (
                    /* html L15: {{#if price.non_sale_price_with_tax}} */
                    <$If
                        query={[price.non_sale_price_with_tax]}
                        $then={() => (
                            <>
                                {/* html L16-19:
                                   {{> components/products/price-label
                                       label_value=theme_settings.pdp-non-sale-price-label
                                       fallback=(lang "page_builder.pdp-non-sale-price-label")
                                   }}{{price.non_sale_price_with_tax.formatted}},
                                */}
                                <PriceLabel
                                    label_value={theme_settings['pdp-non-sale-price-label']}
                                    fallback={$lang($string('page_builder.pdp-non-sale-price-label'))}
                                />
                                {/* html L19: {{price.non_sale_price_with_tax.formatted}} */}
                                {price.non_sale_price_with_tax.formatted},
                                {/* html L20-23:
                                   {{> components/products/price-label
                                       label_value=theme_settings.pdp-sale-price-label
                                       fallback=(lang "page_builder.pdp-sale-price-label")
                                   }}{{price.with_tax.formatted}}
                                */}
                                <PriceLabel
                                    label_value={theme_settings['pdp-sale-price-label']}
                                    fallback={$lang($string('page_builder.pdp-sale-price-label'))}
                                />
                                {/* html L23: {{price.with_tax.formatted}} */}
                                {price.with_tax.formatted}
                            </>
                        )}
                        $else={() => <>{/* html L24: {{else}}
                                                                                    html L25: {{price.with_tax.formatted}}
                                       */}{price.with_tax.formatted}</>}
                    />
                )}
                $else={() => (
                    /* html L27: {{else}}
                                              html L28: {{#if price.non_sale_price_without_tax}}
                    */
                    <$If
                        query={[price.non_sale_price_without_tax]}
                        $then={() => (
                            <>
                                {/* html L29-32:
                                   {{> components/products/price-label
                                       label_value=theme_settings.pdp-non-sale-price-label
                                       fallback=(lang "page_builder.pdp-non-sale-price-label")
                                   }}{{price.non_sale_price_without_tax.formatted}},
                                */}
                                <PriceLabel
                                    label_value={theme_settings['pdp-non-sale-price-label']}
                                    fallback={$lang($string('page_builder.pdp-non-sale-price-label'))}
                                />
                                {/* html L32: {{price.non_sale_price_without_tax.formatted}} */}
                                {price.non_sale_price_without_tax.formatted},
                                {/* html L33-36:
                                   {{> components/products/price-label
                                       label_value=theme_settings.pdp-sale-price-label
                                       fallback=(lang "page_builder.pdp-sale-price-label")
                                   }}{{price.without_tax.formatted}}
                                */}
                                <PriceLabel
                                    label_value={theme_settings['pdp-sale-price-label']}
                                    fallback={$lang($string('page_builder.pdp-sale-price-label'))}
                                />
                                {/* html L36: {{price.without_tax.formatted}} */}
                                {price.without_tax.formatted}
                            </>
                        )}
                        $else={() => <>{/* html L37: {{else}}
                                                                                    html L38: {{price.without_tax.formatted}}
                                       */}{price.without_tax.formatted}</>}
                    />
                )}
            />
        )}
    />
));
