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
            <$Inject keyName={$string('cancelButtonText')} value={$lang($string('common.cancel'))}/>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <$Inject keyName={$string('invalidEntryMessage')} value={$lang($string('cart.invalid_entry_message'))}/>
                        <$Inject keyName={$string('multiCouponUIEnabled')} value={ctx.cart.multi_coupon_ui_enabled}/>
                        <div className="page">
                            <div className="page-content" data-cart="">
                                <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>

                                <PageTitle cart={ctx.cart}/>

                                <div data-cart-status="">
                                    <StatusMessages cart={ctx.cart}/>
                                </div>

                                <$If
                                    query={[ctx.cart.items.length]}
                                    $then={() => (
                                        <>
                                            <div className="loadingOverlay"></div>

                                            <div data-cart-content="" className="cart-content-padding-right">
                                                <Content cart={ctx.cart} theme_settings={ctx.theme_settings} customer={ctx.customer} settings={ctx.settings}/>
                                            </div>

                                            <$If
                                                query={[ctx.cart.multi_coupon_ui_enabled]}
                                                $then={() => (
                                                    <div data-cart-coupons="" className="cart-content-padding-right">
                                                        <$Partial name="components/cart/coupons" hash={{cart: ctx.cart, urls: ctx.urls}}/>
                                                    </div>
                                                )}
                                            />

                                            <div data-cart-totals="" className="cart-content-padding-right">
                                                <$Partial name="components/cart/totals" hash={{cart: ctx.cart, customer: ctx.customer, settings: ctx.settings, urls: ctx.urls}}/>
                                            </div>

                                            <$_Region name={$string('cart_below_totals')}/>

                                            <$Or
                                                values={[ctx.customer, $unless(ctx.settings.hide_price_from_guests)]}
                                                $then={() => (
                                                    <>
                                                        <$If
                                                            query={[ctx.cart.show_primary_checkout_button]}
                                                            $then={() => (
                                                                <div className="cart-actions cart-content-padding-right">
                                                                    <a
                                                                        className="button button--primary"
                                                                        href={ctx.urls.checkout.single_address}
                                                                        title={$lang($string('cart.checkout.title'))}
                                                                        data-primary-checkout-now-action=""
                                                                    >
                                                                        <$Lang translationKey={$string('cart.checkout.button')}/>
                                                                    </a>
                                                                    <$If
                                                                        query={[ctx.cart.show_multiple_address_shipping]}
                                                                        $then={() => (
                                                                            <a className="checkoutMultiple" href={ctx.urls.checkout.multiple_address}>
                                                                                <$Lang translationKey={$string('cart.preview.checkout_multiple')}/>
                                                                            </a>
                                                                        )}
                                                                    />
                                                                </div>
                                                            )}
                                                            $else={() => (
                                                                <div className="cart-actions cart-content-padding-right">
                                                                    <a
                                                                        className="button"
                                                                        href={ctx.urls.home}
                                                                        title={$lang($string('cart.continue_shopping'))}
                                                                    >
                                                                        <$Lang translationKey={$string('cart.continue_shopping')}/>
                                                                    </a>
                                                                </div>
                                                            )}
                                                        />

                                                        <$If
                                                            query={[ctx.cart.additional_checkout_buttons]}
                                                            $then={() => (
                                                                <div
                                                                    data-cart-additional-checkout-buttons=""
                                                                    className="cart-additionalCheckoutButtons cart-content-padding-right"
                                                                >
                                                                    <AdditionalCheckoutButtons cart={ctx.cart}/>
                                                                </div>
                                                            )}
                                                        />
                                                    </>
                                                )}
                                                $else={() => (
                                                    <div className="cart-actions cart-content-padding-right">
                                                        <a
                                                            className="button"
                                                            href={ctx.urls.auth.login}
                                                            title={$lang($string('cart.login_to_checkout'))}
                                                        >
                                                            <$Lang translationKey={$string('cart.login_to_checkout')}/>
                                                        </a>
                                                    </div>
                                                )}
                                            />
                                        </>
                                    )}
                                    $else={() => (
                                        <h3 tabIndex={0}>
                                            <$Lang translationKey={$string('cart.checkout.empty_cart')}/>
                                        </h3>
                                    )}
                                />
                            </div>
                        </div>
                    </>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
