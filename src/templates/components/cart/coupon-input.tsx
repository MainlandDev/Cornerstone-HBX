/**
 * Source: templates/components/cart/coupon-input.html (30 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {CartHint} from '@/context-cart';

export default $asPartial<{urls: CartHint['urls']}>(({urls}) => (
    <>
        {/* html L1: <div class="cart-total-value"> */}
        <div className="cart-total-value">
            {/* html L2-7:
               <button
                   class="coupon-code-add"
                   aria-label="{{lang 'cart.coupons.add_coupon'}}"
                   aria-controls="add-coupon"
                   aria-expanded="false"
               >
            */}
            <button className="coupon-code-add" aria-label={$lang($string('cart.coupons.add_coupon'))} aria-controls="add-coupon" aria-expanded="false">
                {/* html L8: {{lang 'cart.coupons.add_coupon'}} */}
                <$Lang translationKey={$string('cart.coupons.add_coupon')}/>
            </button>

            {/* html L11-17:
               <button
                   class="coupon-code-cancel"
                   style="display: none;"
                   aria-label="{{lang 'cart.coupons.add_coupon'}}"
                   aria-controls="add-coupon"
                   aria-expanded="true"
               >
            */}
            <button
                className="coupon-code-cancel"
                style={{display: 'none'}}
                aria-label={$lang($string('cart.coupons.add_coupon'))}
                aria-controls="add-coupon"
                aria-expanded="true"
            >
                {/* html L18: {{lang 'cart.coupons.cancel'}} */}
                <$Lang translationKey={$string('cart.coupons.cancel')}/>
            </button>
        </div>

        {/* html L22: <div id="add-coupon" class="cart-form coupon-code" aria-hidden="true" style="display: none;"> */}
        <div id="add-coupon" className="cart-form coupon-code" aria-hidden="true" style={{display: 'none'}}>
            {/* html L23: <form class="form form--hiddenLabels coupon-form" method="post" action="{{urls.cart}}"> */}
            <form className="form form--hiddenLabels coupon-form" method="post" action={urls.cart}>
                {/* html L24: <label class="form-label" for="couponcode">{{lang 'cart.coupons.coupon_code'}}</label> */}
                <label className="form-label" htmlFor="couponcode">
                    {/* html L24: {{lang 'cart.coupons.coupon_code'}} */}
                    <$Lang translationKey={$string('cart.coupons.coupon_code')}/>
                </label>
                {/* html L25: <input class="form-input" data-error="{{lang 'cart.coupons.empty_error'}}"  id="couponcode" type="text" name="couponcode" value="" placeholder="{{lang 'cart.coupons.coupon_code'}}"> */}
                <input
                    className="form-input"
                    data-error={$lang($string('cart.coupons.empty_error'))}
                    id="couponcode"
                    type="text"
                    name="couponcode"
                    value=""
                    placeholder={$lang($string('cart.coupons.coupon_code'))}
                />
                {/* html L26: <input class="button button--primary button--small" type="submit" aria-label="{{lang 'cart.coupons.apply_coupon'}}" value="{{lang 'cart.coupons.button'}}"> */}
                <input
                    className="button button--primary button--small"
                    type="submit"
                    aria-label={$lang($string('cart.coupons.apply_coupon'))}
                    value={$lang($string('cart.coupons.button'))}
                />
                {/* html L27: <input type="hidden" name="action" value="applycoupon"> */}
                <input type="hidden" name="action" value="applycoupon"/>
            </form>
        </div>
    </>
));
