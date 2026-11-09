import {$boolean, $Each, $If, $Partial, $string, $this, $unescaped, $unless, $With} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang, $Or} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {CartHint} from '@/context-cart';

export default $asPartial<{
    cart: CartHint['cart'];
    customer: CartHint['customer'];
    settings: CartHint['settings'];
    theme_settings: CartHint['theme_settings'];
    urls: CartHint['urls'];
}>(({cart, customer, settings, theme_settings, urls}) => (
    <>
        <div className="modal-header">
            <h1 id="modal-header-title" className="modal-header-title">
                <$Lang translationKey={$string('cart.added_to_cart.what_next')} params={{num_products: cart.quantity}}/>
            </h1>
        </div>

        <div className="modal-body">
            <div className="previewCart">
                <section className="previewCartCheckout">
                    <$If
                        query={[cart.show_primary_checkout_button]}
                        $then={() => (
                            <a href={urls.checkout.single_address} className="button button--primary" data-primary-checkout-now-action="">
                                <$Lang translationKey={$string('cart.added_to_cart.proceed_to_checkout')}/>
                            </a>
                        )}
                    />

                    <div className="previewCartCheckout-additionalCheckoutButtons">
                        <$Each list={cart.additional_checkout_buttons} $then={() => $unescaped($this())}/>
                    </div>

                    <$If
                        query={[cart.show_multiple_address_shipping]}
                        $then={() => (
                            <div className="previewCartAction-checkoutMultiple">
                                <a href={urls.checkout.multiple_address}>
                                    <$Lang translationKey={$string('cart.preview.checkout_multiple')}/>
                                </a>
                            </div>
                        )}
                    />

                    <div className="previewCartCheckout-subtotal">
                        <$Lang translationKey={$string('cart.added_to_cart.order_subtotal')}/>

                        <strong className="previewCartCheckout-price">
                            <$Or
                                values={[customer, $unless(settings.hide_price_from_guests)]}
                                $then={() => <>{cart.sub_total.formatted}</>}
                                $else={() => <$Partial name="components/common/login-for-pricing"/>}
                            />
                        </strong>
                    </div>

                    <p data-cart-quantity={cart.quantity}>
                        <$Lang translationKey={$string('cart.added_to_cart.your_cart_contains')} params={{num_products: cart.quantity}}/>
                    </p>

                    <a href="#" className="button button--primary" role="button" data-reveal-close="">
                        <$Lang translationKey={$string('cart.added_to_cart.continue_shopping')}/>
                    </a>

                    <a href={urls.cart} className="button">
                        <$Lang translationKey={$string('cart.added_to_cart.view_or_edit_cart')}/>
                    </a>
                </section>
                <section className="productView">
                    <$With
                        context={cart.added_item}
                        $then={(item) => (
                            <>
                                <figure className="productView-image">
                                    <div className="productView-img-container">
                                        <$Partial
                                            name="components/common/responsive-img"
                                            hash={{
                                                image: item.image,
                                                class: $string('productView-image--cart'),
                                                fallback_size: theme_settings.product_size,
                                                lazyload: theme_settings.lazyload_mode,
                                                default_image: theme_settings.default_image_product,
                                            }}
                                        />
                                    </div>
                                </figure>

                                <div className="productView-details">
                                    <h2 className="productView-title">{item.name}</h2>

                                    <div className="productView-brand">{item.brand.name}</div>

                                    <div className="productView-price">
                                        <$Or
                                            values={[customer, $unless(settings.hide_price_from_guests)]}
                                            $then={() => (
                                                <>
                                                    {item.quantity} {$$raw('&times;')} {item.price.formatted}
                                                </>
                                            )}
                                            $else={() => <$Partial name="components/common/login-for-pricing"/>}
                                        />
                                    </div>

                                    <$Each
                                        list={item.options}
                                        $then={(option) => (
                                            <dl className="productView-info">
                                                <dt className="productView-info-name">{option.name}</dt>
                                                <dd className="productView-info-value">
                                                    <$Partial name="components/common/product-options"/>
                                                </dd>
                                            </dl>
                                        )}
                                    />
                                </div>
                            </>
                        )}
                    />
                </section>
            </div>

            <$If
                query={[cart.suggested_products]}
                $then={() => (
                    <section className="suggestiveCart">
                        <h2>
                            <$Lang translationKey={$string('cart.added_to_cart.you_might_also_like')}/>
                            {$$raw('&hellip;')}
                        </h2>

                        <ul className="productGrid">
                            <$Each
                                list={cart.suggested_products}
                                $then={() => (
                                    <li className="product">
                                        <$Partial
                                            name="components/products/card"
                                            hash={{
                                                settings: settings,
                                                hide_product_quick_view: $boolean(true),
                                                theme_settings: theme_settings,
                                            }}
                                        />
                                    </li>
                                )}
                            />
                        </ul>
                    </section>
                )}
            />
        </div>
    </>
));
