import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {ThemePage} from '@mainlanddev/bigcommerce-react/theme';

type Str = HandlebarsInlineValueToken<string>;
type Num = HandlebarsInlineValueToken<number>;
type Bool = HandlebarsInlineValueToken<boolean>;
type Null = HandlebarsInlineValueToken<null>;

/** Account pages: `account_page` names the active navigation item. Missing from the library's `ThemeContext`. */
export type ExtendedThemePageAccount = ThemePage<{
    account_page: Str;
}>;

/** `add-wishlist`: the `forms.wishlist` fields the library's `ThemeForms.wishlist` lacks (`id`, `name`, `is_public`, `errors`). */
export type ExtendedThemePageAddWishlist = ThemePage<{
    forms: {
        wishlist: {
            id: Num;
            name: Str;
            is_public: Bool;
            product_id: Num | Null;
            action: Str;
            errors: Str;
        };
    };
}>;

/** `account_inbox` messages list, a top-level key on the page (`messages`) the library does not declare. */
export type ExtendedThemePageMessages = ThemePage<{
    messages: Array<{
        date: Str;
        subject: Str;
        unread: Bool;
        is_reply: Bool;
        message: Str;
    }>;
}>;

/** Image object as `components/common/responsive-img` reads it. */
export type ExtendedImage = {
    data: Str;
    alt: Str;
};

/** `account_orders` order detail (`order`): the item fields the library's `ThemeOrder` items lack. */
export type ExtendedOrderItem = {
    show_reorder: Bool;
    order_product_id: Num;
    type: Str;
    image: ExtendedImage | Null;
    refunded: Bool;
    refunded_qty: Num;
    download_url: Str;
    price: {formatted: Str};
    quantity: Num;
    name: Str;
    brand: {name: Str};
    quantity_ready_to_ship: Num;
    quantity_backordered: Num;
    backorder_message: Str;
    options: Array<{
        name: Str;
        linked_bundled_item: {
            quantity_ready_to_ship: Num;
            quantity_backordered: Num;
            backorder_message: Str;
        };
    }>;
    gift_wrapping_name: Str;
    event_date: {name: Str; date: Str};
    reorder_message: Str;
    shipping_rows: Array<{
        is_shipping: Bool;
        address: Str;
        city: Str;
        state: Str;
        zip: Str;
        country: Str;
    }>;
};

/** `account_orders_details` context used by `components/account/order-contents`. */
export type ExtendedThemePageOrderDetails = ThemePage<{
    order: {
        items: Array<ExtendedOrderItem>;
    };
}>;

/** `account_paymentmethods`: stored instruments grouped by payment method (`customer.payment_methods`). */
export type ExtendedPaymentMethod = {
    type: Str;
    methodId: Str;
    display_name: Str;
    description: Str;
    add_url: Str;
    stored_instruments: Array<{
        type: Str;
        brand: Str;
        last_4: Str;
        masked_account_number: Str;
        wallet: Str;
        email: Str;
        expiry_month: Num;
        expiry_year: Num;
        is_default: Bool;
        edit_url: Str;
        delete_url: Str;
        billing_address: {
            address1: Str;
            address2: Str;
            city: Str;
            state: Str;
            zip: Str;
            country: Str;
        };
    }>;
};

/** `account_returns`: the `returns` list, a top-level key the library does not declare. */
export type ExtendedThemePageReturns = ThemePage<{
    returns: Array<{
        id: Num;
        status: Str;
        quantity: Num;
        date_requested: Str;
        action: Str;
        reason: Str;
        comments: Str;
        product: {
            name: Str;
            url: Str;
            image: ExtendedImage;
            options: Array<{name: Str}>;
        };
    }>;
}>;

/**
 * A `forms.*.fields` entry as the `components/common/forms/*` partials read it. These partials are reached through
 * `dynamicComponent` with the field as the context, so every key they reference is declared here (one shape for all types).
 */
export type ExtendedFormField = {
    id: Str;
    private_id: Str;
    label: Str;
    name: Str;
    required: Bool;
    validation: Str;
    value: Str;
    class: Str;
    maxlength: Num;
    placeholder: Str;
    chooseprefix: Str;
    rows: Num;
    limitfrom: Num;
    limitto: Num;
    options: Array<{value: Str; label: Str; selected: Bool}>;
    /** Item keys are read inside `{{#each}}`, so they are the item's own (`id`, `private_id`, `required` are not the field's). */
    checkboxes: Array<{name: Str; value: Str; label: Str; class: Str; checked: Bool; id: Str; private_id: Str}>;
    radios: Array<{value: Str; label: Str; checked: Bool; required: Bool; id: Str; private_id: Str}>;
    month: {name: Str; value: Str; items: Array<{value: Str; label: Str}>};
    day: {name: Str; value: Str; items: Array<{value: Str; label: Str}>};
    year: {name: Str; value: Str; items: Array<{value: Str; label: Str}>};
};
