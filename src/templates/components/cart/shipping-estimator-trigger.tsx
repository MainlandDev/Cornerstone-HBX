import {$If, $string, $unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {CartHint} from '@/context-cart';

export default $asPartial<{cart: CartHint['cart']}>(({cart}) => (
    <div className={`${$unless(cart.multi_coupon_ui_enabled).then(() => $$raw('cart-total-value'))}`}>
        <button data-collapsible="add-shipping" className="shipping-estimate-show" aria-labelledby="estimator-add">
            <span className="shipping-estimate-show__btn-name">
                <$If
                    query={[cart.shipping_handling.shipping_cost]}
                    $then={() => <$Lang translationKey={$string('cart.gift_wrapping.change')}/>}
                    $else={() => (
                        <$If
                            query={[cart.multi_coupon_ui_enabled]}
                            $then={() => <$Lang translationKey={$string('cart.gift_wrapping.add')}/>}
                            $else={() => <$Lang translationKey={$string('cart.shipping_estimator.add_info')}/>}
                        />
                    )}
                />
            </span>
            <span id="estimator-add" className="u-hidden">
                <$If
                    query={[cart.shipping_handling.shipping_cost]}
                    $then={() => <$Lang translationKey={$string('cart.gift_wrapping.change')}/>}
                    $else={() => (
                        <$If
                            query={[cart.multi_coupon_ui_enabled]}
                            $then={() => <$Lang translationKey={$string('cart.gift_wrapping.add')}/>}
                            $else={() => <$Lang translationKey={$string('cart.shipping_estimator.add_info')}/>}
                        />
                    )}
                />
            </span>
            <span id="estimator-close" className="u-hidden">
                <$Lang translationKey={$string('cart.shipping_estimator.cancel')}/>
            </span>
        </button>
    </div>
));
