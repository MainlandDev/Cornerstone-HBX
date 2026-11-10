/**
 * Source: templates/components/common/currency-selector.html (39 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $number, $parseHandlebarsDangerously, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint} from '@/context-common';

export default $asPartial<{currency_selector: Hint['currency_selector']}>(({currency_selector}) => (
    /* html L1: {{#if currency_selector.currencies.length '>' 1}} */
    <$If
        query={[currency_selector.currencies.length, '>', $number(1)]}
        $then={() => (
            /* html L2: <ul class="navUser-section"> */
            <ul className="navUser-section">
                {/* html L3: <li class="navUser-item"> */}
                <li className="navUser-item">
                    {/* html L4-9:
                       <a class="navUser-action navUser-action--currencySelector has-dropdown"
                          href="#"
                          data-dropdown="currencySelection"
                          aria-controls="currencySelection"
                          aria-expanded="false"
                       >
                    */}
                    <a
                        className="navUser-action navUser-action--currencySelector has-dropdown"
                        href="#"
                        data-dropdown="currencySelection"
                        aria-controls="currencySelection"
                        aria-expanded="false"
                    >
                        {/* html L10: {{lang 'common.currency' code=currency_selector.active_currency_code}} */}
                        <$Lang translationKey={$string('common.currency')} params={{code: currency_selector.active_currency_code}}/>
                        {/* html L11: <i class="icon" aria-hidden="true"> */}
                        <i className="icon" aria-hidden="true">
                            {/* html L12: <svg> */}
                            <svg>
                                {/* html L13: <use href="#icon-chevron-down" /> */}
                                <use href="#icon-chevron-down"/>
                            </svg>
                        </i>
                    </a>
                    {/* html L17: <ul class="dropdown-menu" id="currencySelection" data-dropdown-content aria-hidden="true" tabindex="-1"> */}
                    <ul className="dropdown-menu" id="currencySelection" data-dropdown-content="" aria-hidden="true" tabIndex={-1}>
                        {/* html L18: {{#each currency_selector.currencies}} */}
                        <$Each
                            list={currency_selector.currencies}
                            $then={(currency) => (
                                /* html L19: <li class="dropdown-menu-item"> */
                                <li className="dropdown-menu-item">
                                    {/* html L20-26:
                                       <a href="{{{switch_url}}}"
                                          data-currency-code="{{{code}}}"
                                          {{#if cart_currency_switch_url.length '>' 0 }}
                                          data-cart-currency-switch-url="{{{cart_currency_switch_url}}}"
                                          {{/if}}
                                          data-warning="{{lang 'common.currency_switch_promotion'}}"
                                       >
                                    */}
                                    <a
                                        href={$unescaped(currency.switch_url)}
                                        data-currency-code={$unescaped(currency.code)}
                                        $$={$parseHandlebarsDangerously(
                                            `{{#if cart_currency_switch_url.length '>' 0 }}data-cart-currency-switch-url="{{{cart_currency_switch_url}}}"{{/if}}`,
                                        )}
                                        data-warning={$lang($string('common.currency_switch_promotion'))}
                                    >
                                        {/* html L27: {{#if is_active}} */}
                                        <$If
                                            query={[currency.is_active]}
                                            $then={() => /* html L28: <strong>{{name}}</strong> */ <strong>{/* html L28: {{name}} */}{currency.name}</strong>}
                                            $else={() => <>{/* html L29: {{else}}
                                                                                                                            html L30: {{name}}
                                                           */}{currency.name}</>}
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
