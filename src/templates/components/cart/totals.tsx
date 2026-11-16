import {
    $All,
    $AssignVar,
    $concat,
    $Each,
    $getVar,
    $If,
    $Lang,
    $lang,
    $Neither,
    $number,
    $Or,
    $partial,
    $pointer,
    $raw,
    $string,
    $Unless,
    place,
} from "@mainlanddev/hbx-bigcommerce";

interface Money {
    value: number;
    formatted: string;
}

interface Coupon {
    code: string;
    display_name: string;
    has_max_limit_reached: boolean;
    discount: Money;
    remove_url: string;
}

interface GiftCertificate {
    code: string;
    remove_url: string;
    remaining: Money;
    used: Money;
}

interface Fee {
    display_name: string;
    cost: Money;
}

interface Tax {
    name: string;
    included: boolean;
    cost: Money;
}

interface Item {
    stock_position: {quantity_backordered: number};
    options: Array<{linked_bundled_item: {stock_position: {quantity_backordered: number}}}>;
}

interface Cart {
    multi_coupon_ui_enabled: boolean;
    sub_total: Money;
    coupons: Coupon[];
    display_discount_total: Money;
    order_based_auto_discount_total: Money;
    order_based_auto_discount_max_limit_reached: boolean;
    manual_discount_total: Money;
    gift_wrapping_cost: Money;
    fees: Fee[];
    shipping_handling: {show_estimator: boolean; shipping_cost: Money};
    items: Item[];
    inventory_settings: {show_default_shipping_expectation_prompt: boolean; default_shipping_expectation_prompt: string};
    taxes: Tax[];
    discount: Money;
    gift_certificates: GiftCertificate[];
    grand_total: Money;
    total_discount: Money;
}

/** The trailing colon the original prints when `multi_coupon_ui_enabled` is off. */
const colon = (multi: ReturnType<typeof $pointer<boolean>>) => <$Unless test={multi} $then={() => ":"} />;

export default () => {
    const cart = $pointer<Cart>("cart");
    const multi = cart.multi_coupon_ui_enabled;
    return (
        <ul className={`cart-totals ${$If({test: multi, $then: () => "cart-total-enhanced"})}`}>
            <li className="cart-total">
                <div className="cart-total-label">
                    <strong>
                        <$Lang keyName={$string("cart.checkout.subtotal")} />
                        {colon(multi)}
                    </strong>
                </div>
                <div className="cart-total-value">
                    {$raw("{{#or customer (unless settings.hide_price_from_guests)}}")}
                    <span>{cart.sub_total.formatted}</span>
                    {$raw("{{else}}")}
                    {place($partial("components/common/login-for-pricing"))}
                    {$raw("{{/or}}")}
                </div>
            </li>
            <$If
                test={multi}
                $then={() => (
                    <$Or
                        values={[cart.coupons, cart.display_discount_total.value]}
                        $then={() => (
                            <div className="cart-total cart-total-discounts">
                                <div className="cart-total-label" data-discount-toggle={""}>
                                    <strong>
                                        <$Lang keyName={$string("cart.discounts")} />
                                    </strong>
                                    <i className="icon cart-discount-icon" aria-hidden="true">
                                        <svg>
                                            <use href="#icon-keyboard-arrow-up" />
                                        </svg>
                                    </i>
                                </div>
                                <div className="cart-total-value" data-discount-toggle={""}>
                                    <span>{cart.display_discount_total.formatted}</span>
                                </div>
                                <ul data-discount-details={""} className="cart-discount-list">
                                    <$If
                                        test={cart.order_based_auto_discount_total.value}
                                        $then={() => (
                                            <li className="cart-discount-item">
                                                <div className="cart-discount-item-label">
                                                    <i className="icon" aria-hidden="true">
                                                        <svg>
                                                            <use href="#icon-promotions" />
                                                        </svg>
                                                    </i>
                                                    <span className="cart-coupon-name">
                                                        <$Lang keyName={$string("cart.automatic_discount")} />{" "}
                                                        <$If
                                                            test={cart.order_based_auto_discount_max_limit_reached}
                                                            $then={() => (
                                                                <span className="cart-coupon-limit">
                                                                    <$Lang keyName={$string("cart.coupons.maximum_discount_applied")} />
                                                                </span>
                                                            )}
                                                        />
                                                    </span>
                                                </div>
                                                <div className="cart-discount-item-value">{cart.order_based_auto_discount_total.formatted}</div>
                                            </li>
                                        )}
                                    />
                                    <$If
                                        test={cart.manual_discount_total.value}
                                        $then={() => (
                                            <li className="cart-discount-item">
                                                <div className="cart-discount-item-label">
                                                    <i className="icon" aria-hidden="true">
                                                        <svg>
                                                            <use href="#icon-promotions" />
                                                        </svg>
                                                    </i>
                                                    <span className="cart-coupon-name">
                                                        <$Lang keyName={$string("cart.manual_discount")} />
                                                    </span>
                                                </div>
                                                <div className="cart-discount-item-value">{cart.manual_discount_total.formatted}</div>
                                            </li>
                                        )}
                                    />
                                    <$Each
                                        list={cart.coupons}
                                        $then={(coupon) => (
                                            <li className="cart-discount-item">
                                                <div className="cart-discount-item-label">
                                                    <i className="icon" aria-hidden="true">
                                                        <svg>
                                                            <use href="#icon-promotions" />
                                                        </svg>
                                                    </i>
                                                    <span className="cart-coupon-name">
                                                        <$If
                                                            test={coupon.display_name}
                                                            $then={() => (
                                                                <>
                                                                    {coupon.display_name} ({coupon.code})
                                                                </>
                                                            )}
                                                            $else={() => coupon.code}
                                                        />{" "}
                                                        <$If
                                                            test={coupon.has_max_limit_reached}
                                                            $then={() => (
                                                                <span className="cart-coupon-limit">
                                                                    <$Lang keyName={$string("cart.coupons.maximum_discount_applied")} />
                                                                </span>
                                                            )}
                                                        />
                                                    </span>
                                                </div>
                                                <div className="cart-discount-item-value">
                                                    <$If
                                                        test={$pointer("discount.value")}
                                                        operator={$string("===")}
                                                        rvalue={$number(0)}
                                                        $then={() => <>-</>}
                                                    />
                                                    {coupon.discount.formatted}
                                                </div>
                                            </li>
                                        )}
                                    />
                                </ul>
                            </div>
                        )}
                    />
                )}
            />
            <$If
                test={cart.gift_wrapping_cost.value}
                $then={() => (
                    <li className="cart-total">
                        <div className="cart-total-label">
                            <strong>
                                <$Lang keyName={$string("cart.checkout.gift_wrapping")} />
                                {colon(multi)}
                            </strong>
                        </div>
                        <div className="cart-total-value">
                            <span>{cart.gift_wrapping_cost.formatted}</span>
                        </div>
                    </li>
                )}
            />
            <$If
                test={cart.fees}
                $then={() => (
                    <$Each
                        list={cart.fees}
                        $then={(fee) => (
                            <li className="cart-total">
                                <div className="cart-total-label">
                                    <strong>
                                        {fee.display_name}
                                        {colon($pointer<boolean>("../cart.multi_coupon_ui_enabled"))}
                                    </strong>
                                </div>
                                <div className="cart-total-value">
                                    <span>{fee.cost.formatted}</span>
                                </div>
                            </li>
                        )}
                    />
                )}
            />
            <$If
                test={cart.shipping_handling.show_estimator}
                $then={() => (
                    <>
                        <$AssignVar keyName={$string("hasBackorderedItem")} value={$number(0)} />
                        <$Each
                            list={cart.items}
                            $then={(item) => (
                                <>
                                    <$If
                                        test={item.stock_position.quantity_backordered}
                                        $then={() => <$AssignVar keyName={$string("hasBackorderedItem")} value={$number(1)} />}
                                    />
                                    <$Each
                                        list={item.options}
                                        $then={(option) => (
                                            <$If
                                                test={option.linked_bundled_item.stock_position.quantity_backordered}
                                                $then={() => <$AssignVar keyName={$string("hasBackorderedItem")} value={$number(1)} />}
                                            />
                                        )}
                                    />
                                </>
                            )}
                        />
                        <li className={`cart-total ${$If({test: multi, $then: () => "cart-total-shipping-estimator"})}`}>
                            <div className="cart-total-label">
                                <strong>
                                    <$Lang keyName={$string("cart.checkout.shipping")} />
                                    {colon(multi)}
                                </strong>
                                <$If test={multi} $then={() => place($partial("components/cart/shipping-estimator-trigger"))} />
                            </div>
                            <$Neither a={multi} b={cart.shipping_handling.shipping_cost} $then={() => place($partial("components/cart/shipping-estimator-trigger"))} />
                            {place($partial("components/cart/shipping-estimator", cart.shipping_handling, {multi_coupon_ui_enabled: multi}))}
                            <$All
                                values={[cart.inventory_settings.show_default_shipping_expectation_prompt, $getVar($string("hasBackorderedItem"))]}
                                $then={() => <p className="cart-shipping-expectation-message">{cart.inventory_settings.default_shipping_expectation_prompt}</p>}
                            />
                        </li>
                    </>
                )}
            />
            <$Each
                list={cart.taxes}
                $then={(tax) => (
                    <$Unless
                        test={tax.included}
                        $then={() => (
                            <li className="cart-total">
                                <div className="cart-total-label">
                                    <strong>
                                        {tax.name}
                                        {colon($pointer<boolean>("../cart.multi_coupon_ui_enabled"))}
                                    </strong>
                                </div>
                                <div className="cart-total-value">
                                    <span>{tax.cost.formatted}</span>
                                </div>
                            </li>
                        )}
                    />
                )}
            />
            <$Unless
                test={multi}
                $then={() => (
                    <>
                        <$If
                            test={cart.discount}
                            $then={() => (
                                <li className="cart-total">
                                    <div className="cart-total-label">
                                        <strong>
                                            <$Lang keyName={$string("cart.discount")} />:
                                        </strong>
                                    </div>
                                    <div className="cart-total-value">{cart.discount.formatted}</div>
                                </li>
                            )}
                        />
                        <$If
                            test={cart.coupons}
                            $then={() => (
                                <$Each
                                    list={cart.coupons}
                                    $then={(coupon) => (
                                        <li className="cart-total">
                                            <div className="cart-total-label">
                                                <strong>
                                                    <$Lang keyName={$string("cart.coupons.code_label")} code={coupon.code} />
                                                </strong>
                                                <div>
                                                    <a href={coupon.remove_url}>
                                                        <$Lang keyName={$string("cart.coupons.remove")} />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="cart-total-value">
                                                <span>{coupon.discount.formatted}</span>
                                            </div>
                                        </li>
                                    )}
                                />
                            )}
                            $else={() => (
                                <li className="cart-total">
                                    <div className="cart-total-label">
                                        <strong>
                                            <$Lang keyName={$string("cart.coupon_code")} />:
                                        </strong>
                                    </div>
                                    {place($partial("components/cart/coupon-input"))}
                                </li>
                            )}
                        />
                    </>
                )}
            />
            <$If
                test={$pointer<boolean>("settings.gift_certificates_enabled")}
                $then={() => (
                    <>
                        <$Unless
                            test={multi}
                            $then={() => (
                                <$Each
                                    list={cart.gift_certificates}
                                    $then={(certificate) => (
                                        <li className="cart-total">
                                            <div className="cart-total-label">
                                                <strong>
                                                    <$Lang keyName={$string("cart.gift_certificates.code_label")} code={certificate.code} />
                                                </strong>
                                                <span>
                                                    {certificate.remaining.formatted} |{" "}
                                                    <a href={certificate.remove_url}>
                                                        <$Lang keyName={$string("cart.gift_certificates.remove")} />
                                                    </a>
                                                </span>
                                            </div>
                                            <div className="cart-total-value">{certificate.used.formatted}</div>
                                        </li>
                                    )}
                                />
                            )}
                        />
                        <li className={`cart-total ${$If({test: multi, $then: () => "cart-total-gift-certificate"})}`}>
                            <div className="cart-total-label">
                                <strong>
                                    <$Lang keyName={$string("cart.gift_certificates.gift_certificate")} />
                                    {colon(multi)}
                                </strong>
                                <$If test={multi} $then={() => place($partial("components/cart/gift-certificate"))} />
                            </div>
                            <$Unless test={multi} $then={() => place($partial("components/cart/gift-certificate"))} />
                            {place($partial("components/cart/gift-certificate-input"))}
                        </li>
                        <$If
                            test={multi}
                            $then={() => (
                                <$Each
                                    list={cart.gift_certificates}
                                    $then={(certificate) => (
                                        <li className="cart-total cart-total-gift-certificate-list-item">
                                            <div className="cart-total-label">
                                                <i className="icon" aria-hidden="true">
                                                    <svg>
                                                        <use href="#icon-gifts" />
                                                    </svg>
                                                </i>{" "}
                                                <span>{certificate.code}</span>{" "}
                                                <$If test={certificate.remaining.value} $then={() => <span>| {certificate.remaining.formatted} left</span>} />{" "}
                                                <a href={certificate.remove_url}>
                                                    <$Lang keyName={$string("cart.gift_certificates.remove")} />
                                                </a>
                                            </div>
                                            <div className="cart-total-value">{certificate.used.formatted}</div>
                                        </li>
                                    )}
                                />
                            )}
                        />
                    </>
                )}
            />
            <li className={`cart-total ${$If({test: multi, $then: () => "cart-total-with-savings"})}`}>
                <$If
                    test={multi}
                    $then={() => (
                        <>
                            <div className="cart-total-label">
                                <strong>
                                    <$Lang keyName={$string("cart.checkout.total")} />
                                </strong>
                            </div>
                            <div className="cart-total-value cart-total-grandTotal">
                                {$raw("{{#or customer (unless settings.hide_price_from_guests) }}")}
                                <span className="cart-total-amount">{cart.grand_total.formatted}</span>
                                <$If
                                    test={cart.total_discount.value}
                                    $then={() => (
                                        <span className="cart-total-savings">
                                            <$Lang keyName={$string("cart.checkout.you_saved")} /> <span className="cart-savings-amount">{cart.total_discount.formatted}</span>{" "}
                                            <$Lang keyName={$string("cart.checkout.in_total")} />
                                        </span>
                                    )}
                                />
                                {$raw("{{else}}")}
                                {place($partial("components/common/login-for-pricing"))}
                                {$raw("{{/or}}")}
                            </div>
                        </>
                    )}
                    $else={() => (
                        <>
                            <div className="cart-total-label">
                                <strong>
                                    <$Lang keyName={$string("cart.checkout.grand_total")} />:
                                </strong>
                            </div>
                            <div className="cart-total-value cart-total-grandTotal">
                                {$raw("{{#or customer (unless settings.hide_price_from_guests)}}")}
                                <span>{cart.grand_total.formatted}</span>
                                {$raw("{{else}}")}
                                {place($partial("components/common/login-for-pricing"))}
                                {$raw("{{/or}}")}
                            </div>
                        </>
                    )}
                />
            </li>
            <$Each
                list={cart.taxes}
                $then={(tax) => (
                    <$If
                        test={tax.included}
                        $then={() => (
                            <li className="cart-total">
                                <div className="cart-total-label">
                                    <strong>
                                        {$concat(tax.name, $lang($string("cart.included_in_total")))}
                                        {colon($pointer<boolean>("../cart.multi_coupon_ui_enabled"))}
                                    </strong>
                                </div>
                                <div className="cart-total-value">
                                    <span>{tax.cost.formatted}</span>
                                </div>
                            </li>
                        )}
                    />
                )}
            />
        </ul>
    );
};
