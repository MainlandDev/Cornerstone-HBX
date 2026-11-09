import {$If, $Partial, $Unless, $if, $string, $unless} from '@mainlanddev/bigcommerce-react';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Inject, $Or} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {Icon} from '@/components/icon';
import type {CustomerHint, ProductDetailHint, SettingsHint, ThemeSettingsHint} from '@/context-products';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';

type Bool = HandlebarsInlineValueToken<boolean>;

export default $asPartial<{
    product: ProductDetailHint;
    customer: CustomerHint;
    settings: SettingsHint;
    theme_settings: ThemeSettingsHint;
    /** Hash argument: `with_wallet_buttons=true` from `product-view`. */
    with_wallet_buttons: Bool;
}>(({product, customer, settings, with_wallet_buttons}) => (
    <div id="add-to-cart-wrapper" className="add-to-cart-wrapper" $$={$unless(product.can_purchase).then(() => $$raw('style="display: none"'))}>
        <$If
            query={[product.show_quantity_input]}
            $then={() => (
                <>
                    <$Inject keyName={$string('productQuantityErrorMessage')} value={$lang($string('products.quantity_error_message'))}/>
                    <div className="form-field form-field--increments">
                        <label className="form-label form-label--alternate" htmlFor="qty[]">
                            {$lang($string('products.quantity'))}
                        </label>
                        <div className="form-increment" data-quantity-change="">
                            <button className="button button--icon" data-action="dec">
                                <span className="is-srOnly">{$lang($string('products.quantity_decrease'), {name: product.title})}</span>
                                <i className="icon" aria-hidden="true">
                                    <svg>
                                        <use href="#icon-keyboard-arrow-down"/>
                                    </svg>
                                </i>
                            </button>
                            <input
                                className="form-input form-input--incrementTotal"
                                id="qty[]"
                                name="qty[]"
                                type="tel"
                                value={`${$if(product.min_purchase_quantity).then(() => product.min_purchase_quantity).else(() => $$raw('1'))}`}
                                data-quantity-min={product.min_purchase_quantity}
                                data-quantity-max={product.max_purchase_quantity}
                                min="1"
                                pattern="[0-9]*"
                                aria-live="polite"
                            />
                            <button className="button button--icon" data-action="inc">
                                <span className="is-srOnly">{$lang($string('products.quantity_increase'), {name: product.title})}</span>
                                <i className="icon" aria-hidden="true">
                                    <svg>
                                        <use href="#icon-keyboard-arrow-up"/>
                                    </svg>
                                </i>
                            </button>
                        </div>
                    </div>
                </>
            )}
        />

        <$If
            query={[product.out_of_stock]}
            $then={() => (
                <$Unless
                    query={[product.available_to_sell]}
                    $then={() => (
                        <$If
                            query={[product.out_of_stock_message]}
                            $then={() => <$Partial name="components/common/alert/alert-error" context={product.out_of_stock_message}/>}
                            $else={() => <$Partial name="components/common/alert/alert-error" context={$lang($string('products.sold_out'))}/>}
                        />
                    )}
                />
            )}
        />

        <div className="alertBox alertBox--error productAttributes-message" style={{display: 'none'}}>
            <div className="alertBox-column alertBox-icon">
                <Icon glyph="ic-error" className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                    </svg>
                </Icon>
            </div>
            <p className="alertBox-column alertBox-message"></p>
        </div>
        <$Or
            values={[customer, $unless(settings.hide_price_from_guests)]}
            $then={() => (
                <div className={`add-to-cart-buttons ${$if(product.pre_order).then(() => $$raw('pre-order-buttons'))}`}>
                    <div className="form-action">
                        <input
                            id="form-action-addToCart"
                            data-wait-message={$lang($string('products.adding_to_cart'))}
                            className="button button--primary"
                            type="submit"
                            value={`${$if(product.pre_order).then(() => $lang($string('products.pre_order'))).else(() => $lang($string('products.add_to_cart')))}`}
                        />
                        <span className="product-status-message aria-description--hidden">
                            {$lang($string('products.adding_to_cart'))} {$lang($string('category.add_cart_announcement'))}
                        </span>
                    </div>
                    <$If
                        query={[with_wallet_buttons]}
                        $then={() => (
                            <div className="add-to-cart-wallet-buttons" data-add-to-cart-wallet-buttons="">
                                <$Partial name="components/common/wallet-buttons"/>
                            </div>
                        )}
                    />
                </div>
            )}
        />
    </div>
));
