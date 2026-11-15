import {$dynamicComponent, $Each, $Inject, $Lang, $lang, $pointer, $raw, $string, $unescaped, place} from "@mainlanddev/hbx-bigcommerce";

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
                        {$raw("{{#if (lang 'account.settings.first_name') '!==' 'First Name'}}")}
                        <$Lang keyName={$string("account.settings.first_name")} />
                        {$raw("{{else}}")}
                        {$pointer("forms.edit_account.first_name_label")}
                        {$raw("{{/if}}")}{" "}
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
                        {$raw("{{#if (lang 'account.settings.last_name') '!==' 'Last Name'}}")}
                        <$Lang keyName={$string("account.settings.last_name")} />
                        {$raw("{{else}}")}
                        {$pointer("forms.edit_account.last_name_label")}
                        {$raw("{{/if}}")}{" "}
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
                        {$raw("{{#if (lang 'account.settings.company') '!==' 'Company'}}")}
                        <$Lang keyName={$string("account.settings.company")} />
                        {$raw("{{else}}")}
                        {$pointer("forms.edit_account.company_label")}
                        {$raw("{{/if}}")}
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
                        {$raw("{{#if (lang 'account.settings.phone') '!==' 'Phone Number'}}")}
                        <$Lang keyName={$string("account.settings.phone")} />
                        {$raw("{{else}}")}
                        {$pointer("forms.edit_account.phone_label")}
                        {$raw("{{/if}}")}
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
                    $then={() => place($unescaped($dynamicComponent($string("components/common/forms"))))}
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
