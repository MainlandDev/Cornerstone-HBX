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
    <$If
        query={[bulk_discount_rates.length]}
        $then={() => (
            <>
                <$If
                    query={[product]}
                    $then={() => <dt className="productView-info-name">{$lang($string('products.bulk_pricing.title'))}</dt>}
                />
                <dd className="productView-info-value">
                    <a
                        href={`${product.url}#bulk_pricing`}
                        $$={$unless(is_ajax).then(() => [$$raw('data-reveal-id="modal-bulk-pricing'), $if(id).then(() => [$$raw('-'), id]), $$raw('"')])}
                    >
                        {$lang($string('products.bulk_pricing.view'))}
                    </a>
                </dd>
                <div id={`modal-bulk-pricing${$if(id).then(() => [$$raw('-'), id])}`} className="modal modal--small" data-reveal="">
                    <div className="modal-header">
                        <h2 className="modal-header-title">{$lang($string('products.bulk_pricing.modal_title'))}</h2>
                        <$Partial name="components/common/modal/modal-close-btn"/>
                    </div>
                    <div className="modal-body">
                        <p>{$lang($string('products.bulk_pricing.instructions'))}</p>
                        <ul>
                            <$Each
                                list={bulk_discount_rates}
                                $then={(rate) => (
                                    <li>
                                        {$lang($string('products.bulk_pricing.range'), {min: rate.min, max: rate.max})}
                                        <$If
                                            query={[rate.type, '===', $string('percent')]}
                                            $then={() => <>{$lang($string('products.bulk_pricing.percent'), {discount: rate.discount.formatted})}</>}
                                            $elseThen={[
                                                {
                                                    query: [rate.type, '===', $string('fixed')],
                                                    $then: () => (
                                                        <$If
                                                            query={[rate.discount_inc_tax]}
                                                            $then={() => (
                                                                <>
                                                                    {$lang($string('products.bulk_pricing.fixed_both.prefix'))}
                                                                    <br/>
                                                                    {rate.discount_inc_tax.formatted}
                                                                    {$lang($string('products.price_with_tax'), {tax_label: product.price.tax_label})}
                                                                    <br/>
                                                                    {rate.discount.formatted}
                                                                    {$lang($string('products.price_without_tax'), {tax_label: product.price.tax_label})}
                                                                    {$lang($string('products.bulk_pricing.fixed_both.suffix'))}
                                                                </>
                                                            )}
                                                            $else={() => <>{$lang($string('products.bulk_pricing.fixed'), {discount: rate.discount.formatted})}</>}
                                                        />
                                                    ),
                                                },
                                                {
                                                    query: [rate.type, '===', $string('price')],
                                                    $then: () => <>{$lang($string('products.bulk_pricing.price'), {discount: rate.discount.formatted})}</>,
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
