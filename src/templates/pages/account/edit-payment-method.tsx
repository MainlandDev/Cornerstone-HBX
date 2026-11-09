import {$If, $Each, $Partial, $string, $With, $if} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$_dynamicComponent, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$$when} from '@mainlanddev/bigcommerce-react/internal';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import type {ExtendedThemePageEditPaymentMethod} from '@/context-pagesAccount';

export default $page<ExtendedThemePageEditPaymentMethod>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>

                        <h2 className="page-heading">
                            <$Lang translationKey={$string('forms.payment_methods.edit.heading')}/>
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

                            <$With
                                context={ctx.customer.edit_stored_instrument}
                                $then={(instrument) => (
                                    <form action={ctx.forms.action} data-address-form="" className="form" method="post">
                                        <input type="hidden" name="token" value={instrument.token}/>
                                        <input type="hidden" name="currency_code" value={ctx.currency_selector.active_currency_code}/>
                                        <input type="hidden" name="type" value={instrument.type}/>

                                        <h3 className="paymentMethodForm-heading">
                                            <$Lang translationKey={$string('account.payment_methods.payment_method')}/>
                                        </h3>

                                        <div className="paymentMethodForm">
                                            <$If
                                                query={[instrument.type, '===', $string('stored_card')]}
                                                $then={() => (
                                                    <>
                                                        <dl className="paymentMethodForm-details">
                                                            <dt className="paymentMethodForm-details-term">
                                                                <$Lang translationKey={$string('account.payment_methods.credit_card_number')}/>
                                                            </dt>
                                                            <dd className="paymentMethodForm-details-description">
                                                                **** **** **** {instrument.last_4}
                                                            </dd>
                                                        </dl>
                                                        <dl className="paymentMethodForm-details">
                                                            <dt className="paymentMethodForm-details-term">
                                                                <$Lang translationKey={$string('account.payment_methods.expiration')}/>
                                                            </dt>
                                                            <dd className="paymentMethodForm-details-description">
                                                                {instrument.expiry_month}/{instrument.expiry_year}
                                                            </dd>
                                                        </dl>
                                                    </>
                                                )}
                                            />
                                            <$If
                                                query={[instrument.type, '===', $string('stored_paypal_account')]}
                                                $then={() => (
                                                    <div className="form-field">
                                                        <h3 className="paymentMethodForm-heading">
                                                            <$Lang translationKey={$string('account.payment_methods.paypal')}/>{' '}
                                                            <$Lang translationKey={$string('common.account')}/>
                                                        </h3>
                                                        <p>{instrument.email}</p>
                                                    </div>
                                                )}
                                            />
                                            <div className="form-field">
                                                <input
                                                    type="checkbox"
                                                    value="default_instrument"
                                                    name="is_default"
                                                    id="default_instrument"
                                                    data-label={$lang($string('forms.payment_methods.default_instrument'))}
                                                    className="form-checkbox"
                                                    checked={$$when($if(instrument.is_default))}
                                                />
                                                <label className="form-label" htmlFor="default_instrument">
                                                    <$Lang translationKey={$string('forms.payment_methods.default_instrument')}/>
                                                </label>
                                            </div>
                                        </div>

                                        <$If
                                            query={[instrument.type, '===', $string('stored_card')]}
                                            $then={() => (
                                                <>
                                                    <h3 className="paymentMethodForm-heading">
                                                        <$Lang translationKey={$string('account.payment_methods.billing_address')}/>
                                                    </h3>

                                                    <fieldset className="form-fieldset">
                                                        <div className="form-row form-row--half">
                                                            <$Each
                                                                list={ctx.forms.billing_fields}
                                                                $then={() => $_dynamicComponent($string('components/common/forms'))}
                                                            />
                                                        </div>
                                                    </fieldset>
                                                </>
                                            )}
                                        />
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
