import {$boolean, $cdn, $concat, $Each, $If, $Inject, $lang, $Lang, $partial, $pointer, $string, $StencilPartial, $this, $unescaped, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$StencilPartial
            name={$string("page")}
            $then={() => (
                <>
                    <$Inject keyName={$string("creditCardNumber")} value={$lang($string("forms.validate.payment_method.credit_card_number"))} />{" "}
                    <$Inject keyName={$string("expiration")} value={$lang($string("forms.validate.payment_method.expiration"))} />{" "}
                    <$Inject keyName={$string("nameOnCard")} value={$lang($string("forms.validate.payment_method.name_on_card"))} />{" "}
                    <$Inject keyName={$string("cvv")} value={$lang($string("forms.validate.payment_method.cvv"))} />{" "}
                    <$Inject keyName={$string("firstNameLabel")} value={$lang($string("forms.payment_methods.first_name"))} />{" "}
                    <$Inject keyName={$string("lastNameLabel")} value={$lang($string("forms.payment_methods.last_name"))} />{" "}
                    <$Inject keyName={$string("companyLabel")} value={$lang($string("forms.payment_methods.company"))} />{" "}
                    <$Inject keyName={$string("phoneLabel")} value={$lang($string("forms.payment_methods.phone"))} />{" "}
                    <$Inject keyName={$string("address1Label")} value={$lang($string("forms.payment_methods.address1"))} />{" "}
                    <$Inject keyName={$string("address2Label")} value={$lang($string("forms.payment_methods.address2"))} />{" "}
                    <$Inject keyName={$string("cityLabel")} value={$lang($string("forms.payment_methods.city"))} />{" "}
                    <$Inject keyName={$string("countryLabel")} value={$lang($string("forms.payment_methods.country"))} />{" "}
                    <$Inject keyName={$string("stateLabel")} value={$lang($string("forms.payment_methods.state"))} />{" "}
                    <$Inject keyName={$string("postalCodeLabel")} value={$lang($string("forms.payment_methods.postal_code"))} />{" "}
                    <$Inject keyName={$string("chooseCountryLabel")} value={$lang($string("forms.payment_methods.choose_country"))} />{" "}
                    {" "}
                    <$Inject keyName={$string("paymentMethodsUrl")} value={$pointer("urls.account.payment_methods.all")} />{" "}
                    <$Inject keyName={$string("paymentsUrl")} value={$pointer("settings.payments_url")} />{" "}
                    <$Inject keyName={$string("storeHash")} value={$pointer("settings.store_hash")} />{" "}
                    <$Inject keyName={$string("vaultToken")} value={$pointer("vault.access_token")} />{" "}
                    <$Inject keyName={$string("shopperId")} value={$pointer("customer.id")} />{" "}
                    <$Inject keyName={$string("countries")} value={$pointer("countries")} />{" "}
                    <$Inject keyName={$string("customerEmail")} value={$pointer("customer.email")} />{" "}
                    <$Inject keyName={$string("providerId")} value={$pointer("forms.provider")} />{" "}
                    <$Inject keyName={$string("currencyCode")} value={$pointer("currency_selector.active_currency_code")} />{" "}
                    <$Inject keyName={$string("paymentProviderInitializationData")} value={$pointer("initialization_data")} />{" "}
                    <$Inject keyName={$string("storeLocale")} value={$pointer("settings.request.locale")} />{" "}
                    <$Inject keyName={$string("themeSettings")} value={$pointer("theme_settings")} />

                    {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}

                    <h2 className="page-heading">
                        <$Lang keyName={$string("forms.payment_methods.add.heading")} />
                    </h2>

                    {place($partial("components/account/navigation", {account_page: $string("payment_methods")}))}

                    <div className="account account--fixed">
                        <$If
                            test={$pointer("forms.error")}
                            $then={() => place($partial("components/common/alert/alert-error", $pointer("forms.error")))}
                        />

                        <$If
                            test={$pointer("account_payments")}
                            $then={() => (
                                <>
                                    {$unescaped($pointer("account_payments"))}
                                    <script
                                        nonce={$pointer("nonce")}
                                        dangerouslySetInnerHTML={{
                                            __html: `
                window.BigCommerce = window.BigCommerce || {};
            `,
                                        }}
                                    />
                                </>
                            )}
                            $else={() => (
                                <form data-payment-method-form={""} className="form">
                                    <input type="hidden" name="email" value={$pointer("customer.email")} />
                                    <input type="hidden" name="provider_id" value={$pointer("forms.provider")} />
                                    <input type="hidden" name="currency_code" value={$pointer("currency_selector.active_currency_code")} />

                                    <h3 className="paymentMethodForm-heading">
                                        <$Lang keyName={$string("account.payment_methods.payment_method")} />
                                    </h3>
                                    <div className="paymentMethodForm">
                                        <p className="paymentMethodForm-subheading">
                                            {$pointer("forms.payment_method.provider_name")}{" "}
                                            <span className="paymentMethodForm-cards">
                                                <$Each
                                                    list={$pointer<string[]>("../theme_settings.supported_card_type_icons")}
                                                    $then={() => (
                                                        <img
                                                            className="paymentMethodForm-cards-icon"
                                                            src={$cdn($concat($concat($string("img/payment-methods/"), $this<string>()), $string(".svg")))}
                                                            alt={$lang($concat($string("account.payment_methods.card_types."), $this<string>()))}
                                                            title={$lang($concat($string("account.payment_methods.card_types."), $this<string>()))}
                                                        />
                                                    )}
                                                />
                                            </span>
                                        </p>
                                        <fieldset className="form-fieldset">
                                            <div className="paymentMethodForm-column">
                                                <div className="paymentMethodForm-inputs">
                                                    {place(
                                                        $partial("components/common/forms/text", {
                                                            id: $string("credit_card_number"),
                                                            name: $string("credit_card_number"),
                                                            label: $lang($string("account.payment_methods.credit_card_number")),
                                                        }),
                                                    )}
                                                    <svg className="paymentMethodForm-inputs-icon icon">
                                                        <use href="#icon-lock" />
                                                    </svg>
                                                </div>
                                                <div className="paymentMethodForm-inputs">
                                                    {place(
                                                        $partial("components/common/forms/text", {
                                                            id: $string("expiration"),
                                                            name: $string("expiration"),
                                                            label: $lang($string("account.payment_methods.expiration")),
                                                            placeholder: $string("MM/YY"),
                                                        }),
                                                    )}
                                                </div>
                                            </div>
                                            <div className="paymentMethodForm-column">
                                                <div className="paymentMethodForm-inputs">
                                                    {place(
                                                        $partial("components/common/forms/text", {
                                                            id: $string("name_on_card"),
                                                            name: $string("name_on_card"),
                                                            label: $lang($string("account.payment_methods.name_on_card")),
                                                        }),
                                                    )}
                                                </div>
                                                <div className="paymentMethodForm-inputs">
                                                    {place(
                                                        $partial("components/common/forms/text", {
                                                            id: $string("cvv"),
                                                            name: $string("cvv"),
                                                            label: $lang($string("account.payment_methods.cvv")),
                                                        }),
                                                    )}
                                                    <svg className="paymentMethodForm-inputs-icon icon">
                                                        <use href="#icon-lock" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="form-field">
                                                <input
                                                    type="checkbox"
                                                    name="default_instrument"
                                                    id="default_instrument"
                                                    data-label={$lang($string("forms.payment_methods.default_instrument"))}
                                                    className="form-checkbox"
                                                />
                                                <label className="form-label" htmlFor="default_instrument">
                                                    <$Lang keyName={$string("forms.payment_methods.default_instrument")} />
                                                </label>
                                            </div>
                                        </fieldset>
                                    </div>

                                    <h3 className="paymentMethodForm-heading">
                                        <$Lang keyName={$string("account.payment_methods.billing_address")} />
                                    </h3>

                                    <fieldset className="form-fieldset">
                                        <div className="form-row form-row--half">
                                            {place(
                                                $partial("components/common/forms/text", {
                                                    private_id: $string("FirstName"),
                                                    required: $boolean(true),
                                                    id: $string("first_name"),
                                                    name: $string("first_name"),
                                                    label: $lang($string("forms.payment_methods.first_name")),
                                                }),
                                            )}
                                            {place(
                                                $partial("components/common/forms/text", {
                                                    private_id: $string("LastName"),
                                                    required: $boolean(true),
                                                    id: $string("last_name"),
                                                    name: $string("last_name"),
                                                    label: $lang($string("forms.payment_methods.last_name")),
                                                }),
                                            )}
                                            {place(
                                                $partial("components/common/forms/text", {
                                                    private_id: $string("CompanyName"),
                                                    required: $boolean(false),
                                                    id: $string("company"),
                                                    name: $string("company"),
                                                    label: $lang($string("forms.payment_methods.company")),
                                                }),
                                            )}
                                            {place(
                                                $partial("components/common/forms/text", {
                                                    private_id: $string("Phone"),
                                                    required: $boolean(false),
                                                    id: $string("phone"),
                                                    name: $string("phone"),
                                                    label: $lang($string("forms.payment_methods.phone")),
                                                }),
                                            )}
                                            {place(
                                                $partial("components/common/forms/text", {
                                                    private_id: $string("AddressLine1"),
                                                    required: $boolean(true),
                                                    id: $string("address1"),
                                                    name: $string("address1"),
                                                    label: $lang($string("forms.payment_methods.address1")),
                                                }),
                                            )}
                                            {place(
                                                $partial("components/common/forms/text", {
                                                    private_id: $string("AddressLine2"),
                                                    required: $boolean(false),
                                                    id: $string("address2"),
                                                    name: $string("address2"),
                                                    label: $lang($string("forms.payment_methods.address2")),
                                                }),
                                            )}
                                            {place(
                                                $partial("components/common/forms/text", {
                                                    private_id: $string("City"),
                                                    required: $boolean(true),
                                                    id: $string("city"),
                                                    name: $string("city"),
                                                    label: $lang($string("forms.payment_methods.city")),
                                                }),
                                            )}
                                            {place(
                                                $partial("components/common/forms/select", {
                                                    private_id: $string("Country"),
                                                    required: $boolean(true),
                                                    id: $string("country"),
                                                    name: $string("country"),
                                                    label: $lang($string("forms.payment_methods.country")),
                                                    chooseprefix: $lang($string("forms.payment_methods.choose_country")),
                                                    options: $pointer("countries"),
                                                }),
                                            )}
                                            {place(
                                                $partial("components/common/forms/text", {
                                                    private_id: $string("State"),
                                                    required: $boolean(true),
                                                    id: $string("state"),
                                                    name: $string("state"),
                                                    label: $lang($string("forms.payment_methods.state")),
                                                }),
                                            )}
                                            {place(
                                                $partial("components/common/forms/text", {
                                                    private_id: $string("Zip"),
                                                    required: $boolean(true),
                                                    id: $string("postal_code"),
                                                    name: $string("postal_code"),
                                                    label: $lang($string("forms.payment_methods.postal_code")),
                                                }),
                                            )}
                                        </div>
                                    </fieldset>
                                    <div className="form-actions">
                                        <input type="submit" className="button button--primary" value={$lang($string("forms.payment_methods.submit_value"))} />
                                        <a href={$pointer("urls.account.payment_methods.all")} className="button">
                                            <$Lang keyName={$string("common.cancel")} />
                                        </a>
                                        <$Inject keyName={$string("required")} value={$lang($string("common.required"))} />{" "}
                                        <$Inject keyName={$string("state_error")} value={$lang($string("errors.state_error"))} />{" "}
                                        <$Inject keyName={$string("generic_error")} value={$lang($string("common.generic_error"))} />
                                    </div>
                                </form>
                            )}
                        />
                    </div>
                </>
            )}
        />
        {place($partial("layout/base"))}
    </>
);
