import {$Each, $If, $number, $parseHandlebarsDangerously, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint} from '@/context-common';

export default $asPartial<{currency_selector: Hint['currency_selector']}>(({currency_selector}) => (
    <$If
        query={[currency_selector.currencies.length, '>', $number(1)]}
        $then={() => (
            <ul className="navUser-section">
                <li className="navUser-item">
                    <a
                        className="navUser-action navUser-action--currencySelector has-dropdown"
                        href="#"
                        data-dropdown="currencySelection"
                        aria-controls="currencySelection"
                        aria-expanded="false"
                    >
                        <$Lang translationKey={$string('common.currency')} params={{code: currency_selector.active_currency_code}}/>
                        <i className="icon" aria-hidden="true">
                            <svg>
                                <use href="#icon-chevron-down"/>
                            </svg>
                        </i>
                    </a>
                    <ul className="dropdown-menu" id="currencySelection" data-dropdown-content="" aria-hidden="true" tabIndex={-1}>
                        <$Each
                            list={currency_selector.currencies}
                            $then={(currency) => (
                                <li className="dropdown-menu-item">
                                    <a
                                        href={$unescaped(currency.switch_url)}
                                        data-currency-code={$unescaped(currency.code)}
                                        $$={$parseHandlebarsDangerously(
                                            `{{#if cart_currency_switch_url.length '>' 0 }}data-cart-currency-switch-url="{{{cart_currency_switch_url}}}"{{/if}}`,
                                        )}
                                        data-warning={$lang($string('common.currency_switch_promotion'))}
                                    >
                                        <$If
                                            query={[currency.is_active]}
                                            $then={() => <strong>{currency.name}</strong>}
                                            $else={() => <>{currency.name}</>}
                                        />
                                    </a>
                                </li>
                            )}
                        />
                    </ul>
                </li>
            </ul>
        )}
    />
));
