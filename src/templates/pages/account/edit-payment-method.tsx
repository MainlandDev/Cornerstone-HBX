/**
 * Source: templates/pages/account/edit-payment-method.html (71 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $parseHandlebarsDangerously, $string, $With, $if} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$$when} from '@mainlanddev/bigcommerce-react/internal';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import type {ExtendedThemePageEditPaymentMethod} from '@/context-pagesAccount';

export default $page<ExtendedThemePageEditPaymentMethod>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L3: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>

                        {/* html L5: <h2 class="page-heading">{{lang 'forms.payment_methods.edit.heading'}}</h2> */}
                        <h2 className="page-heading">
                            {/* html L5: {{lang 'forms.payment_methods.edit.heading'}} */}
                            <$Lang translationKey={$string('forms.payment_methods.edit.heading')}/>
                        </h2>

                        {/* html L7: {{> components/account/navigation account_page='payment_methods'}} */}
                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('payment_methods'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />

                        {/* html L9: <div class="account account--fixed"> */}
                        <div className="account account--fixed">
                            {/* html L10: {{#if forms.error}} */}
                            <$If
                                query={[ctx.forms.error]}
                                $then={() => /* html L11: {{> components/common/alert/alert-error forms.error}} */ <$Partial name="components/common/alert/alert-error" context={ctx.forms.error}/>}
                            />

                            {/* html L14: {{#with customer.edit_stored_instrument}} */}
                            <$With
                                context={ctx.customer.edit_stored_instrument}
                                $then={(instrument) => (
                                    /* html L15: <form action="{{forms.action}}" data-address-form class="form" method="post"> */
                                    <form $$={$parseHandlebarsDangerously('action="{{forms.action}}"')} data-address-form="" className="form" method="post">
                                        {/* html L16: <input type="hidden" name="token" value="{{token}}"> */}
                                        <input type="hidden" name="token" value={instrument.token}/>
                                        {/* html L17: <input type="hidden" name="currency_code" value="{{../currency_selector.active_currency_code}}"> */}
                                        <input type="hidden" name="currency_code" value={ctx.currency_selector.active_currency_code}/>
                                        {/* html L18: <input type="hidden" name="type" value="{{type}}"> */}
                                        <input type="hidden" name="type" value={instrument.type}/>

                                        {/* html L20: <h3 class="paymentMethodForm-heading">{{lang 'account.payment_methods.payment_method'}}</h3> */}
                                        <h3 className="paymentMethodForm-heading">
                                            {/* html L20: {{lang 'account.payment_methods.payment_method'}} */}
                                            <$Lang translationKey={$string('account.payment_methods.payment_method')}/>
                                        </h3>

                                        {/* html L22: <div class="paymentMethodForm"> */}
                                        <div className="paymentMethodForm">
                                            {/* html L23: {{#if type '===' 'stored_card'}} */}
                                            <$If
                                                query={[instrument.type, '===', $string('stored_card')]}
                                                $then={() => (
                                                    <>
                                                        {/* html L24: <dl class="paymentMethodForm-details"> */}
                                                        <dl className="paymentMethodForm-details">
                                                            {/* html L25: <dt class="paymentMethodForm-details-term">{{lang 'account.payment_methods.credit_card_number'}}</dt> */}
                                                            <dt className="paymentMethodForm-details-term">
                                                                {/* html L25: {{lang 'account.payment_methods.credit_card_number'}} */}
                                                                <$Lang translationKey={$string('account.payment_methods.credit_card_number')}/>
                                                            </dt>
                                                            {/* html L26: <dd class="paymentMethodForm-details-description">**** **** **** {{last_4}}</dd> */}
                                                            <dd className="paymentMethodForm-details-description">
                                                                **** **** **** {/* html L26: {{last_4}} */}{instrument.last_4}
                                                            </dd>
                                                        </dl>
                                                        {/* html L28: <dl class="paymentMethodForm-details"> */}
                                                        <dl className="paymentMethodForm-details">
                                                            {/* html L29: <dt class="paymentMethodForm-details-term">{{lang 'account.payment_methods.expiration'}}</dt> */}
                                                            <dt className="paymentMethodForm-details-term">
                                                                {/* html L29: {{lang 'account.payment_methods.expiration'}} */}
                                                                <$Lang translationKey={$string('account.payment_methods.expiration')}/>
                                                            </dt>
                                                            {/* html L30: <dd class="paymentMethodForm-details-description">{{expiry_month}}/{{expiry_year}}</dd> */}
                                                            <dd className="paymentMethodForm-details-description">
                                                                {/* html L30: {{expiry_month}} */}
                                                                {instrument.expiry_month}/{/* html L30: {{expiry_year}} */}{instrument.expiry_year}
                                                            </dd>
                                                        </dl>
                                                    </>
                                                )}
                                            />
                                            {/* html L33: {{#if type '===' 'stored_paypal_account'}} */}
                                            <$If
                                                query={[instrument.type, '===', $string('stored_paypal_account')]}
                                                $then={() => (
                                                    /* html L34: <div class="form-field"> */
                                                    <div className="form-field">
                                                        {/* html L35: <h3 class="paymentMethodForm-heading"> */}
                                                        <h3 className="paymentMethodForm-heading">
                                                            {/* html L36: {{lang 'account.payment_methods.paypal'}} {{lang 'common.account'}} */}
                                                            <$Lang translationKey={$string('account.payment_methods.paypal')}/>{' '}
                                                            {/* html L36: {{lang 'common.account'}} */}
                                                            <$Lang translationKey={$string('common.account')}/>
                                                        </h3>
                                                        {/* html L38: <p> */}
                                                        <p>{/* html L39: {{email}} */}{instrument.email}</p>
                                                    </div>
                                                )}
                                            />
                                            {/* html L43: <div class="form-field"> */}
                                            <div className="form-field">
                                                {/* html L44: <input type="checkbox" value="default_instrument" name="is_default" id="default_instrument" data-label="{{lang 'forms.payment_methods.default_instrument'}}" class="form-checkbox" {{#if is_default}}checked{{/if}}> */}
                                                <input
                                                    type="checkbox"
                                                    value="default_instrument"
                                                    name="is_default"
                                                    id="default_instrument"
                                                    data-label={$lang($string('forms.payment_methods.default_instrument'))}
                                                    className="form-checkbox"
                                                    checked={$$when($if(instrument.is_default))}
                                                />
                                                {/* html L45: <label class="form-label" for="default_instrument">{{lang 'forms.payment_methods.default_instrument'}}</label> */}
                                                <label className="form-label" htmlFor="default_instrument">
                                                    {/* html L45: {{lang 'forms.payment_methods.default_instrument'}} */}
                                                    <$Lang translationKey={$string('forms.payment_methods.default_instrument')}/>
                                                </label>
                                            </div>
                                        </div>

                                        {/* html L49: {{#if type '===' 'stored_card'}} */}
                                        <$If
                                            query={[instrument.type, '===', $string('stored_card')]}
                                            $then={() => (
                                                <>
                                                    {/* html L50: <h3 class="paymentMethodForm-heading">{{lang 'account.payment_methods.billing_address'}}</h3> */}
                                                    <h3 className="paymentMethodForm-heading">
                                                        {/* html L50: {{lang 'account.payment_methods.billing_address'}} */}
                                                        <$Lang translationKey={$string('account.payment_methods.billing_address')}/>
                                                    </h3>

                                                    {/* html L52: <fieldset class="form-fieldset"> */}
                                                    <fieldset className="form-fieldset">
                                                        {/* html L53: <div class="form-row form-row--half"> */}
                                                        <div className="form-row form-row--half">
                                                            {/* html L54: {{#each forms.billing_fields}} */}
                                                            {$parseHandlebarsDangerously(`{{#each forms.billing_fields}}
                                {{{dynamicComponent 'components/common/forms'}}}
                            {{/each}}`)}
                                                        </div>
                                                    </fieldset>
                                                </>
                                            )}
                                        />
                                        {/* html L60: <div class="form-actions"> */}
                                        <div className="form-actions">
                                            {/* html L61: <input type="submit" class="button button--primary" value="{{lang 'forms.payment_methods.submit_value'}}"> */}
                                            <input
                                                type="submit"
                                                className="button button--primary"
                                                value={$lang($string('forms.payment_methods.submit_value'))}
                                            />
                                            {/* html L62: <a href="{{../urls.account.payment_methods.all}}" class="button">{{lang 'common.cancel'}}</a> */}
                                            <a href={ctx.urls.account.payment_methods.all} className="button">
                                                {/* html L62: {{lang 'common.cancel'}} */}
                                                <$Lang translationKey={$string('common.cancel')}/>
                                            </a>
                                            {/* html L63: {{inject 'required' (lang 'common.required')}} */}
                                            <$Inject keyName={$string('required')} value={$lang($string('common.required'))}/>
                                            {/* html L64: {{inject 'state_error' (lang 'errors.state_error')}} */}
                                            <$Inject keyName={$string('state_error')} value={$lang($string('errors.state_error'))}/>
                                        </div>
                                    </form>
                                )}
                            />
                        </div>
                    </>
                )}
            />
            {/* html L70: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
