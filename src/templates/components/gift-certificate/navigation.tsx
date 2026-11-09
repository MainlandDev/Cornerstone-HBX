import {$If, $string, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContext, type ThemeContextHint} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

type Hint = ThemeContextHint<ThemeContext>;

export default $asPartial<{gift_page: HandlebarsInlineValueToken<string>; urls: Hint['urls']}>(({gift_page, urls}) => (
    <nav className="navBar navBar--sub">
        <ul className="navBar-section account-navigation">
            <$If
                query={[gift_page, '===', $string('purchase')]}
                $then={() => (
                    <li className="navBar-item is-active">
                        <$Lang translationKey={$string('gift_certificate.purchase.heading')}/>
                    </li>
                )}
                $else={() => (
                    <li className="navBar-item">
                        <a className="navBar-action" href={urls.gift_certificate.purchase}>
                            <$Lang translationKey={$string('gift_certificate.purchase.heading')}/>
                        </a>
                    </li>
                )}
            />
            <$If
                query={[gift_page, '===', $string('redeem')]}
                $then={() => (
                    <li className="navBar-item is-active">
                        <$Lang translationKey={$string('gift_certificate.redeem.heading')}/>
                    </li>
                )}
                $else={() => (
                    <li className="navBar-item">
                        <a className="navBar-action" href={urls.gift_certificate.redeem}>
                            <$Lang translationKey={$string('gift_certificate.redeem.heading')}/>
                        </a>
                    </li>
                )}
            />
            <$If
                query={[gift_page, '===', $string('balance')]}
                $then={() => (
                    <li className="navBar-item is-active">
                        <$Lang translationKey={$string('gift_certificate.balance.heading')}/>
                    </li>
                )}
                $else={() => (
                    <li className="navBar-item">
                        <a className="navBar-action" href={urls.gift_certificate.balance}>
                            <$Lang translationKey={$string('gift_certificate.balance.heading')}/>
                        </a>
                    </li>
                )}
            />
        </ul>
    </nav>
));
