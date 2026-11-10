/**
 * Source: templates/components/cart/coupons.html (40 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {CartHint} from '@/context-cart';

export default $asPartial<{cart: CartHint['cart']; urls: CartHint['urls']}>(({cart, urls}) => (
    /* html L1: <div class="cart-coupons"> */
    <div className="cart-coupons">
        {/* html L2: <div class="cart-coupon-trigger"> */}
        <div className="cart-coupon-trigger">
            {/* html L3: <a href="#" class="cart-coupon-link" data-coupon-trigger> */}
            <a href="#" className="cart-coupon-link" data-coupon-trigger="">
                {/* html L4: {{lang 'cart.coupons.apply_coupon_code'}} */}
                <$Lang translationKey={$string('cart.coupons.apply_coupon_code')}/>
            </a>
        </div>

        {/* html L8: <div class="cart-form coupon-code-form" data-coupon-form style="display: none;"> */}
        <div className="cart-form coupon-code-form" data-coupon-form="" style={{display: 'none'}}>
            {/* html L9: <form class="form form--hiddenLabels coupon-form" action="{{urls.cart}}" method="post"> */}
            <form className="form form--hiddenLabels coupon-form" action={urls.cart} method="post">
                {/* html L10: <input class="form-input" data-error="{{lang 'cart.coupons.empty_error'}}"  id="couponcode" type="text" name="couponcode" value="" placeholder="{{lang 'cart.coupons.coupon_code'}}"> */}
                <input
                    className="form-input"
                    data-error={$lang($string('cart.coupons.empty_error'))}
                    id="couponcode"
                    type="text"
                    name="couponcode"
                    value=""
                    placeholder={$lang($string('cart.coupons.coupon_code'))}
                />
                {/* html L11: <input class="button button--primary button--small" type="submit" aria-label="{{lang 'cart.coupons.apply_coupon'}}" value="{{lang 'cart.coupons.button'}}"> */}
                <input
                    className="button button--primary button--small"
                    type="submit"
                    aria-label={$lang($string('cart.coupons.apply_coupon'))}
                    value={$lang($string('cart.coupons.button'))}
                />
                {/* html L12: <input type="hidden" name="action" value="applycoupon"> */}
                <input type="hidden" name="action" value="applycoupon"/>
            </form>
        </div>

        {/* html L16: {{#if cart.coupons.length}} */}
        <$If
            query={[cart.coupons.length]}
            $then={() => (
                /* html L17: <div class="cart-coupon-display"> */
                <div className="cart-coupon-display">
                    {/* html L18: <ul class="cart-coupon-list"> */}
                    <ul className="cart-coupon-list">
                        {/* html L19: {{#each cart.coupons}} */}
                        <$Each
                            list={cart.coupons}
                            $then={(coupon) => (
                                /* html L20: <li class="cart-coupon-item"> */
                                <li className="cart-coupon-item">
                                    {/* html L21: <i class="icon" aria-hidden="true"><svg><use href="#icon-promotions" /></svg></i> */}
                                    <i className="icon" aria-hidden="true">
                                        {/* html L21: <svg> */}
                                        <svg>
                                            {/* html L21: <use href="#icon-promotions" /> */}
                                            <use href="#icon-promotions"/>
                                        </svg>
                                    </i>
                                    {/* html L22: {{#if display_name}} */}
                                    <$If
                                        query={[coupon.display_name]}
                                        $then={() => /* html L23: <span class="cart-coupon-name">{{display_name}} ({{code}})</span> */ <span className="cart-coupon-name">{/* html L23: {{display_name}} */}{coupon.display_name} ({/* html L23: {{code}} */}{coupon.code})</span>}
                                        $else={() => /* html L24: {{else}}
                                                                                                                html L25: <span class="cart-coupon-name">{{code}}</span>
                                                     */ <span className="cart-coupon-name">{/* html L25: {{code}} */}{coupon.code}</span>}
                                    />
                                    {/* html L27-31:
                                       <a
                                           class="cart-coupon-remove"
                                           aria-label="{{lang 'cart.coupons.remove'}}"
                                           href="{{remove_url}}"
                                       >
                                    */}
                                    <a className="cart-coupon-remove" aria-label={$lang($string('cart.coupons.remove'))} href={coupon.remove_url}>
                                        {/* html L32: <i class="icon" aria-hidden="true"><svg><use href="#icon-close" /></svg></i> */}
                                        <i className="icon" aria-hidden="true">
                                            {/* html L32: <svg> */}
                                            <svg>
                                                {/* html L32: <use href="#icon-close" /> */}
                                                <use href="#icon-close"/>
                                            </svg>
                                        </i>
                                    </a>
                                </li>
                            )}
                        />
                    </ul>
                </div>
            )}
        />
    </div>
));
