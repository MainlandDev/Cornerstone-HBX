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
    <nav className="navBar navBar--sub navBar--account">
        <ul className="navBar-section">
            <li className={`navBar-item ${$if(account_page, '===', $string('orders')).then(() => $$raw('is-active'))}`}>
                <a className="navBar-action" href={urls.account.orders.all}>
                    <$Lang translationKey={$string('account.nav.orders')}/>
                </a>
            </li>
            <$If
                query={[settings.returns_enabled]}
                $then={() => (
                    <li className={`navBar-item ${$if(account_page, '===', $string('returns')).then(() => $$raw('is-active'))}`}>
                        <a className="navBar-action" href={urls.account.returns}>
                            <$Lang translationKey={$string('account.nav.returns')}/>
                        </a>
                    </li>
                )}
            />
            <li className={`navBar-item ${$if(account_page, '===', $string('messages')).then(() => $$raw('is-active'))}`}>
                <a className="navBar-action" href={urls.account.inbox}>
                    <$Lang translationKey={$string('account.nav.messages')} params={{num_new_messages: customer.num_new_messages}}/>
                </a>
            </li>
            <li className={`navBar-item ${$if(account_page, '===', $string('addresses')).then(() => $$raw('is-active'))}`}>
                <a className="navBar-action" href={urls.account.addresses}>
                    <$Lang translationKey={$string('account.nav.addresses')}/>
                </a>
            </li>
            <$If
                query={[settings.show_payment_methods]}
                $then={() => (
                    <li className={`navBar-item ${$if(account_page, '===', $string('payment_methods')).then(() => $$raw('is-active'))}`}>
                        <a className="navBar-action" href={urls.account.payment_methods.all}>
                            <$Lang translationKey={$string('account.nav.payment_methods')}/>
                        </a>
                    </li>
                )}
            />
            <$If
                query={[settings.show_wishlist]}
                $then={() => (
                    <li className={`navBar-item ${$if(account_page, '===', $string('wishlists')).then(() => $$raw('is-active'))}`}>
                        <a className="navBar-action" href={urls.account.wishlists.all}>
                            <$Lang translationKey={$string('account.nav.wishlists')}/>
                        </a>
                    </li>
                )}
            />
            <li className={`navBar-item ${$if(account_page, '===', $string('recent_items')).then(() => $$raw('is-active'))}`}>
                <a className="navBar-action" href={urls.account.recent_items}>
                    <$Lang translationKey={$string('account.nav.recently_viewed')}/>
                </a>
            </li>
            <li className={`navBar-item ${$if(account_page, '===', $string('settings')).then(() => $$raw('is-active'))}`}>
                <a className="navBar-action" href={urls.account.details}>
                    <$Lang translationKey={$string('account.nav.settings')}/>
                </a>
            </li>
        </ul>
    </nav>
));
