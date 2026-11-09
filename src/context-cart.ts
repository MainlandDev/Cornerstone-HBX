import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {ThemeContextHint, ThemePage, ThemePageProduct} from '@mainlanddev/bigcommerce-react/theme';
import type {ExtendedThemePageCart} from '@/context';

/**
 * Cart-partial keys the library's `ThemeCart` does not declare, or declares with a shape the cart partials do not read
 * (`coupons`, `gift_certificates`, `fees`, `discount`, `shipping_handling`, `added_item`, `suggested_products`).
 * Each addition is a library gap logged in docs/superpowers/deviations/cart.md.
 */
type Str = HandlebarsInlineValueToken<string>;
type Num = HandlebarsInlineValueToken<number>;
type Bool = HandlebarsInlineValueToken<boolean>;

type BaseCart = ExtendedThemePageCart['cart'];
export type CartMoney = BaseCart['grand_total'];
export type CartItem = BaseCart['items'][number];

type Coupon = {
    id: Num;
    code: Str;
    display_name?: Str;
    discount: CartMoney;
    has_max_limit_reached?: Bool;
    remove_url: Str;
};

type GiftCertificate = BaseCart['gift_certificates'][number] & {
    code: Str;
    remaining: CartMoney;
    used: CartMoney;
    remove_url: Str;
};

/**
 * Absent when the cart holds no physical products; the estimator reads it as one object, so the null member is dropped.
 * `states` entries carry `selected` (read by the estimator's state `<option>` loop), which the library's state shape lacks.
 */
export type ShippingHandling = Omit<Exclude<NonNullable<BaseCart['shipping_handling']>, HandlebarsInlineValueToken<null>>, 'states'> & {
    shipping_cost?: CartMoney;
    shipping_cost_discounted?: CartMoney;
    states: Array<{id: Str; name: Str; selected: Bool}>;
};

export type CartPageCart = Omit<
    BaseCart,
    'coupons' | 'gift_certificates' | 'fees' | 'discount' | 'shipping_handling' | 'suggested_products'
> & {
    coupons: Array<Coupon>;
    gift_certificates: Array<GiftCertificate>;
    fees: Array<{display_name: Str; cost: CartMoney}>;
    discount?: {formatted: Str; value: Num};
    shipping_handling?: ShippingHandling;
    /** `preview` only: the line item just added. */
    added_item?: CartItem;
    /** `preview` only: product cards are rendered by `components/products/card`, whose own shape is not in the library types. */
    suggested_products?: Array<Record<string, never>>;
};

export type CartPage = ThemePage<{cart: CartPageCart}>;
export type CartHint = ThemeContextHint<CartPage>;


/** `item-giftwrap`: the line item's gift wrapping, passed by `components/cart/content` (`context={$this()}`). */
export type GiftWrapping = {
    name: Str;
    price: CartMoney;
    message?: Str;
    remove_url: Str;
};

/** `gift-wrapping-form`: one choice in `gift_wrappings`. `preview_image` is a stencil image (`getImage` needs its size). */
export type GiftWrappingOption = {
    id: Num;
    name: Str;
    price: CartMoney;
    allow_message: Bool;
    selected: Bool;
    preview_image?: {data: Str; alt: Str; width: Num; height: Num};
};

/** `shipping-quotes`: one quote from the estimator response. */
export type ShippingQuote = {
    id: Str;
    type: Str;
    provider_name: Str;
    description: Str;
    logo_path?: Str;
    cost: CartMoney;
    cost_after_discount?: CartMoney;
};

/** `configure-product`: the product's options (the modal renders each through `$_dynamicComponent`). */
export type ProductOptions = ThemeContextHint<ThemePageProduct>['product']['options'];
