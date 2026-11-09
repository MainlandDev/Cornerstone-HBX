import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {ThemeContext, ThemePage, ThemePageCart} from '@mainlanddev/bigcommerce-react/theme';

/**
 * Global Stencil context keys used by the templates that the library's `ThemeContext` does not declare.
 * Each addition is a library gap logged in DEVIATIONS.md.
 */
export type ExtendedThemeContext = ThemeContext & {
    locale_name: HandlebarsInlineValueToken<string>;
    head: ThemeContext['head'] & {config: HandlebarsInlineValueToken<string>};
    template: HandlebarsInlineValueToken<string>;
};

type Str = HandlebarsInlineValueToken<string>;
type Num = HandlebarsInlineValueToken<number>;
type StockPosition = { quantity_on_hand: Num; quantity_backordered: Num; backorder_message: Str };

type CartItem = ThemePageCart['cart']['items'][number];
type CartItemOption = CartItem['options'][number];

/**
 * Cart page context with the line-item fields the library's `ThemeCartItem` lacks:
 * `edit_url`, `event_date`, `stock_position` (and `stock_position` on `linked_bundled_item`). Logged in DEVIATIONS.md.
 */
export type ExtendedThemePageCart = ThemePage<{
    cart: Omit<ThemePageCart['cart'], 'items'> & {
        items: Array<
            Omit<CartItem, 'options'> & {
                edit_url: Str;
                event_date: { name: Str; date: Str };
                stock_position: StockPosition;
                options: Array<
                    Omit<CartItemOption, 'linked_bundled_item'> & {
                        linked_bundled_item: CartItemOption['linked_bundled_item'] & { stock_position: StockPosition };
                    }
                >;
            }
        >;
    };
}>;

/** `pages/subscribed` (page_type `newsletter_subscribe`): the lib has no `ThemePage*` for it; adds `subscription`. */
export type ExtendedThemePageSubscribed = ThemePage<{
    subscription: { error: HandlebarsInlineValueToken<string> | HandlebarsInlineValueToken<null> };
}>;
