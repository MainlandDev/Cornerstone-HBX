import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {ThemeContextHint, ThemePage, ThemePageCompare, ThemePageProduct} from '@mainlanddev/bigcommerce-react/theme';

type Str = HandlebarsInlineValueToken<string>;
type Bool = HandlebarsInlineValueToken<boolean>;

/** Product page context (`pages/product`). */
export type ProductPageHint = ThemeContextHint<ThemePageProduct>;
export type ProductHint = ProductPageHint['product'];
export type ProductPriceHint = ProductHint['price'];
export type ThemeSettingsHint = ProductPageHint['theme_settings'];
export type SettingsHint = ProductPageHint['settings'];
export type CustomerHint = ProductPageHint['customer'];
type Num = HandlebarsInlineValueToken<number>;

/**
 * A product option as a dynamic option component reads it. The library's `ThemeProductOption` lacks the fields below, which the option
 * templates read from the same object (`{{#if required}}`, `{{ display_name }}`, `{{#for earliest_year latest_year}}`, …). Logged in DEVIATIONS.
 */
type ProductOptionToken = ThemePageProduct['product']['options'][number] & {
    integer_only?: Bool;
    noValue?: Str;
    value?: Str;
    checked?: Bool;
    class?: Str;
    label?: Str;
    style?: Str;
    prefill?: Str;
    original_name?: Str;
    file_url?: Str;
    file_remove?: Str;
    defaultValue?: Str;
    selected_date?: {year: Num; month: Num; day: Num};
    earliest_year?: Num;
    latest_year?: Num;
};
export type ProductOptionHint = ThemeContextHint<{option: ProductOptionToken}>['option'];

/** A product review as the review list reads it. Not in the library's `ThemePageProduct` (its `reviews` only has `total`). */
export type ProductReviewToken = {
    title: Str;
    text: Str;
    name?: Str;
    rating: Num;
    date: Str;
};

/**
 * Product detail fields read by the product sub-partials that the library's `ThemePageProduct` lacks: the review list and the
 * "customers also viewed" list. Logged in DEVIATIONS (products batch).
 */
type ProductDetailToken = Omit<ThemePageProduct['product'], 'reviews' | 'similar_by_views' | 'attributes' | 'custom_fields' | 'available_to_sell' | 'pre_order'> & {
    reviews: ThemePageProduct['product']['reviews'] & {
        list: Array<ProductReviewToken>;
        messages?: Array<{error?: Str; success?: Str}>;
        /** Review-form fields (`writeReview`): not in the library's `reviews` type. */
        selected_rating?: Num;
        author?: Str;
        email?: Str;
        show_review_email?: Bool;
        title?: Str;
        text?: Str;
        throttleToken?: Str;
        recaptcha?: {markup: Str};
    };
    similar_by_views?: Array<ProductCard>;
    /** The library types these as empty lists; the attribute and custom-field partials read name/value pairs. */
    attributes: Array<{display_name: Str; value: Str}>;
    custom_fields: Array<{name: Str; value: Str}>;
    /** Stock flags read by the add-to-cart partial: not in the library's product type. */
    available_to_sell: Bool;
    pre_order: Bool;
};
export type ProductDetailHint = ThemeContextHint<{product: ProductDetailToken}>['product'];

/** A featured promotion as the callout reads it (`category` is a plain string here: the library types it as a literal union). */
export type FeaturedPromotion = {id: HandlebarsInlineValueToken<number>; text: Str; priority: HandlebarsInlineValueToken<number>; category: Str};

/**
 * Product-card fields the library's `ThemeProductCard` lacks: `featured_promotions`, `add_to_cart_url`, `pre_order_add_to_cart_url`,
 * `out_of_stock_message`, `hide_product_quick_view`, and the sale prices on `price`. Logged in DEVIATIONS (products batch).
 */
export type ProductCard =Omit<ThemePageCompare['comparisons'][number], 'price'> & {
    featured_promotions?: Array<FeaturedPromotion>;
    add_to_cart_url?: Str;
    pre_order_add_to_cart_url?: Str;
    out_of_stock_message?: Str;
    hide_product_quick_view?: Bool;
    /** `price` also carries the sale prices the card reads (`sale_price_with_tax`, `sale_price_without_tax`): not in `ThemePrice`. */
    price: ThemePageCompare['comparisons'][number]['price'] & {
        sale_price_with_tax?: {value: HandlebarsInlineValueToken<number>};
        sale_price_without_tax?: {value: HandlebarsInlineValueToken<number>};
    };
};

type ExtendedProductCardPage = ThemePage<{comparisons: Array<ProductCard>}>;

/** A product card (`components/products/card`, `list-item`): the item of `products` / `related_products` lists. */
export type ProductCardHint = ThemeContextHint<ExtendedProductCardPage>['comparisons'][number];
