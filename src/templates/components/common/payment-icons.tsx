/**
 * Source: templates/components/common/payment-icons.html (71 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $string, $With} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Or} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint} from '@/context-common';

export default $asPartial<{theme_settings: Hint['theme_settings']}>(({theme_settings}) => (
    /* html L1: {{#with theme_settings}} */
    <$With
        context={theme_settings}
        $then={(settings) => (
            /* html L2: {{#or show_accept_amex show_accept_discover show_accept_mastercard show_accept_paypal show_accept_visa show_accept_amazonpay show_accept_googlepay show_accept_klarna}} */
            <$Or
                values={[
                    settings.show_accept_amex,
                    settings.show_accept_discover,
                    settings.show_accept_mastercard,
                    settings.show_accept_paypal,
                    settings.show_accept_visa,
                    settings.show_accept_amazonpay,
                    settings.show_accept_googlepay,
                    settings.show_accept_klarna,
                ]}
                $then={() => (
                    /* html L3: <ul class="footer-payment-icons" aria-label="{{lang 'account.payment_methods.payment_icons_label'}}"> */
                    <ul className="footer-payment-icons" aria-label={$lang($string('account.payment_methods.payment_icons_label'))}>
                        {/* html L4: {{#if show_accept_amex}} */}
                        <$If
                            query={[settings.show_accept_amex]}
                            $then={() => (
                                /* html L5: <li> */
                                <li>
                                    {/* html L6: <svg class="footer-payment-icon" role="img"> */}
                                    <svg className="footer-payment-icon" role="img">
                                        {/* html L7: <title>American Express</title> */}
                                        <title>American Express</title>
                                        {/* html L8: <use href="#icon-logo-american-express"></use> */}
                                        <use href="#icon-logo-american-express"></use>
                                    </svg>
                                </li>
                            )}
                        />
                        {/* html L12: {{#if show_accept_discover}} */}
                        <$If
                            query={[settings.show_accept_discover]}
                            $then={() => (
                                /* html L13: <li> */
                                <li>
                                    {/* html L14: <svg class="footer-payment-icon" role="img"> */}
                                    <svg className="footer-payment-icon" role="img">
                                        {/* html L15: <title>Discover</title> */}
                                        <title>Discover</title>
                                        {/* html L16: <use href="#icon-logo-discover"></use> */}
                                        <use href="#icon-logo-discover"></use>
                                    </svg>
                                </li>
                            )}
                        />
                        {/* html L20: {{#if show_accept_mastercard}} */}
                        <$If
                            query={[settings.show_accept_mastercard]}
                            $then={() => (
                                /* html L21: <li> */
                                <li>
                                    {/* html L22: <svg class="footer-payment-icon" role="img"> */}
                                    <svg className="footer-payment-icon" role="img">
                                        {/* html L23: <title>Mastercard</title> */}
                                        <title>Mastercard</title>
                                        {/* html L24: <use href="#icon-logo-mastercard"></use> */}
                                        <use href="#icon-logo-mastercard"></use>
                                    </svg>
                                </li>
                            )}
                        />
                        {/* html L28: {{#if show_accept_paypal}} */}
                        <$If
                            query={[settings.show_accept_paypal]}
                            $then={() => (
                                /* html L29: <li> */
                                <li>
                                    {/* html L30: <svg class="footer-payment-icon" role="img"> */}
                                    <svg className="footer-payment-icon" role="img">
                                        {/* html L31: <title>PayPal</title> */}
                                        <title>PayPal</title>
                                        {/* html L32: <use href="#icon-logo-paypal"></use> */}
                                        <use href="#icon-logo-paypal"></use>
                                    </svg>
                                </li>
                            )}
                        />
                        {/* html L36: {{#if show_accept_visa}} */}
                        <$If
                            query={[settings.show_accept_visa]}
                            $then={() => (
                                /* html L37: <li> */
                                <li>
                                    {/* html L38: <svg class="footer-payment-icon" role="img"> */}
                                    <svg className="footer-payment-icon" role="img">
                                        {/* html L39: <title>Visa</title> */}
                                        <title>Visa</title>
                                        {/* html L40: <use href="#icon-logo-visa"></use> */}
                                        <use href="#icon-logo-visa"></use>
                                    </svg>
                                </li>
                            )}
                        />
                        {/* html L44: {{#if show_accept_amazonpay}} */}
                        <$If
                            query={[settings.show_accept_amazonpay]}
                            $then={() => (
                                /* html L45: <li> */
                                <li>
                                    {/* html L46: <svg class="footer-payment-icon" role="img"> */}
                                    <svg className="footer-payment-icon" role="img">
                                        {/* html L47: <title>Amazon Pay</title> */}
                                        <title>Amazon Pay</title>
                                        {/* html L48: <use href="#icon-logo-amazonpay"></use> */}
                                        <use href="#icon-logo-amazonpay"></use>
                                    </svg>
                                </li>
                            )}
                        />
                        {/* html L52: {{#if show_accept_googlepay}} */}
                        <$If
                            query={[settings.show_accept_googlepay]}
                            $then={() => (
                                /* html L53: <li> */
                                <li>
                                    {/* html L54: <svg class="footer-payment-icon" role="img"> */}
                                    <svg className="footer-payment-icon" role="img">
                                        {/* html L55: <title>Google Pay</title> */}
                                        <title>Google Pay</title>
                                        {/* html L56: <use href="#icon-logo-googlepay"></use> */}
                                        <use href="#icon-logo-googlepay"></use>
                                    </svg>
                                </li>
                            )}
                        />
                        {/* html L60: {{#if show_accept_klarna}} */}
                        <$If
                            query={[settings.show_accept_klarna]}
                            $then={() => (
                                /* html L61: <li> */
                                <li>
                                    {/* html L62: <svg class="footer-payment-icon" role="img"> */}
                                    <svg className="footer-payment-icon" role="img">
                                        {/* html L63: <title>Klarna</title> */}
                                        <title>Klarna</title>
                                        {/* html L64: <use href="#icon-logo-klarna"></use> */}
                                        <use href="#icon-logo-klarna"></use>
                                    </svg>
                                </li>
                            )}
                        />
                    </ul>
                )}
            />
        )}
    />
));
