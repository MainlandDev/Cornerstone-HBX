import {$Each, $If, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageAccountEdit} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$_dynamicComponent, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';

type Hint = ThemeContextHint<ThemePageAccountEdit>;

export default $asPartial<{ urls: Hint['urls']; forms: Hint['forms'] }>(({urls, forms}) => (
    <form action={urls.account.update_action} data-edit-account-form="" className="form" method="post">
        <$Inject keyName={$string('firstName')} value={$lang($string('forms.validate.account.edit.first_name'))}/>
        <$Inject keyName={$string('lastName')} value={$lang($string('forms.validate.account.edit.last_name'))}/>
        <$Inject keyName={$string('phoneNumber')} value={$lang($string('forms.validate.account.edit.phone'))}/>
        <$Inject keyName={$string('currentPassword')} value={$lang($string('forms.validate.account.edit.password'))}/>
        <fieldset className="form-fieldset">
            <div className="form-row form-row--half">
                <div className="form-field" id="account_firstname_id">
                    <label className="form-label" htmlFor="account_firstname">
                        <$If
                            query={[$lang($string('account.settings.first_name')), '!==', $string('First Name')]}
                            $then={() => <$Lang translationKey={$string('account.settings.first_name')}/>}
                            $else={() => <>{forms.edit_account.first_name_label}</>}
                        />
                        <small>
                            <$Lang translationKey={$string('common.required')}/>
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
                        value={forms.edit_account.first_name}
                    />
                </div>
                <div className="form-field" id="account_lastname_id">
                    <label className="form-label" htmlFor="account_lastname">
                        <$If
                            query={[$lang($string('account.settings.last_name')), '!==', $string('Last Name')]}
                            $then={() => <$Lang translationKey={$string('account.settings.last_name')}/>}
                            $else={() => <>{forms.edit_account.last_name_label}</>}
                        />
                        <small>
                            <$Lang translationKey={$string('common.required')}/>
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
                        value={forms.edit_account.last_name}
                    />
                </div>
                <div className="form-field" id="account_companyname_id">
                    <label className="form-label" htmlFor="account_companyname">
                        <$If
                            query={[$lang($string('account.settings.company')), '!==', $string('Company')]}
                            $then={() => <$Lang translationKey={$string('account.settings.company')}/>}
                            $else={() => <>{forms.edit_account.company_label}</>}
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
                        value={forms.edit_account.company_name}
                    />
                </div>
                <div className="form-field" id="account_phone_id">
                    <label className="form-label" htmlFor="account_phone">
                        <$If
                            query={[$lang($string('account.settings.phone')), '!==', $string('Phone Number')]}
                            $then={() => <$Lang translationKey={$string('account.settings.phone')}/>}
                            $else={() => <>{forms.edit_account.phone_label}</>}
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
                        value={forms.edit_account.phone}
                    />
                </div>
                <$Each
                    list={forms.edit_account.fields}
                    $then={() => $_dynamicComponent($string('components/common/forms'))}
                />
            </div>
        </fieldset>
        <div className="form-actions">
            <button className="button button--primary">
                <$Lang translationKey={$string('account.settings.update_details')}/>
            </button>
        </div>
    </form>
));
