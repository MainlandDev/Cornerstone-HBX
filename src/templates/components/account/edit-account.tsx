import {$dynamicComponent, $Each, $If, $Inject, $Lang, $lang, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <form action={$pointer("urls.account.update_action")} data-edit-account-form={""} className="form" method="post">
        <$Inject keyName={$string("firstName")} value={$lang($string("forms.validate.account.edit.first_name"))} />{" "}
        <$Inject keyName={$string("lastName")} value={$lang($string("forms.validate.account.edit.last_name"))} />{" "}
        <$Inject keyName={$string("phoneNumber")} value={$lang($string("forms.validate.account.edit.phone"))} />{" "}
        <$Inject keyName={$string("currentPassword")} value={$lang($string("forms.validate.account.edit.password"))} />
        <fieldset className="form-fieldset">
            <div className="form-row form-row--half">
                <div className="form-field" id="account_firstname_id">
                    <label className="form-label" htmlFor="account_firstname">
                        <$If
                            test={$lang($string("account.settings.first_name"))}
                            operator={$string("!==")}
                            rvalue={$string("First Name")}
                            $then={() => <$Lang keyName={$string("account.settings.first_name")} />}
                            $else={() => <>{$pointer("forms.edit_account.first_name_label")}</>}
                        />{" "}
                        <small>
                            <$Lang keyName={$string("common.required")} />
                        </small>
                    </label>
                    <input
                        aria-labelledby="account_firstname_id"
                        aria-live="polite"
                        autoComplete="given-name"
                        type="text"
                        className="form-input"
                        name="account_firstname"
                        id="account_firstname"
                        value={$pointer("forms.edit_account.first_name")}
                    />
                </div>
                <div className="form-field" id="account_lastname_id">
                    <label className="form-label" htmlFor="account_lastname">
                        <$If
                            test={$lang($string("account.settings.last_name"))}
                            operator={$string("!==")}
                            rvalue={$string("Last Name")}
                            $then={() => <$Lang keyName={$string("account.settings.last_name")} />}
                            $else={() => <>{$pointer("forms.edit_account.last_name_label")}</>}
                        />{" "}
                        <small>
                            <$Lang keyName={$string("common.required")} />
                        </small>
                    </label>
                    <input
                        aria-labelledby="account_lastname_id"
                        aria-live="polite"
                        autoComplete="family-name"
                        type="text"
                        className="form-input"
                        name="account_lastname"
                        id="account_lastname"
                        value={$pointer("forms.edit_account.last_name")}
                    />
                </div>
                <div className="form-field" id="account_companyname_id">
                    <label className="form-label" htmlFor="account_companyname">
                        <$If
                            test={$lang($string("account.settings.company"))}
                            operator={$string("!==")}
                            rvalue={$string("Company")}
                            $then={() => <$Lang keyName={$string("account.settings.company")} />}
                            $else={() => <>{$pointer("forms.edit_account.company_label")}</>}
                        />
                    </label>
                    <input
                        aria-labelledby="account_companyname_id"
                        aria-live="polite"
                        autoComplete="organization"
                        type="text"
                        className="form-input"
                        name="account_companyname"
                        id="account_companyname"
                        value={$pointer("forms.edit_account.company_name")}
                    />
                </div>
                <div className="form-field" id="account_phone_id">
                    <label className="form-label" htmlFor="account_phone">
                        <$If
                            test={$lang($string("account.settings.phone"))}
                            operator={$string("!==")}
                            rvalue={$string("Phone Number")}
                            $then={() => <$Lang keyName={$string("account.settings.phone")} />}
                            $else={() => <>{$pointer("forms.edit_account.phone_label")}</>}
                        />
                    </label>
                    <input
                        aria-labelledby="account_phone_id"
                        aria-live="polite"
                        autoComplete="tel"
                        type="text"
                        className="form-input"
                        name="account_phone"
                        id="account_phone"
                        value={$pointer("forms.edit_account.phone")}
                    />
                </div>
                <$Each
                    list={$pointer<unknown[]>("forms.edit_account.fields")}
                    $then={() => $unescaped($dynamicComponent($string("components/common/forms")))}
                />
            </div>
        </fieldset>
        <div className="form-actions">
            <button className="button button--primary">
                <$Lang keyName={$string("account.settings.update_details")} />
            </button>
        </div>
    </form>
);
