/**
 * Source: templates/components/account/messages-form.html (41 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageAccountInbox} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';

type Hint = ThemeContextHint<ThemePageAccountInbox>;

export default $asPartial<{ customer: Hint['customer']; urls: Hint['urls'] }>(({customer, urls}) => (
    /* html L1: {{#if customer.inbox.orders}} */
    <$If
        query={[customer.inbox.orders]}
        $then={() => (
            <>
                {/* html L2: <h2>{{lang 'forms.inbox.send_message'}}</h2> */}
                <h2>
                    {/* html L2: {{lang 'forms.inbox.send_message'}} */}
                    <$Lang translationKey={$string('forms.inbox.send_message')}/>
                </h2>
                {/* html L3: <form class="form" data-inbox-form action="{{urls.account.send_message}}" method="post"> */}
                <form className="form" data-inbox-form="" action={urls.account.send_message} method="post">
                    {/* html L4: {{inject 'enterOrderNum' (lang 'forms.validate.account.inbox.order')}} */}
                    <$Inject keyName={$string('enterOrderNum')} value={$lang($string('forms.validate.account.inbox.order'))}/>
                    {/* html L5: {{inject 'enterSubject' (lang 'forms.validate.account.inbox.subject')}} */}
                    <$Inject keyName={$string('enterSubject')} value={$lang($string('forms.validate.account.inbox.subject'))}/>
                    {/* html L6: {{inject 'enterMessage' (lang 'forms.validate.account.inbox.message')}} */}
                    <$Inject keyName={$string('enterMessage')} value={$lang($string('forms.validate.account.inbox.message'))}/>
                    {/* html L7: <div class="form-field"> */}
                    <div className="form-field">
                        {/* html L8: <label class="form-label" for="message_order_id"> */}
                        <label className="form-label" htmlFor="message_order_id">
                            {/* html L9: {{lang 'forms.inbox.order' }} */}
                            <$Lang translationKey={$string('forms.inbox.order')}/>
                            {/* html L10: <small>{{lang 'common.required' }}</small> */}
                            <small>
                                {/* html L10: {{lang 'common.required' }} */}
                                <$Lang translationKey={$string('common.required')}/>
                            </small>
                        </label>
                        {/* html L12: <select class="form-select" name="message_order_id" id="message_order_id"> */}
                        <select className="form-select" name="message_order_id" id="message_order_id">
                            {/* html L13: {{#each customer.inbox.orders}} */}
                            <$Each
                                list={customer.inbox.orders}
                                $then={(order) => (
                                    /* html L14: <option value="{{id}}">{{lang 'forms.inbox.order_display' id=id date=date total=amount.formatted}}</option> */
                                    <option value={order.id}>
                                        {/* html L14: {{lang 'forms.inbox.order_display' id=id date=date total=amount.formatted}} */}
                                        <$Lang
                                            translationKey={$string('forms.inbox.order_display')}
                                            params={{id: order.id, date: order.date, total: order.amount.formatted}}
                                        />
                                    </option>
                                )}
                            />
                        </select>
                    </div>
                    {/* html L18: <div class="form-field" id="message_subject_field_id"> */}
                    <div className="form-field" id="message_subject_field_id">
                        {/* html L19: <label class="form-label" for="message_subject"> */}
                        <label className="form-label" htmlFor="message_subject">
                            {/* html L20: {{lang 'forms.inbox.subject' }} */}
                            <$Lang translationKey={$string('forms.inbox.subject')}/>
                            {/* html L21: <small>{{lang 'common.required' }}</small> */}
                            <small>
                                {/* html L21: {{lang 'common.required' }} */}
                                <$Lang translationKey={$string('common.required')}/>
                            </small>
                        </label>
                        {/* html L23: <input aria-labelledby="message_subject_field_id" aria-live="polite" type="text" class="form-input" name="message_subject" id="message_subject"> */}
                        <input
                            aria-labelledby="message_subject_field_id"
                            aria-live="polite"
                            type="text"
                            className="form-input"
                            name="message_subject"
                            id="message_subject"
                        />
                    </div>
                    {/* html L25: <div class="form-field" id="message_content_field_id"> */}
                    <div className="form-field" id="message_content_field_id">
                        {/* html L26: <label class="form-label" for="message_content"> */}
                        <label className="form-label" htmlFor="message_content">
                            {/* html L27: {{lang 'forms.inbox.message' }} */}
                            <$Lang translationKey={$string('forms.inbox.message')}/>
                            {/* html L28: <small>{{lang 'common.required' }}</small> */}
                            <small>
                                {/* html L28: {{lang 'common.required' }} */}
                                <$Lang translationKey={$string('common.required')}/>
                            </small>
                        </label>

                        {/* html L31: <textarea aria-labelledby="message_content_field_id" aria-live="polite" class="form-input" name="message_content" id="message_content" rows="7" ></textarea> */}
                        <textarea
                            aria-labelledby="message_content_field_id"
                            aria-live="polite"
                            className="form-input"
                            name="message_content"
                            id="message_content"
                            rows={7}
                        ></textarea>
                    </div>
                    {/* html L33: <div class="form-actions"> */}
                    <div className="form-actions">
                        {/* html L34: <input class="button button--primary" type="submit" value="{{lang 'forms.inbox.submit_value' }}"> */}
                        <input className="button button--primary" type="submit" value={$lang($string('forms.inbox.submit_value'))}/>
                        {/* html L35: <input class="button" type="reset" value="{{lang 'forms.inbox.clear_value' }}"> */}
                        <input className="button" type="reset" value={$lang($string('forms.inbox.clear_value'))}/>
                    </div>
                </form>
            </>
        )}
        $else={() => /* html L38: {{else}}
                                                html L39: {{> components/common/alert/alert-info (lang 'forms.inbox.no_orders')}}
                     */ <$Partial name="components/common/alert/alert-info" context={$lang($string('forms.inbox.no_orders'))}/>}
    />
));
