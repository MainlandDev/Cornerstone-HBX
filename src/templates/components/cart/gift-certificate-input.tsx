import {$string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageCart} from '@mainlanddev/bigcommerce-react/theme';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $asPartial<{ urls: ThemeContextHint<ThemePageCart>['urls'] }>(({urls}) => (
    <div id="add-certificate" className="cart-form gift-certificate-code" aria-hidden="true" style={{display: 'none'}}>
        <form className="form form--hiddenLabels cart-gift-certificate-form" method="post" action={urls.cart}>
            <label className="form-label" htmlFor="certcode">
                <$Lang translationKey={$string('cart.gift_certificates.cert_code')}/>
            </label>
            <input
                className="form-input"
                id="certcode"
                type="text"
                name="certcode"
                value=""
                placeholder={$lang($string('cart.gift_certificates.add_cert_code'))}
            />
            <input
                className="button button--primary button--small"
                aria-label={$lang($string('cart.gift_certificates.apply_gift_certificate'))}
                type="submit"
                value={$lang($string('cart.coupons.button'))}
            />
            <input type="hidden" name="action" value="applycoupon"/>
        </form>
    </div>
));
