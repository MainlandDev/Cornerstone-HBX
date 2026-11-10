/**
 * Source: templates/components/common/navigation-menu.html (229 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
    /* html L1: <nav class="navPages"> */
    <nav className="navPages">
        {/* html L2: <div class="navPages-quickSearch"> */}
        <div className="navPages-quickSearch">
            {/* html L3: {{> components/common/quick-search name='nav-menu-quick-search'}} */}
            <QuickSearch name={$string('nav-menu-quick-search')} semantic_search_enabled={semantic_search_enabled} urls={urls}/>
        </div>
        {/* html L5: <ul class="navPages-list{{#if theme_settings.navigation_design '!==' 'simple'}} navPages-list-depth-max{{/if}}"> */}
        <ul className={`navPages-list${$if(theme_settings.navigation_design, '!==', $string('simple')).then(() => $$raw(' navPages-list-depth-max'))}`}>
            {/* html L6: {{#each categories}} */}
            <$Each
                list={categories}
                $then={() => (
                    /* html L7: <li class="navPages-item"> */
                    <li className="navPages-item">
                        {/* html L8: {{#if ../theme_settings.navigation_design '===' 'simple'}} */}
                        <$If
                            query={[theme_settings.navigation_design, '===', $string('simple')]}
                            $then={() => /* html L9: {{> components/common/navigation-list}} */ <$Partial name="components/common/navigation-list" context={$this()}/>}
                        />
                        {/* html L11: {{#if ../theme_settings.navigation_design '===' 'alternate'}} */}
                        <$If
                            query={[theme_settings.navigation_design, '===', $string('alternate')]}
                            $then={() => /* html L12: {{> components/common/navigation-list-alternate}} */ <$Partial name="components/common/navigation-list-alternate" context={$this()}/>}
                        />
                    </li>
                )}
            />
            {/* html L16: {{#unless theme_settings.hide_content_navigation}} */}
            <$Unless
                query={[theme_settings.hide_content_navigation]}
                $then={() => (
                    /* html L17: {{#each pages}} */
                    <$Each
                        list={pages}
                        $then={(pageLink) => (
                            /* html L18: <li class="navPages-item navPages-item-page"> */
                            <li className="navPages-item navPages-item-page">
                                {/* html L19-22:
                                   <a class="navPages-action{{#if name '==' ../page.title}} activePage{{/if}}"
                                      href="{{url}}"
                                      aria-label="{{name}}"
                                   >
                                */}
                                <a
                                    className={`navPages-action${$if(pageLink.name, '==', page.title).then(() => $$raw(' activePage'))}`}
                                    href={pageLink.url}
                                    aria-label={pageLink.name}
                                >
                                    {/* html L23: {{name}} */}
                                    {pageLink.name}
                                </a>
                            </li>
                        )}
                    />
                )}
            />
        </ul>
        {/* html L29: <ul class="navPages-list navPages-list--user"> */}
        <ul className="navPages-list navPages-list--user">
            {/* html L30: {{#and language_selector language_selector.languages.length '>' 1}} */}
            <$And
                a={language_selector}
                b={$if(language_selector.languages.length, '>', $number(1))}
                $then={() => (
                    /* html L31: <li class="navPages-item"> */
                    <li className="navPages-item">
                        {/* html L32: {{> components/common/language-selector-mobile}} */}
                        <LanguageSelectorMobile language_selector={language_selector}/>
                    </li>
                )}
            />
            {/* html L35: {{#if currency_selector.currencies.length '>' 1}} */}
            <$If
                query={[currency_selector.currencies.length, '>', $number(1)]}
                $then={() => (
                    /* html L36: <li class="navPages-item"> */
                    <li className="navPages-item">
                        {/* html L37-43:
                           <a class="navPages-action has-subMenu"
                              href="#"
                              data-collapsible="navPages-currency"
                              aria-controls="navPages-currency"
                              aria-expanded="false"
                              aria-label="{{lang 'common.currency' code=currency_selector.active_currency_code}}"
                           >
                        */}
                        <a
                            className="navPages-action has-subMenu"
                            href="#"
                            data-collapsible="navPages-currency"
                            aria-controls="navPages-currency"
                            aria-expanded="false"
                            aria-label={$lang($string('common.currency'), {code: currency_selector.active_currency_code})}
                        >
                            {/* html L44: {{lang 'common.currency' code=currency_selector.active_currency_code}} */}
                            <$Lang translationKey={$string('common.currency')} params={{code: currency_selector.active_currency_code}}/>
                            {/* html L45: <i class="icon navPages-action-moreIcon" aria-hidden="true"> */}
                            <i className="icon navPages-action-moreIcon" aria-hidden="true">
                                {/* html L46: <svg> */}
                                <svg>
                                    {/* html L47: <use href="#icon-chevron-down"></use> */}
                                    <use href="#icon-chevron-down"/>
                                </svg>
                            </i>
                        </a>
                        {/* html L51: <div class="navPage-subMenu" id="navPages-currency" aria-hidden="true" tabindex="-1"> */}
                        <div className="navPage-subMenu" id="navPages-currency" aria-hidden="true" tabIndex={-1}>
                            {/* html L52: <ul class="navPage-subMenu-list"> */}
                            <ul className="navPage-subMenu-list">
                                {/* html L53: {{#each currency_selector.currencies}} */}
                                <$Each
                                    list={currency_selector.currencies}
                                    $then={(currency) => (
                                        /* html L54: <li class="navPage-subMenu-item"> */
                                        <li className="navPage-subMenu-item">
                                            {/* html L55-63:
                                               <a class="navPage-subMenu-action navPages-action"
                                                  href="{{{switch_url}}}"
                                                  aria-label="{{name}}"
                                                  data-currency-code="{{{code}}}"
                                                  {{#if cart_currency_switch_url.length '>' 0 }}
                                                  data-cart-currency-switch-url="{{{cart_currency_switch_url}}}"
                                                  {{/if}}
                                                  data-warning="{{lang 'common.currency_switch_promotion'}}"
                                               >
                                            */}
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
                                                {/* html L64: {{#if is_active}} */}
                                                <$If
                                                    query={[currency.is_active]}
                                                    $then={() => /* html L65: <strong>{{name}}</strong> */ <strong>{/* html L65: {{name}} */}{currency.name}</strong>}
                                                    $else={() => <>{/* html L66: {{else}}
                                                                                                                                            html L67: {{name}}
                                                                   */}{currency.name}</>}
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
            {/* html L76: {{#if theme_settings.show_channels}} */}
            <$If
                query={[theme_settings.show_channels]}
                $then={() => (
                    /* html L77: <li class="navPages-item"> */
                    <li className="navPages-item">
                        {/* html L78: {{> components/common/channel-selector-mobile}} */}
                        <ChannelSelectorMobile theme_settings={theme_settings}/>
                    </li>
                )}
            />
            {/* html L81: {{#if settings.gift_certificates_enabled}} */}
            <$If
                query={[settings.gift_certificates_enabled]}
                $then={() => (
                    /* html L82: <li class="navPages-item"> */
                    <li className="navPages-item">
                        {/* html L83-86:
                           <a class="navPages-action"
                              href="{{urls.gift_certificate.purchase}}"
                              aria-label="{{lang 'common.gift_cert'}}"
                           >
                        */}
                        <a className="navPages-action" href={urls.gift_certificate.purchase} aria-label={$lang($string('common.gift_cert'))}>
                            {/* html L87: {{lang 'common.gift_cert'}} */}
                            <$Lang translationKey={$string('common.gift_cert')}/>
                        </a>
                    </li>
                )}
            />
            {/* html L91: {{#if customer.store_credit.value '>' 0}} */}
            <$If
                query={[customer.store_credit.value, '>', $number(0)]}
                $then={() => (
                    /* html L92: <li class="navPages-item"> */
                    <li className="navPages-item">
                        {/* html L93: <a class="navPages-action navPages-action--storeCredit"> */}
                        <a className="navPages-action navPages-action--storeCredit">
                            {/* html L94: {{lang 'common.store_credit_overview' credit=customer.store_credit.formatted}} */}
                            <$Lang translationKey={$string('common.store_credit_overview')} params={{credit: customer.store_credit.formatted}}/>
                        </a>
                    </li>
                )}
            />
            {/* html L98: {{#if theme_settings.product_list_display_mode '==' 'list'}} */}
            <$If
                query={[theme_settings.product_list_display_mode, '==', $string('list')]}
                $then={() => (
                    /* html L99: <li class="navPages-item"> */
                    <li className="navPages-item">
                        {/* html L100-104:
                           <a class="navPages-action navPages-action--compare"
                              href="{{urls.compare}}"
                              data-compare-nav
                              aria-label="{{lang 'common.compare'}}"
                           >
                        */}
                        <a
                            className="navPages-action navPages-action--compare"
                            href={urls.compare}
                            data-compare-nav=""
                            aria-label={$lang($string('common.compare'))}
                        >
                            {/* html L105: {{lang 'common.compare'}} */}
                            <$Lang translationKey={$string('common.compare')}/>
                            {/* html L106: <span class="countPill countPill--positive countPill--alt"></span> */}
                            <span className="countPill countPill--positive countPill--alt"></span>
                        </a>
                    </li>
                )}
            />
            {/* html L110: {{#if customer}} */}
            <$If
                query={[customer]}
                $then={() => (
                    <>
                        {/* html L111: <li class="navPages-item"> */}
                        <li className="navPages-item">
                            {/* html L112-116:
                               <a class="navPages-action has-subMenu"
                                  href="{{urls.account.index}}"
                                  data-collapsible="navPages-account"
                                  aria-label="{{lang 'common.account'}}"
                               >
                            */}
                            <a
                                className="navPages-action has-subMenu"
                                href={urls.account.index}
                                data-collapsible="navPages-account"
                                aria-label={$lang($string('common.account'))}
                            >
                                {/* html L117: {{lang 'common.account'}} */}
                                <$Lang translationKey={$string('common.account')}/>
                                {/* html L118: <i class="icon navPages-action-moreIcon" aria-hidden="true"> */}
                                <i className="icon navPages-action-moreIcon" aria-hidden="true">
                                    {/* html L119: <svg><use href="#icon-chevron-down" /></svg> */}
                                    <svg>
                                        {/* html L119: <use href="#icon-chevron-down" /> */}
                                        <use href="#icon-chevron-down"/>
                                    </svg>
                                </i>
                            </a>
                            {/* html L122: <div class="navPage-subMenu" id="navPages-account" aria-hidden="true" tabindex="-1"> */}
                            <div className="navPage-subMenu" id="navPages-account" aria-hidden="true" tabIndex={-1}>
                                {/* html L123: <ul class="navPage-subMenu-list"> */}
                                <ul className="navPage-subMenu-list">
                                    {/* html L124: <li class="navPage-subMenu-item"> */}
                                    <li className="navPage-subMenu-item">
                                        {/* html L125-128:
                                           <a class="navPage-subMenu-action navPages-action"
                                              href="{{urls.account.orders.all}}"
                                              aria-label="{{lang 'account.nav.orders'}}"
                                           >
                                        */}
                                        <a
                                            className="navPage-subMenu-action navPages-action"
                                            href={urls.account.orders.all}
                                            aria-label={$lang($string('account.nav.orders'))}
                                        >
                                            {/* html L129: {{lang 'account.nav.orders'}} */}
                                            <$Lang translationKey={$string('account.nav.orders')}/>
                                        </a>
                                    </li>
                                    {/* html L132: {{#if settings.returns_enabled}} */}
                                    <$If
                                        query={[settings.returns_enabled]}
                                        $then={() => (
                                            /* html L133: <li class="navPage-subMenu-item"> */
                                            <li className="navPage-subMenu-item">
                                                {/* html L134-137:
                                                   <a class="navPage-subMenu-action navPages-action"
                                                      href="{{urls.account.returns}}"
                                                      aria-label="{{lang 'account.nav.returns'}}"
                                                   >
                                                */}
                                                <a
                                                    className="navPage-subMenu-action navPages-action"
                                                    href={urls.account.returns}
                                                    aria-label={$lang($string('account.nav.returns'))}
                                                >
                                                    {/* html L138: {{lang 'account.nav.returns'}} */}
                                                    <$Lang translationKey={$string('account.nav.returns')}/>
                                                </a>
                                            </li>
                                        )}
                                    />
                                    {/* html L142: <li class="navPage-subMenu-item"> */}
                                    <li className="navPage-subMenu-item">
                                        {/* html L143-146:
                                           <a class="navPage-subMenu-action navPages-action"
                                              href="{{urls.account.inbox}}"
                                              aria-label="{{lang 'account.mobile_nav.messages'}}"
                                           >
                                        */}
                                        <a
                                            className="navPage-subMenu-action navPages-action"
                                            href={urls.account.inbox}
                                            aria-label={$lang($string('account.mobile_nav.messages'))}
                                        >
                                            {/* html L147: {{lang 'account.mobile_nav.messages'}} */}
                                            <$Lang translationKey={$string('account.mobile_nav.messages')}/>
                                        </a>
                                    </li>
                                    {/* html L150: <li class="navPage-subMenu-item"> */}
                                    <li className="navPage-subMenu-item">
                                        {/* html L151-154:
                                           <a class="navPage-subMenu-action navPages-action"
                                              href="{{urls.account.addresses}}"
                                              aria-label="{{lang 'account.nav.addresses'}}"
                                           >
                                        */}
                                        <a
                                            className="navPage-subMenu-action navPages-action"
                                            href={urls.account.addresses}
                                            aria-label={$lang($string('account.nav.addresses'))}
                                        >
                                            {/* html L155: {{lang 'account.nav.addresses'}} */}
                                            <$Lang translationKey={$string('account.nav.addresses')}/>
                                        </a>
                                    </li>
                                    {/* html L158: {{#if settings.show_payment_methods}} */}
                                    <$If
                                        query={[settings.show_payment_methods]}
                                        $then={() => (
                                            /* html L159: <li class="navPage-subMenu-item"> */
                                            <li className="navPage-subMenu-item">
                                                {/* html L160-163:
                                                   <a class="navPage-subMenu-action navPages-action"
                                                      href="{{urls.account.payment_methods.all}}"
                                                      aria-label="{{lang 'account.nav.payment_methods'}}"
                                                   >
                                                */}
                                                <a
                                                    className="navPage-subMenu-action navPages-action"
                                                    href={urls.account.payment_methods.all}
                                                    aria-label={$lang($string('account.nav.payment_methods'))}
                                                >
                                                    {/* html L164: {{lang 'account.nav.payment_methods'}} */}
                                                    <$Lang translationKey={$string('account.nav.payment_methods')}/>
                                                </a>
                                            </li>
                                        )}
                                    />
                                    {/* html L168: <li class="navPage-subMenu-item"> */}
                                    <li className="navPage-subMenu-item">
                                        {/* html L169-172:
                                           <a class="navPage-subMenu-action navPages-action"
                                              href="{{urls.account.wishlists.all}}"
                                              aria-label="{{lang 'account.mobile_nav.wishlists'}}"
                                           >
                                        */}
                                        <a
                                            className="navPage-subMenu-action navPages-action"
                                            href={urls.account.wishlists.all}
                                            aria-label={$lang($string('account.mobile_nav.wishlists'))}
                                        >
                                            {/* html L173: {{lang 'account.mobile_nav.wishlists'}} */}
                                            <$Lang translationKey={$string('account.mobile_nav.wishlists')}/>
                                        </a>
                                    </li>
                                    {/* html L176: <li class="navPage-subMenu-item"> */}
                                    <li className="navPage-subMenu-item">
                                        {/* html L177-180:
                                           <a class="navPage-subMenu-action navPages-action"
                                              href="{{urls.account.recent_items}}"
                                              aria-label="{{lang 'account.nav.recently_viewed'}}"
                                           >
                                        */}
                                        <a
                                            className="navPage-subMenu-action navPages-action"
                                            href={urls.account.recent_items}
                                            aria-label={$lang($string('account.nav.recently_viewed'))}
                                        >
                                            {/* html L181: {{lang 'account.nav.recently_viewed'}} */}
                                            <$Lang translationKey={$string('account.nav.recently_viewed')}/>
                                        </a>
                                    </li>
                                    {/* html L184: <li class="navPage-subMenu-item"> */}
                                    <li className="navPage-subMenu-item">
                                        {/* html L185-188:
                                           <a class="navPage-subMenu-action navPages-action"
                                              href="{{urls.account.details}}"
                                              aria-label="{{lang 'account.nav.settings'}}"
                                           >
                                        */}
                                        <a
                                            className="navPage-subMenu-action navPages-action"
                                            href={urls.account.details}
                                            aria-label={$lang($string('account.nav.settings'))}
                                        >
                                            {/* html L189: {{lang 'account.nav.settings'}} */}
                                            <$Lang translationKey={$string('account.nav.settings')}/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        {/* html L195: <li class="navPages-item"> */}
                        <li className="navPages-item">
                            {/* html L196-199:
                               <a class="navPages-action"
                                  href="{{urls.auth.logout}}"
                                  aria-label="{{lang 'common.logout'}}"
                               >
                            */}
                            <a className="navPages-action" href={urls.auth.logout} aria-label={$lang($string('common.logout'))}>
                                {/* html L200: {{lang 'common.logout'}} */}
                                <$Lang translationKey={$string('common.logout')}/>
                            </a>
                        </li>
                    </>
                )}
                $else={() => (
                    /* html L203: {{else}}
                                              html L204: <li class="navPages-item">
                    */
                    <li className="navPages-item">
                        {/* html L205-208:
                           <a class="navPages-action"
                              href="{{urls.auth.login}}"
                              aria-label="{{lang 'common.login'}}"
                           >
                        */}
                        <a className="navPages-action" href={urls.auth.login} aria-label={$lang($string('common.login'))}>
                            {/* html L209: {{lang 'common.login'}} */}
                            <$Lang translationKey={$string('common.login')}/>
                        </a>
                        {/* html L211: {{#if settings.account_creation_enabled}} */}
                        <$If
                            query={[settings.account_creation_enabled]}
                            $then={() => (
                                <>
                                    {/* html L212: {{lang 'common.or'}} */}
                                    <$Lang translationKey={$string('common.or')}/>
                                    {/* html L213-216:
                                       <a class="navPages-action"
                                          href="{{urls.auth.create_account}}"
                                          aria-label="{{lang 'common.sign_up'}}"
                                       >
                                    */}
                                    <a
                                        className="navPages-action"
                                        href={urls.auth.create_account}
                                        aria-label={$lang($string('common.sign_up'))}
                                    >
                                        {/* html L217: {{lang 'common.sign_up'}} */}
                                        <$Lang translationKey={$string('common.sign_up')}/>
                                    </a>
                                </>
                            )}
                        />
                    </li>
                )}
            />
            {/* html L222: {{#if theme_settings.social_icon_placement_top}} */}
            <$If
                query={[theme_settings.social_icon_placement_top]}
                $then={() => (
                    /* html L223: <li class="navPages-item"> */
                    <li className="navPages-item">
                        {/* html L224: {{> components/common/social-links}} */}
                        <SocialLinks social_media={social_media}/>
                    </li>
                )}
            />
        </ul>
    </nav>
));
