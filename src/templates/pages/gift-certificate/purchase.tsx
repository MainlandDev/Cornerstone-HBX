import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import {$Each, $If, $Inject, $Lang, $lang, $Page, $partial, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

// The original iterates `forms.gift_certificate.themes` and `amount_options`; the library types neither key (see PORT-NOTES.md, Task 8c).
interface Theme {
    value: string;
    display: string;
}

interface AmountOption {
    value: string;
    formatted: string;
}

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h1 className="page-heading">
                        <$Lang keyName={$string("gift_certificate.heading")} />
                    </h1>
                    {$partial("components/gift-certificate/navigation", {gift_page: $string("purchase")})}

                    <main className="account account--fixed">
                        <$Each
                            list={$pointer<string[]>("forms.gift_certificate.errors")}
                            $then={(error) => <AlertAlertError $positionalHash={error} />}
                        />

                        <form
                            className="form gift-certificate-form"
                            method="post"
                            id="gift-certificate-form"
                            action={$pointer("forms.gift_certificate.action")}
                        >
                            <$If
                                test={$pointer("forms.gift_certificate.cart_item_id")}
                                $then={() => (
                                    <input type="hidden" name="cartitemid" value={$pointer("forms.gift_certificate.cart_item_id")} />
                                )}
                            />
                            <div className="form-row form-row--half">
                                <div className="form-field">
                                    <label className="form-label" htmlFor="from_name">
                                        <$Lang keyName={$string("forms.gift_certificate.purchase.from_name")} />{" "}
                                        <small>
                                            <$Lang keyName={$string("common.required")} />
                                        </small>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        name="from_name"
                                        id="from_name"
                                        value={$pointer("forms.gift_certificate.values.from_name")}
                                    />
                                </div>
                                <div className="form-field">
                                    <label className="form-label" htmlFor="from_email">
                                        <$Lang keyName={$string("forms.gift_certificate.purchase.from_email")} />{" "}
                                        <small>
                                            <$Lang keyName={$string("common.required")} />
                                        </small>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        name="from_email"
                                        id="from_email"
                                        value={$pointer("forms.gift_certificate.values.from_email")}
                                    />
                                </div>
                            </div>
                            <div className="form-row form-row--half">
                                <div className="form-field">
                                    <label className="form-label" htmlFor="to_name">
                                        <$Lang keyName={$string("forms.gift_certificate.purchase.to_name")} />{" "}
                                        <small>
                                            <$Lang keyName={$string("common.required")} />
                                        </small>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        name="to_name"
                                        id="to_name"
                                        value={$pointer("forms.gift_certificate.values.to_name")}
                                    />
                                </div>
                                <div className="form-field">
                                    <label className="form-label" htmlFor="to_email">
                                        <$Lang keyName={$string("forms.gift_certificate.purchase.to_email")} />{" "}
                                        <small>
                                            <$Lang keyName={$string("common.required")} />
                                        </small>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        name="to_email"
                                        id="to_email"
                                        value={$pointer("forms.gift_certificate.values.to_email")}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <fieldset className="form-fieldset form-column">
                                    <$If
                                        test={$pointer("forms.gift_certificate.can_use_custom_amount")}
                                        $then={() => (
                                            <div className="form-field">
                                                <label className="form-label" htmlFor="certificate_amount">
                                                    <$Lang keyName={$string("forms.gift_certificate.purchase.amount")} />{" "}
                                                    <small>
                                                        <$Lang keyName={$string("common.required")} />
                                                    </small>
                                                </label>
                                                <input
                                                    type="text"
                                                    data-min={$pointer("forms.gift_certificate.minimum.value")}
                                                    data-max={$pointer("forms.gift_certificate.maximum.value")}
                                                    data-min-formatted={$pointer("forms.gift_certificate.minimum.formatted")}
                                                    data-max-formatted={$pointer("forms.gift_certificate.maximum.formatted")}
                                                    className="form-input"
                                                    name="certificate_amount"
                                                    id="certificate_amount"
                                                    value={$pointer("forms.gift_certificate.values.amount.value")}
                                                />
                                            </div>
                                        )}
                                        $else={() => (
                                            <div className="form-field">
                                                <label className="form-label" htmlFor="selected_amount">
                                                    <$Lang keyName={$string("forms.gift_certificate.purchase.amount")} />{" "}
                                                    <small>
                                                        <$Lang keyName={$string("common.required")} />
                                                    </small>
                                                </label>
                                                <select className="form-select" name="selected_amount" id="selected_amount">
                                                    <$Each
                                                        list={$pointer<AmountOption[]>("forms.gift_certificate.amount_options")}
                                                        $then={(option) => (
                                                            <option value={option.value}>{option.formatted}</option>
                                                        )}
                                                    />
                                                </select>
                                            </div>
                                        )}
                                    />
                                    <$If
                                        test={$pointer("forms.gift_certificate.expires_in_days")}
                                        $then={() => (
                                            <div className="form-field">
                                                <input type="checkbox" className="form-checkbox" name="agree" id="agree" />{" "}
                                                <label className="form-label" htmlFor="agree">
                                                    {$lang($string("forms.gift_certificate.purchase.agree"), {
                                                        days: $pointer("forms.gift_certificate.expires_in_days"),
                                                    })}
                                                </label>
                                            </div>
                                        )}
                                    />
                                    <div className="form-field">
                                        <input
                                            dangerouslyInlineAttributes={{
                                                attributes: `type="checkbox" class="form-checkbox" name="agree2" id="agree2"${$If({
                                                    test: $pointer("forms.gift_certificate.editing"),
                                                    $then: () => " checked",
                                                })}`,
                                            }}
                                        />{" "}
                                        <label className="form-label" htmlFor="agree2">
                                            <$Lang keyName={$string("forms.gift_certificate.purchase.agree2")} />
                                        </label>
                                    </div>
                                </fieldset>
                                <fieldset className="form-fieldset form-column">
                                    <div className="form-field">
                                        <label className="form-label" htmlFor="message">
                                            <$Lang keyName={$string("forms.gift_certificate.purchase.message")} />
                                        </label>
                                        <textarea
                                            className="form-input"
                                            name="message"
                                            id="message"
                                            rows={8}
                                            value={$pointer("forms.gift_certificate.values.message")}
                                        />
                                    </div>
                                    <label className="form-label">
                                        <$Lang keyName={$string("forms.gift_certificate.purchase.theme")} />{" "}
                                        <small>
                                            <$Lang keyName={$string("common.required")} />
                                        </small>
                                    </label>
                                    <div className="form-field form-field-group">
                                        <$Each
                                            list={$pointer<Theme[]>("forms.gift_certificate.themes")}
                                            $then={(theme) => (
                                                <>
                                                    <input
                                                        dangerouslyInlineAttributes={{
                                                            attributes: `type="radio" class="form-radio" name="certificate_theme" id="theme_${theme.value}" value="${theme.value}"${$If({test: $pointer("this.value"), operator: $string("=="), rvalue: $pointer("../forms.gift_certificate.values.theme"), $then: () => " checked"})}`,
                                                        }}
                                                    />{" "}
                                                    <label className="form-label" htmlFor={`theme_${theme.value}`}>
                                                        {theme.display}
                                                    </label>
                                                </>
                                            )}
                                        />
                                    </div>
                                </fieldset>
                            </div>
                            <div className="form-actions">
                                <$Inject keyName={$string("previewError")} value={$lang($string("forms.gift_certificate.purchase.preview_error"))} />{" "}
                                <$Inject keyName={$string("enterAmount")} value={$lang($string("forms.validate.gift.amount"))} />{" "}
                                <$Inject keyName={$string("toName")} value={$lang($string("forms.validate.gift.to_name"))} />{" "}
                                <$Inject keyName={$string("toEmail")} value={$lang($string("forms.validate.gift.to_email"))} />{" "}
                                <$Inject keyName={$string("fromName")} value={$lang($string("forms.validate.gift.from_name"))} />{" "}
                                <$Inject keyName={$string("fromEmail")} value={$lang($string("forms.validate.gift.from_email"))} />{" "}
                                <$Inject keyName={$string("certTheme")} value={$lang($string("forms.validate.gift.cert_theme"))} />{" "}
                                <$Inject keyName={$string("agreeToTerms")} value={$lang($string("forms.validate.gift.agree_terms"))} />{" "}
                                <input
                                    id="gift-certificate-preview"
                                    className="button"
                                    type="submit"
                                    value={$lang($string("forms.gift_certificate.purchase.preview"))}
                                    data-preview-url={$pointer("forms.gift_certificate.preview")}
                                />{" "}
                                <input
                                    id="gift-certificate-submit"
                                    className="button button--primary"
                                    type="submit"
                                    value={$lang($string("forms.gift_certificate.purchase.submit_value"))}
                                />
                            </div>
                        </form>
                    </main>
                </>
            ),
        }}
        layout="layout/base"
    />
);
