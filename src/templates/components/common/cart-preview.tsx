"use server";
import ResponsiveImg from "./responsive-img.tsx";
import LoginForPricing from "./login-for-pricing.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {
    $cdn,
    $Each,
    $If,
    $Lang,
    $limit,
    $number,
    $pointer,
    $raw,
    $string,
    $unescaped,
    $Unless,
} from "@mainlanddev/hbx-bigcommerce";

interface CartItem {
    type: string;
    image: unknown;
    brand: {name: string};
    url: string;
    name: string;
    quantity: number;
    price: {formatted: string};
    price_discounted: {formatted: string};
}

export default (_props: PartialProps) => (
    <div className="previewCartWrapper">
        <div className="previewCart">
            <$If
                test={$pointer("cart.items.length")}
                $then={() => (
                    <>
                        <ul className="previewCartList">
                            <$Each
                                list={$limit($pointer<CartItem[]>("cart.items"), $number(4))}
                                $then={(item) => (
                                    <li className="previewCartItem">
                                        <div className="previewCartItem-image">
                                            <$If
                                                test={$pointer("type")}
                                                operator={$string("==")}
                                                rvalue={$string("GiftCertificate")}
                                                $then={() => (
                                                    <img
                                                        alt="GiftCertificate"
                                                        title="GiftCertificate"
                                                        src={$cdn($pointer("../theme_settings.default_image_gift_certificate"))}
                                                    />
                                                )}
                                                $else={() =>
                                                    <ResponsiveImg image={item.image} fallback_size={$pointer("../theme_settings.productthumb_size")} lazyload={$pointer("../theme_settings.lazyload_mode")} default_image={$pointer("../theme_settings.default_image_product")} />
                                                }
                                            />
                                        </div>
                                        <div className="previewCartItem-content">
                                            <span className="previewCartItem-brand">{item.brand.name}</span>

                                            <h6 className="previewCartItem-name">
                                                <a href={item.url} alt={item.name} title={item.name}>
                                                    {item.name}
                                                </a>
                                            </h6>

                                            <span className="previewCartItem-price">
                                                <$If
                                                    test={$pointer("quantity")}
                                                    operator={$string(">")}
                                                    rvalue={$number(1)}
                                                    $then={() => (
                                                        <>
                                                            {item.quantity}
                                                            {$raw(" &times;")}
                                                        </>
                                                    )}
                                                />
                                                {$raw("{{#or ../customer (unless ../settings.hide_price_from_guests) (if type '==' 'GiftCertificate')}}")}
                                                <span
                                                    dangerouslyInlineAttributes={{
                                                        attributes: `${$If({test: item.price_discounted, $then: () => $raw(' class="price--discounted"')})}`,
                                                    }}
                                                >
                                                    {item.price.formatted}
                                                </span>
                                                <$If test={item.price_discounted} $then={() => <>{item.price_discounted.formatted}</>} />
                                                {$raw("{{else}}")}
                                                <LoginForPricing />
                                                {$raw("{{/or}}")}
                                            </span>
                                        </div>
                                    </li>
                                )}
                            />
                        </ul>
                        {$unescaped($pointer("cart.preview_payment_widget"))}
                        <div className="previewCartAction">
                            <$If
                                test={$pointer("cart.show_primary_checkout_button")}
                                $then={() => (
                                    <div className="previewCartAction-checkout">
                                        <a
                                            href={$pointer("urls.checkout.single_address")}
                                            className="button button--small button--primary"
                                            data-primary-checkout-now-action={""}
                                        >
                                            <$Lang keyName={$string("cart.preview.checkout_now")} />
                                        </a>
                                    </div>
                                )}
                            />

                            <div className={`previewCartAction-viewCart${$Unless({test: $pointer("cart.show_primary_checkout_button"), $then: () => $raw(" previewCartAction-viewCart--sole")})}`}>
                                <a href={$pointer("urls.cart")} className="button button--small button--action">
                                    <$Lang keyName={$string("cart.preview.view_cart")} />
                                </a>
                            </div>

                            <$If
                                test={$pointer("cart.show_multiple_address_shipping")}
                                $then={() => (
                                    <div className="previewCartAction-checkoutMultiple">
                                        <a href={$pointer("urls.checkout.multiple_address")}>
                                            <$Lang keyName={$string("cart.preview.checkout_multiple")} />
                                        </a>
                                    </div>
                                )}
                            />
                        </div>
                        <$If
                            test={$pointer("cart.additional_checkout_buttons")}
                            $then={() => (
                                <div className="previewCart-additionalCheckoutButtons">
                                    <$Each
                                        list={$pointer<string[]>("cart.additional_checkout_buttons")}
                                        $then={(button) => $unescaped(button)}
                                    />
                                </div>
                            )}
                        />
                    </>
                )}
                $else={() => (
                    <div role="alert" aria-live="polite" aria-atomic="false" className="previewCart-emptyBody">
                        <$Lang keyName={$string("cart.checkout.empty_cart")} />
                    </div>
                )}
            />
        </div>
    </div>
);
