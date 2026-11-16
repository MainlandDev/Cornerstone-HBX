import CartPageTitle from "../components/cart/page-title.tsx";
import CartStatusMessages from "../components/cart/status-messages.tsx";
import CartContent from "../components/cart/content.tsx";
import CartCoupons from "../components/cart/coupons.tsx";
import CartTotals from "../components/cart/totals.tsx";
import CartAdditionalCheckoutButtons from "../components/cart/additional-checkout-buttons.tsx";
import Breadcrumbs from "../components/common/breadcrumbs.tsx";
import {
    $frontmatter,
    $If,
    $Inject,
    $Lang,
    $lang,
    $Page,
    $pointer,
    $region,
    $string,
    $unescaped, $unlessExpression, $Or,
} from "@mainlanddev/hbx-bigcommerce";

export const frontmatter = $frontmatter.other({cart: true});

/** `{{{region name="…"}}}` */
const region = (name: string) => $unescaped($region({name: $string(name)}));

export default () => (
    <>
        <$Inject keyName={$string("cancelButtonText")} value={$lang($string("common.cancel"))} />
        <$Page
            blocks={{
                page: () => (
                    <>
                        <$Inject keyName={$string("invalidEntryMessage")} value={$lang($string("cart.invalid_entry_message"))} />{" "}
                        <$Inject keyName={$string("multiCouponUIEnabled")} value={$pointer("cart.multi_coupon_ui_enabled")} />
                        <div className="page">
                            <div className="page-content" data-cart={""}>
                                <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                                <CartPageTitle />
                                <div data-cart-status={""}><CartStatusMessages /></div>
                                <$If
                                    test={$pointer("cart.items.length")}
                                    $then={() => (
                                        <>
                                            <div className="loadingOverlay"></div>
                                            <div data-cart-content={""} className="cart-content-padding-right">
                                                <CartContent />
                                            </div>
                                            <$If
                                                test={$pointer("cart.multi_coupon_ui_enabled")}
                                                $then={() => (
                                                    <div data-cart-coupons={""} className="cart-content-padding-right">
                                                        <CartCoupons />
                                                    </div>
                                                )}
                                            />
                                            <div data-cart-totals={""} className="cart-content-padding-right">
                                                <CartTotals />
                                            </div>
                                            {region("cart_below_totals")}
                                            <$Or values={[$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))]} $then={() => (<><$If
                                                test={$pointer("cart.show_primary_checkout_button")}
                                                $then={() => (
                                                    <div className="cart-actions cart-content-padding-right">
                                                        <a
                                                            className="button button--primary"
                                                            href={$pointer("urls.checkout.single_address")}
                                                            title={$lang($string("cart.checkout.title"))}
                                                            data-primary-checkout-now-action={""}
                                                        >
                                                            {" "}<$Lang keyName={$string("cart.checkout.button")} />{" "}
                                                        </a>
                                                        {" "}
                                                        <$If
                                                            test={$pointer("cart.show_multiple_address_shipping")}
                                                            $then={() => (
                                                                <a className="checkoutMultiple" href={$pointer("urls.checkout.multiple_address")}>
                                                                    {" "}<$Lang keyName={$string("cart.preview.checkout_multiple")} />{" "}
                                                                </a>
                                                            )}
                                                        />
                                                    </div>
                                                )}
                                                $else={() => (
                                                    <div className="cart-actions cart-content-padding-right">
                                                        <a
                                                            className="button"
                                                            href={$pointer("urls.home")}
                                                            title={$lang($string("cart.continue_shopping"))}
                                                        >
                                                            <$Lang keyName={$string("cart.continue_shopping")} />
                                                        </a>
                                                    </div>
                                                )}
                                            />
                                            <$If
                                                test={$pointer("cart.additional_checkout_buttons")}
                                                $then={() => (
                                                    <div
                                                        data-cart-additional-checkout-buttons={""}
                                                        className="cart-additionalCheckoutButtons cart-content-padding-right"
                                                    >
                                                        <CartAdditionalCheckoutButtons />
                                                    </div>
                                                )}
                                            /></>)} $else={() => (<><div className="cart-actions cart-content-padding-right">
                                                <a
                                                    className="button"
                                                    href={$pointer("urls.auth.login")}
                                                    title={$lang($string("cart.login_to_checkout"))}
                                                >
                                                    <$Lang keyName={$string("cart.login_to_checkout")} />
                                                </a>
                                            </div></>)} />
                                        </>
                                    )}
                                    $else={() => (
                                        <h3 tabIndex={0}>
                                            <$Lang keyName={$string("cart.checkout.empty_cart")} />
                                        </h3>
                                    )}
                                />
                            </div>
                        </div>
                    </>
                ),
            }}
            layout="layout/base"
        />
    </>
);
