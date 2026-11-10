/**
 * Source: templates/components/account/navigation.html (35 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $if, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {ExtendedThemePageAccount} from '@/context-account';

type Hint = ThemeContextHint<ExtendedThemePageAccount>;

export default $asPartial<{
    account_page: Hint['account_page'];
    urls: Hint['urls'];
    settings: Hint['settings'];
    customer: Hint['customer'];
}>(({account_page, urls, settings, customer}) => (
    /* html L1: <nav class="navBar navBar--sub navBar--account"> */
    <nav className="navBar navBar--sub navBar--account">
        {/* html L2: <ul class="navBar-section"> */}
        <ul className="navBar-section">
            {/* html L3: <li class="navBar-item {{#if account_page '===' 'orders'}}is-active{{/if}}"> */}
            <li className={`navBar-item ${$if(account_page, '===', $string('orders')).then(() => $$raw('is-active'))}`}>
                {/* html L4: <a class="navBar-action" href="{{urls.account.orders.all}}">{{lang 'account.nav.orders'}}</a> */}
                <a className="navBar-action" href={urls.account.orders.all}>
                    {/* html L4: {{lang 'account.nav.orders'}} */}
                    <$Lang translationKey={$string('account.nav.orders')}/>
                </a>
            </li>
            {/* html L6: {{#if settings.returns_enabled}} */}
            <$If
                query={[settings.returns_enabled]}
                $then={() => (
                    /* html L7: <li class="navBar-item {{#if account_page '===' 'returns'}}is-active{{/if}}"> */
                    <li className={`navBar-item ${$if(account_page, '===', $string('returns')).then(() => $$raw('is-active'))}`}>
                        {/* html L8: <a class="navBar-action" href="{{urls.account.returns}}">{{lang 'account.nav.returns'}}</a> */}
                        <a className="navBar-action" href={urls.account.returns}>
                            {/* html L8: {{lang 'account.nav.returns'}} */}
                            <$Lang translationKey={$string('account.nav.returns')}/>
                        </a>
                    </li>
                )}
            />
            {/* html L11: <li class="navBar-item {{#if account_page '===' 'messages'}}is-active{{/if}}"> */}
            <li className={`navBar-item ${$if(account_page, '===', $string('messages')).then(() => $$raw('is-active'))}`}>
                {/* html L12: <a class="navBar-action" href="{{urls.account.inbox}}">{{lang 'account.nav.messages' num_new_messages=customer.num_new_messages}}</a> */}
                <a className="navBar-action" href={urls.account.inbox}>
                    {/* html L12: {{lang 'account.nav.messages' num_new_messages=customer.num_new_messages}} */}
                    <$Lang translationKey={$string('account.nav.messages')} params={{num_new_messages: customer.num_new_messages}}/>
                </a>
            </li>
            {/* html L14: <li class="navBar-item {{#if account_page '===' 'addresses'}}is-active{{/if}}"> */}
            <li className={`navBar-item ${$if(account_page, '===', $string('addresses')).then(() => $$raw('is-active'))}`}>
                {/* html L15: <a class="navBar-action" href="{{urls.account.addresses}}">{{lang 'account.nav.addresses'}}</a> */}
                <a className="navBar-action" href={urls.account.addresses}>
                    {/* html L15: {{lang 'account.nav.addresses'}} */}
                    <$Lang translationKey={$string('account.nav.addresses')}/>
                </a>
            </li>
            {/* html L17: {{#if settings.show_payment_methods}} */}
            <$If
                query={[settings.show_payment_methods]}
                $then={() => (
                    /* html L18: <li class="navBar-item {{#if account_page '===' 'payment_methods'}}is-active{{/if}}"> */
                    <li className={`navBar-item ${$if(account_page, '===', $string('payment_methods')).then(() => $$raw('is-active'))}`}>
                        {/* html L19: <a class="navBar-action" href="{{urls.account.payment_methods.all}}">{{lang 'account.nav.payment_methods'}}</a> */}
                        <a className="navBar-action" href={urls.account.payment_methods.all}>
                            {/* html L19: {{lang 'account.nav.payment_methods'}} */}
                            <$Lang translationKey={$string('account.nav.payment_methods')}/>
                        </a>
                    </li>
                )}
            />
            {/* html L22: {{#if settings.show_wishlist}} */}
            <$If
                query={[settings.show_wishlist]}
                $then={() => (
                    /* html L23: <li class="navBar-item {{#if account_page '===' 'wishlists'}}is-active{{/if}}"> */
                    <li className={`navBar-item ${$if(account_page, '===', $string('wishlists')).then(() => $$raw('is-active'))}`}>
                        {/* html L24: <a class="navBar-action" href="{{urls.account.wishlists.all}}">{{lang 'account.nav.wishlists'}}</a> */}
                        <a className="navBar-action" href={urls.account.wishlists.all}>
                            {/* html L24: {{lang 'account.nav.wishlists'}} */}
                            <$Lang translationKey={$string('account.nav.wishlists')}/>
                        </a>
                    </li>
                )}
            />
            {/* html L27: <li class="navBar-item {{#if account_page '===' 'recent_items'}}is-active{{/if}}"> */}
            <li className={`navBar-item ${$if(account_page, '===', $string('recent_items')).then(() => $$raw('is-active'))}`}>
                {/* html L28: <a class="navBar-action" href="{{urls.account.recent_items}}">{{lang 'account.nav.recently_viewed'}}</a> */}
                <a className="navBar-action" href={urls.account.recent_items}>
                    {/* html L28: {{lang 'account.nav.recently_viewed'}} */}
                    <$Lang translationKey={$string('account.nav.recently_viewed')}/>
                </a>
            </li>
            {/* html L30: <li class="navBar-item {{#if account_page '===' 'settings'}}is-active{{/if}}"> */}
            <li className={`navBar-item ${$if(account_page, '===', $string('settings')).then(() => $$raw('is-active'))}`}>
                {/* html L31: <a class="navBar-action" href="{{urls.account.details}}">{{lang 'account.nav.settings'}}</a> */}
                <a className="navBar-action" href={urls.account.details}>
                    {/* html L31: {{lang 'account.nav.settings'}} */}
                    <$Lang translationKey={$string('account.nav.settings')}/>
                </a>
            </li>
        </ul>
    </nav>
));
