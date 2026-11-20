"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $lang, $number, $pointer, $raw, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

interface Currency {
    code: string;
    name: string;
    is_active: boolean;
    switch_url: string;
    cart_currency_switch_url: string;
}

export default (_props: PartialProps) => (
    <$If
        test={$pointer("currency_selector.currencies.length")}
        operator={$string(">")}
        rvalue={$number(1)}
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
                        <$Lang keyName={$string("common.currency")} code={$pointer("currency_selector.active_currency_code")} />
                        <i className="icon" aria-hidden="true">
                            <svg>
                                <use href="#icon-chevron-down" />
                            </svg>
                        </i>
                    </a>
                    <ul className="dropdown-menu" id="currencySelection" data-dropdown-content={""} aria-hidden="true" tabIndex={-1}>
                        <$Each
                            list={$pointer<Currency[]>("currency_selector.currencies")}
                            $then={(currency) => (
                                <li className="dropdown-menu-item">
                                    <a
                                        dangerouslyInlineAttributes={{
                                            attributes: `href="${$unescaped(currency.switch_url)}" data-currency-code="${$unescaped(currency.code)}" ${$If({test: $pointer<number>("cart_currency_switch_url.length"), operator: $string(">"), rvalue: $number(0), $then: () => `${$raw('data-cart-currency-switch-url="')}${$unescaped(currency.cart_currency_switch_url)}${$raw('"')}`})} data-warning="${$lang($string("common.currency_switch_promotion"))}"`,
                                        }}
                                    >
                                        <$If test={currency.is_active} $then={() => <strong>{currency.name}</strong>} $else={() => <>{currency.name}</>} />
                                    </a>
                                </li>
                            )}
                        />
                    </ul>
                </li>
            </ul>
        )}
    />
);
