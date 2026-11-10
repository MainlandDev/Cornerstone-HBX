/**
 * Source: templates/components/products/bulk-discount-rates.html (44 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Each, $If, $Partial, $if, $string, $unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';

type Str = HandlebarsInlineValueToken<string>;
type Num = HandlebarsInlineValueToken<number>;
type Bool = HandlebarsInlineValueToken<boolean>;

/** A bulk pricing tier. `discount_inc_tax` is only present when the store shows tax-inclusive discounts. */
type BulkDiscountRate = {
    type: Str;
    min: Num;
    max: Num;
    discount: {formatted: Str};
    discount_inc_tax?: {formatted: Str};
};

/**
 * Requested at runtime by JS (`template:` / `render_with`) and included from `components/products/card` (with no arguments).
 */
export default $asPartial<{
    bulk_discount_rates: Array<BulkDiscountRate>;
    product: {url: Str; price: {tax_label: Str}};
    id: Num;
    is_ajax: Bool;
}>(({bulk_discount_rates, product, id, is_ajax}) => (
    /* html L1: {{#if bulk_discount_rates.length}} */
    <$If
        query={[bulk_discount_rates.length]}
        $then={() => (
            <>
                {/* html L2: {{#if product}}<dt class="productView-info-name">{{lang 'products.bulk_pricing.title'}}</dt>{{/if}} */}
                <$If
                    query={[product]}
                    $then={() => /* html L2: <dt class="productView-info-name"> */ <dt className="productView-info-name">{/* html L2: {{lang 'products.bulk_pricing.title'}} */}{$lang($string('products.bulk_pricing.title'))}</dt>}
                />
                {/* html L3: <dd class="productView-info-value"> */}
                <dd className="productView-info-value">
                    {/* html L4-5:
                       <a href="{{product.url}}#bulk_pricing"
                          {{#unless is_ajax }}data-reveal-id="modal-bulk-pricing{{#if id}}-{{id}}{{/if}}"{{/unless}}>
                    */}
                    <a
                        href={`${product.url}#bulk_pricing`}
                        $$={$unless(is_ajax).then(() => [$$raw('data-reveal-id="modal-bulk-pricing'), $if(id).then(() => [$$raw('-'), id]), $$raw('"')])}
                    >
                        {/* html L6: {{lang 'products.bulk_pricing.view'}} */}
                        {$lang($string('products.bulk_pricing.view'))}
                    </a>
                </dd>
                {/* html L9: <div id="modal-bulk-pricing{{#if id}}-{{id}}{{/if}}" class="modal modal--small" data-reveal> */}
                <div id={`modal-bulk-pricing${$if(id).then(() => [$$raw('-'), id])}`} className="modal modal--small" data-reveal="">
                    {/* html L10: <div class="modal-header"> */}
                    <div className="modal-header">
                        {/* html L11: <h2 class="modal-header-title">{{lang 'products.bulk_pricing.modal_title'}}</h2> */}
                        <h2 className="modal-header-title">{/* html L11: {{lang 'products.bulk_pricing.modal_title'}} */}{$lang($string('products.bulk_pricing.modal_title'))}</h2>
                        {/* html L12: {{> components/common/modal/modal-close-btn}} */}
                        <$Partial name="components/common/modal/modal-close-btn"/>
                    </div>
                    {/* html L14: <div class="modal-body"> */}
                    <div className="modal-body">
                        {/* html L15: <p>{{lang 'products.bulk_pricing.instructions'}}</p> */}
                        <p>{/* html L15: {{lang 'products.bulk_pricing.instructions'}} */}{$lang($string('products.bulk_pricing.instructions'))}</p>
                        {/* html L16: <ul> */}
                        <ul>
                            {/* html L17: {{#each bulk_discount_rates}} */}
                            <$Each
                                list={bulk_discount_rates}
                                $then={(rate) => (
                                    /* html L18: <li> */
                                    <li>
                                        {/* html L19: {{lang 'products.bulk_pricing.range' min=min max=max}} */}
                                        {$lang($string('products.bulk_pricing.range'), {min: rate.min, max: rate.max})}
                                        {/* html L20: {{#if type '===' 'percent'}} */}
                                        <$If
                                            query={[rate.type, '===', $string('percent')]}
                                            $then={() => <>{/* html L21: {{lang 'products.bulk_pricing.percent' discount=discount.formatted}} */}{$lang($string('products.bulk_pricing.percent'), {discount: rate.discount.formatted})}</>}
                                            $elseThen={[
                                                {
                                                    query: [rate.type, '===', $string('fixed')],
                                                    $then: () => (
                                                        /* html L22: {{else if type '===' 'fixed'}}
                                                                                                                      html L23: {{#if discount_inc_tax}}
                                                        */
                                                        <$If
                                                            query={[rate.discount_inc_tax]}
                                                            $then={() => (
                                                                <>
                                                                    {/* html L24: {{lang 'products.bulk_pricing.fixed_both.prefix'}} */}
                                                                    {$lang($string('products.bulk_pricing.fixed_both.prefix'))}
                                                                    {/* html L25: <br> */}
                                                                    <br/>
                                                                    {/* html L26: {{discount_inc_tax.formatted}} */}
                                                                    {rate.discount_inc_tax.formatted}
                                                                    {/* html L27: {{lang 'products.price_with_tax' tax_label=../product.price.tax_label}} */}
                                                                    {$lang($string('products.price_with_tax'), {tax_label: product.price.tax_label})}
                                                                    {/* html L28: <br> */}
                                                                    <br/>
                                                                    {/* html L29: {{discount.formatted}} */}
                                                                    {rate.discount.formatted}
                                                                    {/* html L30: {{lang 'products.price_without_tax' tax_label=../product.price.tax_label}} */}
                                                                    {$lang($string('products.price_without_tax'), {tax_label: product.price.tax_label})}
                                                                    {/* html L31: {{lang 'products.bulk_pricing.fixed_both.suffix'}} */}
                                                                    {$lang($string('products.bulk_pricing.fixed_both.suffix'))}
                                                                </>
                                                            )}
                                                            $else={() => <>{/* html L32: {{else}}
                                                                                                                                                            html L33: {{lang 'products.bulk_pricing.fixed' discount=discount.formatted}}
                                                                           */}{$lang($string('products.bulk_pricing.fixed'), {discount: rate.discount.formatted})}</>}
                                                        />
                                                    ),
                                                },
                                                {
                                                    query: [rate.type, '===', $string('price')],
                                                    $then: () => <>{/* html L35: {{else if type '===' 'price'}}
                                                                                                                                            html L36: {{lang 'products.bulk_pricing.price' discount=discount.formatted}}
                                                                   */}{$lang($string('products.bulk_pricing.price'), {discount: rate.discount.formatted})}</>,
                                                },
                                            ]}
                                        />
                                    </li>
                                )}
                            />
                        </ul>
                    </div>
                </div>
            </>
        )}
    />
));
