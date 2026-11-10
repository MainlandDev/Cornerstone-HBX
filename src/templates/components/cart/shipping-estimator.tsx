/**
 * Source: templates/components/cart/shipping-estimator.html (81 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
        {/* html L1: {{inject 'shippingCountryErrorMessage' (lang 'cart.shipping_estimator.empty_country_error')}} */}
        <$Inject keyName={$string('shippingCountryErrorMessage')} value={$lang($string('cart.shipping_estimator.empty_country_error'))}/>
        {/* html L2: {{inject 'shippingProvinceErrorMessage' (lang 'cart.shipping_estimator.empty_province_error')}} */}
        <$Inject keyName={$string('shippingProvinceErrorMessage')} value={$lang($string('cart.shipping_estimator.empty_province_error'))}/>

        {/* html L4: {{#if shipping_cost}} */}
        <$If
            query={[shipping_cost]}
            $then={() => (
                /* html L5: <div class="cart-total-value"> */
                <div className="cart-total-value">
                    {/* html L6: <div class="subtotal{{#unless multi_coupon_ui_enabled}} shipping-estimate-show{{/unless}}"> */}
                    <div className={`subtotal${$unless(multi_coupon_ui_enabled).then(() => $$raw(' shipping-estimate-show'))}`}>
                        {/* html L7: {{#if multi_coupon_ui_enabled}} */}
                        <$If
                            query={[multi_coupon_ui_enabled]}
                            $then={() => (
                                /* html L8: {{#and shipping_cost_discounted (if shipping_cost_discounted.formatted '!==' shipping_cost.formatted)}} */
                                <$And
                                    a={shipping_cost_discounted}
                                    b={$if(shipping_cost_discounted.formatted, '!==', shipping_cost.formatted)}
                                    $then={() => (
                                        <>
                                            {/* html L9: <span class="price--discounted">{{shipping_cost.formatted}}</span> */}
                                            <span className="price--discounted">{/* html L9: {{shipping_cost.formatted}} */}{shipping_cost.formatted}</span>
                                            {/* html L10: <span id="shipping-cost-discounted">{{shipping_cost_discounted.formatted}}</span> */}
                                            <span id="shipping-cost-discounted">{/* html L10: {{shipping_cost_discounted.formatted}} */}{shipping_cost_discounted.formatted}</span>
                                        </>
                                    )}
                                    $else={() => /* html L11: {{else}}
                                                                                                        html L12: <span id="shipping-cost-discounted">{{shipping_cost.formatted}}</span>
                                                 */ <span id="shipping-cost-discounted">{/* html L12: {{shipping_cost.formatted}} */}{shipping_cost.formatted}</span>}
                                />
                            )}
                            $else={() => (
                                /* html L14: {{else}}
                                                                      html L15: <a href="#" class="shipping-estimate-value">
                                */
                                <a href="#" className="shipping-estimate-value">
                                    {/* html L16: <span class="{{#if shipping_cost_discounted}}price--discounted{{/if}}">{{shipping_cost.formatted}}</span> */}
                                    <span className={`${$if(shipping_cost_discounted).then(() => $$raw('price--discounted'))}`}>
                                        {/* html L16: {{shipping_cost.formatted}} */}
                                        {shipping_cost.formatted}
                                    </span>
                                    {/* html L17: {{#if shipping_cost_discounted}} */}
                                    <$If
                                        query={[shipping_cost_discounted]}
                                        $then={() => /* html L18: <span id="shipping-cost-discounted">{{shipping_cost_discounted.formatted}}</span> */ <span id="shipping-cost-discounted">{/* html L18: {{shipping_cost_discounted.formatted}} */}{shipping_cost_discounted.formatted}</span>}
                                    />
                                </a>
                            )}
                        />
                    </div>
                </div>
            )}
        />

        {/* html L26: <div id="add-shipping" class="shipping-estimator u-hidden"> */}
        <div id="add-shipping" className="shipping-estimator u-hidden">
            {/* html L27: <form class="form estimator-form" data-shipping-estimator> */}
            <form className="form estimator-form" data-shipping-estimator="">
                {/* html L28: <dl> */}
                <dl>
                    {/* html L29: <dt class="estimator-form-label"> */}
                    <dt className="estimator-form-label">
                        {/* html L30: <label class="form-label" for="shipping-country">{{lang 'cart.shipping_estimator.select_a_country'}}</label> */}
                        <label className="form-label" htmlFor="shipping-country">
                            {/* html L30: {{lang 'cart.shipping_estimator.select_a_country'}} */}
                            <$Lang translationKey={$string('cart.shipping_estimator.select_a_country')}/>
                        </label>
                    </dt>

                    {/* html L33: <dd class="estimator-form-input"> */}
                    <dd className="estimator-form-input">
                        {/* html L34: <select class="form-select" id="shipping-country" name="shipping-country" data-field-type="Country"> */}
                        <select className="form-select" id="shipping-country" name="shipping-country" data-field-type="Country">
                            {/* html L35: <option>{{lang 'cart.shipping_estimator.select_a_country'}}</option> */}
                            <option>
                                {/* html L35: {{lang 'cart.shipping_estimator.select_a_country'}} */}
                                <$Lang translationKey={$string('cart.shipping_estimator.select_a_country')}/>
                            </option>
                            {/* html L36: {{#each countries}} */}
                            <$Each
                                list={countries}
                                $then={(country) => (
                                    /* html L37: <option value="{{id}}" {{#if selected}}selected="selected"{{/if}}> */
                                    <option value={country.id} $$={$if(country.selected).then(() => $$raw('selected="selected"'))}>
                                        {/* html L38: {{name}} */}
                                        {country.name}
                                    </option>
                                )}
                            />
                        </select>
                    </dd>

                    {/* html L44: <dt class="estimator-form-label"> */}
                    <dt className="estimator-form-label">
                        {/* html L45: <label class="form-label" for="shipping-state">{{lang 'cart.shipping_estimator.select_a_state'}}</label> */}
                        <label className="form-label" htmlFor="shipping-state">
                            {/* html L45: {{lang 'cart.shipping_estimator.select_a_state'}} */}
                            <$Lang translationKey={$string('cart.shipping_estimator.select_a_state')}/>
                        </label>
                    </dt>

                    {/* html L48: <dd class="estimator-form-input"> */}
                    <dd className="estimator-form-input">
                        {/* html L49: {{#if states.length}} */}
                        <$If
                            query={[states.length]}
                            $then={() => (
                                /* html L50: <select class="form-select" id="shipping-state" name="shipping-state" data-field-type="State"> */
                                <select className="form-select" id="shipping-state" name="shipping-state" data-field-type="State">
                                    {/* html L51: <option>{{lang 'cart.shipping_estimator.select_a_state'}}</option> */}
                                    <option>
                                        {/* html L51: {{lang 'cart.shipping_estimator.select_a_state'}} */}
                                        <$Lang translationKey={$string('cart.shipping_estimator.select_a_state')}/>
                                    </option>
                                    {/* html L52: {{#each states}} */}
                                    <$Each
                                        list={states}
                                        $then={(state) => (
                                            /* html L53: <option value="{{id}}" {{#if selected}}selected="selected"{{/if}}> */
                                            <option value={state.id} $$={$if(state.selected).then(() => $$raw('selected="selected"'))}>
                                                {/* html L54: {{name}} */}
                                                {state.name}
                                            </option>
                                        )}
                                    />
                                </select>
                            )}
                            $else={() => (
                                /* html L58: {{else}}
                                                                      html L59: <input class="form-input" type="text" id="shipping-state" name="shipping-state" data-field-type="State" placeholder="{{lang 'cart.shipping_estimator.select_a_state'}}">
                                */
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

                    {/* html L63: <dt class="estimator-form-label"> */}
                    <dt className="estimator-form-label">
                        {/* html L64: <label class="form-label" for="shipping-city">{{lang 'cart.shipping_estimator.suburb_city'}}</label> */}
                        <label className="form-label" htmlFor="shipping-city">
                            {/* html L64: {{lang 'cart.shipping_estimator.suburb_city'}} */}
                            <$Lang translationKey={$string('cart.shipping_estimator.suburb_city')}/>
                        </label>
                    </dt>
                    {/* html L66: <dd class="estimator-form-input"> */}
                    <dd className="estimator-form-input">
                        {/* html L67: <input class="form-input" type="text" id="shipping-city" name="shipping-city" value="{{selected_city}}" placeholder="{{lang 'cart.shipping_estimator.suburb_city'}}"> */}
                        <input
                            className="form-input"
                            type="text"
                            id="shipping-city"
                            name="shipping-city"
                            value={selected_city}
                            placeholder={$lang($string('cart.shipping_estimator.suburb_city'))}
                        />
                    </dd>

                    {/* html L70: <dt class="estimator-form-label"> */}
                    <dt className="estimator-form-label">
                        {/* html L71: <label class="form-label" for="shipping-zip">{{lang 'cart.shipping_estimator.zip_postal_code'}}</label> */}
                        <label className="form-label" htmlFor="shipping-zip">
                            {/* html L71: {{lang 'cart.shipping_estimator.zip_postal_code'}} */}
                            <$Lang translationKey={$string('cart.shipping_estimator.zip_postal_code')}/>
                        </label>
                    </dt>
                    {/* html L73: <dd class="estimator-form-input"> */}
                    <dd className="estimator-form-input">
                        {/* html L74: <input autocomplete="postal-code" class="form-input" type="text" id="shipping-zip" name="shipping-zip" value="{{selected_zip}}" placeholder="{{lang 'cart.shipping_estimator.zip_postal_code'}}"> */}
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
                    {/* html L76: <button class="button button--primary button--small shipping-estimate-submit">{{lang 'cart.shipping_estimator.estimate_shipping'}}</button> */}
                    <button className="button button--primary button--small shipping-estimate-submit">
                        {/* html L76: {{lang 'cart.shipping_estimator.estimate_shipping'}} */}
                        <$Lang translationKey={$string('cart.shipping_estimator.estimate_shipping')}/>
                    </button>
                </dl>
            </form>
            {/* html L79: <div class="shipping-quotes" role="alert" aria-atomic="true" aria-live="assertive"></div> */}
            <div className="shipping-quotes" role="alert" aria-atomic="true" aria-live="assertive"></div>
        </div>
    </>
));
