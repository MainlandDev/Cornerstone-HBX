"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$lang, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <>
        <div className="cart-total-value">
            <button
                className="coupon-code-add"
                aria-label={$lang($string("cart.coupons.add_coupon"))}
                aria-controls="add-coupon"
                aria-expanded="false"
            >
                <$Lang keyName={$string("cart.coupons.add_coupon")} />
            </button>

            <button
                className="coupon-code-cancel"
                style={{display: "none"}}
                aria-label={$lang($string("cart.coupons.add_coupon"))}
                aria-controls="add-coupon"
                aria-expanded="true"
            >
                <$Lang keyName={$string("cart.coupons.cancel")} />
            </button>
        </div>

        <div
            id="add-coupon"
            className="cart-form coupon-code"
            aria-hidden="true"
            style={{display: "none"}}
        >
            <form className="form form--hiddenLabels coupon-form" method="post" action={$pointer("urls.cart")}>
                <label className="form-label" htmlFor="couponcode">
                    <$Lang keyName={$string("cart.coupons.coupon_code")} />
                </label>
                <input
                    className="form-input"
                    data-error={$lang($string("cart.coupons.empty_error"))}
                    id="couponcode"
                    type="text"
                    name="couponcode"
                    value=""
                    placeholder={$lang($string("cart.coupons.coupon_code"))}
                />
                <input
                    className="button button--primary button--small"
                    type="submit"
                    aria-label={$lang($string("cart.coupons.apply_coupon"))}
                    value={$lang($string("cart.coupons.button"))}
                />
                <input type="hidden" name="action" value="applycoupon" />
            </form>
        </div>
    </>
);
