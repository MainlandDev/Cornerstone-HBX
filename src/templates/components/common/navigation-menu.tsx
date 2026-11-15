import {$Each, $If, $Lang, $lang, $partial, $pointer, $raw, $string, $Unless, $$themeSettings, place} from "@mainlanddev/hbx-bigcommerce";

interface Category {
    id: string;
}

interface ContentPage {
    url: string;
    name: string;
}

interface Currency {
    name: string;
    is_active: boolean;
}

const accountLink = (url: string, key: string) => (
    <li className="navPage-subMenu-item">
        <a className="navPage-subMenu-action navPages-action" href={$pointer(url)} aria-label={$lang($string(key))}>
            <$Lang keyName={$string(key)} />
        </a>
    </li>
);

export default () => {
    const theme = $$themeSettings();
    return (
        <nav className="navPages">
            <div className="navPages-quickSearch">{place($partial("components/common/quick-search", {name: $string("nav-menu-quick-search")}))}</div>
            <ul className={`navPages-list${$raw("{{#if theme_settings.navigation_design '!==' 'simple'}} navPages-list-depth-max{{/if}}")}`}>
                <$Each
                    list={$pointer<Category[]>("categories")}
                    $then={() => (
                        <li className="navPages-item">
                            {$raw("{{#if ../theme_settings.navigation_design '===' 'simple'}}")}
                            {place($partial("components/common/navigation-list"))}
                            {$raw("{{/if}}")}
                            {$raw("{{#if ../theme_settings.navigation_design '===' 'alternate'}}")}
                            {place($partial("components/common/navigation-list-alternate"))}
                            {$raw("{{/if}}")}
                        </li>
                    )}
                />
                <$Unless
                    test={theme.hide_content_navigation}
                    $then={() => (
                        <$Each
                            list={$pointer<ContentPage[]>("pages")}
                            $then={(page) => (
                                <li className="navPages-item navPages-item-page">
                                    <a
                                        className={`navPages-action${$raw("{{#if name '==' ../page.title}} activePage{{/if}}")}`}
                                        href={page.url}
                                        aria-label={page.name}
                                    >
                                        {page.name}
                                    </a>
                                </li>
                            )}
                        />
                    )}
                />
            </ul>
            <ul className="navPages-list navPages-list--user">
                {$raw("{{#and language_selector language_selector.languages.length '>' 1}}")}
                <li className="navPages-item">{place($partial("components/common/language-selector-mobile"))}</li>
                {$raw("{{/and}}")}
                {$raw("{{#if currency_selector.currencies.length '>' 1}}")}
                <li className="navPages-item">
                    <a
                        className="navPages-action has-subMenu"
                        href="#"
                        data-collapsible="navPages-currency"
                        aria-controls="navPages-currency"
                        aria-expanded="false"
                        aria-label={$lang($string("common.currency"), {code: $pointer("currency_selector.active_currency_code")})}
                    >
                        <$Lang keyName={$string("common.currency")} code={$pointer("currency_selector.active_currency_code")} />{" "}
                        <i className="icon navPages-action-moreIcon" aria-hidden="true">
                            <svg>
                                <use href="#icon-chevron-down"></use>
                            </svg>
                        </i>
                    </a>
                    <div className="navPage-subMenu" id="navPages-currency" aria-hidden="true" tabIndex={-1}>
                        <ul className="navPage-subMenu-list">
                            <$Each
                                list={$pointer<Currency[]>("currency_selector.currencies")}
                                $then={(currency) => (
                                    <li className="navPage-subMenu-item">
                                        <a
                                            className="navPage-subMenu-action navPages-action"
                                            dangerouslyInlineAttributes={{
                                                attributes: `href="${$raw("{{{switch_url}}}")}" aria-label="${currency.name}" data-currency-code="${$raw("{{{code}}}")}" ${$raw("{{#if cart_currency_switch_url.length '>' 0 }}data-cart-currency-switch-url=\"{{{cart_currency_switch_url}}}\"{{/if}}")} data-warning="${$lang($string("common.currency_switch_promotion"))}"`,
                                            }}
                                        >
                                            <$If test={currency.is_active} $then={() => <strong>{currency.name}</strong>} $else={() => <>{currency.name}</>} />
                                        </a>
                                    </li>
                                )}
                            />
                        </ul>
                    </div>
                </li>
                {$raw("{{/if}}")}
                <$If test={theme.show_channels} $then={() => <li className="navPages-item">{place($partial("components/common/channel-selector-mobile"))}</li>} />
                <$If
                    test={$pointer("settings.gift_certificates_enabled")}
                    $then={() => (
                        <li className="navPages-item">
                            <a className="navPages-action" href={$pointer("urls.gift_certificate.purchase")} aria-label={$lang($string("common.gift_cert"))}>
                                <$Lang keyName={$string("common.gift_cert")} />
                            </a>
                        </li>
                    )}
                />
                {$raw("{{#if customer.store_credit.value '>' 0}}")}
                <li className="navPages-item">
                    <a className="navPages-action navPages-action--storeCredit">
                        <$Lang keyName={$string("common.store_credit_overview")} credit={$pointer("customer.store_credit.formatted")} />
                    </a>
                </li>
                {$raw("{{/if}}")}
                {$raw("{{#if theme_settings.product_list_display_mode '==' 'list'}}")}
                <li className="navPages-item">
                    <a className="navPages-action navPages-action--compare" href={$pointer("urls.compare")} data-compare-nav={""} aria-label={$lang($string("common.compare"))}>
                        <$Lang keyName={$string("common.compare")} />{" "}
                        <span className="countPill countPill--positive countPill--alt"></span>
                    </a>
                </li>
                {$raw("{{/if}}")}
                <$If
                    test={$pointer("customer")}
                    $then={() => (
                        <>
                            <li className="navPages-item">
                                <a
                                    className="navPages-action has-subMenu"
                                    href={$pointer("urls.account.index")}
                                    data-collapsible="navPages-account"
                                    aria-label={$lang($string("common.account"))}
                                >
                                    <$Lang keyName={$string("common.account")} />{" "}
                                    <i className="icon navPages-action-moreIcon" aria-hidden="true">
                                        <svg>
                                            <use href="#icon-chevron-down" />
                                        </svg>
                                    </i>
                                </a>
                                <div className="navPage-subMenu" id="navPages-account" aria-hidden="true" tabIndex={-1}>
                                    <ul className="navPage-subMenu-list">
                                        {accountLink("urls.account.orders.all", "account.nav.orders")}
                                        <$If test={$pointer("settings.returns_enabled")} $then={() => accountLink("urls.account.returns", "account.nav.returns")} />
                                        {accountLink("urls.account.inbox", "account.mobile_nav.messages")}
                                        {accountLink("urls.account.addresses", "account.nav.addresses")}
                                        <$If
                                            test={$pointer("settings.show_payment_methods")}
                                            $then={() => accountLink("urls.account.payment_methods.all", "account.nav.payment_methods")}
                                        />
                                        {accountLink("urls.account.wishlists.all", "account.mobile_nav.wishlists")}
                                        {accountLink("urls.account.recent_items", "account.nav.recently_viewed")}
                                        {accountLink("urls.account.details", "account.nav.settings")}
                                    </ul>
                                </div>
                            </li>
                            <li className="navPages-item">
                                <a className="navPages-action" href={$pointer("urls.auth.logout")} aria-label={$lang($string("common.logout"))}>
                                    <$Lang keyName={$string("common.logout")} />
                                </a>
                            </li>
                        </>
                    )}
                    $else={() => (
                        <li className="navPages-item">
                            <a className="navPages-action" href={$pointer("urls.auth.login")} aria-label={$lang($string("common.login"))}>
                                <$Lang keyName={$string("common.login")} />
                            </a>{" "}
                            <$If
                                test={$pointer("settings.account_creation_enabled")}
                                $then={() => (
                                    <>
                                        <$Lang keyName={$string("common.or")} />{" "}
                                        <a className="navPages-action" href={$pointer("urls.auth.create_account")} aria-label={$lang($string("common.sign_up"))}>
                                            <$Lang keyName={$string("common.sign_up")} />
                                        </a>
                                    </>
                                )}
                            />
                        </li>
                    )}
                />
                <$If test={theme.social_icon_placement_top} $then={() => <li className="navPages-item">{place($partial("components/common/social-links"))}</li>} />
            </ul>
        </nav>
    );
};
