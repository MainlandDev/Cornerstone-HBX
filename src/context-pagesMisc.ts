import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {ThemeContext, ThemePage, ThemePageAuthCreateAccount} from '@mainlanddev/bigcommerce-react/theme';

type Str = HandlebarsInlineValueToken<string>;
type Num = HandlebarsInlineValueToken<number>;
type Bool = HandlebarsInlineValueToken<boolean>;

/**
 * The object branch of the library's `forms` (`ThemeEmptyList | ThemeForms`). Keys cannot be read on the empty-list branch,
 * so pages that add form keys intersect with this instead of with the union.
 */
type FormsObject = Extract<ThemeContext['forms'], {search?: unknown}>;

/** 403 and 404 pages: `components/common/search-box` reads `forms.search.query`, which the library's `ThemeContext['forms']` lacks. */
export type SearchErrorPageContext = ThemePage<{forms: FormsObject & {search: {query: Str}}}>;

/** Account-created page: `create_account.continue_url` is always rendered (optional in the library); `customer` is null for guests in the library type. */
export type AccountCreatedPageContext = ThemePage<{
    create_account: {continue_url: Str};
    customer: Extract<ThemeContext['customer'], {email: unknown}>;
}>;

/** Create-account page: `forms.create_account.error` is missing from the library's `ThemeFormCreateAccount`. */
export type CreateAccountPageContext = ThemePage<{
    forms: ThemePageAuthCreateAccount['forms'] & {create_account: {error: Str}};
}>;

/** New-password page: `forms.new_password` is not declared by the library's `ThemeForms`. */
export type NewPasswordPageContext = ThemePage<{
    forms: FormsObject & {new_password: {requirements: Str; error: Str; submit_url: Str}};
}>;

/** Maintenance page: `settings.maintenance` is `ThemeEmptyList | ThemeMaintenance` in the library; the template reads `message`. */
export type MaintenancePageContext = ThemePage<{
    settings: Omit<ThemeContext['settings'], 'maintenance'> & {
        maintenance: Extract<ThemeContext['settings']['maintenance'], {message: unknown}>;
    };
}>;

/** Gift-certificate balance page: the top-level `gift_certificate` result is not declared by the library's `ThemeContext`. */
export type GiftCertificateBalancePageContext = ThemePage<{
    gift_certificate: {error: Str; code: Str; balance: {formatted: Str}};
}>;

type GiftCertificateAmount = {value: Num; formatted: Str};

/** Gift-certificate purchase page: `forms.gift_certificate` is not declared by the library's `ThemeForms`. */
export type GiftCertificatePurchasePageContext = ThemePage<{
    forms: FormsObject & {
        gift_certificate: {
            errors: Array<Str>;
            action: Str;
            cart_item_id: Num;
            values: {
                from_name: Str;
                from_email: Str;
                to_name: Str;
                to_email: Str;
                message: Str;
                theme: Str;
                amount: {value: Num};
            };
            can_use_custom_amount: Bool;
            minimum: {value: Num; formatted: Str};
            maximum: {value: Num; formatted: Str};
            amount_options: Array<GiftCertificateAmount>;
            expires_in_days: Num;
            editing: Bool;
            themes: Array<{value: Str; display: Str}>;
            preview: Str;
        };
    };
}>;
