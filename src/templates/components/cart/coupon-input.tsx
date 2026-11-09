import {$string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {CartHint} from '@/context-cart';

export default $asPartial<{urls: CartHint['urls']}>(({urls}) => (
    <>
        <div className="cart-total-value">
            <button className="coupon-code-add" aria-label={$lang($string('cart.coupons.add_coupon'))} aria-controls="add-coupon" aria-expanded="false">
                <$Lang translationKey={$string('cart.coupons.add_coupon')}/>
            </button>

            <button
                className="coupon-code-cancel"
                style={{display: 'none'}}
                aria-label={$lang($string('cart.coupons.add_coupon'))}
                aria-controls="add-coupon"
                aria-expanded="true"
            >
                <$Lang translationKey={$string('cart.coupons.cancel')}/>
            </button>
        </div>

        <div id="add-coupon" className="cart-form coupon-code" aria-hidden="true" style={{display: 'none'}}>
            <form className="form form--hiddenLabels coupon-form" method="post" action={urls.cart}>
                <label className="form-label" htmlFor="couponcode">
                    <$Lang translationKey={$string('cart.coupons.coupon_code')}/>
                </label>
                <input
                    className="form-input"
                    data-error={$lang($string('cart.coupons.empty_error'))}
                    id="couponcode"
                    type="text"
                    name="couponcode"
                    value=""
                    placeholder={$lang($string('cart.coupons.coupon_code'))}
                />
                <input
                    className="button button--primary button--small"
                    type="submit"
                    aria-label={$lang($string('cart.coupons.apply_coupon'))}
                    value={$lang($string('cart.coupons.button'))}
                />
                <input type="hidden" name="action" value="applycoupon"/>
            </form>
        </div>
    </>
));
