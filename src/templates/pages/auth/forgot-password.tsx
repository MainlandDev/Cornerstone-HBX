import {$Inject, $Lang, $lang, $Page, $partial, $pointer, $string, $unescaped, $If} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$Inject keyName={$string("recaptchaTitle")} value={$lang($string("forgot_password.recaptcha_title"))} />
        <$Page
            blocks={{
                page: () => (
                    <div className="account account--fixedSmall">
                        {$partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")})}
                        <h2 className="page-heading">
                            <$Lang keyName={$string("reset_password.heading")} />
                        </h2>
                        <p>
                            <$Lang keyName={$string("reset_password.intro")} />
                        </p>
                        <$If
                            test={$pointer("forms.forgot_password.error")}
                            $then={() => $partial("components/common/alert/alert-error", $pointer("forms.forgot_password.error"))}
                        />
                        <form action={$pointer("urls.auth.send_password_email")} className="form forgot-password-form" method="post">
                            <$Inject keyName={$string("useValidEmail")} value={$lang($string("forms.validate.common.email_address"))} />
                            <div className="form-prefixPostfix form-prefixPostfix--centeredColumn wrap">
                                <label className="form-label" htmlFor="email">
                                    <$Lang keyName={$string("common.email_address")} />
                                </label>
                                <input className="form-input" name="email" id="email" type="email" formNoValidate={true} />{" "}
                                {$unescaped($pointer("forms.forgot_password.recaptcha.markup"))}
                                <input
                                    type="submit"
                                    className="button button--primary form-prefixPostfix-button--postfix"
                                    value={$lang($string("reset_password.heading"))}
                                />
                            </div>
                        </form>
                    </div>
                ),
            }}
            layout="layout/base"
        />
    </>
);
