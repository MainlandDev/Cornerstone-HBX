/**
 * Source: templates/components/account/edit-account.html (59 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageAccountEdit} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$_dynamicComponent, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';

type Hint = ThemeContextHint<ThemePageAccountEdit>;

export default $asPartial<{ urls: Hint['urls']; forms: Hint['forms'] }>(({urls, forms}) => (
    /* html L1: <form action="{{urls.account.update_action}}" data-edit-account-form class="form" method="post"> */
    <form action={urls.account.update_action} data-edit-account-form="" className="form" method="post">
        {/* html L2: {{inject 'firstName' (lang 'forms.validate.account.edit.first_name')}} */}
        <$Inject keyName={$string('firstName')} value={$lang($string('forms.validate.account.edit.first_name'))}/>
        {/* html L3: {{inject 'lastName' (lang 'forms.validate.account.edit.last_name')}} */}
        <$Inject keyName={$string('lastName')} value={$lang($string('forms.validate.account.edit.last_name'))}/>
        {/* html L4: {{inject 'phoneNumber' (lang 'forms.validate.account.edit.phone')}} */}
        <$Inject keyName={$string('phoneNumber')} value={$lang($string('forms.validate.account.edit.phone'))}/>
        {/* html L5: {{inject 'currentPassword' (lang 'forms.validate.account.edit.password')}} */}
        <$Inject keyName={$string('currentPassword')} value={$lang($string('forms.validate.account.edit.password'))}/>
        {/* html L6: <fieldset class="form-fieldset"> */}
        <fieldset className="form-fieldset">
            {/* html L7: <div class="form-row form-row--half"> */}
            <div className="form-row form-row--half">
                {/* html L8: <div class="form-field" id="account_firstname_id"> */}
                <div className="form-field" id="account_firstname_id">
                    {/* html L9: <label class="form-label" for="account_firstname"> */}
                    <label className="form-label" htmlFor="account_firstname">
                        {/* html L10: {{#if (lang 'account.settings.first_name') '!==' 'First Name'}} */}
                        <$If
                            query={[$lang($string('account.settings.first_name')), '!==', $string('First Name')]}
                            $then={() => /* html L11: {{lang 'account.settings.first_name'}} */ <$Lang translationKey={$string('account.settings.first_name')}/>}
                            $else={() => <>{/* html L12: {{else}}
                                                                                            html L13: {{forms.edit_account.first_name_label}}
                                           */}{forms.edit_account.first_name_label}</>}
                        />
                        {/* html L15: <small>{{lang 'common.required' }}</small> */}
                        <small>
                            {/* html L15: {{lang 'common.required' }} */}
                            <$Lang translationKey={$string('common.required')}/>
                        </small>
                    </label>
                    {/* html L17: <input aria-labelledby="account_firstname_id" aria-live="polite" autocomplete="given-name" type="text" class="form-input" name="account_firstname" id="account_firstname" value="{{forms.edit_account.first_name}}"> */}
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
                {/* html L19: <div class="form-field" id="account_lastname_id"> */}
                <div className="form-field" id="account_lastname_id">
                    {/* html L20: <label class="form-label" for="account_lastname"> */}
                    <label className="form-label" htmlFor="account_lastname">
                        {/* html L21: {{#if (lang 'account.settings.last_name') '!==' 'Last Name'}} */}
                        <$If
                            query={[$lang($string('account.settings.last_name')), '!==', $string('Last Name')]}
                            $then={() => /* html L22: {{lang 'account.settings.last_name'}} */ <$Lang translationKey={$string('account.settings.last_name')}/>}
                            $else={() => <>{/* html L23: {{else}}
                                                                                            html L24: {{forms.edit_account.last_name_label}}
                                           */}{forms.edit_account.last_name_label}</>}
                        />
                        {/* html L26: <small>{{lang 'common.required' }}</small> */}
                        <small>
                            {/* html L26: {{lang 'common.required' }} */}
                            <$Lang translationKey={$string('common.required')}/>
                        </small>
                    </label>
                    {/* html L28: <input aria-labelledby="account_lastname_id" aria-live="polite" autocomplete="family-name" type="text" class="form-input" name="account_lastname" id="account_lastname" value="{{forms.edit_account.last_name}}"> */}
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
                {/* html L30: <div class="form-field" id="account_companyname_id"> */}
                <div className="form-field" id="account_companyname_id">
                    {/* html L31: <label class="form-label" for="account_companyname"> */}
                    <label className="form-label" htmlFor="account_companyname">
                        {/* html L32: {{#if (lang 'account.settings.company') '!==' 'Company'}} */}
                        <$If
                            query={[$lang($string('account.settings.company')), '!==', $string('Company')]}
                            $then={() => /* html L33: {{lang 'account.settings.company'}} */ <$Lang translationKey={$string('account.settings.company')}/>}
                            $else={() => <>{/* html L34: {{else}}
                                                                                            html L35: {{forms.edit_account.company_label}}
                                           */}{forms.edit_account.company_label}</>}
                        />
                    </label>
                    {/* html L38: <input aria-labelledby="account_companyname_id" aria-live="polite" autocomplete="organization" type="text" class="form-input" name="account_companyname" id="account_companyname" value="{{forms.edit_account.company_name}}"> */}
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
                {/* html L40: <div class="form-field" id="account_phone_id"> */}
                <div className="form-field" id="account_phone_id">
                    {/* html L41: <label class="form-label" for="account_phone"> */}
                    <label className="form-label" htmlFor="account_phone">
                        {/* html L42: {{#if (lang 'account.settings.phone') '!==' 'Phone Number'}} */}
                        <$If
                            query={[$lang($string('account.settings.phone')), '!==', $string('Phone Number')]}
                            $then={() => /* html L43: {{lang 'account.settings.phone'}} */ <$Lang translationKey={$string('account.settings.phone')}/>}
                            $else={() => <>{/* html L44: {{else}}
                                                                                            html L45: {{forms.edit_account.phone_label}}
                                           */}{forms.edit_account.phone_label}</>}
                        />
                    </label>
                    {/* html L48: <input aria-labelledby="account_phone_id" aria-live="polite" autocomplete="tel" type="text" class="form-input" name="account_phone" id="account_phone" value="{{forms.edit_account.phone}}"> */}
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
                {/* html L50: {{#each forms.edit_account.fields}} */}
                <$Each
                    list={forms.edit_account.fields}
                    $then={() => $_dynamicComponent($string('components/common/forms'))}
                />
            </div>
        </fieldset>
        {/* html L55: <div class="form-actions"> */}
        <div className="form-actions">
            {/* html L56: <button class="button button--primary">{{lang 'account.settings.update_details'}}</button> */}
            <button className="button button--primary">
                {/* html L56: {{lang 'account.settings.update_details'}} */}
                <$Lang translationKey={$string('account.settings.update_details')}/>
            </button>
        </div>
    </form>
));
