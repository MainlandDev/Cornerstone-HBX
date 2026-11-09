import {$Each, $If, $Partial, $string, $Unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageAccountPaymentMethods} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $InArray} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$cdn, $concat, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {ExtendedPaymentMethod} from '@/context-account';

type Hint = ThemeContextHint<ThemePageAccountPaymentMethods>;

export default $asPartial<{
    customer: { payment_methods: Array<ExtendedPaymentMethod> };
    theme_settings: Hint['theme_settings'];
}>(({customer, theme_settings}) => (
    <>
        <$Unless
            query={[customer.payment_methods]}
            $then={() => <$Partial name="components/common/alert/alert-info" context={$lang($string('account.payment_methods.no_methods'))}/>}
        />

        <$Each
            list={customer.payment_methods}
            $then={(method) => (
                /* Check that the current instrument type is within our whitelist to stop future ones automagically coming through */
                <$InArray
                    array={theme_settings.supported_payment_methods}
                    value={method.type}
                    $then={() => (
                        <>
                            <h4 className="paymentMethodsTitle">{method.display_name}</h4>
                            <$If query={[method.description]} $then={() => <p>{method.description}</p>}/>
                            <div className="paymentMethodsGrid">
                                <$Each
                                    list={method.stored_instruments}
                                    $then={(instrument) => (
                                        <div className="paymentMethodsGrid-item">
                                            <div className="paymentMethod">
                                                <div className="paymentMethod-row">
                                                    <div className="methodHeader">
                                                        {/* If credit card STARTS */}
                                                        <$If
                                                            query={[instrument.type, '===', $string('stored_card')]}
                                                            $then={() => (
                                                                <>
                                                                    <$If
                                                                        query={[instrument.brand]}
                                                                        $then={() => (
                                                                            <>
                                                                                <$InArray
                                                                                    array={theme_settings.supported_card_type_icons}
                                                                                    value={instrument.brand}
                                                                                    $then={() => (
                                                                                        <img
                                                                                            className="methodHeader-icon"
                                                                                            src={$cdn(
                                                                                                $concat(
                                                                                                    $concat($string('img/payment-methods/'), instrument.brand),
                                                                                                    $string('.svg'),
                                                                                                ),
                                                                                            )}
                                                                                            alt={$lang(
                                                                                                $concat($string('account.payment_methods.card_types.'), instrument.brand),
                                                                                            )}
                                                                                            title={$lang(
                                                                                                $concat($string('account.payment_methods.card_types.'), instrument.brand),
                                                                                            )}
                                                                                        />
                                                                                    )}
                                                                                />
                                                                                <span className="methodHeader-brand">
                                                                                    {$lang($concat($string('account.payment_methods.card_types.'), instrument.brand))}{' '}
                                                                                    <$Lang
                                                                                        translationKey={$string('account.payment_methods.card_ending_in')}
                                                                                        params={{last_four: instrument.last_4}}
                                                                                    />
                                                                                </span>
                                                                            </>
                                                                        )}
                                                                        $else={() => (
                                                                            <>
                                                                                <img
                                                                                    className="methodHeader-icon"
                                                                                    src={$cdn($string('img/payment-methods/card.svg'))}
                                                                                    alt={$lang($string('account.payment_methods.card_types.credit_card'))}
                                                                                    title={$lang($string('account.payment_methods.card_types.credit_card'))}
                                                                                />
                                                                                <span className="methodHeader-brand">
                                                                                    <$Lang translationKey={$string('account.payment_methods.card_types.credit_card')}/>{' '}
                                                                                    <$Lang
                                                                                        translationKey={$string('account.payment_methods.card_ending_in')}
                                                                                        params={{last_four: instrument.last_4}}
                                                                                    />
                                                                                </span>
                                                                            </>
                                                                        )}
                                                                    />
                                                                    <$If
                                                                        query={[instrument.wallet]}
                                                                        $then={() => (
                                                                            <img
                                                                                className="methodHeader-walletIcon"
                                                                                src={$cdn(
                                                                                    $concat($concat($string('img/payment-methods/'), instrument.wallet), $string('.svg')),
                                                                                )}
                                                                                alt={$lang(
                                                                                    $concat($string('account.payment_methods.wallet_types.'), instrument.wallet),
                                                                                )}
                                                                                title={$lang($string('account.payment_methods.card_vaulted_via_wallet'), {
                                                                                    wallet: $lang($concat($string('account.payment_methods.wallet_types.'), instrument.wallet)),
                                                                                })}
                                                                            />
                                                                        )}
                                                                    />
                                                                </>
                                                            )}
                                                        />
                                                        {/* If credit card ENDS */}

                                                        {/* If bank_account STARTS */}
                                                        <$If
                                                            query={[instrument.type, '===', $string('stored_bank_account')]}
                                                            $then={() => (
                                                                <$If
                                                                    query={[method.methodId, '===', $string('ach')]}
                                                                    $then={() => (
                                                                        <>
                                                                            <img
                                                                                className="methodHeader-icon"
                                                                                src={$cdn($string('img/payment-methods/ach.svg'))}
                                                                                alt={$lang($string('account.payment_methods.ach'))}
                                                                                title={$lang($string('account.payment_methods.ach'))}
                                                                            />
                                                                            <span className="methodHeader-brand">
                                                                                <$Lang translationKey={$string('account.payment_methods.bank_account')}/>{' '}
                                                                                <$Lang
                                                                                    translationKey={$string('account.payment_methods.card_ending_in')}
                                                                                    params={{last_four: instrument.masked_account_number}}
                                                                                />
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                    $elseThen={[
                                                                        {
                                                                            query: [method.methodId, '===', $string('ecp')],
                                                                            $then: () => (
                                                                                <>
                                                                                    <img
                                                                                        className="methodHeader-icon"
                                                                                        src={$cdn($string('img/payment-methods/ach.svg'))}
                                                                                        alt={$lang($string('account.payment_methods.ach'))}
                                                                                        title={$lang($string('account.payment_methods.ach'))}
                                                                                    />
                                                                                    <span className="methodHeader-brand">
                                                                                        <$Lang translationKey={$string('account.payment_methods.bank_account')}/>{' '}
                                                                                        <$Lang
                                                                                            translationKey={$string('account.payment_methods.card_ending_in')}
                                                                                            params={{last_four: instrument.masked_account_number}}
                                                                                        />
                                                                                    </span>
                                                                                </>
                                                                            ),
                                                                        },
                                                                        {
                                                                            query: [method.methodId, '===', $string('sepa_direct_debit')],
                                                                            $then: () => (
                                                                                <>
                                                                                    <img
                                                                                        className="methodHeader-icon"
                                                                                        src={$cdn($string('img/payment-methods/sepa.svg'))}
                                                                                        alt={$lang($string('account.payment_methods.sepa_direct_debit'))}
                                                                                        title={$lang($string('account.payment_methods.sepa_direct_debit'))}
                                                                                    />
                                                                                    <span className="methodHeader-brand">
                                                                                        <$Lang translationKey={$string('account.payment_methods.bank_account')}/>{' '}
                                                                                        {instrument.masked_account_number}
                                                                                    </span>
                                                                                </>
                                                                            ),
                                                                        },
                                                                    ]}
                                                                    $else={() => (
                                                                        <>
                                                                            <img
                                                                                className="methodHeader-icon"
                                                                                src={$cdn($string('img/payment-methods/card.svg'))}
                                                                                alt={$lang($string('account.payment_methods.card_types.credit_card'))}
                                                                                title={$lang($string('account.payment_methods.card_types.credit_card'))}
                                                                            />
                                                                            <span className="methodHeader-brand">
                                                                                <$Lang translationKey={$string('account.payment_methods.payment_method')}/>
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                />
                                                            )}
                                                        />
                                                        {/* If bank_account ENDS */}

                                                        {/* If paypal STARTS */}
                                                        <$If
                                                            query={[instrument.type, '===', $string('stored_paypal_account')]}
                                                            $then={() => (
                                                                <>
                                                                    <img
                                                                        className="methodHeader-icon"
                                                                        src={$cdn($string('img/payment-methods/paypal.svg'))}
                                                                        alt={$lang($string('account.payment_methods.paypal'))}
                                                                        title={$lang($string('account.payment_methods.paypal'))}
                                                                    />
                                                                    <span className="methodHeader-brand">{instrument.email}</span>
                                                                </>
                                                            )}
                                                        />
                                                        {/* If paypal ENDS */}

                                                        <div className="methodHeader-meta">
                                                            <$If
                                                                query={[instrument.expiry_year]}
                                                                $then={() => (
                                                                    <span className="methodHeader-expiry">
                                                                        <$Lang
                                                                            translationKey={$string('account.payment_methods.card_expiry')}
                                                                            params={{month: instrument.expiry_month, year: instrument.expiry_year}}
                                                                        />
                                                                    </span>
                                                                )}
                                                            />
                                                            <$If
                                                                query={[instrument.is_default]}
                                                                $then={() => (
                                                                    <svg className="methodHeader-default">
                                                                        <use href="#icon-star"/>
                                                                    </svg>
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            <$If
                                                query={[instrument.billing_address]}
                                                $then={() => (
                                                    <div className="paymentMethod-row">
                                                        {/* If there is an address STARTS */}
                                                        <p className="methodDetails">
                                                            <span className="methodDetails-label">
                                                                <$Lang translationKey={$string('account.payment_methods.billing_address')}/>:
                                                            </span>
                                                            <span className="methodDetails-description">
                                                                <span>{instrument.billing_address.address1}, </span>
                                                                <$If
                                                                    query={[instrument.billing_address.address2]}
                                                                    $then={() => <span>{instrument.billing_address.address2}, </span>}
                                                                />
                                                                <span>
                                                                    {instrument.billing_address.city}, {instrument.billing_address.state}{' '}
                                                                    {instrument.billing_address.zip} {instrument.billing_address.country}
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* If there is an address ENDS */}
                                                    </div>
                                                )}
                                            />
                                            <div className="paymentMethod-row">
                                                <form
                                                    action={instrument.delete_url}
                                                    method="post"
                                                    data-delete-payment-method={$lang($string('forms.payment_methods.confirm_delete'))}
                                                >
                                                    <$If
                                                        query={[instrument.edit_url]}
                                                        $then={() => (
                                                            <a
                                                                className="button button--primary button--small methodActions-button"
                                                                href={instrument.edit_url}
                                                            >
                                                                <$Lang translationKey={$string('common.edit')}/>
                                                            </a>
                                                        )}
                                                    />
                                                    <$If
                                                        query={[instrument.delete_url]}
                                                        $then={() => (
                                                            <button type="submit" className="button button--small methodActions-button">
                                                                <$Lang translationKey={$string('common.delete')}/>
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
                                    query={[method.add_url]}
                                    $then={() => (
                                        <div className="paymentMethodsGrid-item">
                                            <div className="paymentMethod">
                                                <div className="paymentMethod-row">
                                                    <a className="newPaymentMethod" href={method.add_url}>
                                                        <div className="newPaymentMethod-icon">&plus;</div>
                                                        <h5 className="newPaymentMethod-title">
                                                            <$Lang translationKey={$string('account.payment_methods.new_payment_method')}/>
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
));
