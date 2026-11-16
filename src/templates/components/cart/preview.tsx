"use server";
import ProductsCard from "../products/card.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import LoginForPricing from "../common/login-for-pricing.tsx";
import ResponsiveImg from "../common/responsive-img.tsx";
import ProductOptions from "../common/product-options.tsx";
import {$boolean, $Each, $If, $Lang, $pointer, $raw, $string, $unescaped, $With} from "@mainlanddev/hbx-bigcommerce";

interface AddedItem {
    name: string;
    quantity: number;
    brand: {name: string};
    price: {formatted: string};
    options: Array<{name: string}>;
}

export default (_props: PartialProps) => (
    <>
        <div className="modal-header">
            <h1 id="modal-header-title" className="modal-header-title">
                <$Lang keyName={$string("cart.added_to_cart.what_next")} num_products={$pointer("cart.quantity")} />
            </h1>
        </div>

        <div className="modal-body">
            <div className="previewCart">
                <section className="previewCartCheckout">
                    <$If
                        test={$pointer("cart.show_primary_checkout_button")}
                        $then={() => (
                            <a href={$pointer("urls.checkout.single_address")} className="button button--primary" data-primary-checkout-now-action={""}>
                                <$Lang keyName={$string("cart.added_to_cart.proceed_to_checkout")} />
                            </a>
                        )}
                    />

                    <div className="previewCartCheckout-additionalCheckoutButtons">
                        <$Each list={$pointer<string[]>("cart.additional_checkout_buttons")} $then={(button) => $unescaped(button)} />
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

                    <div className="previewCartCheckout-subtotal">
                        <$Lang keyName={$string("cart.added_to_cart.order_subtotal")} />{" "}
                        <strong className="previewCartCheckout-price">
                            {$raw("{{#or customer (unless settings.hide_price_from_guests)}}")}
                            {$pointer("cart.sub_total.formatted")}
                            {$raw("{{else}}")}
                            <LoginForPricing />
                            {$raw("{{/or}}")}
                        </strong>
                    </div>

                    <p data-cart-quantity={$pointer("cart.quantity")}>
                        <$Lang keyName={$string("cart.added_to_cart.your_cart_contains")} num_products={$pointer("cart.quantity")} />
                    </p>

                    <a href="#" className="button button--primary" role="button" data-reveal-close={""}>
                        <$Lang keyName={$string("cart.added_to_cart.continue_shopping")} />
                    </a>

                    <a href={$pointer("urls.cart")} className="button">
                        <$Lang keyName={$string("cart.added_to_cart.view_or_edit_cart")} />
                    </a>
                </section>

                <section className="productView">
                    <$With
                        context={$pointer<AddedItem>("cart.added_item")}
                        $then={() => (
                            <>
                                <figure className="productView-image">
                                    <div className="productView-img-container">
                                        <ResponsiveImg image={$pointer("image")} class={$string("productView-image--cart")} fallback_size={$pointer("../theme_settings.product_size")} lazyload={$pointer("../theme_settings.lazyload_mode")} default_image={$pointer("../theme_settings.default_image_product")} />
                                    </div>
                                </figure>

                                <div className="productView-details">
                                    <h2 className="productView-title">{$pointer("name")}</h2>

                                    <div className="productView-brand">{$pointer("brand.name")}</div>

                                    <div className="productView-price">
                                        {$raw("{{#or ../customer (unless ../settings.hide_price_from_guests)}}")}
                                        {$pointer("quantity")} {$raw("&times;")} {$pointer("price.formatted")}
                                        {$raw("{{else}}")}
                                        <LoginForPricing />
                                        {$raw("{{/or}}")}
                                    </div>

                                    <$Each
                                        list={$pointer<Array<{name: string}>>("options")}
                                        $then={() => (
                                            <dl className="productView-info">
                                                <dt className="productView-info-name">{$pointer("name")}</dt>
                                                <dd className="productView-info-value"><ProductOptions /></dd>
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
                test={$pointer("cart.suggested_products")}
                $then={() => (
                    <section className="suggestiveCart">
                        <h2>
                            <$Lang keyName={$string("cart.added_to_cart.you_might_also_like")} />
                            {$raw("&hellip;")}
                        </h2>

                        <ul className="productGrid">
                            <$Each
                                list={$pointer<unknown[]>("cart.suggested_products")}
                                $then={() => (
                                    <li className="product">
                                        <ProductsCard settings={$pointer("../settings")} hide_product_quick_view={$boolean(true)} theme_settings={$pointer("../theme_settings")} />
                                    </li>
                                )}
                            />
                        </ul>
                    </section>
                )}
            />
        </div>
    </>
);
