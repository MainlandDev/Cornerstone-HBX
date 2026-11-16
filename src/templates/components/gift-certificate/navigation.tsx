import {$If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <nav className="navBar navBar--sub">
        <ul className="navBar-section account-navigation">
            <$If
                test={$pointer("gift_page")}
                operator={$string("===")}
                rvalue={$string("purchase")}
                $then={() => (
                    <li className="navBar-item is-active">
                        <$Lang keyName={$string("gift_certificate.purchase.heading")} />
                    </li>
                )}
                $else={() => (
                    <li className="navBar-item">
                        <a className="navBar-action" href={$pointer("urls.gift_certificate.purchase")}>
                            <$Lang keyName={$string("gift_certificate.purchase.heading")} />
                        </a>
                    </li>
                )}
            />
            <$If
                test={$pointer("gift_page")}
                operator={$string("===")}
                rvalue={$string("redeem")}
                $then={() => (
                    <li className="navBar-item is-active">
                        <$Lang keyName={$string("gift_certificate.redeem.heading")} />
                    </li>
                )}
                $else={() => (
                    <li className="navBar-item">
                        <a className="navBar-action" href={$pointer("urls.gift_certificate.redeem")}>
                            <$Lang keyName={$string("gift_certificate.redeem.heading")} />
                        </a>
                    </li>
                )}
            />
            <$If
                test={$pointer("gift_page")}
                operator={$string("===")}
                rvalue={$string("balance")}
                $then={() => (
                    <li className="navBar-item is-active">
                        <$Lang keyName={$string("gift_certificate.balance.heading")} />
                    </li>
                )}
                $else={() => (
                    <li className="navBar-item">
                        <a className="navBar-action" href={$pointer("urls.gift_certificate.balance")}>
                            <$Lang keyName={$string("gift_certificate.balance.heading")} />
                        </a>
                    </li>
                )}
            />
        </ul>
    </nav>
);
