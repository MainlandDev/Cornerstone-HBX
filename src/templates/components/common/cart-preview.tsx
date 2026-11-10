/**
 * Source: templates/components/common/cart-preview.html (91 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
    /* html L1: <div class="previewCartWrapper"> */
    <div className="previewCartWrapper">
        {/* html L2: <div class="previewCart"> */}
        <div className="previewCart">
            {/* html L3: {{#if cart.items.length}} */}
            <$If
                query={[cart.items.length]}
                $then={() => (
                    <>
                        {/* html L4: <ul class="previewCartList"> */}
                        <ul className="previewCartList">
                            {/* html L5: {{#each (limit cart.items 4)}} */}
                            <$Each
                                list={$limit(cart.items, $number(4))}
                                $then={(item) => (
                                    /* html L6: <li class="previewCartItem"> */
                                    <li className="previewCartItem">
                                        {/* html L7: <div class="previewCartItem-image"> */}
                                        <div className="previewCartItem-image">
                                            {/* html L8: {{#if type '==' 'GiftCertificate'}} */}
                                            <$If
                                                query={[item.type, '==', $string('GiftCertificate')]}
                                                $then={() => (
                                                    /* html L9-13:
                                                       <img
                                                           alt="GiftCertificate"
                                                           title="GiftCertificate"
                                                           src="{{cdn ../theme_settings.default_image_gift_certificate}}"
                                                       >
                                                    */
                                                    <img
                                                        alt="GiftCertificate"
                                                        title="GiftCertificate"
                                                        src={$cdn(theme_settings.default_image_gift_certificate)}
                                                    />
                                                )}
                                                $else={() => (
                                                    /* html L14: {{else}}
                                                                                                              html L15-20:
                                                       {{> components/common/responsive-img
                                                           image=image
                                                           fallback_size=../theme_settings.productthumb_size
                                                           lazyload=../theme_settings.lazyload_mode
                                                           default_image=../theme_settings.default_image_product
                                                       }}
                                                    */
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
                                        {/* html L23: <div class="previewCartItem-content"> */}
                                        <div className="previewCartItem-content">
                                            {/* html L24: <span class="previewCartItem-brand"> */}
                                            <span className="previewCartItem-brand">{/* html L25: {{brand.name}} */}{item.brand.name}</span>

                                            {/* html L28: <h6 class="previewCartItem-name"> */}
                                            <h6 className="previewCartItem-name">
                                                {/* html L29: <a href="{{url}}" alt="{{name}}" title="{{name}}">{{name}}</a> */}
                                                <a href={item.url} $$={[$$raw('alt="'), item.name, $$raw('"')]} title={item.name}>
                                                    {/* html L29: {{name}} */}
                                                    {item.name}
                                                </a>
                                            </h6>

                                            {/* html L32: <span class="previewCartItem-price"> */}
                                            <span className="previewCartItem-price">
                                                {/* html L33: {{#if quantity '>' 1}} */}
                                                <$If
                                                    query={[item.quantity, '>', $number(1)]}
                                                    $then={() => (
                                                        <>
                                                            {/* html L34: {{quantity}} &times; */}
                                                            {item.quantity} {$$raw('&times;')}
                                                        </>
                                                    )}
                                                />
                                                {/* html L36: {{#or ../customer (unless ../settings.hide_price_from_guests) (if type '==' 'GiftCertificate')}} */}
                                                <$Or
                                                    values={[
                                                        customer,
                                                        $unless(settings.hide_price_from_guests),
                                                        $if(item.type, '==', $string('GiftCertificate')),
                                                    ]}
                                                    $then={() => (
                                                        <>
                                                            {/* html L37: <span{{#if price_discounted}} class="price--discounted"{{/if}}>{{price.formatted}}</span> */}
                                                            <span $$={$if(item.price_discounted).then(() => $$raw('class="price--discounted"'))}>
                                                                {/* html L37: {{price.formatted}} */}
                                                                {item.price.formatted}
                                                            </span>
                                                            {/* html L38: {{#if price_discounted}} */}
                                                            <$If
                                                                query={[item.price_discounted]}
                                                                $then={() => <>{/* html L39: {{price_discounted.formatted}} */}{item.price_discounted.formatted}</>}
                                                            />
                                                        </>
                                                    )}
                                                    $else={() => /* html L41: {{else}}
                                                                                                                                        html L42: {{> components/common/login-for-pricing}}
                                                                 */ <LoginForPricing/>}
                                                />
                                            </span>
                                        </div>
                                    </li>
                                )}
                            />
                        </ul>
                        {/* html L49: {{{cart.preview_payment_widget}}} */}
                        {$unescaped(cart.preview_payment_widget)}
                        {/* html L50: <div class="previewCartAction"> */}
                        <div className="previewCartAction">
                            {/* html L51: {{#if cart.show_primary_checkout_button}} */}
                            <$If
                                query={[cart.show_primary_checkout_button]}
                                $then={() => (
                                    /* html L52: <div class="previewCartAction-checkout"> */
                                    <div className="previewCartAction-checkout">
                                        {/* html L53-57:
                                           <a
                                                   href="{{urls.checkout.single_address}}"
                                                   class="button button--small button--primary"
                                                   data-primary-checkout-now-action
                                           >
                                        */}
                                        <a
                                            href={urls.checkout.single_address}
                                            className="button button--small button--primary"
                                            data-primary-checkout-now-action=""
                                        >
                                            {/* html L58: {{lang 'cart.preview.checkout_now'}} */}
                                            <$Lang translationKey={$string('cart.preview.checkout_now')}/>
                                        </a>
                                    </div>
                                )}
                            />

                            {/* html L63: <div class="previewCartAction-viewCart{{#unless cart.show_primary_checkout_button}} previewCartAction-viewCart--sole{{/unless}}"> */}
                            <div
                                className={`previewCartAction-viewCart${$unless(cart.show_primary_checkout_button).then(() => $$raw(' previewCartAction-viewCart--sole'))}`}
                            >
                                {/* html L64: <a href="{{urls.cart}}" class="button button--small button--action"> */}
                                <a href={urls.cart} className="button button--small button--action">
                                    {/* html L65: {{lang 'cart.preview.view_cart'}} */}
                                    <$Lang translationKey={$string('cart.preview.view_cart')}/>
                                </a>
                            </div>

                            {/* html L69: {{#if cart.show_multiple_address_shipping}} */}
                            <$If
                                query={[cart.show_multiple_address_shipping]}
                                $then={() => (
                                    /* html L70: <div class="previewCartAction-checkoutMultiple"> */
                                    <div className="previewCartAction-checkoutMultiple">
                                        {/* html L71: <a href="{{urls.checkout.multiple_address}}"> */}
                                        <a href={urls.checkout.multiple_address}>
                                            {/* html L72: {{lang 'cart.preview.checkout_multiple'}} */}
                                            <$Lang translationKey={$string('cart.preview.checkout_multiple')}/>
                                        </a>
                                    </div>
                                )}
                            />
                        </div>
                        {/* html L77: {{#if cart.additional_checkout_buttons}} */}
                        <$If
                            query={[cart.additional_checkout_buttons]}
                            $then={() => (
                                /* html L78: <div class="previewCart-additionalCheckoutButtons"> */
                                <div className="previewCart-additionalCheckoutButtons">
                                    {/* html L79: {{#each cart.additional_checkout_buttons}} */}
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
                    /* html L84: {{else}}
                                              html L85: <div role="alert" aria-live="polite" aria-atomic="false" class="previewCart-emptyBody">
                    */
                    <div role="alert" aria-live="polite" aria-atomic="false" className="previewCart-emptyBody">
                        {/* html L86: {{lang 'cart.checkout.empty_cart'}} */}
                        <$Lang translationKey={$string('cart.checkout.empty_cart')}/>
                    </div>
                )}
            />
        </div>
    </div>
));
