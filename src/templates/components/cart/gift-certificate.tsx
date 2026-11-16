"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $lang, $pointer, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div className={`${$Unless({test: $pointer("cart.multi_coupon_ui_enabled"), $then: () => "cart-total-value"})}`}>
        <button
            className="gift-certificate-add"
            aria-label={$lang($string("cart.gift_certificates.add_cert_code"))}
            aria-controls="add-certificate"
            aria-expanded="false"
        >
            <$If
                test={$pointer("cart.multi_coupon_ui_enabled")}
                $then={() => <$Lang keyName={$string("cart.gift_wrapping.add")} />}
                $else={() => <$Lang keyName={$string("cart.gift_certificates.gift_certificate")} />}
            />
        </button>
        <button
            className="gift-certificate-cancel"
            style={{display: "none"}}
            aria-label={$lang($string("cart.gift_certificates.add_cert_code"))}
            aria-controls="add-certificate"
            aria-expanded="true"
        >
            <$Lang keyName={$string("cart.coupons.cancel")} />
        </button>
    </div>
);
