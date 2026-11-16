import {$Inject, $Lang, $lang, $Page, $partial, $pointer, $string, $If, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$Inject keyName={$string("passwordRequirements")} value={$pointer("settings.password_requirements")} />
        <$Page
            blocks={{
                page: () => (
                    <div className="account account--fixedSmall">
                        {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                        <h2 className="page-heading">
                            <$Lang keyName={$string("forms.new_password.heading")} />
                        </h2>
                        <p>{$pointer("forms.new_password.requirements")}</p>
                        <$If
                            test={$pointer("forms.new_password.error")}
                            $then={() => place($partial("components/common/alert/alert-error", $pointer("forms.new_password.error")))}
                        />
                        <form action={$pointer("forms.new_password.submit_url")} className="form new-password-form" method="post">
                            <div className="form-row">
                                <div className="form-field">
                                    <label className="form-label" htmlFor="password">
                                        <$Lang keyName={$string("forms.new_password.password")} />{" "}
                                        <small>
                                            <$Lang keyName={$string("common.required")} />
                                        </small>
                                    </label>
                                    <input type="password" className="form-input" name="password" id="password" autoComplete="off" />
                                </div>
                                <div className="form-field">
                                    <label className="form-label" htmlFor="password_confirm">
                                        <$Lang keyName={$string("forms.new_password.password2")} />{" "}
                                        <small>
                                            <$Lang keyName={$string("common.required")} />
                                        </small>
                                    </label>
                                    <input type="password" className="form-input" name="password_confirm" id="password_confirm" autoComplete="off" />
                                </div>
                            </div>
                            <div className="form-actions">
                                <input className="button button--primary" type="submit" value={$lang($string("forms.new_password.submit_value"))} />
                            </div>
                        </form>
                    </div>
                ),
            }}
            layout="layout/base"
        />
    </>
);
