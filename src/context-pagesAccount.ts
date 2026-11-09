import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {
    ThemeContext,
    ThemePage,
    ThemePageAccountAddAddress,
    ThemePageAccountEdit,
    ThemePageAccountPaymentMethods,
    ThemePageAccountInbox,
    ThemePageAccountWishlists,
} from '@mainlanddev/bigcommerce-react/theme';
import type {ExtendedThemePageReturns} from '@/context-account';

type Str = HandlebarsInlineValueToken<string>;
type Num = HandlebarsInlineValueToken<number>;
type Null = HandlebarsInlineValueToken<null>;
type Bool = HandlebarsInlineValueToken<boolean>;

type Customer = ThemePageAccountWishlists['customer'];

/** `edit`: `forms.edit_account.error` / `.success` are not in the lib's `ThemeFormEditAccount`. */
type EditForms = ThemePageAccountEdit['forms'];
export type ExtendedThemePageAccountEdit = ThemePage<{
    forms: EditForms & {
        edit_account: NonNullable<EditForms['edit_account']> & {error: Str | Null; success: Str | Null};
    };
}>;

/**
 * `recent-items`: the lib types `customer.recently_viewed_products` as the product list or `{compare_url}`; the template reads
 * `.items` and `.show_compare` from the `{compare_url}` branch, so that branch is extended (it stays assignable to the lib's union).
 */
type RecentlyViewedItems = Extract<Customer['recently_viewed_products'], Array<unknown>>;
type RecentlyViewedObject = Exclude<Customer['recently_viewed_products'], Array<unknown>>;
export type ExtendedThemePageAccountRecentItems = ThemePage<{
    customer: Omit<Customer, 'recently_viewed_products'> & {
        recently_viewed_products: RecentlyViewedObject & {items: RecentlyViewedItems; show_compare: Bool};
    };
}>;

/** `inbox`: `forms.inbox.error` / `.success` are not in the lib's account inbox page type. */
type Forms = Exclude<ThemeContext['forms'], Array<never>>;
export type ExtendedThemePageInbox = ThemePage<{
    customer: ThemePageAccountInbox['customer'];
    forms: Forms & {inbox: {error: Str | Null; success: Str | Null}};
}>;

/** `add-address`: `forms.address.address_id` and `.error` are not in the lib's `ThemeForms.address` (`shipping_fields`, `action`). */
type AddressForm = NonNullable<ThemePageAccountAddAddress['forms']['address']>;
export type ExtendedThemePageAddAddress = ThemePage<{
    forms: Forms & {address: AddressForm & {address_id: Num | Null; error: Str | Null}};
}>;

/**
 * `edit-payment-method`: `customer.edit_stored_instrument` is an object in the template; the lib types it as a string.
 * Intersected with the lib's string token so the page stays assignable to `ThemeContext`.
 */
type EditInstrument = {
    token: Str;
    type: Str;
    last_4: Str;
    expiry_month: Num;
    expiry_year: Num;
    email: Str;
    is_default: Bool;
};
type PaymentForms = Forms & {
    action: Str;
    error: Str | Null;
    billing_fields: AddressForm['shipping_fields'];
};
export type ExtendedThemePageEditPaymentMethod = ThemePage<{
    customer: Omit<Customer, 'edit_stored_instrument'> & {edit_stored_instrument: Customer['edit_stored_instrument'] & EditInstrument};
    forms: PaymentForms;
}>;

/** `add-payment-method`: payment-provider keys the lib's `ThemePageAccountPaymentMethods`, `ThemeForms` do not declare. */
type PaymentMethodForms = Forms & {
    error: Str | Null;
    provider: Str;
    payment_method: {provider_name: Str};
};
export type ExtendedThemePageAddPaymentMethod = ThemePage<{
    customer: ThemePageAccountPaymentMethods['customer'];
    vault: ThemePageAccountPaymentMethods['vault'];
    /** Undocumented in the lib (`never`); the template passes it to the `select` partial as its options. */
    countries: Array<{value: Str; label: Str}>;
    account_payments: Str | Null;
    initialization_data: Str;
    forms: PaymentMethodForms;
}>;

/** `return-saved`: the top-level `return` key (`instructions`) is not in the lib's `ThemeContext`. */
export type ExtendedThemePageReturnSaved = ThemePage<{
    return: {instructions: Str | Null};
}>;

/** `returns`: `customer.returns` (the list the returns list reads) is not on the lib's customer. */
export type ExtendedThemePageAccountReturns = ThemePage<{
    customer: Customer & {returns: ExtendedThemePageReturns['returns'] | Null};
}>;
