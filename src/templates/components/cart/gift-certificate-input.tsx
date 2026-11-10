/**
 * Source: templates/components/cart/gift-certificate-input.html (9 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageCart} from '@mainlanddev/bigcommerce-react/theme';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $asPartial<{ urls: ThemeContextHint<ThemePageCart>['urls'] }>(({urls}) => (
    /* html L1: <div id="add-certificate" class="cart-form gift-certificate-code" aria-hidden="true" style="display: none;"> */
    <div id="add-certificate" className="cart-form gift-certificate-code" aria-hidden="true" style={{display: 'none'}}>
        {/* html L2: <form class="form form--hiddenLabels cart-gift-certificate-form" method="post" action="{{urls.cart}}"> */}
        <form className="form form--hiddenLabels cart-gift-certificate-form" method="post" action={urls.cart}>
            {/* html L3: <label class="form-label" for="certcode">{{lang 'cart.gift_certificates.cert_code'}}</label> */}
            <label className="form-label" htmlFor="certcode">
                {/* html L3: {{lang 'cart.gift_certificates.cert_code'}} */}
                <$Lang translationKey={$string('cart.gift_certificates.cert_code')}/>
            </label>
            {/* html L4: <input class="form-input" id="certcode" type="text" name="certcode" value="" placeholder="{{lang 'cart.gift_certificates.add_cert_code'}}"> */}
            <input
                className="form-input"
                id="certcode"
                type="text"
                name="certcode"
                value=""
                placeholder={$lang($string('cart.gift_certificates.add_cert_code'))}
            />
            {/* html L5: <input class="button button--primary button--small" aria-label="{{lang 'cart.gift_certificates.apply_gift_certificate'}}" type="submit" value="{{lang 'cart.coupons.button'}}"> */}
            <input
                className="button button--primary button--small"
                aria-label={$lang($string('cart.gift_certificates.apply_gift_certificate'))}
                type="submit"
                value={$lang($string('cart.coupons.button'))}
            />
            {/* html L6: <input type="hidden" name="action" value="applycoupon"> */}
            <input type="hidden" name="action" value="applycoupon"/>
        </form>
    </div>
));
