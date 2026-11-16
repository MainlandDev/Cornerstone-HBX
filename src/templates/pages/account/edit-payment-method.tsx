import {$dynamicComponent, $Each, $If, $Inject, $lang, $Lang, $Page, $partial, $pointer, $string, $unescaped, $With, place} from "@mainlanddev/hbx-bigcommerce";

// LIBRARY GAP: types/context/customer.ts:21 types `customer.edit_stored_instrument` as `string`, but the original reads
// `token`, `type`, `last_4`, `expiry_month`, `expiry_year`, `email` and `is_default` from it (edit-payment-method.html: the
// hidden inputs, the `type` checks, the card and PayPal details, and the default checkbox). Typed here so the pointers need
// no cast; fix upstream in the library type.
interface StoredInstrument {
    readonly token: string;
    readonly type: string;
    readonly is_default: boolean;
}

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}

                    <h2 className="page-heading">
                        <$Lang keyName={$string("forms.payment_methods.edit.heading")} />
                    </h2>

                    {place($partial("components/account/navigation", {account_page: $string("payment_methods")}))}

                    <div className="account account--fixed">
                        <$If
                            test={$pointer("forms.error")}
                            $then={() => place($partial("components/common/alert/alert-error", $pointer("forms.error")))}
                        />

                        <$With
                            context={$pointer<StoredInstrument>("customer.edit_stored_instrument")}
                            $then={() => (
                                <form action={$pointer("forms.action")} data-address-form={""} className="form" method="post">
                                    <input type="hidden" name="token" value={$pointer("token")} />
                                    <input type="hidden" name="currency_code" value={$pointer("../currency_selector.active_currency_code")} />
                                    <input type="hidden" name="type" value={$pointer("type")} />

                                    <h3 className="paymentMethodForm-heading">
                                        <$Lang keyName={$string("account.payment_methods.payment_method")} />
                                    </h3>

                                    <div className="paymentMethodForm">
                                        <$If
                                            test={$pointer("type")}
                                            operator={$string("===")}
                                            rvalue={$string("stored_card")}
                                            $then={() => (
                                                <>
                                                    <dl className="paymentMethodForm-details">
                                                        <dt className="paymentMethodForm-details-term">
                                                            <$Lang keyName={$string("account.payment_methods.credit_card_number")} />
                                                        </dt>
                                                        <dd className="paymentMethodForm-details-description">**** **** **** {$pointer("last_4")}</dd>
                                                    </dl>
                                                    <dl className="paymentMethodForm-details">
                                                        <dt className="paymentMethodForm-details-term">
                                                            <$Lang keyName={$string("account.payment_methods.expiration")} />
                                                        </dt>
                                                        <dd className="paymentMethodForm-details-description">
                                                            {$pointer("expiry_month")}/{$pointer("expiry_year")}
                                                        </dd>
                                                    </dl>
                                                </>
                                            )}
                                        />
                                        <$If
                                            test={$pointer("type")}
                                            operator={$string("===")}
                                            rvalue={$string("stored_paypal_account")}
                                            $then={() => (
                                                <>
                                                    <div className="form-field">
                                                        <h3 className="paymentMethodForm-heading">
                                                            <$Lang keyName={$string("account.payment_methods.paypal")} />{" "}
                                                            <$Lang keyName={$string("common.account")} />
                                                        </h3>
                                                        <p>{$pointer("email")}</p>
                                                    </div>
                                                </>
                                            )}
                                        />
                                        <div className="form-field">
                                            {/* `checked` is a block in attribute position, so the attributes go in the carrier. */}
                                            <input
                                                type="checkbox"
                                                dangerouslyInlineAttributes={{
                                                    attributes: `value="default_instrument" name="is_default" id="default_instrument" data-label="${$lang($string("forms.payment_methods.default_instrument"))}" class="form-checkbox" ${$If({test: $pointer("is_default"), $then: () => "checked"})}`,
                                                }}
                                            />
                                            <label className="form-label" htmlFor="default_instrument">
                                                <$Lang keyName={$string("forms.payment_methods.default_instrument")} />
                                            </label>
                                        </div>
                                    </div>

                                    <$If
                                        test={$pointer("type")}
                                        operator={$string("===")}
                                        rvalue={$string("stored_card")}
                                        $then={() => (
                                            <>
                                                <h3 className="paymentMethodForm-heading">
                                                    <$Lang keyName={$string("account.payment_methods.billing_address")} />
                                                </h3>

                                                <fieldset className="form-fieldset">
                                                    <div className="form-row form-row--half">
                                                        <$Each
                                                            list={$pointer<unknown[]>("forms.billing_fields")}
                                                            $then={() => place($unescaped($dynamicComponent($string("components/common/forms"))))}
                                                        />
                                                    </div>
                                                </fieldset>
                                            </>
                                        )}
                                    />

                                    <div className="form-actions">
                                        <input type="submit" className="button button--primary" value={$lang($string("forms.payment_methods.submit_value"))} />
                                        <a href={$pointer("../urls.account.payment_methods.all")} className="button">
                                            <$Lang keyName={$string("common.cancel")} />
                                        </a>
                                        <$Inject keyName={$string("required")} value={$lang($string("common.required"))} />{" "}
                                        <$Inject keyName={$string("state_error")} value={$lang($string("errors.state_error"))} />
                                    </div>
                                </form>
                            )}
                        />
                    </div>
                </>
            ),
        }}
        layout="layout/base"
    />
);
