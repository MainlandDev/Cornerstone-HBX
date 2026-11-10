/**
 * Source: templates/pages/cart.html (80 lines). Per-element comments below quote the original lines (`html L<n>`).
 * Front matter of the original (lines 1-3):
 *   ---
 *   cart: true
 *   ---
 */
import {$If, $Partial, $string, $unless} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang, $Or, $StencilPartial, $_Region} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {ExtendedThemePageCart} from '@/context';
import Content from '@/templates/components/cart/content';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import PageTitle from '@/templates/components/cart/page-title';
import StatusMessages from '@/templates/components/cart/status-messages';
import AdditionalCheckoutButtons from '@/templates/components/cart/additional-checkout-buttons';

export default $page<ExtendedThemePageCart>({
    frontmatter: {cart: true},
    content: (ctx) => (
        <>
            {/* html L4: {{inject 'cancelButtonText' (lang 'common.cancel')}} */}
            <$Inject keyName={$string('cancelButtonText')} value={$lang($string('common.cancel'))}/>
            {/* html L5: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L6: {{inject 'invalidEntryMessage' (lang 'cart.invalid_entry_message')}} */}
                        <$Inject keyName={$string('invalidEntryMessage')} value={$lang($string('cart.invalid_entry_message'))}/>
                        {/* html L7: {{inject 'multiCouponUIEnabled' cart.multi_coupon_ui_enabled}} */}
                        <$Inject keyName={$string('multiCouponUIEnabled')} value={ctx.cart.multi_coupon_ui_enabled}/>
                        {/* html L8: <div class="page"> */}
                        <div className="page">
                            {/* html L10: <div class="page-content" data-cart> */}
                            <div className="page-content" data-cart="">
                                {/* html L11: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                                <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>

                                {/* html L13: {{> components/cart/page-title}} */}
                                <PageTitle cart={ctx.cart}/>

                                {/* html L15: <div data-cart-status> */}
                                <div data-cart-status="">
                                    {/* html L16: {{> components/cart/status-messages}} */}
                                    <StatusMessages cart={ctx.cart}/>
                                </div>

                                {/* html L19: {{#if cart.items.length}} */}
                                <$If
                                    query={[ctx.cart.items.length]}
                                    $then={() => (
                                        <>
                                            {/* html L20: <div class="loadingOverlay"></div> */}
                                            <div className="loadingOverlay"></div>

                                            {/* html L22: <div data-cart-content class="cart-content-padding-right"> */}
                                            <div data-cart-content="" className="cart-content-padding-right">
                                                {/* html L23: {{> components/cart/content}} */}
                                                <Content cart={ctx.cart} theme_settings={ctx.theme_settings} customer={ctx.customer} settings={ctx.settings}/>
                                            </div>

                                            {/* html L26: {{#if cart.multi_coupon_ui_enabled}} */}
                                            <$If
                                                query={[ctx.cart.multi_coupon_ui_enabled]}
                                                $then={() => (
                                                    /* html L27: <div data-cart-coupons class="cart-content-padding-right"> */
                                                    <div data-cart-coupons="" className="cart-content-padding-right">
                                                        {/* html L28: {{> components/cart/coupons}} */}
                                                        <$Partial name="components/cart/coupons" hash={{cart: ctx.cart, urls: ctx.urls}}/>
                                                    </div>
                                                )}
                                            />

                                            {/* html L32: <div data-cart-totals class="cart-content-padding-right"> */}
                                            <div data-cart-totals="" className="cart-content-padding-right">
                                                {/* html L33: {{> components/cart/totals}} */}
                                                <$Partial name="components/cart/totals" hash={{cart: ctx.cart, customer: ctx.customer, settings: ctx.settings, urls: ctx.urls}}/>
                                            </div>

                                            {/* html L36: {{{region name="cart_below_totals"}}} */}
                                            <$_Region name={$string('cart_below_totals')}/>

                                            {/* html L38: {{#or customer (unless settings.hide_price_from_guests)}} */}
                                            <$Or
                                                values={[ctx.customer, $unless(ctx.settings.hide_price_from_guests)]}
                                                $then={() => (
                                                    <>
                                                        {/* html L39: {{#if cart.show_primary_checkout_button}} */}
                                                        <$If
                                                            query={[ctx.cart.show_primary_checkout_button]}
                                                            $then={() => (
                                                                /* html L40: <div class="cart-actions cart-content-padding-right"> */
                                                                <div className="cart-actions cart-content-padding-right">
                                                                    {/* html L41-46:
                                                                       <a
                                                                           class="button button--primary"
                                                                           href="{{urls.checkout.single_address}}"
                                                                           title="{{lang 'cart.checkout.title'}}"
                                                                           data-primary-checkout-now-action
                                                                       >
                                                                    */}
                                                                    <a
                                                                        className="button button--primary"
                                                                        href={ctx.urls.checkout.single_address}
                                                                        title={$lang($string('cart.checkout.title'))}
                                                                        data-primary-checkout-now-action=""
                                                                    >
                                                                        {/* html L47: {{lang 'cart.checkout.button'}} */}
                                                                        <$Lang translationKey={$string('cart.checkout.button')}/>
                                                                    </a>
                                                                    {/* html L49: {{#if cart.show_multiple_address_shipping}} */}
                                                                    <$If
                                                                        query={[ctx.cart.show_multiple_address_shipping]}
                                                                        $then={() => (
                                                                            /* html L50: <a class="checkoutMultiple" href="{{urls.checkout.multiple_address}}"> */
                                                                            <a className="checkoutMultiple" href={ctx.urls.checkout.multiple_address}>
                                                                                {/* html L51: {{lang 'cart.preview.checkout_multiple'}} */}
                                                                                <$Lang translationKey={$string('cart.preview.checkout_multiple')}/>
                                                                            </a>
                                                                        )}
                                                                    />
                                                                </div>
                                                            )}
                                                            $else={() => (
                                                                /* html L55: {{else}}
                                                                                                                                      html L56: <div class="cart-actions cart-content-padding-right">
                                                                */
                                                                <div className="cart-actions cart-content-padding-right">
                                                                    {/* html L57: <a class="button" href="{{urls.home}}" title="{{lang 'cart.continue_shopping'}}">{{lang 'cart.continue_shopping'}}</a> */}
                                                                    <a
                                                                        className="button"
                                                                        href={ctx.urls.home}
                                                                        title={$lang($string('cart.continue_shopping'))}
                                                                    >
                                                                        {/* html L57: {{lang 'cart.continue_shopping'}} */}
                                                                        <$Lang translationKey={$string('cart.continue_shopping')}/>
                                                                    </a>
                                                                </div>
                                                            )}
                                                        />

                                                        {/* html L61: {{#if cart.additional_checkout_buttons}} */}
                                                        <$If
                                                            query={[ctx.cart.additional_checkout_buttons]}
                                                            $then={() => (
                                                                /* html L62: <div data-cart-additional-checkout-buttons class="cart-additionalCheckoutButtons cart-content-padding-right"> */
                                                                <div
                                                                    data-cart-additional-checkout-buttons=""
                                                                    className="cart-additionalCheckoutButtons cart-content-padding-right"
                                                                >
                                                                    {/* html L63: {{> components/cart/additional-checkout-buttons}} */}
                                                                    <AdditionalCheckoutButtons cart={ctx.cart}/>
                                                                </div>
                                                            )}
                                                        />
                                                    </>
                                                )}
                                                $else={() => (
                                                    /* html L66: {{else}}
                                                                                                              html L67: <div class="cart-actions cart-content-padding-right">
                                                    */
                                                    <div className="cart-actions cart-content-padding-right">
                                                        {/* html L68: <a class="button" href="{{urls.auth.login}}" title="{{lang 'cart.login_to_checkout'}}">{{lang 'cart.login_to_checkout'}}</a> */}
                                                        <a
                                                            className="button"
                                                            href={ctx.urls.auth.login}
                                                            title={$lang($string('cart.login_to_checkout'))}
                                                        >
                                                            {/* html L68: {{lang 'cart.login_to_checkout'}} */}
                                                            <$Lang translationKey={$string('cart.login_to_checkout')}/>
                                                        </a>
                                                    </div>
                                                )}
                                            />
                                        </>
                                    )}
                                    $else={() => (
                                        /* html L72: {{else}}
                                                                                      html L73: <h3 tabindex="0">{{lang 'cart.checkout.empty_cart'}}</h3>
                                        */
                                        <h3 tabIndex={0}>
                                            {/* html L73: {{lang 'cart.checkout.empty_cart'}} */}
                                            <$Lang translationKey={$string('cart.checkout.empty_cart')}/>
                                        </h3>
                                    )}
                                />
                            </div>
                        </div>
                    </>
                )}
            />
            {/* html L79: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
