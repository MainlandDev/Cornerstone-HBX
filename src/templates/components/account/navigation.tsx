import {$If, $Lang, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <nav className="navBar navBar--sub navBar--account">
        <ul className="navBar-section">
            <li className={`navBar-item ${$raw("{{#if account_page '===' 'orders'}}is-active{{/if}}")}`}>
                <a className="navBar-action" href={$pointer("urls.account.orders.all")}>
                    <$Lang keyName={$string("account.nav.orders")} />
                </a>
            </li>
            <$If
                test={$pointer("settings.returns_enabled")}
                $then={() => (
                    <li className={`navBar-item ${$raw("{{#if account_page '===' 'returns'}}is-active{{/if}}")}`}>
                        <a className="navBar-action" href={$pointer("urls.account.returns")}>
                            <$Lang keyName={$string("account.nav.returns")} />
                        </a>
                    </li>
                )}
            />
            <li className={`navBar-item ${$raw("{{#if account_page '===' 'messages'}}is-active{{/if}}")}`}>
                <a className="navBar-action" href={$pointer("urls.account.inbox")}>
                    <$Lang keyName={$string("account.nav.messages")} num_new_messages={$pointer("customer.num_new_messages")} />
                </a>
            </li>
            <li className={`navBar-item ${$raw("{{#if account_page '===' 'addresses'}}is-active{{/if}}")}`}>
                <a className="navBar-action" href={$pointer("urls.account.addresses")}>
                    <$Lang keyName={$string("account.nav.addresses")} />
                </a>
            </li>
            <$If
                test={$pointer("settings.show_payment_methods")}
                $then={() => (
                    <li className={`navBar-item ${$raw("{{#if account_page '===' 'payment_methods'}}is-active{{/if}}")}`}>
                        <a className="navBar-action" href={$pointer("urls.account.payment_methods.all")}>
                            <$Lang keyName={$string("account.nav.payment_methods")} />
                        </a>
                    </li>
                )}
            />
            <$If
                test={$pointer("settings.show_wishlist")}
                $then={() => (
                    <li className={`navBar-item ${$raw("{{#if account_page '===' 'wishlists'}}is-active{{/if}}")}`}>
                        <a className="navBar-action" href={$pointer("urls.account.wishlists.all")}>
                            <$Lang keyName={$string("account.nav.wishlists")} />
                        </a>
                    </li>
                )}
            />
            <li className={`navBar-item ${$raw("{{#if account_page '===' 'recent_items'}}is-active{{/if}}")}`}>
                <a className="navBar-action" href={$pointer("urls.account.recent_items")}>
                    <$Lang keyName={$string("account.nav.recently_viewed")} />
                </a>
            </li>
            <li className={`navBar-item ${$raw("{{#if account_page '===' 'settings'}}is-active{{/if}}")}`}>
                <a className="navBar-action" href={$pointer("urls.account.details")}>
                    <$Lang keyName={$string("account.nav.settings")} />
                </a>
            </li>
        </ul>
    </nav>
);
