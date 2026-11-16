import AlertAlertError from "../common/alert/alert-error.tsx";
import {$If, $Inject, $Lang, $lang, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <form data-contact-form={""} className="form" action={$pointer("urls.contact_us_submit")} method="post">
        <$Inject keyName={$string("contactEmail")} value={$lang($string("forms.validate.contact.email_address"))} />{" "}
        <$Inject keyName={$string("contactQuestion")} value={$lang($string("forms.validate.contact.question"))} />
        <$If
            test={$pointer("forms.contact.error")}
            $then={() => (
                <div id="contact-us-error">
                    <AlertAlertError $positionalHash={$pointer("forms.contact.error")} />
                </div>
            )}
        />
        <input type="hidden" name="page_id" id="page_id" value={$pointer("forms.contact.page_id")} />
        <div className="form-row form-row--half">
            <$If
                test={$pointer("forms.contact.name")}
                $then={() => (
                    <div className="form-field">
                        <label className="form-label" htmlFor="contact_fullname">
                            <$Lang keyName={$string("forms.contact_us.full_name")} />
                        </label>
                        <input className="form-input" type="text" id="contact_fullname" name="contact_fullname" value={$pointer("customer.name")} />
                    </div>
                )}
            />

            <$If
                test={$pointer("forms.contact.phone")}
                $then={() => (
                    <div className="form-field">
                        <label className="form-label" htmlFor="contact_phone">
                            <$Lang keyName={$string("forms.contact_us.phone")} />
                        </label>
                        <input className="form-input" type="text" id="contact_phone" name="contact_phone" value={$pointer("customer.phone")} />
                    </div>
                )}
            />

            <div className="form-field">
                <label className="form-label" htmlFor="contact_email">
                    <$Lang keyName={$string("forms.contact_us.email")} />{" "}
                    <small>
                        <$Lang keyName={$string("common.required")} />
                    </small>
                </label>
                <input className="form-input" type="text" id="contact_email" name="contact_email" value={$pointer("customer.email")} />
            </div>

            <$If
                test={$pointer("forms.contact.order")}
                $then={() => (
                    <div className="form-field">
                        <label className="form-label" htmlFor="contact_orderno">
                            <$Lang keyName={$string("forms.contact_us.order")} />
                        </label>
                        <input className="form-input" type="text" id="contact_orderno" name="contact_orderno" />
                    </div>
                )}
            />

            <$If
                test={$pointer("forms.contact.company")}
                $then={() => (
                    <div className="form-field">
                        <label className="form-label" htmlFor="contact_companyname">
                            <$Lang keyName={$string("forms.contact_us.company")} />
                        </label>
                        <input className="form-input" type="text" id="contact_companyname" name="contact_companyname" />
                    </div>
                )}
            />

            <$If
                test={$pointer("forms.contact.rma")}
                $then={() => (
                    <div className="form-field">
                        <label className="form-label" htmlFor="contact_rma">
                            <$Lang keyName={$string("forms.contact_us.rma")} />
                        </label>
                        <input className="form-input" type="text" id="contact_rma" name="contact_rma" />
                    </div>
                )}
            />
        </div>

        <div className="form-field">
            <label className="form-label" htmlFor="contact_question">
                <$Lang keyName={$string("forms.contact_us.question")} />{" "}
                <small>
                    <$Lang keyName={$string("common.required")} />
                </small>
            </label>
            <textarea name="contact_question" id="contact_question" rows={5} cols={50} className="form-input" />
        </div>
        <$If
            test={$pointer("forms.contact.manualcaptcha")}
            $then={() => (
                <div className="form-field">
                    <label className="form-label" htmlFor={$pointer("forms.contact.manualcaptcha.name")}>
                        <$Lang keyName={$string("forms.contact_us.manual_captcha_instruction")} />{" "}
                        <small>
                            <$Lang keyName={$string("common.required")} />
                        </small>
                    </label>
                    <div className="manual-captcha-input-container">
                        <span className="question">{$pointer("forms.contact.manualcaptcha.question")}</span>{" "}
                        <input
                            className="form-input"
                            type="text"
                            id={$pointer("forms.contact.manualcaptcha.name")}
                            name={$pointer("forms.contact.manualcaptcha.name")}
                            value=""
                            aria-disabled="true"
                            autoComplete="off"
                            required={true}
                        />
                    </div>
                </div>
            )}
        />
        {$unescaped($pointer("forms.contact.recaptcha.markup"))}
        <div className="form-actions">
            <input className="button button--primary" type="submit" value={$lang($string("forms.contact_us.submit"))} />
        </div>
    </form>
);
