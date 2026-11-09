import {$If, $if, $number, $string, $unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$And, $Lang, $Or} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$_lang, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint} from '@/context-common';
import QuickSearch from '@/templates/components/common/quick-search';
import LanguageSelector from '@/templates/components/common/language-selector';
import CurrencySelector from '@/templates/components/common/currency-selector';
import ChannelSelector from '@/templates/components/common/channel-selector';
import SocialLinks from '@/templates/components/common/social-links';

export default $asPartial<{
    language_selector: Hint['language_selector'];
    currency_selector: Hint['currency_selector'];
    customer: Hint['customer'];
    settings: Hint['settings'];
    theme_settings: Hint['theme_settings'];
    urls: Hint['urls'];
    semantic_search_enabled: Hint['semantic_search_enabled'];
    social_media: Hint['social_media'];
}>(({
    language_selector,
    currency_selector,
    customer,
    settings,
    theme_settings,
    urls,
    semantic_search_enabled,
    social_media,
}) => (
    <nav className="navUser">
        <$And
            a={language_selector}
            b={$if(language_selector.languages.length, '>', $number(1))}
            $then={() => <LanguageSelector language_selector={language_selector}/>}
        />

        <$Or
            values={[customer, $unless(settings.hide_price_from_guests)]}
            $then={() => <CurrencySelector currency_selector={currency_selector}/>}
        />

        <$If query={[theme_settings.show_channels]} $then={() => <ChannelSelector theme_settings={theme_settings}/>} />

        <ul className="navUser-section navUser-section--alt">
            <$If
                query={[customer.store_credit.value, '>', $number(0)]}
                $then={() => (
                    <li className="navUser-item">
                        <a
                            className="navUser-action navUser-action--storeCredit"
                            data-dropdown="storeCredit-dropdown"
                            data-options="align:bottom"
                            href={urls.cart}
                            aria-label={$lang($string('common.store_credit_overview'), {credit: customer.store_credit.formatted})}
                        >
                            <span className="navUser-action-divider">
                                <$Lang translationKey={$string('common.store_credit_overview')} params={{credit: customer.store_credit.formatted}}/>
                            </span>
                        </a>
                        <div className="dropdown-menu" id="storeCredit-dropdown" data-dropdown-content="" aria-hidden="true">
                            {$_lang($string('common.store_credit'), {store_credit: customer.store_credit.formatted})}
                        </div>
                    </li>
                )}
            />
            <li className="navUser-item">
                <a
                    className="navUser-action navUser-item--compare"
                    href={urls.compare}
                    data-compare-nav=""
                    aria-label={$lang($string('common.compare'))}
                >
                    <$Lang translationKey={$string('common.compare')}/> <span className="countPill countPill--positive countPill--alt"></span>
                </a>
            </li>
            <$If
                query={[theme_settings.social_icon_placement_top]}
                $then={() => (
                    <>
                        <li className="navUser-item navUser-item--social">
                            <SocialLinks social_media={social_media}/>
                        </li>
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
                    aria-label={$lang($string('common.search'))}
                >
                    <$Lang translationKey={$string('common.search')}/>
                </button>
            </li>
            <$If
                query={[settings.gift_certificates_enabled]}
                $then={() => (
                    <li className="navUser-item">
                        <a className="navUser-action" href={urls.gift_certificate.purchase} aria-label={$lang($string('common.gift_cert'))}>
                            <$Lang translationKey={$string('common.gift_cert')}/>
                        </a>
                    </li>
                )}
            />
            <li className="navUser-item navUser-item--account">
                <$If
                    query={[customer]}
                    $then={() => (
                        <>
                            <a className="navUser-action" href={urls.account.index} aria-label={$lang($string('common.account'))}>
                                <$Lang translationKey={$string('common.account')}/>
                            </a>
                            <a className="navUser-action" href={urls.auth.logout} aria-label={$lang($string('common.logout'))}>
                                <$Lang translationKey={$string('common.logout')}/>
                            </a>
                        </>
                    )}
                    $else={() => (
                        <>
                            <a className="navUser-action" href={urls.auth.login} aria-label={$lang($string('common.login'))}>
                                <$Lang translationKey={$string('common.login')}/>
                            </a>
                            <$If
                                query={[settings.account_creation_enabled]}
                                $then={() => (
                                    <>
                                        <span className="navUser-or">
                                            <$Lang translationKey={$string('common.or')}/>
                                        </span>
                                        <a
                                            className="navUser-action"
                                            href={urls.auth.create_account}
                                            aria-label={$lang($string('common.sign_up'))}
                                        >
                                            <$Lang translationKey={$string('common.sign_up')}/>
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
                    data-cart-preview=""
                    data-dropdown="cart-preview-dropdown"
                    data-options="align:right"
                    href={urls.cart}
                    aria-label={$lang($string('cart.nav_aria_label'))}
                >
                    <span className="navUser-item-cartLabel">
                        <$Lang translationKey={$string('common.cart')}/>
                    </span>
                    <span className="countPill cart-quantity"></span>
                </a>

                <div className="dropdown-menu" id="cart-preview-dropdown" data-dropdown-content="" aria-hidden="true"></div>
            </li>
        </ul>
        <div className="dropdown dropdown--quickSearch" id="quickSearch" aria-hidden="true" data-prevent-quick-search-close="">
            <QuickSearch name={$string('nav-quick-search')} semantic_search_enabled={semantic_search_enabled} urls={urls}/>
        </div>
    </nav>
));
