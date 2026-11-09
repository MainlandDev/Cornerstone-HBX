import {$Each, $If, $Partial, $number, $string, $unescaped, $unless, $if, $this} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang, $Or} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$cdn, $limit} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {CartHint} from '@/context-common';
import LoginForPricing from '@/templates/components/common/login-for-pricing';

/** Requested at runtime by the JS (`template:` / `render_with`), so every key it reads is a prop. */
export default $asPartial<{
    cart: CartHint['cart'];
    theme_settings: CartHint['theme_settings'];
    customer: CartHint['customer'];
    settings: CartHint['settings'];
    urls: CartHint['urls'];
}>(({cart, theme_settings, customer, settings, urls}) => (
    <div className="previewCartWrapper">
        <div className="previewCart">
            <$If
                query={[cart.items.length]}
                $then={() => (
                    <>
                        <ul className="previewCartList">
                            <$Each
                                list={$limit(cart.items, $number(4))}
                                $then={(item) => (
                                    <li className="previewCartItem">
                                        <div className="previewCartItem-image">
                                            <$If
                                                query={[item.type, '==', $string('GiftCertificate')]}
                                                $then={() => (
                                                    <img
                                                        alt="GiftCertificate"
                                                        title="GiftCertificate"
                                                        src={$cdn(theme_settings.default_image_gift_certificate)}
                                                    />
                                                )}
                                                $else={() => (
                                                    <$Partial
                                                        name="components/common/responsive-img"
                                                        hash={{
                                                            image: item.image,
                                                            fallback_size: theme_settings.productthumb_size,
                                                            lazyload: theme_settings.lazyload_mode,
                                                            default_image: theme_settings.default_image_product,
                                                        }}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="previewCartItem-content">
                                            <span className="previewCartItem-brand">{item.brand.name}</span>

                                            <h6 className="previewCartItem-name">
                                                <a href={item.url} $$={[$$raw('alt="'), item.name, $$raw('"')]} title={item.name}>
                                                    {item.name}
                                                </a>
                                            </h6>

                                            <span className="previewCartItem-price">
                                                <$If
                                                    query={[item.quantity, '>', $number(1)]}
                                                    $then={() => (
                                                        <>
                                                            {item.quantity} {$$raw('&times;')}
                                                        </>
                                                    )}
                                                />
                                                <$Or
                                                    values={[
                                                        customer,
                                                        $unless(settings.hide_price_from_guests),
                                                        $if(item.type, '==', $string('GiftCertificate')),
                                                    ]}
                                                    $then={() => (
                                                        <>
                                                            <span $$={$if(item.price_discounted).then(() => $$raw('class="price--discounted"'))}>
                                                                {item.price.formatted}
                                                            </span>
                                                            <$If
                                                                query={[item.price_discounted]}
                                                                $then={() => <>{item.price_discounted.formatted}</>}
                                                            />
                                                        </>
                                                    )}
                                                    $else={() => <LoginForPricing/>}
                                                />
                                            </span>
                                        </div>
                                    </li>
                                )}
                            />
                        </ul>
                        {$unescaped(cart.preview_payment_widget)}
                        <div className="previewCartAction">
                            <$If
                                query={[cart.show_primary_checkout_button]}
                                $then={() => (
                                    <div className="previewCartAction-checkout">
                                        <a
                                            href={urls.checkout.single_address}
                                            className="button button--small button--primary"
                                            data-primary-checkout-now-action=""
                                        >
                                            <$Lang translationKey={$string('cart.preview.checkout_now')}/>
                                        </a>
                                    </div>
                                )}
                            />

                            <div
                                className={`previewCartAction-viewCart${$unless(cart.show_primary_checkout_button).then(() => $$raw(' previewCartAction-viewCart--sole'))}`}
                            >
                                <a href={urls.cart} className="button button--small button--action">
                                    <$Lang translationKey={$string('cart.preview.view_cart')}/>
                                </a>
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
                        </div>
                        <$If
                            query={[cart.additional_checkout_buttons]}
                            $then={() => (
                                <div className="previewCart-additionalCheckoutButtons">
                                    <$Each
                                        list={cart.additional_checkout_buttons}
                                        $then={() => $unescaped($this())}
                                    />
                                </div>
                            )}
                        />
                    </>
                )}
                $else={() => (
                    <div role="alert" aria-live="polite" aria-atomic="false" className="previewCart-emptyBody">
                        <$Lang translationKey={$string('cart.checkout.empty_cart')}/>
                    </div>
                )}
            />
        </div>
    </div>
));
