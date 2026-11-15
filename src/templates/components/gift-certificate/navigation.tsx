import {$Lang, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <nav className="navBar navBar--sub">
        <ul className="navBar-section account-navigation">
            {$raw("{{#if gift_page '===' 'purchase'}}")}
            <li className="navBar-item is-active">
                <$Lang keyName={$string("gift_certificate.purchase.heading")} />
            </li>
            {$raw("{{else}}")}
            <li className="navBar-item">
                <a className="navBar-action" href={$pointer("urls.gift_certificate.purchase")}>
                    <$Lang keyName={$string("gift_certificate.purchase.heading")} />
                </a>
            </li>
            {$raw("{{/if}}")}
            {$raw("{{#if gift_page '===' 'redeem'}}")}
            <li className="navBar-item is-active">
                <$Lang keyName={$string("gift_certificate.redeem.heading")} />
            </li>
            {$raw("{{else}}")}
            <li className="navBar-item">
                <a className="navBar-action" href={$pointer("urls.gift_certificate.redeem")}>
                    <$Lang keyName={$string("gift_certificate.redeem.heading")} />
                </a>
            </li>
            {$raw("{{/if}}")}
            {$raw("{{#if gift_page '===' 'balance'}}")}
            <li className="navBar-item is-active">
                <$Lang keyName={$string("gift_certificate.balance.heading")} />
            </li>
            {$raw("{{else}}")}
            <li className="navBar-item">
                <a className="navBar-action" href={$pointer("urls.gift_certificate.balance")}>
                    <$Lang keyName={$string("gift_certificate.balance.heading")} />
                </a>
            </li>
            {$raw("{{/if}}")}
        </ul>
    </nav>
);
