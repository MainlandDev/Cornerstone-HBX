import {$If, $string, $With} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Or} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint} from '@/context-common';

export default $asPartial<{theme_settings: Hint['theme_settings']}>(({theme_settings}) => (
    <$With
        context={theme_settings}
        $then={(settings) => (
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
                    <ul className="footer-payment-icons" aria-label={$lang($string('account.payment_methods.payment_icons_label'))}>
                        <$If
                            query={[settings.show_accept_amex]}
                            $then={() => (
                                <li>
                                    <svg className="footer-payment-icon" role="img">
                                        <title>American Express</title>
                                        <use href="#icon-logo-american-express"></use>
                                    </svg>
                                </li>
                            )}
                        />
                        <$If
                            query={[settings.show_accept_discover]}
                            $then={() => (
                                <li>
                                    <svg className="footer-payment-icon" role="img">
                                        <title>Discover</title>
                                        <use href="#icon-logo-discover"></use>
                                    </svg>
                                </li>
                            )}
                        />
                        <$If
                            query={[settings.show_accept_mastercard]}
                            $then={() => (
                                <li>
                                    <svg className="footer-payment-icon" role="img">
                                        <title>Mastercard</title>
                                        <use href="#icon-logo-mastercard"></use>
                                    </svg>
                                </li>
                            )}
                        />
                        <$If
                            query={[settings.show_accept_paypal]}
                            $then={() => (
                                <li>
                                    <svg className="footer-payment-icon" role="img">
                                        <title>PayPal</title>
                                        <use href="#icon-logo-paypal"></use>
                                    </svg>
                                </li>
                            )}
                        />
                        <$If
                            query={[settings.show_accept_visa]}
                            $then={() => (
                                <li>
                                    <svg className="footer-payment-icon" role="img">
                                        <title>Visa</title>
                                        <use href="#icon-logo-visa"></use>
                                    </svg>
                                </li>
                            )}
                        />
                        <$If
                            query={[settings.show_accept_amazonpay]}
                            $then={() => (
                                <li>
                                    <svg className="footer-payment-icon" role="img">
                                        <title>Amazon Pay</title>
                                        <use href="#icon-logo-amazonpay"></use>
                                    </svg>
                                </li>
                            )}
                        />
                        <$If
                            query={[settings.show_accept_googlepay]}
                            $then={() => (
                                <li>
                                    <svg className="footer-payment-icon" role="img">
                                        <title>Google Pay</title>
                                        <use href="#icon-logo-googlepay"></use>
                                    </svg>
                                </li>
                            )}
                        />
                        <$If
                            query={[settings.show_accept_klarna]}
                            $then={() => (
                                <li>
                                    <svg className="footer-payment-icon" role="img">
                                        <title>Klarna</title>
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
