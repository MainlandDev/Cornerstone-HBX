import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import {$Each, $If, $Inject, $Lang, $lang, $Page, $pointer, $string, $unescaped, $dynamicComponent} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$Inject keyName={$string("passwordRequirements")} value={$pointer("settings.password_requirements")} />
        {" "}
        <$Inject keyName={$string("recaptchaTitle")} value={$lang($string("create_account.recaptcha_title"))} />
        <$Page
            blocks={{
                page: () => (
                    <>
                        <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                        <h1 className="page-heading">
                            <$Lang keyName={$string("create_account.heading")} />
                        </h1>
                        <div className="account account--fixed">
                            <div className="account-body">
                                <$If
                                    test={$pointer("forms.create_account.error")}
                                    $then={() => <AlertAlertError $positionalHash={$pointer("forms.create_account.error")} />}
                                />
                                <$If
                                    test={$pointer("settings.account_creation_enabled")}
                                    $then={() => (
                                        <form
                                            action={$pointer("urls.auth.save_new_account")}
                                            data-create-account-form={""}
                                            method="post"
                                            className="form"
                                        >
                                            <div className="form-row form-row--half">
                                                <$Each
                                                    list={$pointer<unknown[]>("forms.create_account.account_fields")}
                                                    $then={() => $unescaped($dynamicComponent($string("components/common/forms")))}
                                                />
                                                <$Each
                                                    list={$pointer<unknown[]>("forms.create_account.address_fields")}
                                                    $then={() => $unescaped($dynamicComponent($string("components/common/forms")))}
                                                />
                                                <$Inject keyName={$string("required")} value={$lang($string("common.required"))} />{" "}
                                                <$Inject keyName={$string("state_error")} value={$lang($string("errors.state_error"))} />
                                            </div>
                                            {$unescaped($pointer("forms.create_account.recaptcha.markup"))}
                                            <div className="form-actions">
                                                <input
                                                    type="submit"
                                                    className="button button--primary"
                                                    value={$lang($string("forms.create_account.submit_value"))}
                                                />
                                            </div>
                                        </form>
                                    )}
                                />
                            </div>
                        </div>
                    </>
                ),
            }}
            layout="layout/base"
        />
    </>
);
