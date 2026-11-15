import {$cdn, $concat, $Each, $If, $InArray, $lang, $Lang, $partial, $pointer, $raw, $string, $Unless, place} from "@mainlanddev/hbx-bigcommerce";

interface Instrument {
    type: string;
    brand: string;
    last_4: string;
    masked_account_number: string;
    email: string;
    expiry_month: string;
    expiry_year: string;
    is_default: boolean;
    edit_url: string;
    delete_url: string;
    billing_address: {
        address1: string;
        address2: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
}

interface PaymentMethod {
    type: string;
    display_name: string;
    description: string;
    add_url: string;
    stored_instruments: Instrument[];
}

export default () => (
    <>
        <$Unless
            test={$pointer("customer.payment_methods")}
            $then={() => place($partial("components/common/alert/alert-info", $lang($string("account.payment_methods.no_methods"))))}
        />

        <$Each
            list={$pointer<PaymentMethod[]>("customer.payment_methods")}
            $then={(method) => (
                <$InArray
                    array={$pointer("../theme_settings.supported_payment_methods")}
                    value={method.type}
                    $then={() => (
                        <>
                            <h4 className="paymentMethodsTitle">{method.display_name}</h4>
                            <$If test={method.description} $then={() => <p>{method.description}</p>} />
                            <div className="paymentMethodsGrid">
                                <$Each
                                    list={method.stored_instruments}
                                    $then={(inst) => (
                                        <div className="paymentMethodsGrid-item">
                                            <div className="paymentMethod">
                                                <div className="paymentMethod-row">
                                                    <div className="methodHeader">
                                                        {$raw("{{#if type '===' 'stored_card'}}")}
                                                        <$If
                                                            test={inst.brand}
                                                            $then={() => (
                                                                <>
                                                                    <$InArray
                                                                        array={$pointer("../../theme_settings.supported_card_type_icons")}
                                                                        value={inst.brand}
                                                                        $then={() => (
                                                                            <img
                                                                                className="methodHeader-icon"
                                                                                src={$cdn($concat($concat($string("img/payment-methods/"), inst.brand), $string(".svg")))}
                                                                                alt={$lang($concat($string("account.payment_methods.card_types."), inst.brand))}
                                                                                title={$lang($concat($string("account.payment_methods.card_types."), inst.brand))}
                                                                            />
                                                                        )}
                                                                    />{" "}
                                                                    <span className="methodHeader-brand">
                                                                        <$Lang keyName={$concat($string("account.payment_methods.card_types."), inst.brand)} />{" "}
                                                                        <$Lang keyName={$string("account.payment_methods.card_ending_in")} last_four={inst.last_4} />
                                                                    </span>
                                                                </>
                                                            )}
                                                            $else={() => (
                                                                <>
                                                                    <img
                                                                        className="methodHeader-icon"
                                                                        src={$cdn($string("img/payment-methods/card.svg"))}
                                                                        alt={$lang($string("account.payment_methods.card_types.credit_card"))}
                                                                        title={$lang($string("account.payment_methods.card_types.credit_card"))}
                                                                    />{" "}
                                                                    <span className="methodHeader-brand">
                                                                        <$Lang keyName={$string("account.payment_methods.card_types.credit_card")} />{" "}
                                                                        <$Lang keyName={$string("account.payment_methods.card_ending_in")} last_four={inst.last_4} />
                                                                    </span>
                                                                </>
                                                            )}
                                                        />
                                                        {$raw("{{/if}}")}{" "}

                                                        {$raw("{{#if type '===' 'stored_bank_account'}}")}
                                                        {$raw("{{#if ../methodId '===' 'ach'}}")}
                                                        <img
                                                            className="methodHeader-icon"
                                                            src={$cdn($string("img/payment-methods/ach.svg"))}
                                                            alt={$lang($string("account.payment_methods.ach"))}
                                                            title={$lang($string("account.payment_methods.ach"))}
                                                        />{" "}
                                                        <span className="methodHeader-brand">
                                                            <$Lang keyName={$string("account.payment_methods.bank_account")} />{" "}
                                                            <$Lang keyName={$string("account.payment_methods.card_ending_in")} last_four={inst.masked_account_number} />
                                                        </span>
                                                        {$raw("{{else if ../methodId '===' 'ecp'}}")}
                                                        <img
                                                            className="methodHeader-icon"
                                                            src={$cdn($string("img/payment-methods/ach.svg"))}
                                                            alt={$lang($string("account.payment_methods.ach"))}
                                                            title={$lang($string("account.payment_methods.ach"))}
                                                        />{" "}
                                                        <span className="methodHeader-brand">
                                                            <$Lang keyName={$string("account.payment_methods.bank_account")} />{" "}
                                                            <$Lang keyName={$string("account.payment_methods.card_ending_in")} last_four={inst.masked_account_number} />
                                                        </span>
                                                        {$raw("{{else if ../methodId '===' 'sepa_direct_debit'}}")}
                                                        <img
                                                            className="methodHeader-icon"
                                                            src={$cdn($string("img/payment-methods/sepa.svg"))}
                                                            alt={$lang($string("account.payment_methods.sepa_direct_debit"))}
                                                            title={$lang($string("account.payment_methods.sepa_direct_debit"))}
                                                        />{" "}
                                                        <span className="methodHeader-brand">
                                                            <$Lang keyName={$string("account.payment_methods.bank_account")} />{" "}
                                                            {inst.masked_account_number}
                                                        </span>
                                                        {$raw("{{else}}")}
                                                        <img
                                                            className="methodHeader-icon"
                                                            src={$cdn($string("img/payment-methods/card.svg"))}
                                                            alt={$lang($string("account.payment_methods.card_types.credit_card"))}
                                                            title={$lang($string("account.payment_methods.card_types.credit_card"))}
                                                        />{" "}
                                                        <span className="methodHeader-brand">
                                                            <$Lang keyName={$string("account.payment_methods.payment_method")} />
                                                        </span>
                                                        {$raw("{{/if}}")}
                                                        {$raw("{{/if}}")}{" "}

                                                        {$raw("{{#if type '===' 'stored_paypal_account'}}")}
                                                        <img
                                                            className="methodHeader-icon"
                                                            src={$cdn($string("img/payment-methods/paypal.svg"))}
                                                            alt={$lang($string("account.payment_methods.paypal"))}
                                                            title={$lang($string("account.payment_methods.paypal"))}
                                                        />{" "}
                                                        <span className="methodHeader-brand">{inst.email}</span>
                                                        {$raw("{{/if}}")}
                                                        <div className="methodHeader-meta">
                                                            <$If
                                                                test={inst.expiry_year}
                                                                $then={() => (
                                                                    <span className="methodHeader-expiry">
                                                                        <$Lang
                                                                            keyName={$string("account.payment_methods.card_expiry")}
                                                                            month={inst.expiry_month}
                                                                            year={inst.expiry_year}
                                                                        />
                                                                    </span>
                                                                )}
                                                            />{" "}
                                                            <$If
                                                                test={inst.is_default}
                                                                $then={() => (
                                                                    <svg className="methodHeader-default">
                                                                        <use href="#icon-star" />
                                                                    </svg>
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <$If
                                                    test={inst.billing_address}
                                                    $then={() => (
                                                        <div className="paymentMethod-row">
                                                            <p className="methodDetails">
                                                                <span className="methodDetails-label">
                                                                    <$Lang keyName={$string("account.payment_methods.billing_address")} />:
                                                                </span>{" "}
                                                                <span className="methodDetails-description">
                                                                    <span>{inst.billing_address.address1}, </span>
                                                                    <$If
                                                                        test={inst.billing_address.address2}
                                                                        $then={() => <span>{inst.billing_address.address2}, </span>}
                                                                    />
                                                                    <span>
                                                                        {inst.billing_address.city}, {inst.billing_address.state} {inst.billing_address.zip}{" "}
                                                                        {inst.billing_address.country}
                                                                    </span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    )}
                                                />
                                                <div className="paymentMethod-row">
                                                    <form
                                                        action={inst.delete_url}
                                                        method="post"
                                                        data-delete-payment-method={$lang($string("forms.payment_methods.confirm_delete"))}
                                                    >
                                                        <$If
                                                            test={inst.edit_url}
                                                            $then={() => (
                                                                <a className="button button--primary button--small methodActions-button" href={inst.edit_url}>
                                                                    <$Lang keyName={$string("common.edit")} />
                                                                </a>
                                                            )}
                                                        />{" "}
                                                        <$If
                                                            test={inst.delete_url}
                                                            $then={() => (
                                                                <button type="submit" className="button button--small methodActions-button">
                                                                    <$Lang keyName={$string("common.delete")} />
                                                                </button>
                                                            )}
                                                        />
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                />
                                <$If
                                    test={method.add_url}
                                    $then={() => (
                                        <div className="paymentMethodsGrid-item">
                                            <div className="paymentMethod">
                                                <div className="paymentMethod-row">
                                                    <a className="newPaymentMethod" href={method.add_url}>
                                                        <div className="newPaymentMethod-icon">{$raw("&plus;")}</div>
                                                        <h5 className="newPaymentMethod-title">
                                                            <$Lang keyName={$string("account.payment_methods.new_payment_method")} />
                                                        </h5>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                        </>
                    )}
                />
            )}
        />
    </>
);
