/**
 * Source: templates/components/cart/preview.html (116 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
        {/* html L1: <div class="modal-header"> */}
        <div className="modal-header">
            {/* html L2: <h1 id="modal-header-title" class="modal-header-title"> */}
            <h1 id="modal-header-title" className="modal-header-title">
                {/* html L3: {{lang 'cart.added_to_cart.what_next' num_products=cart.quantity}} */}
                <$Lang translationKey={$string('cart.added_to_cart.what_next')} params={{num_products: cart.quantity}}/>
            </h1>
        </div>

        {/* html L7: <div class="modal-body"> */}
        <div className="modal-body">
            {/* html L8: <div class="previewCart"> */}
            <div className="previewCart">
                {/* html L9: <section class="previewCartCheckout"> */}
                <section className="previewCartCheckout">
                    {/* html L10: {{#if cart.show_primary_checkout_button}} */}
                    <$If
                        query={[cart.show_primary_checkout_button]}
                        $then={() => (
                            /* html L11: <a href="{{urls.checkout.single_address}}" class="button button--primary" data-primary-checkout-now-action> */
                            <a href={urls.checkout.single_address} className="button button--primary" data-primary-checkout-now-action="">
                                {/* html L12: {{lang 'cart.added_to_cart.proceed_to_checkout'}} */}
                                <$Lang translationKey={$string('cart.added_to_cart.proceed_to_checkout')}/>
                            </a>
                        )}
                    />

                    {/* html L16: <div class="previewCartCheckout-additionalCheckoutButtons"> */}
                    <div className="previewCartCheckout-additionalCheckoutButtons">
                        {/* html L17: {{#each cart.additional_checkout_buttons}} */}
                        <$Each list={cart.additional_checkout_buttons} $then={() => $unescaped($this())}/>
                    </div>

                    {/* html L22: {{#if cart.show_multiple_address_shipping}} */}
                    <$If
                        query={[cart.show_multiple_address_shipping]}
                        $then={() => (
                            /* html L23: <div class="previewCartAction-checkoutMultiple"> */
                            <div className="previewCartAction-checkoutMultiple">
                                {/* html L24: <a href="{{urls.checkout.multiple_address}}"> */}
                                <a href={urls.checkout.multiple_address}>
                                    {/* html L25: {{lang 'cart.preview.checkout_multiple'}} */}
                                    <$Lang translationKey={$string('cart.preview.checkout_multiple')}/>
                                </a>
                            </div>
                        )}
                    />

                    {/* html L30: <div class="previewCartCheckout-subtotal"> */}
                    <div className="previewCartCheckout-subtotal">
                        {/* html L31: {{lang 'cart.added_to_cart.order_subtotal'}} */}
                        <$Lang translationKey={$string('cart.added_to_cart.order_subtotal')}/>

                        {/* html L33: <strong class="previewCartCheckout-price"> */}
                        <strong className="previewCartCheckout-price">
                            {/* html L34: {{#or customer (unless settings.hide_price_from_guests)}} */}
                            <$Or
                                values={[customer, $unless(settings.hide_price_from_guests)]}
                                $then={() => <>{/* html L35: {{cart.sub_total.formatted}} */}{cart.sub_total.formatted}</>}
                                $else={() => /* html L36: {{else}}
                                                                                                html L37: {{> components/common/login-for-pricing}}
                                             */ <$Partial name="components/common/login-for-pricing"/>}
                            />
                        </strong>
                    </div>

                    {/* html L42: <p data-cart-quantity="{{cart.quantity}}"> */}
                    <p data-cart-quantity={cart.quantity}>
                        {/* html L43: {{lang 'cart.added_to_cart.your_cart_contains' num_products=cart.quantity}} */}
                        <$Lang translationKey={$string('cart.added_to_cart.your_cart_contains')} params={{num_products: cart.quantity}}/>
                    </p>

                    {/* html L46: <a href="#" class="button button--primary" role="button" data-reveal-close> */}
                    <a href="#" className="button button--primary" role="button" data-reveal-close="">
                        {/* html L47: {{lang 'cart.added_to_cart.continue_shopping'}} */}
                        <$Lang translationKey={$string('cart.added_to_cart.continue_shopping')}/>
                    </a>

                    {/* html L50: <a href="{{urls.cart}}" class="button"> */}
                    <a href={urls.cart} className="button">
                        {/* html L51: {{lang 'cart.added_to_cart.view_or_edit_cart'}} */}
                        <$Lang translationKey={$string('cart.added_to_cart.view_or_edit_cart')}/>
                    </a>
                </section>
                {/* html L54: <section class="productView"> */}
                <section className="productView">
                    {/* html L55: {{#with cart.added_item}} */}
                    <$With
                        context={cart.added_item}
                        $then={(item) => (
                            <>
                                {/* html L56: <figure class="productView-image"> */}
                                <figure className="productView-image">
                                    {/* html L57: <div class="productView-img-container"> */}
                                    <div className="productView-img-container">
                                        {/* html L58-64:
                                           {{> components/common/responsive-img
                                               image=image
                                               class="productView-image--cart"
                                               fallback_size=../theme_settings.product_size
                                               lazyload=../theme_settings.lazyload_mode
                                               default_image=../theme_settings.default_image_product
                                           }}
                                        */}
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

                                {/* html L68: <div class="productView-details"> */}
                                <div className="productView-details">
                                    {/* html L69: <h2 class="productView-title"> */}
                                    <h2 className="productView-title">{/* html L70: {{name}} */}{item.name}</h2>

                                    {/* html L73: <div class="productView-brand"> */}
                                    <div className="productView-brand">{/* html L74: {{brand.name}} */}{item.brand.name}</div>

                                    {/* html L77: <div class="productView-price"> */}
                                    <div className="productView-price">
                                        {/* html L78: {{#or ../customer (unless ../settings.hide_price_from_guests)}} */}
                                        <$Or
                                            values={[customer, $unless(settings.hide_price_from_guests)]}
                                            $then={() => (
                                                <>
                                                    {/* html L79: {{quantity}} &times; {{price.formatted}} */}
                                                    {item.quantity} {$$raw('&times;')} {/* html L79: {{price.formatted}} */}{item.price.formatted}
                                                </>
                                            )}
                                            $else={() => /* html L80: {{else}}
                                                                                                                        html L81: {{> components/common/login-for-pricing}}
                                                         */ <$Partial name="components/common/login-for-pricing"/>}
                                        />
                                    </div>

                                    {/* html L85: {{#each options}} */}
                                    <$Each
                                        list={item.options}
                                        $then={(option) => (
                                            /* html L86: <dl class="productView-info"> */
                                            <dl className="productView-info">
                                                {/* html L87: <dt class="productView-info-name"> */}
                                                <dt className="productView-info-name">{/* html L88: {{name}} */}{option.name}</dt>
                                                {/* html L90: <dd class="productView-info-value"> */}
                                                <dd className="productView-info-value">
                                                    {/* html L91: {{> components/common/product-options}} */}
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

            {/* html L100: {{#if cart.suggested_products}} */}
            <$If
                query={[cart.suggested_products]}
                $then={() => (
                    /* html L101: <section class="suggestiveCart"> */
                    <section className="suggestiveCart">
                        {/* html L102: <h2> */}
                        <h2>
                            {/* html L103: {{lang 'cart.added_to_cart.you_might_also_like'}}&hellip; */}
                            <$Lang translationKey={$string('cart.added_to_cart.you_might_also_like')}/>
                            {$$raw('&hellip;')}
                        </h2>

                        {/* html L106: <ul class="productGrid"> */}
                        <ul className="productGrid">
                            {/* html L107: {{#each cart.suggested_products}} */}
                            <$Each
                                list={cart.suggested_products}
                                $then={() => (
                                    /* html L108: <li class="product"> */
                                    <li className="product">
                                        {/* html L109: {{> components/products/card settings=../settings hide_product_quick_view=true theme_settings=../theme_settings}} */}
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
