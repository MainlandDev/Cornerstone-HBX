/**
 * Source: templates/components/products/price.html (94 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
    /* html L1-5:
       {{!-- There are 2 code paths for generating the PDP pricing HTML determined by the following #and condition.
       If a 'price_range' exists then we generate all HTML in price-range.html, otherwise it is defined here. Both code
       paths generate the same HTML structure with some differences in whether that element is displayed by default (css styling).
       
       If you are making a change here or in price-range.html, you probably want to make that change in both files. --}}
              html L7: {{#and price.price_range (if theme_settings.price_ranges '==' true)}}
    */
    <$And
        a={price.price_range}
        b={$if(theme_settings.price_ranges, '==', $boolean(true))}
        $then={() => (
            /* html L8: {{> components/products/price-range price=price}} */
            <PriceRange price={price} theme_settings={theme_settings} page_type={page_type}/>
        )}
        $else={() => (
            <>
                {/* html L9: {{else}}
                                      html L10: <div class="price-section price-section--withTax rrp-price--withTax" {{#unless price.rrp_with_tax}}style="display: none;"{{/unless}}>
                */}
                <div className="price-section price-section--withTax rrp-price--withTax" $$={$unless(price.rrp_with_tax).then(() => $$raw('style="display: none;"'))}>
                    {/* html L11: <span> */}
                    <span>
                        {/* html L12-15:
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
                    {/* html L17: <span data-product-rrp-with-tax class="price price--rrp"> */}
                    <span data-product-rrp-with-tax="" className="price price--rrp">
                        {/* html L18: {{price.rrp_with_tax.formatted}} */}
                        {price.rrp_with_tax.formatted}
                    </span>
                </div>
                {/* html L21: <div class="price-section price-section--withTax non-sale-price--withTax" {{#unless price.non_sale_price_with_tax}}style="display: none;"{{/unless}}> */}
                <div className="price-section price-section--withTax non-sale-price--withTax" $$={$unless(price.non_sale_price_with_tax).then(() => $$raw('style="display: none;"'))}>
                    {/* html L22: <span> */}
                    <span>
                        {/* html L23-26:
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
                    {/* html L28: <span data-product-non-sale-price-with-tax class="price price--non-sale"> */}
                    <span data-product-non-sale-price-with-tax="" className="price price--non-sale">
                        {/* html L29: {{price.non_sale_price_with_tax.formatted}} */}
                        {price.non_sale_price_with_tax.formatted}
                    </span>
                </div>
                {/* html L32: <div class="price-section price-section--withTax price--withTax" {{#unless price.with_tax}}style="display: none;"{{/unless}}> */}
                <div className="price-section price-section--withTax price--withTax" $$={$unless(price.with_tax).then(() => $$raw('style="display: none;"'))}>
                    {/* html L33: <span class="price-label" {{#if price.non_sale_price_with_tax}}style="display: none;"{{/if}}> */}
                    <span
                        className="price-label"
                        $$={$if(price.non_sale_price_with_tax).then(() => $$raw('style="display: none;"'))}
                    >
                        {/* html L34: {{theme_settings.pdp-price-label}} */}
                        {theme_settings['pdp-price-label']}
                    </span>
                    {/* html L36: <span class="price-now-label" {{#unless price.non_sale_price_with_tax}}style="display: none;"{{/unless}}> */}
                    <span
                        className="price-now-label"
                        $$={$unless(price.non_sale_price_with_tax).then(() => $$raw('style="display: none;"'))}
                    >
                        {/* html L37-40:
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
                    {/* html L42: <span data-product-price-with-tax class="price">{{price.with_tax.formatted}}</span> */}
                    <span data-product-price-with-tax="" className="price">{/* html L42: {{price.with_tax.formatted}} */}{price.with_tax.formatted}</span>
                    {/* html L43: {{#if price.without_tax}} */}
                    <$If
                        query={[price.without_tax]}
                        $then={() => (
                            /* html L44: <abbr title="{{lang 'products.including_tax'}}">{{lang 'products.price_with_tax' tax_label=price.tax_label}}</abbr> */
                            <abbr title={$lang($string('products.including_tax'))}>
                                {/* html L44: {{lang 'products.price_with_tax' tax_label=price.tax_label}} */}
                                {$lang($string('products.price_with_tax'), {tax_label: price.tax_label})}
                            </abbr>
                        )}
                    />
                </div>
                {/* html L47: <div class="price-section price-section--withoutTax rrp-price--withoutTax{{#if price.with_tax}} price-section--minor{{/if}}" {{#unless price.rrp_without_tax}}style="display: none;"{{/unless}}> */}
                <div
                    className={`price-section price-section--withoutTax rrp-price--withoutTax${$if(price.with_tax).then(() => $$raw(' price-section--minor'))}`}
                    $$={$unless(price.rrp_without_tax).then(() => $$raw('style="display: none;"'))}
                >
                    {/* html L48: <span> */}
                    <span>
                        {/* html L49-52:
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
                    {/* html L54: <span data-product-rrp-price-without-tax class="price price--rrp"> */}
                    <span data-product-rrp-price-without-tax="" className="price price--rrp">
                        {/* html L55: {{price.rrp_without_tax.formatted}} */}
                        {price.rrp_without_tax.formatted}
                    </span>
                </div>
                {/* html L58: <div class="price-section price-section--withoutTax non-sale-price--withoutTax{{#if price.with_tax}} price-section--minor{{/if}}" {{#unless price.non_sale_price_without_tax}}style="display: none;"{{/unless}}> */}
                <div
                    className={`price-section price-section--withoutTax non-sale-price--withoutTax${$if(price.with_tax).then(() => $$raw(' price-section--minor'))}`}
                    $$={$unless(price.non_sale_price_without_tax).then(() => $$raw('style="display: none;"'))}
                >
                    {/* html L59: <span> */}
                    <span>
                        {/* html L60-63:
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
                    {/* html L65: <span data-product-non-sale-price-without-tax class="price price--non-sale"> */}
                    <span data-product-non-sale-price-without-tax="" className="price price--non-sale">
                        {/* html L66: {{price.non_sale_price_without_tax.formatted}} */}
                        {price.non_sale_price_without_tax.formatted}
                    </span>
                </div>
                {/* html L69: <div class="price-section price-section--withoutTax price--withoutTax" {{#unless price.without_tax}}style="display: none;"{{/unless}}> */}
                <div className="price-section price-section--withoutTax price--withoutTax" $$={$unless(price.without_tax).then(() => $$raw('style="display: none;"'))}>
                    {/* html L70: <span class="price-label" {{#if price.non_sale_price_without_tax}}style="display: none;"{{/if}}> */}
                    <span
                        className="price-label"
                        $$={$if(price.non_sale_price_without_tax).then(() => $$raw('style="display: none;"'))}
                    >
                        {/* html L71: {{theme_settings.pdp-price-label}} */}
                        {theme_settings['pdp-price-label']}
                    </span>
                    {/* html L73: <span class="price-now-label" {{#unless price.non_sale_price_without_tax}}style="display: none;"{{/unless}}> */}
                    <span
                        className="price-now-label"
                        $$={$unless(price.non_sale_price_without_tax).then(() => $$raw('style="display: none;"'))}
                    >
                        {/* html L74-77:
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
                    {/* html L79: <span data-product-price-without-tax class="price{{#if price.with_tax}} price-section--minor{{/if}}">{{price.without_tax.formatted}}</span> */}
                    <span data-product-price-without-tax="" className={`price${$if(price.with_tax).then(() => $$raw(' price-section--minor'))}`}>
                        {/* html L79: {{price.without_tax.formatted}} */}
                        {price.without_tax.formatted}
                    </span>
                    {/* html L80: {{#if price.with_tax}} */}
                    <$If
                        query={[price.with_tax]}
                        $then={() => (
                            /* html L81: <abbr title="{{lang 'products.excluding_tax'}}">{{lang 'products.price_without_tax' tax_label=price.tax_label}}</abbr> */
                            <abbr title={$lang($string('products.excluding_tax'))}>
                                {/* html L81: {{lang 'products.price_without_tax' tax_label=price.tax_label}} */}
                                {$lang($string('products.price_without_tax'), {tax_label: price.tax_label})}
                            </abbr>
                        )}
                    />
                </div>
                {/* html L84: {{#if page_type '===' 'product'}} */}
                <$If
                    query={[page_type, '===', $string('product')]}
                    $then={() => (
                        /* html L85: <div class="price-section price-section--saving price" {{#unless price.saved}}style="display: none;"{{/unless}}> */
                        <div className="price-section price-section--saving price" $$={$unless(price.saved).then(() => $$raw('style="display: none;"'))}>
                            {/* html L86: <span class="price">{{lang 'products.you_save_opening_text'}}</span> */}
                            <span className="price">{/* html L86: {{lang 'products.you_save_opening_text'}} */}{$lang($string('products.you_save_opening_text'))}</span>
                            {/* html L87: <span data-product-price-saved class="price price--saving"> */}
                            <span data-product-price-saved="" className="price price--saving">
                                {/* html L88: {{price.saved.formatted}} */}
                                {price.saved.formatted}
                            </span>
                            {/* html L90: <span class="price">{{lang 'products.you_save_closing_bracket'}}</span> */}
                            <span className="price">{/* html L90: {{lang 'products.you_save_closing_bracket'}} */}{$lang($string('products.you_save_closing_bracket'))}</span>
                        </div>
                    )}
                />
            </>
        )}
    />
));
