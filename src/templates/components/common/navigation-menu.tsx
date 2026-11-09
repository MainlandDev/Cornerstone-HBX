import {$Each, $If, $if, $parseHandlebarsDangerously, $Partial, $string, $this, $Unless, $unescaped, $number} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$And, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint, PageHint} from '@/context-common';
import QuickSearch from '@/templates/components/common/quick-search';
import LanguageSelectorMobile from '@/templates/components/common/language-selector-mobile';
import ChannelSelectorMobile from '@/templates/components/common/channel-selector-mobile';
import SocialLinks from '@/templates/components/common/social-links';

export default $asPartial<
    PageHint & {
        categories: Hint['categories'];
        pages: Hint['pages'];
        theme_settings: Hint['theme_settings'];
        language_selector: Hint['language_selector'];
        currency_selector: Hint['currency_selector'];
        customer: Hint['customer'];
        settings: Hint['settings'];
        urls: Hint['urls'];
        semantic_search_enabled: Hint['semantic_search_enabled'];
        social_media: Hint['social_media'];
    }
>(({
    page,
    categories,
    pages,
    theme_settings,
    language_selector,
    currency_selector,
    customer,
    settings,
    urls,
    semantic_search_enabled,
    social_media,
}) => (
    <nav className="navPages">
        <div className="navPages-quickSearch">
            <QuickSearch name={$string('nav-menu-quick-search')} semantic_search_enabled={semantic_search_enabled} urls={urls}/>
        </div>
        <ul className={`navPages-list${$if(theme_settings.navigation_design, '!==', $string('simple')).then(() => $$raw(' navPages-list-depth-max'))}`}>
            <$Each
                list={categories}
                $then={() => (
                    <li className="navPages-item">
                        <$If
                            query={[theme_settings.navigation_design, '===', $string('simple')]}
                            $then={() => <$Partial name="components/common/navigation-list" context={$this()}/>}
                        />
                        <$If
                            query={[theme_settings.navigation_design, '===', $string('alternate')]}
                            $then={() => <$Partial name="components/common/navigation-list-alternate" context={$this()}/>}
                        />
                    </li>
                )}
            />
            <$Unless
                query={[theme_settings.hide_content_navigation]}
                $then={() => (
                    <$Each
                        list={pages}
                        $then={(pageLink) => (
                            <li className="navPages-item navPages-item-page">
                                <a
                                    className={`navPages-action${$if(pageLink.name, '==', page.title).then(() => $$raw(' activePage'))}`}
                                    href={pageLink.url}
                                    aria-label={pageLink.name}
                                >
                                    {pageLink.name}
                                </a>
                            </li>
                        )}
                    />
                )}
            />
        </ul>
        <ul className="navPages-list navPages-list--user">
            <$And
                a={language_selector}
                b={$if(language_selector.languages.length, '>', $number(1))}
                $then={() => (
                    <li className="navPages-item">
                        <LanguageSelectorMobile language_selector={language_selector}/>
                    </li>
                )}
            />
            <$If
                query={[currency_selector.currencies.length, '>', $number(1)]}
                $then={() => (
                    <li className="navPages-item">
                        <a
                            className="navPages-action has-subMenu"
                            href="#"
                            data-collapsible="navPages-currency"
                            aria-controls="navPages-currency"
                            aria-expanded="false"
                            aria-label={$lang($string('common.currency'), {code: currency_selector.active_currency_code})}
                        >
                            <$Lang translationKey={$string('common.currency')} params={{code: currency_selector.active_currency_code}}/>
                            <i className="icon navPages-action-moreIcon" aria-hidden="true">
                                <svg>
                                    <use href="#icon-chevron-down"/>
                                </svg>
                            </i>
                        </a>
                        <div className="navPage-subMenu" id="navPages-currency" aria-hidden="true" tabIndex={-1}>
                            <ul className="navPage-subMenu-list">
                                <$Each
                                    list={currency_selector.currencies}
                                    $then={(currency) => (
                                        <li className="navPage-subMenu-item">
                                            <a
                                                className="navPage-subMenu-action navPages-action"
                                                href={$unescaped(currency.switch_url)}
                                                aria-label={currency.name}
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
                        </div>
                    </li>
                )}
            />
            <$If
                query={[theme_settings.show_channels]}
                $then={() => (
                    <li className="navPages-item">
                        <ChannelSelectorMobile theme_settings={theme_settings}/>
                    </li>
                )}
            />
            <$If
                query={[settings.gift_certificates_enabled]}
                $then={() => (
                    <li className="navPages-item">
                        <a className="navPages-action" href={urls.gift_certificate.purchase} aria-label={$lang($string('common.gift_cert'))}>
                            <$Lang translationKey={$string('common.gift_cert')}/>
                        </a>
                    </li>
                )}
            />
            <$If
                query={[customer.store_credit.value, '>', $number(0)]}
                $then={() => (
                    <li className="navPages-item">
                        <a className="navPages-action navPages-action--storeCredit">
                            <$Lang translationKey={$string('common.store_credit_overview')} params={{credit: customer.store_credit.formatted}}/>
                        </a>
                    </li>
                )}
            />
            <$If
                query={[theme_settings.product_list_display_mode, '==', $string('list')]}
                $then={() => (
                    <li className="navPages-item">
                        <a
                            className="navPages-action navPages-action--compare"
                            href={urls.compare}
                            data-compare-nav=""
                            aria-label={$lang($string('common.compare'))}
                        >
                            <$Lang translationKey={$string('common.compare')}/>
                            <span className="countPill countPill--positive countPill--alt"></span>
                        </a>
                    </li>
                )}
            />
            <$If
                query={[customer]}
                $then={() => (
                    <>
                        <li className="navPages-item">
                            <a
                                className="navPages-action has-subMenu"
                                href={urls.account.index}
                                data-collapsible="navPages-account"
                                aria-label={$lang($string('common.account'))}
                            >
                                <$Lang translationKey={$string('common.account')}/>
                                <i className="icon navPages-action-moreIcon" aria-hidden="true">
                                    <svg>
                                        <use href="#icon-chevron-down"/>
                                    </svg>
                                </i>
                            </a>
                            <div className="navPage-subMenu" id="navPages-account" aria-hidden="true" tabIndex={-1}>
                                <ul className="navPage-subMenu-list">
                                    <li className="navPage-subMenu-item">
                                        <a
                                            className="navPage-subMenu-action navPages-action"
                                            href={urls.account.orders.all}
                                            aria-label={$lang($string('account.nav.orders'))}
                                        >
                                            <$Lang translationKey={$string('account.nav.orders')}/>
                                        </a>
                                    </li>
                                    <$If
                                        query={[settings.returns_enabled]}
                                        $then={() => (
                                            <li className="navPage-subMenu-item">
                                                <a
                                                    className="navPage-subMenu-action navPages-action"
                                                    href={urls.account.returns}
                                                    aria-label={$lang($string('account.nav.returns'))}
                                                >
                                                    <$Lang translationKey={$string('account.nav.returns')}/>
                                                </a>
                                            </li>
                                        )}
                                    />
                                    <li className="navPage-subMenu-item">
                                        <a
                                            className="navPage-subMenu-action navPages-action"
                                            href={urls.account.inbox}
                                            aria-label={$lang($string('account.mobile_nav.messages'))}
                                        >
                                            <$Lang translationKey={$string('account.mobile_nav.messages')}/>
                                        </a>
                                    </li>
                                    <li className="navPage-subMenu-item">
                                        <a
                                            className="navPage-subMenu-action navPages-action"
                                            href={urls.account.addresses}
                                            aria-label={$lang($string('account.nav.addresses'))}
                                        >
                                            <$Lang translationKey={$string('account.nav.addresses')}/>
                                        </a>
                                    </li>
                                    <$If
                                        query={[settings.show_payment_methods]}
                                        $then={() => (
                                            <li className="navPage-subMenu-item">
                                                <a
                                                    className="navPage-subMenu-action navPages-action"
                                                    href={urls.account.payment_methods.all}
                                                    aria-label={$lang($string('account.nav.payment_methods'))}
                                                >
                                                    <$Lang translationKey={$string('account.nav.payment_methods')}/>
                                                </a>
                                            </li>
                                        )}
                                    />
                                    <li className="navPage-subMenu-item">
                                        <a
                                            className="navPage-subMenu-action navPages-action"
                                            href={urls.account.wishlists.all}
                                            aria-label={$lang($string('account.mobile_nav.wishlists'))}
                                        >
                                            <$Lang translationKey={$string('account.mobile_nav.wishlists')}/>
                                        </a>
                                    </li>
                                    <li className="navPage-subMenu-item">
                                        <a
                                            className="navPage-subMenu-action navPages-action"
                                            href={urls.account.recent_items}
                                            aria-label={$lang($string('account.nav.recently_viewed'))}
                                        >
                                            <$Lang translationKey={$string('account.nav.recently_viewed')}/>
                                        </a>
                                    </li>
                                    <li className="navPage-subMenu-item">
                                        <a
                                            className="navPage-subMenu-action navPages-action"
                                            href={urls.account.details}
                                            aria-label={$lang($string('account.nav.settings'))}
                                        >
                                            <$Lang translationKey={$string('account.nav.settings')}/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="navPages-item">
                            <a className="navPages-action" href={urls.auth.logout} aria-label={$lang($string('common.logout'))}>
                                <$Lang translationKey={$string('common.logout')}/>
                            </a>
                        </li>
                    </>
                )}
                $else={() => (
                    <li className="navPages-item">
                        <a className="navPages-action" href={urls.auth.login} aria-label={$lang($string('common.login'))}>
                            <$Lang translationKey={$string('common.login')}/>
                        </a>
                        <$If
                            query={[settings.account_creation_enabled]}
                            $then={() => (
                                <>
                                    <$Lang translationKey={$string('common.or')}/>
                                    <a
                                        className="navPages-action"
                                        href={urls.auth.create_account}
                                        aria-label={$lang($string('common.sign_up'))}
                                    >
                                        <$Lang translationKey={$string('common.sign_up')}/>
                                    </a>
                                </>
                            )}
                        />
                    </li>
                )}
            />
            <$If
                query={[theme_settings.social_icon_placement_top]}
                $then={() => (
                    <li className="navPages-item">
                        <SocialLinks social_media={social_media}/>
                    </li>
                )}
            />
        </ul>
    </nav>
));
