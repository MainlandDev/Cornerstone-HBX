import {$boolean, $Each, $If, $Partial, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$cdn, $concat, $lang, $nonce} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import type {ExtendedThemePageAddPaymentMethod} from '@/context-pagesAccount';

export default $page<ExtendedThemePageAddPaymentMethod>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <$Inject keyName={$string('creditCardNumber')} value={$lang($string('forms.validate.payment_method.credit_card_number'))}/>
                        <$Inject keyName={$string('expiration')} value={$lang($string('forms.validate.payment_method.expiration'))}/>
                        <$Inject keyName={$string('nameOnCard')} value={$lang($string('forms.validate.payment_method.name_on_card'))}/>
                        <$Inject keyName={$string('cvv')} value={$lang($string('forms.validate.payment_method.cvv'))}/>

                        <$Inject keyName={$string('firstNameLabel')} value={$lang($string('forms.payment_methods.first_name'))}/>
                        <$Inject keyName={$string('lastNameLabel')} value={$lang($string('forms.payment_methods.last_name'))}/>
                        <$Inject keyName={$string('companyLabel')} value={$lang($string('forms.payment_methods.company'))}/>
                        <$Inject keyName={$string('phoneLabel')} value={$lang($string('forms.payment_methods.phone'))}/>
                        <$Inject keyName={$string('address1Label')} value={$lang($string('forms.payment_methods.address1'))}/>
                        <$Inject keyName={$string('address2Label')} value={$lang($string('forms.payment_methods.address2'))}/>
                        <$Inject keyName={$string('cityLabel')} value={$lang($string('forms.payment_methods.city'))}/>
                        <$Inject keyName={$string('countryLabel')} value={$lang($string('forms.payment_methods.country'))}/>
                        <$Inject keyName={$string('stateLabel')} value={$lang($string('forms.payment_methods.state'))}/>
                        <$Inject keyName={$string('postalCodeLabel')} value={$lang($string('forms.payment_methods.postal_code'))}/>
                        <$Inject keyName={$string('chooseCountryLabel')} value={$lang($string('forms.payment_methods.choose_country'))}/>

                        <$Inject keyName={$string('paymentMethodsUrl')} value={ctx.urls.account.payment_methods.all}/>
                        <$Inject keyName={$string('paymentsUrl')} value={ctx.settings.payments_url}/>
                        <$Inject keyName={$string('storeHash')} value={ctx.settings.store_hash}/>
                        <$Inject keyName={$string('vaultToken')} value={ctx.vault.access_token}/>
                        <$Inject keyName={$string('shopperId')} value={ctx.customer.id}/>
                        <$Inject keyName={$string('countries')} value={ctx.countries}/>
                        <$Inject keyName={$string('customerEmail')} value={ctx.customer.email}/>
                        <$Inject keyName={$string('providerId')} value={ctx.forms.provider}/>
                        <$Inject keyName={$string('currencyCode')} value={ctx.currency_selector.active_currency_code}/>
                        <$Inject keyName={$string('paymentProviderInitializationData')} value={ctx.initialization_data}/>
                        <$Inject keyName={$string('storeLocale')} value={ctx.settings.request.locale}/>
                        <$Inject keyName={$string('themeSettings')} value={ctx.theme_settings}/>

                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>

                        <h2 className="page-heading">
                            <$Lang translationKey={$string('forms.payment_methods.add.heading')}/>
                        </h2>

                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('payment_methods'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />

                        <div className="account account--fixed">
                            <$If
                                query={[ctx.forms.error]}
                                $then={() => <$Partial name="components/common/alert/alert-error" context={ctx.forms.error}/>}
                            />

                            <$If
                                query={[ctx.account_payments]}
                                $then={() => (
                                    <>
                                        {$unescaped(ctx.account_payments)}
                                        <script nonce={$nonce()}>
                                            {$$raw('window.BigCommerce = window.BigCommerce || {};')}
                                        </script>
                                    </>
                                )}
                                $else={() => (
                                    <form data-payment-method-form="" className="form">
                                        <input type="hidden" name="email" value={ctx.customer.email}/>
                                        <input type="hidden" name="provider_id" value={ctx.forms.provider}/>
                                        <input type="hidden" name="currency_code" value={ctx.currency_selector.active_currency_code}/>

                                        <h3 className="paymentMethodForm-heading">
                                            <$Lang translationKey={$string('account.payment_methods.payment_method')}/>
                                        </h3>
                                        <div className="paymentMethodForm">
                                            <p className="paymentMethodForm-subheading">
                                                {ctx.forms.payment_method.provider_name}
                                                <span className="paymentMethodForm-cards">
                                                    <$Each
                                                        list={ctx.theme_settings.supported_card_type_icons}
                                                        $then={(icon) => (
                                                            <img
                                                                className="paymentMethodForm-cards-icon"
                                                                src={$cdn($concat($concat($string('img/payment-methods/'), icon), $string('.svg')))}
                                                                alt={$lang($concat($string('account.payment_methods.card_types.'), icon))}
                                                                title={$lang($concat($string('account.payment_methods.card_types.'), icon))}
                                                            />
                                                        )}
                                                    />
                                                </span>
                                            </p>
                                            <fieldset className="form-fieldset">
                                                <div className="paymentMethodForm-column">
                                                    <div className="paymentMethodForm-inputs">
                                                        <$Partial
                                                            name="components/common/forms/text"
                                                            hash={{
                                                                id: $string('credit_card_number'),
                                                                name: $string('credit_card_number'),
                                                                label: $lang($string('account.payment_methods.credit_card_number')),
                                                            }}
                                                        />
                                                        <svg className="paymentMethodForm-inputs-icon icon">
                                                            <use href="#icon-lock"/>
                                                        </svg>
                                                    </div>
                                                    <div className="paymentMethodForm-inputs">
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
                                                <div className="paymentMethodForm-column">
                                                    <div className="paymentMethodForm-inputs">
                                                        <$Partial
                                                            name="components/common/forms/text"
                                                            hash={{
                                                                id: $string('name_on_card'),
                                                                name: $string('name_on_card'),
                                                                label: $lang($string('account.payment_methods.name_on_card')),
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="paymentMethodForm-inputs">
                                                        <$Partial
                                                            name="components/common/forms/text"
                                                            hash={{
                                                                id: $string('cvv'),
                                                                name: $string('cvv'),
                                                                label: $lang($string('account.payment_methods.cvv')),
                                                            }}
                                                        />
                                                        <svg className="paymentMethodForm-inputs-icon icon">
                                                            <use href="#icon-lock"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="form-field">
                                                    <input
                                                        type="checkbox"
                                                        name="default_instrument"
                                                        id="default_instrument"
                                                        data-label={$lang($string('forms.payment_methods.default_instrument'))}
                                                        className="form-checkbox"
                                                    />
                                                    <label className="form-label" htmlFor="default_instrument">
                                                        <$Lang translationKey={$string('forms.payment_methods.default_instrument')}/>
                                                    </label>
                                                </div>
                                            </fieldset>
                                        </div>

                                        <h3 className="paymentMethodForm-heading">
                                            <$Lang translationKey={$string('account.payment_methods.billing_address')}/>
                                        </h3>

                                        <fieldset className="form-fieldset">
                                            <div className="form-row form-row--half">
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
                                        <div className="form-actions">
                                            <input
                                                type="submit"
                                                className="button button--primary"
                                                value={$lang($string('forms.payment_methods.submit_value'))}
                                            />
                                            <a href={ctx.urls.account.payment_methods.all} className="button">
                                                <$Lang translationKey={$string('common.cancel')}/>
                                            </a>
                                            <$Inject keyName={$string('required')} value={$lang($string('common.required'))}/>
                                            <$Inject keyName={$string('state_error')} value={$lang($string('errors.state_error'))}/>
                                            <$Inject keyName={$string('generic_error')} value={$lang($string('common.generic_error'))}/>
                                        </div>
                                    </form>
                                )}
                            />
                        </div>
                    </>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
