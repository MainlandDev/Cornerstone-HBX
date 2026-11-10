/**
 * Source: templates/components/products/price-range.html (116 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $if, $parseHandlebarsDangerously, $string} from '@mainlanddev/bigcommerce-react';
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
        {/* html L1: {{#and price.retail_price_range.min.with_tax price.retail_price_range.max.with_tax}} */}
        <$And
            a={price.retail_price_range.min.with_tax}
            b={price.retail_price_range.max.with_tax}
            $then={() => (
                /* html L2: <div class="price-section price-section--withTax rrp-price--withTax"> */
                <div className="price-section price-section--withTax rrp-price--withTax">
                    {/* html L3: <span> */}
                    <span>
                        {/* html L4-7:
                           {{> components/products/price-label
                               label_value=theme_settings.pdp-retail-price-label
                               fallback=(lang "page_builder.pdp-retail-price-label")
                           }}
                        */}
                        <PriceLabel
                            label_value={theme_settings['pdp-retail-price-label']}
                            fallback={$lang($string('page_builder.pdp-retail-price-label'))}
                        />
                    </span>
                    {/* html L9: <span data-product-rrp-price-with-tax class="price price--rrp">{{price.retail_price_range.min.with_tax.formatted}} - {{price.retail_price_range.max.with_tax.formatted}}</span> */}
                    <span data-product-rrp-price-with-tax="" className="price price--rrp">
                        {/* html L9: {{price.retail_price_range.min.with_tax.formatted}} */}
                        {price.retail_price_range.min.with_tax.formatted} - {/* html L9: {{price.retail_price_range.max.with_tax.formatted}} */}{price.retail_price_range.max.with_tax.formatted}
                    </span>
                </div>
            )}
            $else={() => (
                /* html L11: {{else}}
                                      html L12: {{#if price.with_tax}}
                */
                <$If
                    query={[price.with_tax]}
                    $then={() => (
                        /* html L13: <div class="price-section price-section--withTax rrp-price--withTax" style="display: none;"> */
                        <div className="price-section price-section--withTax rrp-price--withTax" style={{display: 'none'}}>
                            {/* html L14: <span> */}
                            <span>
                                {/* html L15-18:
                                   {{> components/products/price-label
                                       label_value=theme_settings.pdp-retail-price-label
                                       fallback=(lang "page_builder.pdp-retail-price-label")
                                   }}
                                */}
                                <PriceLabel
                                    label_value={theme_settings['pdp-retail-price-label']}
                                    fallback={$lang($string('page_builder.pdp-retail-price-label'))}
                                />
                            </span>
                            {/* html L20: <span data-product-rrp-with-tax class="price price--rrp"> */}
                            <span data-product-rrp-with-tax="" className="price price--rrp">
                                {/* html L21: {{price.rrp_with_tax.formatted}} */}
                                {price.rrp_with_tax.formatted}
                            </span>
                        </div>
                    )}
                />
            )}
        />
        {/* html L26: {{#and price.price_range.min.with_tax price.price_range.max.with_tax}} */}
        <$And
            a={price.price_range.min.with_tax}
            b={price.price_range.max.with_tax}
            $then={() => (
                <>
                    {/* Never display the "non-sales price" if there is a price range to be shown, but we do want the element on the page */}
                    {/* html L27: {{!-- Never display the "non-sales price" if there is a price range to be shown, but we do want the element on the page --}}
                                              html L28: <div class="price-section price-section--withTax non-sale-price--withTax" style="display: none;">
                    */}
                    <div className="price-section price-section--withTax non-sale-price--withTax" style={{display: 'none'}}>
                        {/* html L29: <span> */}
                        <span>
                            {/* html L30-33:
                               {{> components/products/price-label
                                   label_value=theme_settings.pdp-non-sale-price-label
                                   fallback=(lang "page_builder.pdp-non-sale-price-label")
                               }}
                            */}
                            <PriceLabel
                                label_value={theme_settings['pdp-non-sale-price-label']}
                                fallback={$lang($string('page_builder.pdp-non-sale-price-label'))}
                            />
                        </span>
                        {/* html L35: <span data-product-non-sale-price-with-tax class="price price--non-sale"> */}
                        <span data-product-non-sale-price-with-tax="" className="price price--non-sale">
                            {/* html L36: {{price.non_sale_price_with_tax.formatted}} */}
                            {price.non_sale_price_with_tax.formatted}
                        </span>
                    </div>
                    {/* html L39: <div class="price-section price-section--withTax price--withTax"> */}
                    <div className="price-section price-section--withTax price--withTax">
                        {/* html L40: <span class="price-label">{{theme_settings.pdp-price-label}}</span> */}
                        <span className="price-label">{/* html L40: {{theme_settings.pdp-price-label}} */}{theme_settings['pdp-price-label']}</span>
                        {/* html L41: <span class="price-now-label" style="display: none;"> */}
                        <span className="price-now-label" style={{display: 'none'}}>
                            {/* html L42-45:
                               {{> components/products/price-label
                                   label_value=theme_settings.pdp-sale-price-label
                                   fallback=(lang "page_builder.pdp-sale-price-label")
                               }}
                            */}
                            <PriceLabel
                                label_value={theme_settings['pdp-sale-price-label']}
                                fallback={$lang($string('page_builder.pdp-sale-price-label'))}
                            />
                        </span>
                        {/* html L47: <span data-product-price-with-tax class="price">{{price.price_range.min.with_tax.formatted}} - {{price.price_range.max.with_tax.formatted}}</span> */}
                        <span data-product-price-with-tax="" className="price">
                            {/* html L47: {{price.price_range.min.with_tax.formatted}} */}
                            {price.price_range.min.with_tax.formatted} - {/* html L47: {{price.price_range.max.with_tax.formatted}} */}{price.price_range.max.with_tax.formatted}
                        </span>
                        {/* html L48: {{#and price.price_range.min.without_tax price.price_range.max.without_tax}} */}
                        <$And
                            a={price.price_range.min.without_tax}
                            b={price.price_range.max.without_tax}
                            $then={() => (
                                /* html L49: <abbr title="{{lang 'products.including_tax'}}">{{lang 'products.price_with_tax' tax_label=price.price_range.min.tax_label}}</abbr> */
                                <abbr title={$lang($string('products.including_tax'))}>
                                    {/* html L49: {{lang 'products.price_with_tax' tax_label=price.price_range.min.tax_label}} */}
                                    {$lang($string('products.price_with_tax'), {tax_label: price.price_range.min.tax_label})}
                                </abbr>
                            )}
                        />
                    </div>
                </>
            )}
        />
        {/* html L53: {{#and price.retail_price_range.min.without_tax price.retail_price_range.max.without_tax}} */}
        <$And
            a={price.retail_price_range.min.without_tax}
            b={price.retail_price_range.max.without_tax}
            $then={() => (
                /* html L54: <div class="price-section price-section--withoutTax rrp-price--withoutTax{{#if price.with_tax}} price-section--minor{{/if}}"> */
                <div className={`price-section price-section--withoutTax rrp-price--withoutTax${$if(price.with_tax).then(() => $$raw(' price-section--minor'))}`}>
                    {/* html L55: <span> */}
                    <span>
                        {/* html L56-59:
                           {{> components/products/price-label
                               label_value=theme_settings.pdp-retail-price-label
                               fallback=(lang "page_builder.pdp-retail-price-label")
                           }}
                        */}
                        <PriceLabel
                            label_value={theme_settings['pdp-retail-price-label']}
                            fallback={$lang($string('page_builder.pdp-retail-price-label'))}
                        />
                    </span>
                    {/* html L61: <span data-product-rrp-price-without-tax class="price price--rrp">{{price.retail_price_range.min.without_tax.formatted}} - {{price.retail_price_range.max.without_tax.formatted}}</span> */}
                    <span data-product-rrp-price-without-tax="" className="price price--rrp">
                        {/* html L61: {{price.retail_price_range.min.without_tax.formatted}} */}
                        {price.retail_price_range.min.without_tax.formatted} - {/* html L61: {{price.retail_price_range.max.without_tax.formatted}} */}{price.retail_price_range.max.without_tax.formatted}
                    </span>
                </div>
            )}
            $else={() => (
                /* html L63: {{else}}
                                      html L64: {{#if price.without_tax}}
                */
                <$If
                    query={[price.without_tax]}
                    $then={() => (
                        /* html L65: <div class="price-section price-section--withoutTax rrp-price--withoutTax{{#if price.with_tax}} price-section--minor{{/if}}" style="display: none;"> */
                        <div
                            className={`price-section price-section--withoutTax rrp-price--withoutTax${$if(price.with_tax).then(() => $$raw(' price-section--minor'))}`}
                            style={{display: 'none'}}
                        >
                            {/* html L66: <span> */}
                            <span>
                                {/* html L67-70:
                                   {{> components/products/price-label
                                       label_value=theme_settings.pdp-retail-price-label
                                       fallback=(lang "page_builder.pdp-retail-price-label")
                                   }}
                                */}
                                <PriceLabel
                                    label_value={theme_settings['pdp-retail-price-label']}
                                    fallback={$lang($string('page_builder.pdp-retail-price-label'))}
                                />
                            </span>
                            {/* html L72: <span data-product-rrp-price-without-tax class="price price--rrp"> */}
                            <span data-product-rrp-price-without-tax="" className="price price--rrp">
                                {/* html L73: {{price.rrp_without_tax.formatted}} */}
                                {price.rrp_without_tax.formatted}
                            </span>
                        </div>
                    )}
                />
            )}
        />
        {/* Dead branch in the original: `price_range` is not in the caller's context, so the `price-section--minor` class is never added here. */}
        {/* html L78: {{#and price.price_range.min.without_tax price.price_range.max.without_tax}} */}
        <$And
            a={price.price_range.min.without_tax}
            b={price.price_range.max.without_tax}
            $then={() => (
                <>
                    {/* html L79: {{!-- Never display the "non-sales price" if there is a price range to be shown, but we do want the element on the page --}}
                                              html L80: <div class="price-section price-section--withoutTax non-sale-price--withoutTax{{#if price.with_tax}} price-section--minor{{/if}}" style="display: none;">
                    */}
                    <div
                        className={`price-section price-section--withoutTax non-sale-price--withoutTax${$if(price.with_tax).then(() => $$raw(' price-section--minor'))}`}
                        style={{display: 'none'}}
                    >
                        {/* html L81: <span> */}
                        <span>
                            {/* html L82-85:
                               {{> components/products/price-label
                                   label_value=theme_settings.pdp-non-sale-price-label
                                   fallback=(lang "page_builder.pdp-non-sale-price-label")
                               }}
                            */}
                            <PriceLabel
                                label_value={theme_settings['pdp-non-sale-price-label']}
                                fallback={$lang($string('page_builder.pdp-non-sale-price-label'))}
                            />
                        </span>
                        {/* html L87: <span data-product-non-sale-price-without-tax class="price price--non-sale"> */}
                        <span data-product-non-sale-price-without-tax="" className="price price--non-sale">
                            {/* html L88: {{price.non_sale_price_without_tax.formatted}} */}
                            {price.non_sale_price_without_tax.formatted}
                        </span>
                    </div>
                    {/* html L91: <div class="price-section price-section--withoutTax price--withoutTax{{#and price_range.min.with_tax price_range.max.with_tax}} price-section--minor{{/and}}"> */}
                    <div $$={$parseHandlebarsDangerously('class="price-section price-section--withoutTax price--withoutTax{{#and price_range.min.with_tax price_range.max.with_tax}} price-section--minor{{/and}}"')}>
                        {/* html L92: <span class="price-label">{{theme_settings.pdp-price-label}}</span> */}
                        <span className="price-label">{/* html L92: {{theme_settings.pdp-price-label}} */}{theme_settings['pdp-price-label']}</span>
                        {/* html L93: <span class="price-now-label" style="display: none;"> */}
                        <span className="price-now-label" style={{display: 'none'}}>
                            {/* html L94-97:
                               {{> components/products/price-label
                                   label_value=theme_settings.pdp-sale-price-label
                                   fallback=(lang "page_builder.pdp-sale-price-label")
                               }}
                            */}
                            <PriceLabel
                                label_value={theme_settings['pdp-sale-price-label']}
                                fallback={$lang($string('page_builder.pdp-sale-price-label'))}
                            />
                        </span>
                        {/* html L99: <span data-product-price-without-tax class="price">{{price.price_range.min.without_tax.formatted}} - {{price.price_range.max.without_tax.formatted}}</span> */}
                        <span data-product-price-without-tax="" className="price">
                            {/* html L99: {{price.price_range.min.without_tax.formatted}} */}
                            {price.price_range.min.without_tax.formatted} - {/* html L99: {{price.price_range.max.without_tax.formatted}} */}{price.price_range.max.without_tax.formatted}
                        </span>
                        {/* html L100: {{#and price.price_range.min.with_tax price.price_range.max.with_tax}} */}
                        <$And
                            a={price.price_range.min.with_tax}
                            b={price.price_range.max.with_tax}
                            $then={() => (
                                /* html L101: <abbr title="{{lang 'products.excluding_tax'}}">{{lang 'products.price_without_tax' tax_label=price.price_range.min.tax_label}}</abbr> */
                                <abbr title={$lang($string('products.excluding_tax'))}>
                                    {/* html L101: {{lang 'products.price_without_tax' tax_label=price.price_range.min.tax_label}} */}
                                    {$lang($string('products.price_without_tax'), {tax_label: price.price_range.min.tax_label})}
                                </abbr>
                            )}
                        />
                    </div>
                </>
            )}
        />

        {/* Never display the "saving price" element by default if there is a price range on the page to be shown */}
        {/* html L106: {{!-- Never display the "saving price" element by default if there is a price range on the page to be shown --}}
                      html L107: {{#if page_type '===' 'product'}}
        */}
        <$If
            query={[page_type, '===', $string('product')]}
            $then={() => (
                /* html L108: <div class="price-section price-section--saving price" style="display: none;"> */
                <div className="price-section price-section--saving price" style={{display: 'none'}}>
                    {/* html L109: <span class="price">{{lang 'products.you_save_opening_text'}}</span> */}
                    <span className="price">{/* html L109: {{lang 'products.you_save_opening_text'}} */}{$lang($string('products.you_save_opening_text'))}</span>
                    {/* html L110: <span data-product-price-saved class="price price--saving"> */}
                    <span data-product-price-saved="" className="price price--saving">
                        {/* html L111: {{price.saved.formatted}} */}
                        {price.saved.formatted}
                    </span>
                    {/* html L113: <span class="price">{{lang 'products.you_save_closing_bracket'}}</span> */}
                    <span className="price">{/* html L113: {{lang 'products.you_save_closing_bracket'}} */}{$lang($string('products.you_save_closing_bracket'))}</span>
                </div>
            )}
        />
    </>
));
