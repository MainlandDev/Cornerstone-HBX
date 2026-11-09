import {$Each, $If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageAccountInbox} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';

type Hint = ThemeContextHint<ThemePageAccountInbox>;

export default $asPartial<{ customer: Hint['customer']; urls: Hint['urls'] }>(({customer, urls}) => (
    <$If
        query={[customer.inbox.orders]}
        $then={() => (
            <>
                <h2>
                    <$Lang translationKey={$string('forms.inbox.send_message')}/>
                </h2>
                <form className="form" data-inbox-form="" action={urls.account.send_message} method="post">
                    <$Inject keyName={$string('enterOrderNum')} value={$lang($string('forms.validate.account.inbox.order'))}/>
                    <$Inject keyName={$string('enterSubject')} value={$lang($string('forms.validate.account.inbox.subject'))}/>
                    <$Inject keyName={$string('enterMessage')} value={$lang($string('forms.validate.account.inbox.message'))}/>
                    <div className="form-field">
                        <label className="form-label" htmlFor="message_order_id">
                            <$Lang translationKey={$string('forms.inbox.order')}/>
                            <small>
                                <$Lang translationKey={$string('common.required')}/>
                            </small>
                        </label>
                        <select className="form-select" name="message_order_id" id="message_order_id">
                            <$Each
                                list={customer.inbox.orders}
                                $then={(order) => (
                                    <option value={order.id}>
                                        <$Lang
                                            translationKey={$string('forms.inbox.order_display')}
                                            params={{id: order.id, date: order.date, total: order.amount.formatted}}
                                        />
                                    </option>
                                )}
                            />
                        </select>
                    </div>
                    <div className="form-field" id="message_subject_field_id">
                        <label className="form-label" htmlFor="message_subject">
                            <$Lang translationKey={$string('forms.inbox.subject')}/>
                            <small>
                                <$Lang translationKey={$string('common.required')}/>
                            </small>
                        </label>
                        <input
                            aria-labelledby="message_subject_field_id"
                            aria-live="polite"
                            type="text"
                            className="form-input"
                            name="message_subject"
                            id="message_subject"
                        />
                    </div>
                    <div className="form-field" id="message_content_field_id">
                        <label className="form-label" htmlFor="message_content">
                            <$Lang translationKey={$string('forms.inbox.message')}/>
                            <small>
                                <$Lang translationKey={$string('common.required')}/>
                            </small>
                        </label>

                        <textarea
                            aria-labelledby="message_content_field_id"
                            aria-live="polite"
                            className="form-input"
                            name="message_content"
                            id="message_content"
                            rows={7}
                        ></textarea>
                    </div>
                    <div className="form-actions">
                        <input className="button button--primary" type="submit" value={$lang($string('forms.inbox.submit_value'))}/>
                        <input className="button" type="reset" value={$lang($string('forms.inbox.clear_value'))}/>
                    </div>
                </form>
            </>
        )}
        $else={() => <$Partial name="components/common/alert/alert-info" context={$lang($string('forms.inbox.no_orders'))}/>}
    />
));
