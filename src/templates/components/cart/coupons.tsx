import {$Each, $If, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {CartHint} from '@/context-cart';

export default $asPartial<{cart: CartHint['cart']; urls: CartHint['urls']}>(({cart, urls}) => (
    <div className="cart-coupons">
        <div className="cart-coupon-trigger">
            <a href="#" className="cart-coupon-link" data-coupon-trigger="">
                <$Lang translationKey={$string('cart.coupons.apply_coupon_code')}/>
            </a>
        </div>

        <div className="cart-form coupon-code-form" data-coupon-form="" style={{display: 'none'}}>
            <form className="form form--hiddenLabels coupon-form" action={urls.cart} method="post">
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

        <$If
            query={[cart.coupons.length]}
            $then={() => (
                <div className="cart-coupon-display">
                    <ul className="cart-coupon-list">
                        <$Each
                            list={cart.coupons}
                            $then={(coupon) => (
                                <li className="cart-coupon-item">
                                    <i className="icon" aria-hidden="true">
                                        <svg>
                                            <use href="#icon-promotions"/>
                                        </svg>
                                    </i>
                                    <$If
                                        query={[coupon.display_name]}
                                        $then={() => <span className="cart-coupon-name">{coupon.display_name} ({coupon.code})</span>}
                                        $else={() => <span className="cart-coupon-name">{coupon.code}</span>}
                                    />
                                    <a className="cart-coupon-remove" aria-label={$lang($string('cart.coupons.remove'))} href={coupon.remove_url}>
                                        <i className="icon" aria-hidden="true">
                                            <svg>
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
