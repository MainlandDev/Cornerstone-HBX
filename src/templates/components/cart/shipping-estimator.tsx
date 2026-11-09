import {$Each, $If, $if, $string, $unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$And, $Inject, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {CartHint, ShippingHandling} from '@/context-cart';

type Shipping = NonNullable<CartHint['cart']['shipping_handling']>;

export default $asPartial<{
    shipping_cost: ShippingHandling['shipping_cost'];
    shipping_cost_discounted: ShippingHandling['shipping_cost_discounted'];
    countries: Shipping['countries'];
    states: ShippingHandling['states'];
    selected_city: Shipping['selected_city'];
    selected_zip: Shipping['selected_zip'];
    multi_coupon_ui_enabled: CartHint['cart']['multi_coupon_ui_enabled'];
}>(({shipping_cost, shipping_cost_discounted, countries, states, selected_city, selected_zip, multi_coupon_ui_enabled}) => (
    <>
        <$Inject keyName={$string('shippingCountryErrorMessage')} value={$lang($string('cart.shipping_estimator.empty_country_error'))}/>
        <$Inject keyName={$string('shippingProvinceErrorMessage')} value={$lang($string('cart.shipping_estimator.empty_province_error'))}/>

        <$If
            query={[shipping_cost]}
            $then={() => (
                <div className="cart-total-value">
                    <div className={`subtotal${$unless(multi_coupon_ui_enabled).then(() => $$raw(' shipping-estimate-show'))}`}>
                        <$If
                            query={[multi_coupon_ui_enabled]}
                            $then={() => (
                                <$And
                                    a={shipping_cost_discounted}
                                    b={$if(shipping_cost_discounted.formatted, '!==', shipping_cost.formatted)}
                                    $then={() => (
                                        <>
                                            <span className="price--discounted">{shipping_cost.formatted}</span>
                                            <span id="shipping-cost-discounted">{shipping_cost_discounted.formatted}</span>
                                        </>
                                    )}
                                    $else={() => <span id="shipping-cost-discounted">{shipping_cost.formatted}</span>}
                                />
                            )}
                            $else={() => (
                                <a href="#" className="shipping-estimate-value">
                                    <span className={`${$if(shipping_cost_discounted).then(() => $$raw('price--discounted'))}`}>
                                        {shipping_cost.formatted}
                                    </span>
                                    <$If
                                        query={[shipping_cost_discounted]}
                                        $then={() => <span id="shipping-cost-discounted">{shipping_cost_discounted.formatted}</span>}
                                    />
                                </a>
                            )}
                        />
                    </div>
                </div>
            )}
        />

        <div id="add-shipping" className="shipping-estimator u-hidden">
            <form className="form estimator-form" data-shipping-estimator="">
                <dl>
                    <dt className="estimator-form-label">
                        <label className="form-label" htmlFor="shipping-country">
                            <$Lang translationKey={$string('cart.shipping_estimator.select_a_country')}/>
                        </label>
                    </dt>

                    <dd className="estimator-form-input">
                        <select className="form-select" id="shipping-country" name="shipping-country" data-field-type="Country">
                            <option>
                                <$Lang translationKey={$string('cart.shipping_estimator.select_a_country')}/>
                            </option>
                            <$Each
                                list={countries}
                                $then={(country) => (
                                    <option value={country.id} $$={$if(country.selected).then(() => $$raw('selected="selected"'))}>
                                        {country.name}
                                    </option>
                                )}
                            />
                        </select>
                    </dd>

                    <dt className="estimator-form-label">
                        <label className="form-label" htmlFor="shipping-state">
                            <$Lang translationKey={$string('cart.shipping_estimator.select_a_state')}/>
                        </label>
                    </dt>

                    <dd className="estimator-form-input">
                        <$If
                            query={[states.length]}
                            $then={() => (
                                <select className="form-select" id="shipping-state" name="shipping-state" data-field-type="State">
                                    <option>
                                        <$Lang translationKey={$string('cart.shipping_estimator.select_a_state')}/>
                                    </option>
                                    <$Each
                                        list={states}
                                        $then={(state) => (
                                            <option value={state.id} $$={$if(state.selected).then(() => $$raw('selected="selected"'))}>
                                                {state.name}
                                            </option>
                                        )}
                                    />
                                </select>
                            )}
                            $else={() => (
                                <input
                                    className="form-input"
                                    type="text"
                                    id="shipping-state"
                                    name="shipping-state"
                                    data-field-type="State"
                                    placeholder={$lang($string('cart.shipping_estimator.select_a_state'))}
                                />
                            )}
                        />
                    </dd>

                    <dt className="estimator-form-label">
                        <label className="form-label" htmlFor="shipping-city">
                            <$Lang translationKey={$string('cart.shipping_estimator.suburb_city')}/>
                        </label>
                    </dt>
                    <dd className="estimator-form-input">
                        <input
                            className="form-input"
                            type="text"
                            id="shipping-city"
                            name="shipping-city"
                            value={selected_city}
                            placeholder={$lang($string('cart.shipping_estimator.suburb_city'))}
                        />
                    </dd>

                    <dt className="estimator-form-label">
                        <label className="form-label" htmlFor="shipping-zip">
                            <$Lang translationKey={$string('cart.shipping_estimator.zip_postal_code')}/>
                        </label>
                    </dt>
                    <dd className="estimator-form-input">
                        <input
                            autoComplete="postal-code"
                            className="form-input"
                            type="text"
                            id="shipping-zip"
                            name="shipping-zip"
                            value={selected_zip}
                            placeholder={$lang($string('cart.shipping_estimator.zip_postal_code'))}
                        />
                    </dd>
                    <button className="button button--primary button--small shipping-estimate-submit">
                        <$Lang translationKey={$string('cart.shipping_estimator.estimate_shipping')}/>
                    </button>
                </dl>
            </form>
            <div className="shipping-quotes" role="alert" aria-atomic="true" aria-live="assertive"></div>
        </div>
    </>
));
