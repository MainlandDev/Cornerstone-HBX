/**
 * Source: templates/components/gift-certificate/navigation.html (38 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $string, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContext, type ThemeContextHint} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

type Hint = ThemeContextHint<ThemeContext>;

export default $asPartial<{gift_page: HandlebarsInlineValueToken<string>; urls: Hint['urls']}>(({gift_page, urls}) => (
    /* html L1: <nav class="navBar navBar--sub"> */
    <nav className="navBar navBar--sub">
        {/* html L2: <ul class="navBar-section account-navigation"> */}
        <ul className="navBar-section account-navigation">
            {/* html L3: {{#if gift_page '===' 'purchase'}} */}
            <$If
                query={[gift_page, '===', $string('purchase')]}
                $then={() => (
                    /* html L4: <li class="navBar-item is-active"> */
                    <li className="navBar-item is-active">
                        {/* html L5: {{lang 'gift_certificate.purchase.heading'}} */}
                        <$Lang translationKey={$string('gift_certificate.purchase.heading')}/>
                    </li>
                )}
                $else={() => (
                    /* html L7: {{else}}
                                              html L8: <li class="navBar-item">
                    */
                    <li className="navBar-item">
                        {/* html L9: <a class="navBar-action" href="{{urls.gift_certificate.purchase}}"> */}
                        <a className="navBar-action" href={urls.gift_certificate.purchase}>
                            {/* html L10: {{lang 'gift_certificate.purchase.heading'}} */}
                            <$Lang translationKey={$string('gift_certificate.purchase.heading')}/>
                        </a>
                    </li>
                )}
            />
            {/* html L14: {{#if gift_page '===' 'redeem'}} */}
            <$If
                query={[gift_page, '===', $string('redeem')]}
                $then={() => (
                    /* html L15: <li class="navBar-item is-active"> */
                    <li className="navBar-item is-active">
                        {/* html L16: {{lang 'gift_certificate.redeem.heading'}} */}
                        <$Lang translationKey={$string('gift_certificate.redeem.heading')}/>
                    </li>
                )}
                $else={() => (
                    /* html L18: {{else}}
                                              html L19: <li class="navBar-item">
                    */
                    <li className="navBar-item">
                        {/* html L20: <a class="navBar-action" href="{{urls.gift_certificate.redeem}}"> */}
                        <a className="navBar-action" href={urls.gift_certificate.redeem}>
                            {/* html L21: {{lang 'gift_certificate.redeem.heading'}} */}
                            <$Lang translationKey={$string('gift_certificate.redeem.heading')}/>
                        </a>
                    </li>
                )}
            />
            {/* html L25: {{#if gift_page '===' 'balance'}} */}
            <$If
                query={[gift_page, '===', $string('balance')]}
                $then={() => (
                    /* html L26: <li class="navBar-item is-active"> */
                    <li className="navBar-item is-active">
                        {/* html L27: {{lang 'gift_certificate.balance.heading'}} */}
                        <$Lang translationKey={$string('gift_certificate.balance.heading')}/>
                    </li>
                )}
                $else={() => (
                    /* html L29: {{else}}
                                              html L30: <li class="navBar-item">
                    */
                    <li className="navBar-item">
                        {/* html L31: <a class="navBar-action" href="{{urls.gift_certificate.balance}}"> */}
                        <a className="navBar-action" href={urls.gift_certificate.balance}>
                            {/* html L32: {{lang 'gift_certificate.balance.heading'}} */}
                            <$Lang translationKey={$string('gift_certificate.balance.heading')}/>
                        </a>
                    </li>
                )}
            />
        </ul>
    </nav>
));
