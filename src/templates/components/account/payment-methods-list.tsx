/**
 * Source: templates/components/account/payment-methods-list.html (121 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $string, $Unless} from '@mainlanddev/bigcommerce-react';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
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
        {/* html L1: {{#unless customer.payment_methods}} */}
        <$Unless
            query={[customer.payment_methods]}
            $then={() => /* html L2: {{> components/common/alert/alert-info (lang 'account.payment_methods.no_methods')}} */ <$Partial name="components/common/alert/alert-info" context={$lang($string('account.payment_methods.no_methods'))}/>}
        />

        {/* html L5: {{#each customer.payment_methods}} */}
        <$Each
            list={customer.payment_methods}
            $then={(method) => (
                /* Check that the current instrument type is within our whitelist to stop future ones automagically coming through */
                /* html L6: {{!-- Check that the current instrument type is within our whitelist to stop future ones automagically coming through --}}
                                      html L7: {{#inArray ../theme_settings.supported_payment_methods type}}
                */
                <$InArray
                    array={theme_settings.supported_payment_methods}
                    value={method.type}
                    $then={() => (
                        <>
                            {/* html L8: <h4 class="paymentMethodsTitle"> */}
                            <h4 className="paymentMethodsTitle">{/* html L9: {{display_name}} */}{method.display_name}</h4>
                            {/* html L11: {{#if description}} */}
                            <$If query={[method.description]} $then={() => /* html L12: <p>{{description}}</p> */ <p>{/* html L12: {{description}} */}{method.description}</p>}/>
                            {/* html L14: <div class="paymentMethodsGrid"> */}
                            <div className="paymentMethodsGrid">
                                {/* html L15: {{#each stored_instruments}} */}
                                <$Each
                                    list={method.stored_instruments}
                                    $then={(instrument) => (
                                        /* html L16: <div class="paymentMethodsGrid-item"> */
                                        <div className="paymentMethodsGrid-item">
                                            {/* html L17: <div class="paymentMethod"> */}
                                            <div className="paymentMethod">
                                                {/* html L18: <div class="paymentMethod-row"> */}
                                                <div className="paymentMethod-row">
                                                    {/* html L19: <div class="methodHeader"> */}
                                                    <div className="methodHeader">
                                                        {/* If credit card STARTS */}
                                                        {/* html L20: {{#if type '===' 'stored_card'}} */}
                                                        <$If
                                                            query={[instrument.type, '===', $string('stored_card')]}
                                                            $then={() => (
                                                                <>
                                                                    {/* html L21: {{!-- If credit card STARTS --}}
                                                                                                                                              html L22: {{#if brand}}
                                                                    */}
                                                                    <$If
                                                                        query={[instrument.brand]}
                                                                        $then={() => (
                                                                            <>
                                                                                {/* html L23: {{#inArray ../../theme_settings.supported_card_type_icons brand }} */}
                                                                                <$InArray
                                                                                    array={theme_settings.supported_card_type_icons}
                                                                                    value={instrument.brand}
                                                                                    $then={() => (
                                                                                        /* html L24: <img class="methodHeader-icon" src="{{cdn (concat (concat 'img/payment-methods/' brand) '.svg')}}" alt="{{lang (concat 'account.payment_methods.card_types.' brand)}}" title="{{lang (concat 'account.payment_methods.card_types.' brand)}}"> */
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
                                                                                {/* html L26: <span class="methodHeader-brand">{{lang (concat 'account.payment_methods.card_types.' brand)}} {{lang 'account.payment_methods.card_ending_in' last_four=last_4}}</span> */}
                                                                                <span className="methodHeader-brand">
                                                                                    {/* html L26: {{lang (concat 'account.payment_methods.card_types.' brand)}} */}
                                                                                    {$lang($concat($string('account.payment_methods.card_types.'), instrument.brand))}{' '}
                                                                                    {/* html L26: {{lang 'account.payment_methods.card_ending_in' last_four=last_4}} */}
                                                                                    <$Lang
                                                                                        translationKey={$string('account.payment_methods.card_ending_in')}
                                                                                        params={{last_four: instrument.last_4}}
                                                                                    />
                                                                                </span>
                                                                            </>
                                                                        )}
                                                                        $else={() => (
                                                                            <>
                                                                                {/* html L27: {{else}}
                                                                                                                                                                      html L28: <img class="methodHeader-icon" src="{{cdn 'img/payment-methods/card.svg'}}" alt="{{lang 'account.payment_methods.card_types.credit_card'}}" title="{{lang 'account.payment_methods.card_types.credit_card'}}">
                                                                                */}
                                                                                <img
                                                                                    className="methodHeader-icon"
                                                                                    src={$cdn($string('img/payment-methods/card.svg'))}
                                                                                    alt={$lang($string('account.payment_methods.card_types.credit_card'))}
                                                                                    title={$lang($string('account.payment_methods.card_types.credit_card'))}
                                                                                />
                                                                                {/* html L29: <span class="methodHeader-brand">{{lang 'account.payment_methods.card_types.credit_card'}} {{lang 'account.payment_methods.card_ending_in' last_four=last_4}}</span> */}
                                                                                <span className="methodHeader-brand">
                                                                                    {/* html L29: {{lang 'account.payment_methods.card_types.credit_card'}} */}
                                                                                    <$Lang translationKey={$string('account.payment_methods.card_types.credit_card')}/>{' '}
                                                                                    {/* html L29: {{lang 'account.payment_methods.card_ending_in' last_four=last_4}} */}
                                                                                    <$Lang
                                                                                        translationKey={$string('account.payment_methods.card_ending_in')}
                                                                                        params={{last_four: instrument.last_4}}
                                                                                    />
                                                                                </span>
                                                                            </>
                                                                        )}
                                                                    />
                                                                    {/* html L31: {{#if wallet}} */}
                                                                    <$If
                                                                        query={[instrument.wallet]}
                                                                        $then={() => (
                                                                            /* html L32: <img class="methodHeader-walletIcon" src="{{cdn (concat (concat 'img/payment-methods/' wallet) '.svg')}}" alt="{{lang (concat 'account.payment_methods.wallet_types.' wallet)}}" title="{{lang 'account.payment_methods.card_vaulted_via_wallet' wallet=(lang (concat 'account.payment_methods.wallet_types.' wallet))}}"> */
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
                                                        {/* html L37: {{#if type '===' 'stored_bank_account'}} */}
                                                        <$If
                                                            query={[instrument.type, '===', $string('stored_bank_account')]}
                                                            $then={() => (
                                                                /* html L38: {{!-- If bank_account STARTS --}}
                                                                                                                                      html L39: {{#if ../methodId '===' 'ach'}}
                                                                */
                                                                <$If
                                                                    query={[method.methodId, '===', $string('ach')]}
                                                                    $then={() => (
                                                                        <>
                                                                            {/* html L40: <img class="methodHeader-icon" src="{{cdn 'img/payment-methods/ach.svg'}}" alt="{{lang 'account.payment_methods.ach'}}" title="{{lang 'account.payment_methods.ach'}}"> */}
                                                                            <img
                                                                                className="methodHeader-icon"
                                                                                src={$cdn($string('img/payment-methods/ach.svg'))}
                                                                                alt={$lang($string('account.payment_methods.ach'))}
                                                                                title={$lang($string('account.payment_methods.ach'))}
                                                                            />
                                                                            {/* html L41: <span class="methodHeader-brand">{{lang 'account.payment_methods.bank_account'}} {{lang 'account.payment_methods.card_ending_in' last_four=masked_account_number}}</span> */}
                                                                            <span className="methodHeader-brand">
                                                                                {/* html L41: {{lang 'account.payment_methods.bank_account'}} */}
                                                                                <$Lang translationKey={$string('account.payment_methods.bank_account')}/>{' '}
                                                                                {/* html L41: {{lang 'account.payment_methods.card_ending_in' last_four=masked_account_number}} */}
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
                                                                                    {/* html L42: {{else if ../methodId '===' 'ecp'}}
                                                                                                                                                                              html L43: <img class="methodHeader-icon" src="{{cdn 'img/payment-methods/ach.svg'}}" alt="{{lang 'account.payment_methods.ach'}}" title="{{lang 'account.payment_methods.ach'}}">
                                                                                    */}
                                                                                    <img
                                                                                        className="methodHeader-icon"
                                                                                        src={$cdn($string('img/payment-methods/ach.svg'))}
                                                                                        alt={$lang($string('account.payment_methods.ach'))}
                                                                                        title={$lang($string('account.payment_methods.ach'))}
                                                                                    />
                                                                                    {/* html L44: <span class="methodHeader-brand">{{lang 'account.payment_methods.bank_account'}} {{lang 'account.payment_methods.card_ending_in' last_four=masked_account_number}}</span> */}
                                                                                    <span className="methodHeader-brand">
                                                                                        {/* html L44: {{lang 'account.payment_methods.bank_account'}} */}
                                                                                        <$Lang translationKey={$string('account.payment_methods.bank_account')}/>{' '}
                                                                                        {/* html L44: {{lang 'account.payment_methods.card_ending_in' last_four=masked_account_number}} */}
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
                                                                                    {/* html L45: {{else if ../methodId '===' 'sepa_direct_debit'}}
                                                                                                                                                                              html L46: <img class="methodHeader-icon" src="{{cdn 'img/payment-methods/sepa.svg'}}" alt="{{lang 'account.payment_methods.sepa_direct_debit'}}" title="{{lang 'account.payment_methods.sepa_direct_debit'}}">
                                                                                    */}
                                                                                    <img
                                                                                        className="methodHeader-icon"
                                                                                        src={$cdn($string('img/payment-methods/sepa.svg'))}
                                                                                        alt={$lang($string('account.payment_methods.sepa_direct_debit'))}
                                                                                        title={$lang($string('account.payment_methods.sepa_direct_debit'))}
                                                                                    />
                                                                                    {/* html L47: <span class="methodHeader-brand">{{lang 'account.payment_methods.bank_account'}} {{masked_account_number}}</span> */}
                                                                                    <span className="methodHeader-brand">
                                                                                        {/* html L47: {{lang 'account.payment_methods.bank_account'}} */}
                                                                                        <$Lang translationKey={$string('account.payment_methods.bank_account')}/>{' '}
                                                                                        {/* html L47: {{masked_account_number}} */}
                                                                                        {instrument.masked_account_number}
                                                                                    </span>
                                                                                </>
                                                                            ),
                                                                        },
                                                                    ]}
                                                                    $else={() => (
                                                                        <>
                                                                            {/* html L48: {{else}}
                                                                                                                                                              html L49: <img class="methodHeader-icon" src="{{cdn 'img/payment-methods/card.svg'}}" alt="{{lang 'account.payment_methods.card_types.credit_card'}}" title="{{lang 'account.payment_methods.card_types.credit_card'}}">
                                                                            */}
                                                                            <img
                                                                                className="methodHeader-icon"
                                                                                src={$cdn($string('img/payment-methods/card.svg'))}
                                                                                alt={$lang($string('account.payment_methods.card_types.credit_card'))}
                                                                                title={$lang($string('account.payment_methods.card_types.credit_card'))}
                                                                            />
                                                                            {/* html L50: <span class="methodHeader-brand">{{lang 'account.payment_methods.payment_method'}}</span> */}
                                                                            <span className="methodHeader-brand">
                                                                                {/* html L50: {{lang 'account.payment_methods.payment_method'}} */}
                                                                                <$Lang translationKey={$string('account.payment_methods.payment_method')}/>
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                />
                                                            )}
                                                        />
                                                        {/* If bank_account ENDS */}

                                                        {/* If paypal STARTS */}
                                                        {/* html L55: {{#if type '===' 'stored_paypal_account'}} */}
                                                        <$If
                                                            query={[instrument.type, '===', $string('stored_paypal_account')]}
                                                            $then={() => (
                                                                <>
                                                                    {/* html L56: {{!-- If paypal STARTS --}}
                                                                                                                                              html L57: <img class="methodHeader-icon" src="{{cdn 'img/payment-methods/paypal.svg'}}" alt="{{lang 'account.payment_methods.paypal'}}" title="{{lang 'account.payment_methods.paypal'}}">
                                                                    */}
                                                                    <img
                                                                        className="methodHeader-icon"
                                                                        src={$cdn($string('img/payment-methods/paypal.svg'))}
                                                                        alt={$lang($string('account.payment_methods.paypal'))}
                                                                        title={$lang($string('account.payment_methods.paypal'))}
                                                                    />
                                                                    {/* html L58: <span class="methodHeader-brand"> */}
                                                                    <span className="methodHeader-brand">{/* html L59: {{email}} */}{instrument.email}</span>
                                                                </>
                                                            )}
                                                        />
                                                        {/* If paypal ENDS */}

                                                        {/* html L63: <div class="methodHeader-meta"> */}
                                                        <div className="methodHeader-meta">
                                                            {/* html L64: {{#if expiry_year}} */}
                                                            <$If
                                                                query={[instrument.expiry_year]}
                                                                $then={() => (
                                                                    /* html L65: <span class="methodHeader-expiry">{{lang 'account.payment_methods.card_expiry' month=expiry_month year=expiry_year}}</span> */
                                                                    <span className="methodHeader-expiry">
                                                                        {/* html L65: {{lang 'account.payment_methods.card_expiry' month=expiry_month year=expiry_year}} */}
                                                                        <$Lang
                                                                            translationKey={$string('account.payment_methods.card_expiry')}
                                                                            params={{month: instrument.expiry_month, year: instrument.expiry_year}}
                                                                        />
                                                                    </span>
                                                                )}
                                                            />
                                                            {/* html L67: {{#if is_default}} */}
                                                            <$If
                                                                query={[instrument.is_default]}
                                                                $then={() => (
                                                                    /* html L68: <svg class="methodHeader-default"> */
                                                                    <svg className="methodHeader-default">
                                                                        {/* html L69: <use href="#icon-star" /> */}
                                                                        <use href="#icon-star"/>
                                                                    </svg>
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            {/* html L75: {{#if billing_address}} */}
                                            <$If
                                                query={[instrument.billing_address]}
                                                $then={() => (
                                                    /* html L76: <div class="paymentMethod-row"> */
                                                    <div className="paymentMethod-row">
                                                        {/* If there is an address STARTS */}
                                                        {/* html L77: {{!-- If there is an address STARTS --}}
                                                                                                                      html L78: <p class="methodDetails">
                                                        */}
                                                        <p className="methodDetails">
                                                            {/* html L79: <span class="methodDetails-label">{{lang 'account.payment_methods.billing_address'}}:</span> */}
                                                            <span className="methodDetails-label">
                                                                {/* html L79: {{lang 'account.payment_methods.billing_address'}} */}
                                                                <$Lang translationKey={$string('account.payment_methods.billing_address')}/>:
                                                            </span>
                                                            {/* html L80: <span class="methodDetails-description"> */}
                                                            <span className="methodDetails-description">
                                                                {/* html L81: <span>{{billing_address.address1}}, </span> */}
                                                                <span>{/* html L81: {{billing_address.address1}} */}{instrument.billing_address.address1}, </span>
                                                                {/* html L82: {{#if billing_address.address2}} */}
                                                                <$If
                                                                    query={[instrument.billing_address.address2]}
                                                                    $then={() => /* html L83: <span>{{billing_address.address2}}, </span> */ <span>{/* html L83: {{billing_address.address2}} */}{instrument.billing_address.address2}, </span>}
                                                                />
                                                                {/* html L85: <span>{{billing_address.city}}, {{billing_address.state}} {{billing_address.zip}} {{billing_address.country}}</span> */}
                                                                <span>
                                                                    {/* html L85: {{billing_address.city}} */}
                                                                    {instrument.billing_address.city}, {/* html L85: {{billing_address.state}} */}{instrument.billing_address.state}{' '}
                                                                    {/* html L85: {{billing_address.zip}} */}
                                                                    {instrument.billing_address.zip} {/* html L85: {{billing_address.country}} */}{instrument.billing_address.country}
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* If there is an address ENDS */}
                                                    </div>
                                                )}
                                            />
                                            {/* html L92: <div class="paymentMethod-row"> */}
                                            <div className="paymentMethod-row">
                                                {/* html L93: <form action="{{delete_url}}" method="post" data-delete-payment-method="{{lang 'forms.payment_methods.confirm_delete'}}"> */}
                                                <form
                                                    action={instrument.delete_url}
                                                    method="post"
                                                    data-delete-payment-method={$lang($string('forms.payment_methods.confirm_delete'))}
                                                >
                                                    {/* html L94: {{#if edit_url}} */}
                                                    <$If
                                                        query={[instrument.edit_url]}
                                                        $then={() => (
                                                            /* html L95: <a class="button button--primary button--small methodActions-button" href="{{edit_url}}">{{lang 'common.edit' }}</a> */
                                                            <a
                                                                className="button button--primary button--small methodActions-button"
                                                                href={instrument.edit_url}
                                                            >
                                                                {/* html L95: {{lang 'common.edit' }} */}
                                                                <$Lang translationKey={$string('common.edit')}/>
                                                            </a>
                                                        )}
                                                    />
                                                    {/* html L97: {{#if delete_url}} */}
                                                    <$If
                                                        query={[instrument.delete_url]}
                                                        $then={() => (
                                                            /* html L98: <button type="submit" class="button button--small methodActions-button">{{lang 'common.delete' }}</button> */
                                                            <button type="submit" className="button button--small methodActions-button">
                                                                {/* html L98: {{lang 'common.delete' }} */}
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
                                {/* html L105: {{#if add_url}} */}
                                <$If
                                    query={[method.add_url]}
                                    $then={() => (
                                        /* html L106: <div class="paymentMethodsGrid-item"> */
                                        <div className="paymentMethodsGrid-item">
                                            {/* html L107: <div class="paymentMethod"> */}
                                            <div className="paymentMethod">
                                                {/* html L108: <div class="paymentMethod-row"> */}
                                                <div className="paymentMethod-row">
                                                    {/* html L109: <a class="newPaymentMethod" href="{{add_url}}"> */}
                                                    <a className="newPaymentMethod" href={method.add_url}>
                                                        {/* html L110: <div class="newPaymentMethod-icon">&plus;</div> */}
                                                        <div className="newPaymentMethod-icon">{$$raw('&plus;')}</div>
                                                        {/* html L111: <h5 class="newPaymentMethod-title">{{lang 'account.payment_methods.new_payment_method' }}</h5> */}
                                                        <h5 className="newPaymentMethod-title">
                                                            {/* html L111: {{lang 'account.payment_methods.new_payment_method' }} */}
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
