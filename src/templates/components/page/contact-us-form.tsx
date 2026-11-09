import {$If, $Partial, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageContactForm} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {ContactCustomer, ContactFormsHint} from '@/context-misc';

type Hint = ThemeContextHint<ThemePageContactForm>;

export default $asPartial<{forms: ContactFormsHint; customer: ContactCustomer; urls: Hint['urls']}>(({forms, customer, urls}) => (
    <form data-contact-form="" className="form" action={urls.contact_us_submit} method="post">
        <$Inject keyName={$string('contactEmail')} value={$lang($string('forms.validate.contact.email_address'))}/>
        <$Inject keyName={$string('contactQuestion')} value={$lang($string('forms.validate.contact.question'))}/>
        <$If
            query={[forms.contact.error]}
            $then={() => (
                <div id="contact-us-error">
                    <$Partial name="components/common/alert/alert-error" context={forms.contact.error}/>
                </div>
            )}
        />
        <input type="hidden" name="page_id" id="page_id" value={forms.contact.page_id}/>
        <div className="form-row form-row--half">
            <$If
                query={[forms.contact.name]}
                $then={() => (
                    <div className="form-field">
                        <label className="form-label" htmlFor="contact_fullname">
                            <$Lang translationKey={$string('forms.contact_us.full_name')}/>
                        </label>
                        <input className="form-input" type="text" id="contact_fullname" name="contact_fullname" value={customer.name}/>
                    </div>
                )}
            />

            <$If
                query={[forms.contact.phone]}
                $then={() => (
                    <div className="form-field">
                        <label className="form-label" htmlFor="contact_phone">
                            <$Lang translationKey={$string('forms.contact_us.phone')}/>
                        </label>
                        <input className="form-input" type="text" id="contact_phone" name="contact_phone" value={customer.phone}/>
                    </div>
                )}
            />

            <div className="form-field">
                <label className="form-label" htmlFor="contact_email">
                    <$Lang translationKey={$string('forms.contact_us.email')}/>
                    <small>
                        <$Lang translationKey={$string('common.required')}/>
                    </small>
                </label>
                <input className="form-input" type="text" id="contact_email" name="contact_email" value={customer.email}/>
            </div>

            <$If
                query={[forms.contact.order]}
                $then={() => (
                    <div className="form-field">
                        <label className="form-label" htmlFor="contact_orderno">
                            <$Lang translationKey={$string('forms.contact_us.order')}/>
                        </label>
                        <input className="form-input" type="text" id="contact_orderno" name="contact_orderno"/>
                    </div>
                )}
            />

            <$If
                query={[forms.contact.company]}
                $then={() => (
                    <div className="form-field">
                        <label className="form-label" htmlFor="contact_companyname">
                            <$Lang translationKey={$string('forms.contact_us.company')}/>
                        </label>
                        <input className="form-input" type="text" id="contact_companyname" name="contact_companyname"/>
                    </div>
                )}
            />

            <$If
                query={[forms.contact.rma]}
                $then={() => (
                    <div className="form-field">
                        <label className="form-label" htmlFor="contact_rma">
                            <$Lang translationKey={$string('forms.contact_us.rma')}/>
                        </label>
                        <input className="form-input" type="text" id="contact_rma" name="contact_rma"/>
                    </div>
                )}
            />
        </div>

        <div className="form-field">
            <label className="form-label" htmlFor="contact_question">
                <$Lang translationKey={$string('forms.contact_us.question')}/>
                <small>
                    <$Lang translationKey={$string('common.required')}/>
                </small>
            </label>
            <textarea name="contact_question" id="contact_question" rows={5} cols={50} className="form-input"></textarea>
        </div>

        <$If
            query={[forms.contact.manualcaptcha]}
            $then={() => (
                <div className="form-field">
                    <label className="form-label" htmlFor={forms.contact.manualcaptcha.name}>
                        <$Lang translationKey={$string('forms.contact_us.manual_captcha_instruction')}/>
                        <small>
                            <$Lang translationKey={$string('common.required')}/>
                        </small>
                    </label>
                    <div className="manual-captcha-input-container">
                        <span className="question">{forms.contact.manualcaptcha.question}</span>
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

        {$unescaped(forms.contact.recaptcha.markup)}

        <div className="form-actions">
            <input className="button button--primary" type="submit" value={$lang($string('forms.contact_us.submit'))}/>
        </div>
    </form>
));
