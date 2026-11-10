/**
 * Source: templates/components/page/contact-us-form.html (75 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageContactForm} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {ContactCustomer, ContactFormsHint} from '@/context-misc';

type Hint = ThemeContextHint<ThemePageContactForm>;

export default $asPartial<{forms: ContactFormsHint; customer: ContactCustomer; urls: Hint['urls']}>(({forms, customer, urls}) => (
    /* html L1: <form data-contact-form class="form" action="{{urls.contact_us_submit}}" method="post"> */
    <form data-contact-form="" className="form" action={urls.contact_us_submit} method="post">
        {/* html L2: {{inject 'contactEmail' (lang 'forms.validate.contact.email_address')}} */}
        <$Inject keyName={$string('contactEmail')} value={$lang($string('forms.validate.contact.email_address'))}/>
        {/* html L3: {{inject 'contactQuestion' (lang 'forms.validate.contact.question')}} */}
        <$Inject keyName={$string('contactQuestion')} value={$lang($string('forms.validate.contact.question'))}/>
        {/* html L4: {{#if forms.contact.error}} */}
        <$If
            query={[forms.contact.error]}
            $then={() => (
                /* html L5: <div id="contact-us-error">{{> components/common/alert/alert-error forms.contact.error}}</div> */
                <div id="contact-us-error">
                    {/* html L5: {{> components/common/alert/alert-error forms.contact.error}} */}
                    <$Partial name="components/common/alert/alert-error" context={forms.contact.error}/>
                </div>
            )}
        />
        {/* html L7: <input type="hidden" name="page_id" id="page_id" value="{{forms.contact.page_id}}"> */}
        <input type="hidden" name="page_id" id="page_id" value={forms.contact.page_id}/>
        {/* html L8: <div class="form-row form-row--half"> */}
        <div className="form-row form-row--half">
            {/* html L9: {{#if forms.contact.name}} */}
            <$If
                query={[forms.contact.name]}
                $then={() => (
                    /* html L10: <div class="form-field"> */
                    <div className="form-field">
                        {/* html L11: <label class="form-label" for="contact_fullname">{{lang 'forms.contact_us.full_name'}}</label> */}
                        <label className="form-label" htmlFor="contact_fullname">
                            {/* html L11: {{lang 'forms.contact_us.full_name'}} */}
                            <$Lang translationKey={$string('forms.contact_us.full_name')}/>
                        </label>
                        {/* html L12: <input class="form-input" type="text" id="contact_fullname" name="contact_fullname" value="{{customer.name}}"> */}
                        <input className="form-input" type="text" id="contact_fullname" name="contact_fullname" value={customer.name}/>
                    </div>
                )}
            />

            {/* html L16: {{#if forms.contact.phone}} */}
            <$If
                query={[forms.contact.phone]}
                $then={() => (
                    /* html L17: <div class="form-field"> */
                    <div className="form-field">
                        {/* html L18: <label class="form-label" for="contact_phone">{{lang 'forms.contact_us.phone'}}</label> */}
                        <label className="form-label" htmlFor="contact_phone">
                            {/* html L18: {{lang 'forms.contact_us.phone'}} */}
                            <$Lang translationKey={$string('forms.contact_us.phone')}/>
                        </label>
                        {/* html L19: <input class="form-input" type="text" id="contact_phone" name="contact_phone" value="{{customer.phone}}"> */}
                        <input className="form-input" type="text" id="contact_phone" name="contact_phone" value={customer.phone}/>
                    </div>
                )}
            />

            {/* html L23: <div class="form-field"> */}
            <div className="form-field">
                {/* html L24: <label class="form-label" for="contact_email">{{lang 'forms.contact_us.email'}} */}
                <label className="form-label" htmlFor="contact_email">
                    {/* html L24: {{lang 'forms.contact_us.email'}} */}
                    <$Lang translationKey={$string('forms.contact_us.email')}/>
                    {/* html L25: <small>{{lang 'common.required' }}</small> */}
                    <small>
                        {/* html L25: {{lang 'common.required' }} */}
                        <$Lang translationKey={$string('common.required')}/>
                    </small>
                </label>
                {/* html L27: <input class="form-input" type="text" id="contact_email" name="contact_email" value="{{customer.email}}"> */}
                <input className="form-input" type="text" id="contact_email" name="contact_email" value={customer.email}/>
            </div>

            {/* html L30: {{#if forms.contact.order}} */}
            <$If
                query={[forms.contact.order]}
                $then={() => (
                    /* html L31: <div class="form-field"> */
                    <div className="form-field">
                        {/* html L32: <label class="form-label" for="contact_orderno">{{lang 'forms.contact_us.order'}}</label> */}
                        <label className="form-label" htmlFor="contact_orderno">
                            {/* html L32: {{lang 'forms.contact_us.order'}} */}
                            <$Lang translationKey={$string('forms.contact_us.order')}/>
                        </label>
                        {/* html L33: <input class="form-input" type="text" id="contact_orderno" name="contact_orderno"> */}
                        <input className="form-input" type="text" id="contact_orderno" name="contact_orderno"/>
                    </div>
                )}
            />

            {/* html L37: {{#if forms.contact.company}} */}
            <$If
                query={[forms.contact.company]}
                $then={() => (
                    /* html L38: <div class="form-field"> */
                    <div className="form-field">
                        {/* html L39: <label class="form-label" for="contact_companyname">{{lang 'forms.contact_us.company'}}</label> */}
                        <label className="form-label" htmlFor="contact_companyname">
                            {/* html L39: {{lang 'forms.contact_us.company'}} */}
                            <$Lang translationKey={$string('forms.contact_us.company')}/>
                        </label>
                        {/* html L40: <input class="form-input" type="text" id="contact_companyname" name="contact_companyname"> */}
                        <input className="form-input" type="text" id="contact_companyname" name="contact_companyname"/>
                    </div>
                )}
            />

            {/* html L44: {{#if forms.contact.rma}} */}
            <$If
                query={[forms.contact.rma]}
                $then={() => (
                    /* html L45: <div class="form-field"> */
                    <div className="form-field">
                        {/* html L46: <label class="form-label" for="contact_rma">{{lang 'forms.contact_us.rma'}}</label> */}
                        <label className="form-label" htmlFor="contact_rma">
                            {/* html L46: {{lang 'forms.contact_us.rma'}} */}
                            <$Lang translationKey={$string('forms.contact_us.rma')}/>
                        </label>
                        {/* html L47: <input class="form-input" type="text" id="contact_rma" name="contact_rma"> */}
                        <input className="form-input" type="text" id="contact_rma" name="contact_rma"/>
                    </div>
                )}
            />
        </div>

        {/* html L52: <div class="form-field"> */}
        <div className="form-field">
            {/* html L53: <label class="form-label" for="contact_question">{{lang 'forms.contact_us.question'}} */}
            <label className="form-label" htmlFor="contact_question">
                {/* html L53: {{lang 'forms.contact_us.question'}} */}
                <$Lang translationKey={$string('forms.contact_us.question')}/>
                {/* html L54: <small>{{lang 'common.required' }}</small> */}
                <small>
                    {/* html L54: {{lang 'common.required' }} */}
                    <$Lang translationKey={$string('common.required')}/>
                </small>
            </label>
            {/* html L56: <textarea name="contact_question" id="contact_question" rows="5" cols="50" class="form-input"></textarea> */}
            <textarea name="contact_question" id="contact_question" rows={5} cols={50} className="form-input"></textarea>
        </div>

        {/* html L58: {{#if forms.contact.manualcaptcha}} */}
        <$If
            query={[forms.contact.manualcaptcha]}
            $then={() => (
                /* html L59: <div class="form-field"> */
                <div className="form-field">
                    {/* html L60: <label class="form-label" for="{{forms.contact.manualcaptcha.name}}"> */}
                    <label className="form-label" htmlFor={forms.contact.manualcaptcha.name}>
                        {/* html L61: {{lang 'forms.contact_us.manual_captcha_instruction'}} */}
                        <$Lang translationKey={$string('forms.contact_us.manual_captcha_instruction')}/>
                        {/* html L62: <small>{{lang 'common.required' }}</small> */}
                        <small>
                            {/* html L62: {{lang 'common.required' }} */}
                            <$Lang translationKey={$string('common.required')}/>
                        </small>
                    </label>
                    {/* html L64: <div class="manual-captcha-input-container"> */}
                    <div className="manual-captcha-input-container">
                        {/* html L65: <span class="question">{{forms.contact.manualcaptcha.question}}</span> */}
                        <span className="question">{/* html L65: {{forms.contact.manualcaptcha.question}} */}{forms.contact.manualcaptcha.question}</span>
                        {/* html L66: <input class="form-input" type="text" id="{{forms.contact.manualcaptcha.name}}" name="{{forms.contact.manualcaptcha.name}}" value="" aria-disabled="true" autocomplete="off" required> */}
                        <input
                            className="form-input"
                            type="text"
                            id={forms.contact.manualcaptcha.name}
                            name={forms.contact.manualcaptcha.name}
                            value=""
                            aria-disabled="true"
                            autoComplete="off"
                            required
                        />
                    </div>
                </div>
            )}
        />

        {/* html L70: {{{forms.contact.recaptcha.markup}}} */}
        {$unescaped(forms.contact.recaptcha.markup)}

        {/* html L71: <div class="form-actions"> */}
        <div className="form-actions">
            {/* html L72: <input class="button button--primary" type="submit" value="{{lang 'forms.contact_us.submit' }}"> */}
            <input className="button button--primary" type="submit" value={$lang($string('forms.contact_us.submit'))}/>
        </div>
    </form>
));
