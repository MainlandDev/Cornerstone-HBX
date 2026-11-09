import {$If, $string, $unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {CartHint} from '@/context-cart';

export default $asPartial<{cart: CartHint['cart']}>(({cart}) => (
    <div className={`${$unless(cart.multi_coupon_ui_enabled).then(() => $$raw('cart-total-value'))}`}>
        <button className="gift-certificate-add" aria-label={$lang($string('cart.gift_certificates.add_cert_code'))} aria-controls="add-certificate" aria-expanded="false">
            <$If
                query={[cart.multi_coupon_ui_enabled]}
                $then={() => <$Lang translationKey={$string('cart.gift_wrapping.add')}/>}
                $else={() => <$Lang translationKey={$string('cart.gift_certificates.gift_certificate')}/>}
            />
        </button>
        <button
            className="gift-certificate-cancel"
            style={{display: 'none'}}
            aria-label={$lang($string('cart.gift_certificates.add_cert_code'))}
            aria-controls="add-certificate"
            aria-expanded="true"
        >
            <$Lang translationKey={$string('cart.coupons.cancel')}/>
        </button>
    </div>
));
