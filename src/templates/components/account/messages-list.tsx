/**
 * Source: templates/components/account/messages-list.html (26 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $string, $unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {ExtendedThemePageMessages} from '@/context-account';

type Hint = ThemeContextHint<ExtendedThemePageMessages>;

export default $asPartial<{ messages: Hint['messages']; settings: Hint['settings'] }>(({messages, settings}) => (
    <>
        {/* html L1: <h3 class="account-heading">{{lang 'account.messages.heading' }}</h3> */}
        <h3 className="account-heading">
            {/* html L1: {{lang 'account.messages.heading' }} */}
            <$Lang translationKey={$string('account.messages.heading')}/>
        </h3>

        {/* html L3: <ul class="account-list"> */}
        <ul className="account-list">
            {/* html L4: {{#each messages}} */}
            <$Each
                list={messages}
                $then={(message) => (
                    /* html L5: <li class="account-listItem"> */
                    <li className="account-listItem">
                        {/* html L6: <div class="account-message"> */}
                        <div className="account-message">
                            {/* html L7: <div class="account-orderStatus"> */}
                            <div className="account-orderStatus">
                                {/* html L8: <span>{{date}}</span> */}
                                <span>{/* html L8: {{date}} */}{message.date}</span>
                            </div>

                            {/* html L11: <h5 class="account-product-title {{#unless unread}}is-read{{/unless}}"> */}
                            <h5 className={`account-product-title ${$unless(message.unread).then(() => $$raw('is-read'))}`}>{/* html L12: {{subject}} */}{message.subject}</h5>
                            {/* html L14: <p class="{{#unless unread}}is-read{{/unless}}"> */}
                            <p className={`${$unless(message.unread).then(() => $$raw('is-read'))}`}>
                                {/* html L15: {{#if is_reply}} */}
                                <$If
                                    query={[message.is_reply]}
                                    $then={() => (
                                        /* html L16: {{lang 'account.messages.merchant_said' store_name=../settings.store_name}} */
                                        <$Lang translationKey={$string('account.messages.merchant_said')} params={{store_name: settings.store_name}}/>
                                    )}
                                    $else={() => /* html L17: {{else}}
                                                                                                        html L18: {{lang 'account.messages.customer_said'}}
                                                 */ <$Lang translationKey={$string('account.messages.customer_said')}/>}
                                />
                                {/* html L20: {{message}} */}
                                {message.message}
                            </p>
                        </div>
                    </li>
                )}
            />
        </ul>
    </>
));
