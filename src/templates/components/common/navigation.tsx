/**
 * Source: templates/components/common/navigation.html (119 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $number, $string, $unless} from '@mainlanddev/bigcommerce-react';
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
    /* html L1: <nav class="navUser"> */
    <nav className="navUser">
        {/* html L2: {{#and language_selector language_selector.languages.length '>' 1}} */}
        <$And
            a={language_selector}
            b={language_selector.languages.length}
            $then={() => /* html L3: {{> components/common/language-selector}} */ <LanguageSelector language_selector={language_selector}/>}
        />

        {/* html L6: {{#or customer (unless settings.hide_price_from_guests)}} */}
        <$Or
            values={[customer, $unless(settings.hide_price_from_guests)]}
            $then={() => /* html L7: {{> components/common/currency-selector}} */ <CurrencySelector currency_selector={currency_selector}/>}
        />

        {/* html L10: {{#if theme_settings.show_channels}} */}
        <$If query={[theme_settings.show_channels]} $then={() => /* html L11: {{> components/common/channel-selector}} */ <ChannelSelector theme_settings={theme_settings}/>} />

        {/* html L14: <ul class="navUser-section navUser-section--alt"> */}
        <ul className="navUser-section navUser-section--alt">
            {/* html L15: {{#if customer.store_credit.value '>' 0}} */}
            <$If
                query={[customer.store_credit.value, '>', $number(0)]}
                $then={() => (
                    /* html L16: <li class="navUser-item"> */
                    <li className="navUser-item">
                        {/* html L17-22:
                           <a class="navUser-action navUser-action--storeCredit"
                              data-dropdown="storeCredit-dropdown"
                              data-options="align:bottom"
                              href="{{urls.cart}}"
                              aria-label="{{lang 'common.store_credit_overview' credit=customer.store_credit.formatted}}"
                           >
                        */}
                        <a
                            className="navUser-action navUser-action--storeCredit"
                            data-dropdown="storeCredit-dropdown"
                            data-options="align:bottom"
                            href={urls.cart}
                            aria-label={$lang($string('common.store_credit_overview'), {credit: customer.store_credit.formatted})}
                        >
                            {/* html L23: <span class="navUser-action-divider"> */}
                            <span className="navUser-action-divider">
                                {/* html L24: {{lang 'common.store_credit_overview' credit=customer.store_credit.formatted}} */}
                                <$Lang translationKey={$string('common.store_credit_overview')} params={{credit: customer.store_credit.formatted}}/>
                            </span>
                        </a>
                        {/* html L27: <div class="dropdown-menu" id="storeCredit-dropdown" data-dropdown-content aria-hidden="true"> */}
                        <div className="dropdown-menu" id="storeCredit-dropdown" data-dropdown-content="" aria-hidden="true">
                            {/* html L28: {{{lang 'common.store_credit' store_credit=customer.store_credit.formatted}}} */}
                            {$_lang($string('common.store_credit'), {store_credit: customer.store_credit.formatted})}
                        </div>
                    </li>
                )}
            />
            {/* html L32: <li class="navUser-item"> */}
            <li className="navUser-item">
                {/* html L33-37:
                   <a class="navUser-action navUser-item--compare"
                      href="{{urls.compare}}"
                      data-compare-nav
                      aria-label="{{lang 'common.compare'}}"
                   >
                */}
                <a
                    className="navUser-action navUser-item--compare"
                    href={urls.compare}
                    data-compare-nav=""
                    aria-label={$lang($string('common.compare'))}
                >
                    {/* html L38: {{lang 'common.compare'}} <span class="countPill countPill--positive countPill--alt"></span> */}
                    <$Lang translationKey={$string('common.compare')}/> {/* html L38: <span class="countPill countPill--positive countPill--alt"> */}<span className="countPill countPill--positive countPill--alt"></span>
                </a>
            </li>
            {/* html L41: {{#if theme_settings.social_icon_placement_top}} */}
            <$If
                query={[theme_settings.social_icon_placement_top]}
                $then={() => (
                    <>
                        {/* html L42: <li class="navUser-item navUser-item--social"> */}
                        <li className="navUser-item navUser-item--social">
                            {/* html L43: {{> components/common/social-links}} */}
                            <SocialLinks social_media={social_media}/>
                        </li>
                        {/* html L45: <li class="navUser-item navUser-item--divider">|</li> */}
                        <li className="navUser-item navUser-item--divider">|</li>
                    </>
                )}
            />
            {/* html L47: <li class="navUser-item"> */}
            <li className="navUser-item">
                {/* html L48-54:
                   <button class="navUser-action navUser-action--quickSearch"
                      type="button"
                      id="quick-search-expand"
                      data-search="quickSearch"
                      aria-controls="quickSearch"
                      aria-label="{{lang 'common.search'}}"
                   >
                */}
                <button
                    className="navUser-action navUser-action--quickSearch"
                    type="button"
                    id="quick-search-expand"
                    data-search="quickSearch"
                    aria-controls="quickSearch"
                    aria-label={$lang($string('common.search'))}
                >
                    {/* html L55: {{lang 'common.search'}} */}
                    <$Lang translationKey={$string('common.search')}/>
                </button>
            </li>
            {/* html L58: {{#if settings.gift_certificates_enabled}} */}
            <$If
                query={[settings.gift_certificates_enabled]}
                $then={() => (
                    /* html L59: <li class="navUser-item"> */
                    <li className="navUser-item">
                        {/* html L60-63:
                           <a class="navUser-action"
                              href="{{urls.gift_certificate.purchase}}"
                              aria-label="{{lang 'common.gift_cert'}}"
                           >
                        */}
                        <a className="navUser-action" href={urls.gift_certificate.purchase} aria-label={$lang($string('common.gift_cert'))}>
                            {/* html L64: {{lang 'common.gift_cert'}} */}
                            <$Lang translationKey={$string('common.gift_cert')}/>
                        </a>
                    </li>
                )}
            />
            {/* html L68: <li class="navUser-item navUser-item--account"> */}
            <li className="navUser-item navUser-item--account">
                {/* html L69: {{#if customer}} */}
                <$If
                    query={[customer]}
                    $then={() => (
                        <>
                            {/* html L70-73:
                               <a class="navUser-action"
                                  href="{{urls.account.index}}"
                                  aria-label="{{lang 'common.account'}}"
                               >
                            */}
                            <a className="navUser-action" href={urls.account.index} aria-label={$lang($string('common.account'))}>
                                {/* html L74: {{lang 'common.account'}} */}
                                <$Lang translationKey={$string('common.account')}/>
                            </a>
                            {/* html L76-79:
                               <a class="navUser-action"
                                  href="{{urls.auth.logout}}"
                                  aria-label="{{lang 'common.logout'}}"
                               >
                            */}
                            <a className="navUser-action" href={urls.auth.logout} aria-label={$lang($string('common.logout'))}>
                                {/* html L80: {{lang 'common.logout'}} */}
                                <$Lang translationKey={$string('common.logout')}/>
                            </a>
                        </>
                    )}
                    $else={() => (
                        <>
                            {/* html L82: {{else}}
                                                              html L83-86:
                               <a class="navUser-action"
                                  href="{{urls.auth.login}}"
                                  aria-label="{{lang 'common.login'}}"
                               >
                            */}
                            <a className="navUser-action" href={urls.auth.login} aria-label={$lang($string('common.login'))}>
                                {/* html L87: {{lang 'common.login'}} */}
                                <$Lang translationKey={$string('common.login')}/>
                            </a>
                            {/* html L89: {{#if settings.account_creation_enabled}} */}
                            <$If
                                query={[settings.account_creation_enabled]}
                                $then={() => (
                                    <>
                                        {/* html L90: <span class="navUser-or">{{lang 'common.or'}}</span> */}
                                        <span className="navUser-or">
                                            {/* html L90: {{lang 'common.or'}} */}
                                            <$Lang translationKey={$string('common.or')}/>
                                        </span>
                                        {/* html L91-94:
                                           <a class="navUser-action"
                                              href="{{urls.auth.create_account}}"
                                              aria-label="{{lang 'common.sign_up'}}"
                                           >
                                        */}
                                        <a
                                            className="navUser-action"
                                            href={urls.auth.create_account}
                                            aria-label={$lang($string('common.sign_up'))}
                                        >
                                            {/* html L95: {{lang 'common.sign_up'}} */}
                                            <$Lang translationKey={$string('common.sign_up')}/>
                                        </a>
                                    </>
                                )}
                            />
                        </>
                    )}
                />
            </li>
            {/* html L100: <li class="navUser-item navUser-item--cart"> */}
            <li className="navUser-item navUser-item--cart">
                {/* html L101-107:
                   <a class="navUser-action"
                      data-cart-preview
                      data-dropdown="cart-preview-dropdown"
                      data-options="align:right"
                      href="{{urls.cart}}"
                      aria-label="{{lang 'cart.nav_aria_label'}}"
                   >
                */}
                <a
                    className="navUser-action"
                    data-cart-preview=""
                    data-dropdown="cart-preview-dropdown"
                    data-options="align:right"
                    href={urls.cart}
                    aria-label={$lang($string('cart.nav_aria_label'))}
                >
                    {/* html L108: <span class="navUser-item-cartLabel">{{lang 'common.cart'}}</span> */}
                    <span className="navUser-item-cartLabel">
                        {/* html L108: {{lang 'common.cart'}} */}
                        <$Lang translationKey={$string('common.cart')}/>
                    </span>
                    {/* html L109: <span class="countPill cart-quantity"></span> */}
                    <span className="countPill cart-quantity"></span>
                </a>

                {/* html L112: <div class="dropdown-menu" id="cart-preview-dropdown" data-dropdown-content aria-hidden="true"></div> */}
                <div className="dropdown-menu" id="cart-preview-dropdown" data-dropdown-content="" aria-hidden="true"></div>
            </li>
        </ul>
        {/* html L115: <div class="dropdown dropdown--quickSearch" id="quickSearch" aria-hidden="true" data-prevent-quick-search-close> */}
        <div className="dropdown dropdown--quickSearch" id="quickSearch" aria-hidden="true" data-prevent-quick-search-close="">
            {/* html L116: {{> components/common/quick-search name='nav-quick-search'}} */}
            <QuickSearch name={$string('nav-quick-search')} semantic_search_enabled={semantic_search_enabled} urls={urls}/>
        </div>
    </nav>
));
