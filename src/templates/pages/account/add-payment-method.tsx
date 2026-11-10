/**
 * Source: templates/pages/account/add-payment-method.html (125 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$boolean, $If, $Partial, $parseHandlebarsDangerously, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang, $nonce} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import type {ExtendedThemePageAddPaymentMethod} from '@/context-pagesAccount';

export default $page<ExtendedThemePageAddPaymentMethod>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L3: {{inject 'creditCardNumber' (lang 'forms.validate.payment_method.credit_card_number')}} */}
                        <$Inject keyName={$string('creditCardNumber')} value={$lang($string('forms.validate.payment_method.credit_card_number'))}/>
                        {/* html L4: {{inject 'expiration' (lang 'forms.validate.payment_method.expiration')}} */}
                        <$Inject keyName={$string('expiration')} value={$lang($string('forms.validate.payment_method.expiration'))}/>
                        {/* html L5: {{inject 'nameOnCard' (lang 'forms.validate.payment_method.name_on_card')}} */}
                        <$Inject keyName={$string('nameOnCard')} value={$lang($string('forms.validate.payment_method.name_on_card'))}/>
                        {/* html L6: {{inject 'cvv' (lang 'forms.validate.payment_method.cvv')}} */}
                        <$Inject keyName={$string('cvv')} value={$lang($string('forms.validate.payment_method.cvv'))}/>

                        {/* html L8: {{inject 'firstNameLabel' (lang 'forms.payment_methods.first_name')}} */}
                        <$Inject keyName={$string('firstNameLabel')} value={$lang($string('forms.payment_methods.first_name'))}/>
                        {/* html L9: {{inject 'lastNameLabel' (lang 'forms.payment_methods.last_name')}} */}
                        <$Inject keyName={$string('lastNameLabel')} value={$lang($string('forms.payment_methods.last_name'))}/>
                        {/* html L10: {{inject 'companyLabel' (lang 'forms.payment_methods.company')}} */}
                        <$Inject keyName={$string('companyLabel')} value={$lang($string('forms.payment_methods.company'))}/>
                        {/* html L11: {{inject 'phoneLabel' (lang 'forms.payment_methods.phone')}} */}
                        <$Inject keyName={$string('phoneLabel')} value={$lang($string('forms.payment_methods.phone'))}/>
                        {/* html L12: {{inject 'address1Label' (lang 'forms.payment_methods.address1')}} */}
                        <$Inject keyName={$string('address1Label')} value={$lang($string('forms.payment_methods.address1'))}/>
                        {/* html L13: {{inject 'address2Label' (lang 'forms.payment_methods.address2')}} */}
                        <$Inject keyName={$string('address2Label')} value={$lang($string('forms.payment_methods.address2'))}/>
                        {/* html L14: {{inject 'cityLabel' (lang 'forms.payment_methods.city')}} */}
                        <$Inject keyName={$string('cityLabel')} value={$lang($string('forms.payment_methods.city'))}/>
                        {/* html L15: {{inject 'countryLabel' (lang 'forms.payment_methods.country')}} */}
                        <$Inject keyName={$string('countryLabel')} value={$lang($string('forms.payment_methods.country'))}/>
                        {/* html L16: {{inject 'stateLabel' (lang 'forms.payment_methods.state')}} */}
                        <$Inject keyName={$string('stateLabel')} value={$lang($string('forms.payment_methods.state'))}/>
                        {/* html L17: {{inject 'postalCodeLabel' (lang 'forms.payment_methods.postal_code')}} */}
                        <$Inject keyName={$string('postalCodeLabel')} value={$lang($string('forms.payment_methods.postal_code'))}/>
                        {/* html L18: {{inject 'chooseCountryLabel' (lang 'forms.payment_methods.choose_country')}} */}
                        <$Inject keyName={$string('chooseCountryLabel')} value={$lang($string('forms.payment_methods.choose_country'))}/>

                        {/* html L20: {{inject 'paymentMethodsUrl' urls.account.payment_methods.all}} */}
                        <$Inject keyName={$string('paymentMethodsUrl')} value={ctx.urls.account.payment_methods.all}/>
                        {/* html L21: {{inject 'paymentsUrl' settings.payments_url}} */}
                        <$Inject keyName={$string('paymentsUrl')} value={ctx.settings.payments_url}/>
                        {/* html L22: {{inject 'storeHash' settings.store_hash}} */}
                        <$Inject keyName={$string('storeHash')} value={ctx.settings.store_hash}/>
                        {/* html L23: {{inject 'vaultToken' vault.access_token}} */}
                        <$Inject keyName={$string('vaultToken')} value={ctx.vault.access_token}/>
                        {/* html L24: {{inject 'shopperId' customer.id}} */}
                        <$Inject keyName={$string('shopperId')} value={ctx.customer.id}/>
                        {/* html L25: {{inject 'countries' countries}} */}
                        <$Inject keyName={$string('countries')} value={ctx.countries}/>
                        {/* html L26: {{inject 'customerEmail' customer.email}} */}
                        <$Inject keyName={$string('customerEmail')} value={ctx.customer.email}/>
                        {/* html L27: {{inject 'providerId' forms.provider}} */}
                        <$Inject keyName={$string('providerId')} value={ctx.forms.provider}/>
                        {/* html L28: {{inject 'currencyCode' currency_selector.active_currency_code}} */}
                        <$Inject keyName={$string('currencyCode')} value={ctx.currency_selector.active_currency_code}/>
                        {/* html L29: {{inject 'paymentProviderInitializationData' initialization_data}} */}
                        <$Inject keyName={$string('paymentProviderInitializationData')} value={ctx.initialization_data}/>
                        {/* html L30: {{inject 'storeLocale' settings.request.locale }} */}
                        <$Inject keyName={$string('storeLocale')} value={ctx.settings.request.locale}/>
                        {/* html L31: {{inject 'themeSettings' theme_settings}} */}
                        <$Inject keyName={$string('themeSettings')} value={ctx.theme_settings}/>

                        {/* html L33: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>

                        {/* html L35: <h2 class="page-heading">{{lang 'forms.payment_methods.add.heading'}}</h2> */}
                        <h2 className="page-heading">
                            {/* html L35: {{lang 'forms.payment_methods.add.heading'}} */}
                            <$Lang translationKey={$string('forms.payment_methods.add.heading')}/>
                        </h2>

                        {/* html L37: {{> components/account/navigation account_page='payment_methods'}} */}
                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('payment_methods'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />

                        {/* html L39: <div class="account account--fixed"> */}
                        <div className="account account--fixed">
                            {/* html L41: {{#if forms.error}} */}
                            <$If
                                query={[ctx.forms.error]}
                                $then={() => /* html L42: {{> components/common/alert/alert-error forms.error}} */ <$Partial name="components/common/alert/alert-error" context={ctx.forms.error}/>}
                            />

                            {/* html L45: {{#if account_payments}} */}
                            <$If
                                query={[ctx.account_payments]}
                                $then={() => (
                                    <>
                                        {/* html L46: {{{ account_payments }}} */}
                                        {$unescaped(ctx.account_payments)}
                                        {/* html L47: <script nonce="{{nonce}}"> */}
                                        <script nonce={$nonce()}>
                                            {/* html L48: window.BigCommerce = window.BigCommerce || {}; */}
                                            {$$raw('window.BigCommerce = window.BigCommerce || {};')}
                                        </script>
                                    </>
                                )}
                                $else={() => (
                                    /* html L50: {{else}}
                                                                              html L51: <form data-payment-method-form class="form">
                                    */
                                    <form data-payment-method-form="" className="form">
                                        {/* html L52: <input type="hidden" name="email" value="{{customer.email}}"> */}
                                        <input type="hidden" name="email" value={ctx.customer.email}/>
                                        {/* html L53: <input type="hidden" name="provider_id" value="{{forms.provider}}"> */}
                                        <input type="hidden" name="provider_id" value={ctx.forms.provider}/>
                                        {/* html L54: <input type="hidden" name="currency_code" value="{{currency_selector.active_currency_code}}"> */}
                                        <input type="hidden" name="currency_code" value={ctx.currency_selector.active_currency_code}/>

                                        {/* html L56: <h3 class="paymentMethodForm-heading">{{lang 'account.payment_methods.payment_method'}}</h3> */}
                                        <h3 className="paymentMethodForm-heading">
                                            {/* html L56: {{lang 'account.payment_methods.payment_method'}} */}
                                            <$Lang translationKey={$string('account.payment_methods.payment_method')}/>
                                        </h3>
                                        {/* html L57: <div class="paymentMethodForm"> */}
                                        <div className="paymentMethodForm">
                                            {/* html L58: <p class="paymentMethodForm-subheading"> */}
                                            <p className="paymentMethodForm-subheading">
                                                {/* html L59: {{forms.payment_method.provider_name}} */}
                                                {ctx.forms.payment_method.provider_name}
                                                {/* html L60: <span class="paymentMethodForm-cards"> */}
                                                <span className="paymentMethodForm-cards">
                                                    {/* html L61: {{#each ../theme_settings.supported_card_type_icons}} */}
                                                    {$parseHandlebarsDangerously(`{{#each ../theme_settings.supported_card_type_icons}}
<img class="paymentMethodForm-cards-icon" src="{{cdn (concat (concat 'img/payment-methods/' this) '.svg')}}" alt="{{lang (concat 'account.payment_methods.card_types.' this)}}" title="{{lang (concat 'account.payment_methods.card_types.' this)}}">
{{/each}}`)}
                                                </span>
                                            </p>
                                            {/* html L66: <fieldset class="form-fieldset"> */}
                                            <fieldset className="form-fieldset">
                                                {/* html L67: <div class="paymentMethodForm-column"> */}
                                                <div className="paymentMethodForm-column">
                                                    {/* html L68: <div class="paymentMethodForm-inputs"> */}
                                                    <div className="paymentMethodForm-inputs">
                                                        {/* html L69: {{> components/common/forms/text id="credit_card_number" name="credit_card_number" label=(lang 'account.payment_methods.credit_card_number')}} */}
                                                        <$Partial
                                                            name="components/common/forms/text"
                                                            hash={{
                                                                id: $string('credit_card_number'),
                                                                name: $string('credit_card_number'),
                                                                label: $lang($string('account.payment_methods.credit_card_number')),
                                                            }}
                                                        />
                                                        {/* html L70: <svg class="paymentMethodForm-inputs-icon icon"> */}
                                                        <svg className="paymentMethodForm-inputs-icon icon">
                                                            {/* html L71: <use href="#icon-lock" /> */}
                                                            <use href="#icon-lock"/>
                                                        </svg>
                                                    </div>
                                                    {/* html L74: <div class="paymentMethodForm-inputs"> */}
                                                    <div className="paymentMethodForm-inputs">
                                                        {/* html L75: {{> components/common/forms/text id="expiration" name="expiration" label=(lang 'account.payment_methods.expiration') placeholder="MM/YY"}} */}
                                                        <$Partial
                                                            name="components/common/forms/text"
                                                            hash={{
                                                                id: $string('expiration'),
                                                                name: $string('expiration'),
                                                                label: $lang($string('account.payment_methods.expiration')),
                                                                placeholder: $string('MM/YY'),
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                {/* html L78: <div class="paymentMethodForm-column"> */}
                                                <div className="paymentMethodForm-column">
                                                    {/* html L79: <div class="paymentMethodForm-inputs"> */}
                                                    <div className="paymentMethodForm-inputs">
                                                        {/* html L80: {{> components/common/forms/text id="name_on_card" name="name_on_card" label=(lang 'account.payment_methods.name_on_card')}} */}
                                                        <$Partial
                                                            name="components/common/forms/text"
                                                            hash={{
                                                                id: $string('name_on_card'),
                                                                name: $string('name_on_card'),
                                                                label: $lang($string('account.payment_methods.name_on_card')),
                                                            }}
                                                        />
                                                    </div>
                                                    {/* html L82: <div class="paymentMethodForm-inputs"> */}
                                                    <div className="paymentMethodForm-inputs">
                                                        {/* html L83: {{> components/common/forms/text id="cvv" name="cvv" label=(lang 'account.payment_methods.cvv')}} */}
                                                        <$Partial
                                                            name="components/common/forms/text"
                                                            hash={{
                                                                id: $string('cvv'),
                                                                name: $string('cvv'),
                                                                label: $lang($string('account.payment_methods.cvv')),
                                                            }}
                                                        />
                                                        {/* html L84: <svg class="paymentMethodForm-inputs-icon icon"> */}
                                                        <svg className="paymentMethodForm-inputs-icon icon">
                                                            {/* html L85: <use href="#icon-lock" /> */}
                                                            <use href="#icon-lock"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                                {/* html L89: <div class="form-field"> */}
                                                <div className="form-field">
                                                    {/* html L90: <input type="checkbox" name="default_instrument" id="default_instrument" data-label="{{lang 'forms.payment_methods.default_instrument'}}" class="form-checkbox"> */}
                                                    <input
                                                        type="checkbox"
                                                        name="default_instrument"
                                                        id="default_instrument"
                                                        data-label={$lang($string('forms.payment_methods.default_instrument'))}
                                                        className="form-checkbox"
                                                    />
                                                    {/* html L91: <label class="form-label" for="default_instrument">{{lang 'forms.payment_methods.default_instrument'}}</label> */}
                                                    <label className="form-label" htmlFor="default_instrument">
                                                        {/* html L91: {{lang 'forms.payment_methods.default_instrument'}} */}
                                                        <$Lang translationKey={$string('forms.payment_methods.default_instrument')}/>
                                                    </label>
                                                </div>
                                            </fieldset>
                                        </div>

                                        {/* html L96: <h3 class="paymentMethodForm-heading">{{lang 'account.payment_methods.billing_address'}}</h3> */}
                                        <h3 className="paymentMethodForm-heading">
                                            {/* html L96: {{lang 'account.payment_methods.billing_address'}} */}
                                            <$Lang translationKey={$string('account.payment_methods.billing_address')}/>
                                        </h3>

                                        {/* html L98: <fieldset class="form-fieldset"> */}
                                        <fieldset className="form-fieldset">
                                            {/* html L99: <div class="form-row form-row--half"> */}
                                            <div className="form-row form-row--half">
                                                {/* html L100: {{> components/common/forms/text private_id="FirstName" required=true id="first_name" name="first_name" label=(lang 'forms.payment_methods.first_name')}} */}
                                                <$Partial
                                                    name="components/common/forms/text"
                                                    hash={{
                                                        private_id: $string('FirstName'),
                                                        required: $boolean(true),
                                                        id: $string('first_name'),
                                                        name: $string('first_name'),
                                                        label: $lang($string('forms.payment_methods.first_name')),
                                                    }}
                                                />
                                                {/* html L101: {{> components/common/forms/text private_id="LastName" required=true id="last_name" name="last_name" label=(lang 'forms.payment_methods.last_name')}} */}
                                                <$Partial
                                                    name="components/common/forms/text"
                                                    hash={{
                                                        private_id: $string('LastName'),
                                                        required: $boolean(true),
                                                        id: $string('last_name'),
                                                        name: $string('last_name'),
                                                        label: $lang($string('forms.payment_methods.last_name')),
                                                    }}
                                                />
                                                {/* html L102: {{> components/common/forms/text private_id="CompanyName" required=false id="company" name="company" label=(lang 'forms.payment_methods.company')}} */}
                                                <$Partial
                                                    name="components/common/forms/text"
                                                    hash={{
                                                        private_id: $string('CompanyName'),
                                                        required: $boolean(false),
                                                        id: $string('company'),
                                                        name: $string('company'),
                                                        label: $lang($string('forms.payment_methods.company')),
                                                    }}
                                                />
                                                {/* html L103: {{> components/common/forms/text private_id="Phone" required=false id="phone" name="phone" label=(lang 'forms.payment_methods.phone')}} */}
                                                <$Partial
                                                    name="components/common/forms/text"
                                                    hash={{
                                                        private_id: $string('Phone'),
                                                        required: $boolean(false),
                                                        id: $string('phone'),
                                                        name: $string('phone'),
                                                        label: $lang($string('forms.payment_methods.phone')),
                                                    }}
                                                />
                                                {/* html L104: {{> components/common/forms/text private_id="AddressLine1" required=true id="address1" name="address1" label=(lang 'forms.payment_methods.address1')}} */}
                                                <$Partial
                                                    name="components/common/forms/text"
                                                    hash={{
                                                        private_id: $string('AddressLine1'),
                                                        required: $boolean(true),
                                                        id: $string('address1'),
                                                        name: $string('address1'),
                                                        label: $lang($string('forms.payment_methods.address1')),
                                                    }}
                                                />
                                                {/* html L105: {{> components/common/forms/text private_id="AddressLine2" required=false id="address2" name="address2" label=(lang 'forms.payment_methods.address2')}} */}
                                                <$Partial
                                                    name="components/common/forms/text"
                                                    hash={{
                                                        private_id: $string('AddressLine2'),
                                                        required: $boolean(false),
                                                        id: $string('address2'),
                                                        name: $string('address2'),
                                                        label: $lang($string('forms.payment_methods.address2')),
                                                    }}
                                                />
                                                {/* html L106: {{> components/common/forms/text private_id="City" required=true id="city" name="city" label=(lang 'forms.payment_methods.city')}} */}
                                                <$Partial
                                                    name="components/common/forms/text"
                                                    hash={{
                                                        private_id: $string('City'),
                                                        required: $boolean(true),
                                                        id: $string('city'),
                                                        name: $string('city'),
                                                        label: $lang($string('forms.payment_methods.city')),
                                                    }}
                                                />
                                                {/* html L107: {{> components/common/forms/select private_id="Country" required=true id="country" name="country" label=(lang 'forms.payment_methods.country') chooseprefix=(lang 'forms.payment_methods.choose_country') options=countries}} */}
                                                <$Partial
                                                    name="components/common/forms/select"
                                                    hash={{
                                                        private_id: $string('Country'),
                                                        required: $boolean(true),
                                                        id: $string('country'),
                                                        name: $string('country'),
                                                        label: $lang($string('forms.payment_methods.country')),
                                                        chooseprefix: $lang($string('forms.payment_methods.choose_country')),
                                                        options: ctx.countries,
                                                    }}
                                                />
                                                {/* html L108: {{> components/common/forms/text private_id="State" required=true id="state" name="state" label=(lang 'forms.payment_methods.state')}} */}
                                                <$Partial
                                                    name="components/common/forms/text"
                                                    hash={{
                                                        private_id: $string('State'),
                                                        required: $boolean(true),
                                                        id: $string('state'),
                                                        name: $string('state'),
                                                        label: $lang($string('forms.payment_methods.state')),
                                                    }}
                                                />
                                                {/* html L109: {{> components/common/forms/text private_id="Zip" required=true id="postal_code" name="postal_code" label=(lang 'forms.payment_methods.postal_code')}} */}
                                                <$Partial
                                                    name="components/common/forms/text"
                                                    hash={{
                                                        private_id: $string('Zip'),
                                                        required: $boolean(true),
                                                        id: $string('postal_code'),
                                                        name: $string('postal_code'),
                                                        label: $lang($string('forms.payment_methods.postal_code')),
                                                    }}
                                                />
                                            </div>
                                        </fieldset>
                                        {/* html L112: <div class="form-actions"> */}
                                        <div className="form-actions">
                                            {/* html L113: <input type="submit" class="button button--primary" value="{{lang 'forms.payment_methods.submit_value'}}"> */}
                                            <input
                                                type="submit"
                                                className="button button--primary"
                                                value={$lang($string('forms.payment_methods.submit_value'))}
                                            />
                                            {/* html L114: <a href="{{urls.account.payment_methods.all}}" class="button">{{lang 'common.cancel'}}</a> */}
                                            <a href={ctx.urls.account.payment_methods.all} className="button">
                                                {/* html L114: {{lang 'common.cancel'}} */}
                                                <$Lang translationKey={$string('common.cancel')}/>
                                            </a>
                                            {/* html L115: {{inject 'required' (lang 'common.required')}} */}
                                            <$Inject keyName={$string('required')} value={$lang($string('common.required'))}/>
                                            {/* html L116: {{inject 'state_error' (lang 'errors.state_error')}} */}
                                            <$Inject keyName={$string('state_error')} value={$lang($string('errors.state_error'))}/>
                                            {/* html L117: {{inject 'generic_error' (lang 'common.generic_error')}} */}
                                            <$Inject keyName={$string('generic_error')} value={$lang($string('common.generic_error'))}/>
                                        </div>
                                    </form>
                                )}
                            />
                        </div>
                    </>
                )}
            />
            {/* html L124: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
