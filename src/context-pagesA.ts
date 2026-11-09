import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {
    ThemePage,
    ThemePageBrand,
    ThemePageCategory,
    ThemePageCompare,
    ThemePageContactForm,
    ThemePageHome,
    ThemePageHtmlPage,
    ThemePageProduct,
} from '@mainlanddev/bigcommerce-react/theme';

type Str = HandlebarsInlineValueToken<string>;
type Bool = HandlebarsInlineValueToken<boolean>;

/**
 * `pages/brand` reads `pagination.brand`, which `ThemePageBrand` leaves on the generic `ThemePagination` (optional keys, so the
 * union cannot be narrowed). The list shape is the one `ThemePageCategory` gives `pagination.category`. Logged in pagesA.md.
 */
export type ExtendedThemePageBrand = ThemePage<{
    brand: ThemePageBrand['brand'];
    pagination: {brand: ThemePageCategory['pagination']['category']};
}>;

/** `pages/contact-us` reads `forms.contact.success`, which `ThemeFormContact` does not declare. Logged in pagesA.md. */
export type ExtendedThemePageContactForm = ThemePage<{
    page: ThemePageContactForm['page'];
    forms: Omit<ThemePageContactForm['forms'], 'contact'> & {
        contact: ThemePageContactForm['forms']['contact'] & {success: Bool};
    };
}>;

type CompareProduct = ThemePageCompare['comparisons'][number];

/** `pages/compare` reads per-product keys that `ThemeProductCard` does not declare (`remove_url`, `add_to_cart_url`, ...). Logged in pagesA.md. */
export type ExtendedThemePageCompare = ThemePage<{
    comparisons: Array<
        CompareProduct & {
            remove_url: Str;
            add_to_cart_url: Str;
            out_of_stock_message: Str;
            price_range: CompareProduct['price']['price_range'];
            brand: {name: Str; url: Str};
            /** `custom_fields` is `null` or a list; the list branch is what the `$Each` over it reads. */
            custom_fields: Extract<CompareProduct['custom_fields'], Array<unknown>>;
        }
    >;
}>;

/** `pages/checkout` reads `checkout.*` (Optimized Checkout app markup); `ThemePageCheckout` is the bare `ThemeContext`. Logged in pagesA.md. */
export type ExtendedThemePageCheckout = ThemePage<{
    checkout: {checkout_head: Str; checkout_content: Str; header_image: Str};
}>;

/** `pages/page` renders `page.feed` (RSS items) which `ThemeHtmlPage` does not declare. Logged in pagesA.md. */
export type ExtendedThemePageHtmlPage = ThemePage<{
    page: ThemePageHtmlPage['page'] & {
        feed: Array<{url: Str; title: Str; content: Str}>;
    };
}>;

type Num = HandlebarsInlineValueToken<number>;

/** `pages/product` reads `product.videos.list`, which `ThemeProduct` does not declare. Logged in pagesA.md. */
export type ExtendedThemePageProduct = ThemePage<{
    product: Omit<ThemePageProduct['product'], 'shipping_messages'> & {
        /** The lib types the list as strings; the template reads `message` from each item (assignable to the lib type, so $page's constraint holds). */
        shipping_messages: Array<Str & {message: Str}>;
        videos: {list: Array<{id: Num; title_long: Str; description_short: Str}>};
    };
    product_details_partial: ThemePageProduct['product_details_partial'];
    backorder_messages: ThemePageProduct['backorder_messages'];
    wallet_buttons: ThemePageProduct['wallet_buttons'];
}>;

/** `pages/home`: same `shipping_messages` item shape as the product page (lib types it as a list of strings). */
export type ExtendedThemePageHome = Omit<ThemePageHome, 'shipping_messages'> & {
    shipping_messages: Array<Str & {message: Str}>;
};
