/**
 * Source: templates/components/cart/shipping-estimator-trigger.html (28 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $string, $unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {CartHint} from '@/context-cart';

export default $asPartial<{cart: CartHint['cart']}>(({cart}) => (
    /* html L1: <div class="{{#unless cart.multi_coupon_ui_enabled}}cart-total-value{{/unless}}"> */
    <div className={`${$unless(cart.multi_coupon_ui_enabled).then(() => $$raw('cart-total-value'))}`}>
        {/* html L2: <button data-collapsible="add-shipping" class="shipping-estimate-show" aria-labelledby="estimator-add"> */}
        <button data-collapsible="add-shipping" className="shipping-estimate-show" aria-labelledby="estimator-add">
            {/* html L3: <span class="shipping-estimate-show__btn-name"> */}
            <span className="shipping-estimate-show__btn-name">
                {/* html L4: {{#if cart.shipping_handling.shipping_cost}} */}
                <$If
                    query={[cart.shipping_handling.shipping_cost]}
                    $then={() => /* html L5: {{lang 'cart.gift_wrapping.change'}} */ <$Lang translationKey={$string('cart.gift_wrapping.change')}/>}
                    $else={() => (
                        /* html L6: {{else}}
                                                      html L7: {{#if cart.multi_coupon_ui_enabled}}
                        */
                        <$If
                            query={[cart.multi_coupon_ui_enabled]}
                            $then={() => /* html L8: {{lang 'cart.gift_wrapping.add'}} */ <$Lang translationKey={$string('cart.gift_wrapping.add')}/>}
                            $else={() => /* html L9: {{else}}
                                                                                        html L10: {{lang 'cart.shipping_estimator.add_info'}}
                                         */ <$Lang translationKey={$string('cart.shipping_estimator.add_info')}/>}
                        />
                    )}
                />
            </span>
            {/* html L14: <span id="estimator-add" class="u-hidden"> */}
            <span id="estimator-add" className="u-hidden">
                {/* html L15: {{#if cart.shipping_handling.shipping_cost}} */}
                <$If
                    query={[cart.shipping_handling.shipping_cost]}
                    $then={() => /* html L16: {{lang 'cart.gift_wrapping.change'}} */ <$Lang translationKey={$string('cart.gift_wrapping.change')}/>}
                    $else={() => (
                        /* html L17: {{else}}
                                                      html L18: {{#if cart.multi_coupon_ui_enabled}}
                        */
                        <$If
                            query={[cart.multi_coupon_ui_enabled]}
                            $then={() => /* html L19: {{lang 'cart.gift_wrapping.add'}} */ <$Lang translationKey={$string('cart.gift_wrapping.add')}/>}
                            $else={() => /* html L20: {{else}}
                                                                                        html L21: {{lang 'cart.shipping_estimator.add_info'}}
                                         */ <$Lang translationKey={$string('cart.shipping_estimator.add_info')}/>}
                        />
                    )}
                />
            </span>
            {/* html L25: <span id="estimator-close" class="u-hidden">{{lang 'cart.shipping_estimator.cancel'}}</span> */}
            <span id="estimator-close" className="u-hidden">
                {/* html L25: {{lang 'cart.shipping_estimator.cancel'}} */}
                <$Lang translationKey={$string('cart.shipping_estimator.cancel')}/>
            </span>
        </button>
    </div>
));
