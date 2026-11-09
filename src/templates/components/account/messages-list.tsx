import {$Each, $If, $string, $unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {ExtendedThemePageMessages} from '@/context-account';

type Hint = ThemeContextHint<ExtendedThemePageMessages>;

export default $asPartial<{ messages: Hint['messages']; settings: Hint['settings'] }>(({messages, settings}) => (
    <>
        <h3 className="account-heading">
            <$Lang translationKey={$string('account.messages.heading')}/>
        </h3>

        <ul className="account-list">
            <$Each
                list={messages}
                $then={(message) => (
                    <li className="account-listItem">
                        <div className="account-message">
                            <div className="account-orderStatus">
                                <span>{message.date}</span>
                            </div>

                            <h5 className={`account-product-title ${$unless(message.unread).then(() => $$raw('is-read'))}`}>{message.subject}</h5>
                            <p className={`${$unless(message.unread).then(() => $$raw('is-read'))}`}>
                                <$If
                                    query={[message.is_reply]}
                                    $then={() => (
                                        <$Lang translationKey={$string('account.messages.merchant_said')} params={{store_name: settings.store_name}}/>
                                    )}
                                    $else={() => <$Lang translationKey={$string('account.messages.customer_said')}/>}
                                />
                                {message.message}
                            </p>
                        </div>
                    </li>
                )}
            />
        </ul>
    </>
));
