import {$lang, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <div
        id="add-certificate"
        className="cart-form gift-certificate-code"
        aria-hidden="true"
        style={{display: "none"}}
    >
        <form className="form form--hiddenLabels cart-gift-certificate-form" method="post" action={$pointer("urls.cart")}>
            <label className="form-label" htmlFor="certcode">
                <$Lang keyName={$string("cart.gift_certificates.cert_code")} />
            </label>
            <input
                className="form-input"
                id="certcode"
                type="text"
                name="certcode"
                value=""
                placeholder={$lang($string("cart.gift_certificates.add_cert_code"))}
            />
            <input
                className="button button--primary button--small"
                aria-label={$lang($string("cart.gift_certificates.apply_gift_certificate"))}
                type="submit"
                value={$lang($string("cart.coupons.button"))}
            />
            <input type="hidden" name="action" value="applycoupon" />
        </form>
    </div>
);
