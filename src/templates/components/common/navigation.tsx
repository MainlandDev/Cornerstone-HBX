import {$If, $Lang, $lang, $number, $partial, $pointer, $raw, $$themeSettings, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default () => {
    const theme = $$themeSettings();
    return (
        <nav className="navUser">
            {$raw("{{#and language_selector language_selector.languages.length '>' 1}}")}
            {$partial("components/common/language-selector")}
            {$raw("{{/and}}")}

            {$raw("{{#or customer (unless settings.hide_price_from_guests)}}")}
            {$partial("components/common/currency-selector")}
            {$raw("{{/or}}")}

            <$If test={theme.show_channels} $then={() => $partial("components/common/channel-selector")} />

            <ul className="navUser-section navUser-section--alt">
                <$If
                    test={$pointer("customer.store_credit.value")}
                    operator={$string(">")}
                    rvalue={$number(0)}
                    $then={() => (
                <li className="navUser-item">
                    <a
                        className="navUser-action navUser-action--storeCredit"
                        data-dropdown="storeCredit-dropdown"
                        data-options="align:bottom"
                        href={$pointer("urls.cart")}
                        aria-label={$lang($string("common.store_credit_overview"), {credit: $pointer("customer.store_credit.formatted")})}
                    >
                        <span className="navUser-action-divider">
                            <$Lang keyName={$string("common.store_credit_overview")} credit={$pointer("customer.store_credit.formatted")} />
                        </span>
                    </a>
                    <div className="dropdown-menu" id="storeCredit-dropdown" data-dropdown-content={""} aria-hidden="true">
                        {$unescaped($lang($string("common.store_credit"), {store_credit: $pointer("customer.store_credit.formatted")}))}
                    </div>
                </li>
                    )}
                />

                <li className="navUser-item">
                    <a
                        className="navUser-action navUser-item--compare"
                        href={$pointer("urls.compare")}
                        data-compare-nav={""}
                        aria-label={$lang($string("common.compare"))}
                    >
                        <$Lang keyName={$string("common.compare")} /> <span className="countPill countPill--positive countPill--alt"></span>
                    </a>
                </li>
                <$If
                    test={theme.social_icon_placement_top}
                    $then={() => (
                        <>
                            <li className="navUser-item navUser-item--social">{$partial("components/common/social-links")}</li>
                            <li className="navUser-item navUser-item--divider">|</li>
                        </>
                    )}
                />
                <li className="navUser-item">
                    <button
                        className="navUser-action navUser-action--quickSearch"
                        type="button"
                        id="quick-search-expand"
                        data-search="quickSearch"
                        aria-controls="quickSearch"
                        aria-label={$lang($string("common.search"))}
                    >
                        <$Lang keyName={$string("common.search")} />
                    </button>
                </li>
                <$If
                    test={$pointer("settings.gift_certificates_enabled")}
                    $then={() => (
                        <li className="navUser-item">
                            <a className="navUser-action" href={$pointer("urls.gift_certificate.purchase")} aria-label={$lang($string("common.gift_cert"))}>
                                <$Lang keyName={$string("common.gift_cert")} />
                            </a>
                        </li>
                    )}
                />
                <li className="navUser-item navUser-item--account">
                    <$If
                        test={$pointer("customer")}
                        $then={() => (
                            <>
                                <a className="navUser-action" href={$pointer("urls.account.index")} aria-label={$lang($string("common.account"))}>
                                    <$Lang keyName={$string("common.account")} />
                                </a>
                                <a className="navUser-action" href={$pointer("urls.auth.logout")} aria-label={$lang($string("common.logout"))}>
                                    <$Lang keyName={$string("common.logout")} />
                                </a>
                            </>
                        )}
                        $else={() => (
                            <>
                                <a className="navUser-action" href={$pointer("urls.auth.login")} aria-label={$lang($string("common.login"))}>
                                    <$Lang keyName={$string("common.login")} />
                                </a>
                                <$If
                                    test={$pointer("settings.account_creation_enabled")}
                                    $then={() => (
                                        <>
                                            <span className="navUser-or">
                                                <$Lang keyName={$string("common.or")} />
                                            </span>
                                            <a
                                                className="navUser-action"
                                                href={$pointer("urls.auth.create_account")}
                                                aria-label={$lang($string("common.sign_up"))}
                                            >
                                                <$Lang keyName={$string("common.sign_up")} />
                                            </a>
                                        </>
                                    )}
                                />
                            </>
                        )}
                    />
                </li>
                <li className="navUser-item navUser-item--cart">
                    <a
                        className="navUser-action"
                        data-cart-preview={""}
                        data-dropdown="cart-preview-dropdown"
                        data-options="align:right"
                        href={$pointer("urls.cart")}
                        aria-label={$lang($string("cart.nav_aria_label"))}
                    >
                        <span className="navUser-item-cartLabel">
                            <$Lang keyName={$string("common.cart")} />
                        </span>
                        <span className="countPill cart-quantity"></span>
                    </a>

                    <div className="dropdown-menu" id="cart-preview-dropdown" data-dropdown-content={""} aria-hidden="true"></div>
                </li>
            </ul>
            <div className="dropdown dropdown--quickSearch" id="quickSearch" aria-hidden="true" data-prevent-quick-search-close={""}>
                {$partial("components/common/quick-search", {name: $string("nav-quick-search")})}
            </div>
        </nav>
    );
};
