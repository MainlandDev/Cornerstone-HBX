/**
 * Source: templates/components/cart/gift-certificate.html (24 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $string, $unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {CartHint} from '@/context-cart';

export default $asPartial<{cart: CartHint['cart']}>(({cart}) => (
    /* html L1: <div class="{{#unless cart.multi_coupon_ui_enabled}}cart-total-value{{/unless}}"> */
    <div className={`${$unless(cart.multi_coupon_ui_enabled).then(() => $$raw('cart-total-value'))}`}>
        {/* html L2-7:
           <button
               class="gift-certificate-add"
               aria-label="{{lang 'cart.gift_certificates.add_cert_code'}}"
               aria-controls="add-certificate"
               aria-expanded="false"
           >
        */}
        <button className="gift-certificate-add" aria-label={$lang($string('cart.gift_certificates.add_cert_code'))} aria-controls="add-certificate" aria-expanded="false">
            {/* html L8: {{#if cart.multi_coupon_ui_enabled}} */}
            <$If
                query={[cart.multi_coupon_ui_enabled]}
                $then={() => /* html L9: {{lang 'cart.gift_wrapping.add'}} */ <$Lang translationKey={$string('cart.gift_wrapping.add')}/>}
                $else={() => /* html L10: {{else}}
                                                                html L11: {{lang 'cart.gift_certificates.gift_certificate'}}
                             */ <$Lang translationKey={$string('cart.gift_certificates.gift_certificate')}/>}
            />
        </button>
        {/* html L14-20:
           <button
               class="gift-certificate-cancel"
               style="display: none;"
               aria-label="{{lang 'cart.gift_certificates.add_cert_code'}}"
               aria-controls="add-certificate"
               aria-expanded="true"
           >
        */}
        <button
            className="gift-certificate-cancel"
            style={{display: 'none'}}
            aria-label={$lang($string('cart.gift_certificates.add_cert_code'))}
            aria-controls="add-certificate"
            aria-expanded="true"
        >
            {/* html L21: {{lang 'cart.coupons.cancel'}} */}
            <$Lang translationKey={$string('cart.coupons.cancel')}/>
        </button>
    </div>
));
