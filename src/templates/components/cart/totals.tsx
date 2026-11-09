import {$Each, $If, $Partial, $Unless, $if, $number, $string, $unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$concat, $getVar, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$All, $AssignVar, $Lang, $Neither, $Or} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {CartHint} from '@/context-cart';
import ShippingEstimatorTrigger from '@/templates/components/cart/shipping-estimator-trigger';
import CouponInput from '@/templates/components/cart/coupon-input';
import GiftCertificate from '@/templates/components/cart/gift-certificate';
import GiftCertificateInput from '@/templates/components/cart/gift-certificate-input';

export default $asPartial<{
    cart: CartHint['cart'];
    customer: CartHint['customer'];
    settings: CartHint['settings'];
    urls: CartHint['urls'];
}>(({cart, customer, settings, urls}) => (
    <ul className={`cart-totals ${$if(cart.multi_coupon_ui_enabled).then(() => $$raw('cart-total-enhanced'))}`}>
        <li className="cart-total">
            <div className="cart-total-label">
                <strong>
                    <$Lang translationKey={$string('cart.checkout.subtotal')}/>
                    <$Unless query={[cart.multi_coupon_ui_enabled]} $then={() => <>:</>}/>
                </strong>
            </div>
            <div className="cart-total-value">
                <$Or
                    values={[customer, $unless(settings.hide_price_from_guests)]}
                    $then={() => <span>{cart.sub_total.formatted}</span>}
                    $else={() => <$Partial name="components/common/login-for-pricing"/>}
                />
            </div>
        </li>
        <$If
            query={[cart.multi_coupon_ui_enabled]}
            $then={() => (
                <$Or
                    values={[cart.coupons, cart.display_discount_total.value]}
                    $then={() => (
                        <div className="cart-total cart-total-discounts">
                            <div className="cart-total-label" data-discount-toggle="">
                                <strong>
                                    <$Lang translationKey={$string('cart.discounts')}/>
                                </strong>
                                <i className="icon cart-discount-icon" aria-hidden="true">
                                    <svg>
                                        <use href="#icon-keyboard-arrow-up"/>
                                    </svg>
                                </i>
                            </div>
                            <div className="cart-total-value" data-discount-toggle="">
                                <span>{cart.display_discount_total.formatted}</span>
                            </div>
                            <ul data-discount-details="" className="cart-discount-list">
                                <$If
                                    query={[cart.order_based_auto_discount_total.value]}
                                    $then={() => (
                                        <li className="cart-discount-item">
                                            <div className="cart-discount-item-label">
                                                <i className="icon" aria-hidden="true">
                                                    <svg>
                                                        <use href="#icon-promotions"/>
                                                    </svg>
                                                </i>
                                                <span className="cart-coupon-name">
                                                    <$Lang translationKey={$string('cart.automatic_discount')}/>
                                                    <$If
                                                        query={[cart.order_based_auto_discount_max_limit_reached]}
                                                        $then={() => (
                                                            <span className="cart-coupon-limit">
                                                                <$Lang translationKey={$string('cart.coupons.maximum_discount_applied')}/>
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
                                    query={[cart.manual_discount_total.value]}
                                    $then={() => (
                                        <li className="cart-discount-item">
                                            <div className="cart-discount-item-label">
                                                <i className="icon" aria-hidden="true">
                                                    <svg>
                                                        <use href="#icon-promotions"/>
                                                    </svg>
                                                </i>
                                                <span className="cart-coupon-name">
                                                    <$Lang translationKey={$string('cart.manual_discount')}/>
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
                                                        <use href="#icon-promotions"/>
                                                    </svg>
                                                </i>
                                                <span className="cart-coupon-name">
                                                    <$If
                                                        query={[coupon.display_name]}
                                                        $then={() => (
                                                            <>
                                                                {coupon.display_name} ({coupon.code})
                                                            </>
                                                        )}
                                                        $else={() => <>{coupon.code}</>}
                                                    />
                                                    <$If
                                                        query={[coupon.has_max_limit_reached]}
                                                        $then={() => (
                                                            <span className="cart-coupon-limit">
                                                                <$Lang translationKey={$string('cart.coupons.maximum_discount_applied')}/>
                                                            </span>
                                                        )}
                                                    />
                                                </span>
                                            </div>
                                            <div className="cart-discount-item-value">
                                                <$If query={[coupon.discount.value, '===', $number(0)]} $then={() => <>-</>}/>
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
            query={[cart.gift_wrapping_cost.value]}
            $then={() => (
                <li className="cart-total">
                    <div className="cart-total-label">
                        <strong>
                            <$Lang translationKey={$string('cart.checkout.gift_wrapping')}/>
                            <$Unless query={[cart.multi_coupon_ui_enabled]} $then={() => <>:</>}/>
                        </strong>
                    </div>
                    <div className="cart-total-value">
                        <span>{cart.gift_wrapping_cost.formatted}</span>
                    </div>
                </li>
            )}
        />
        <$If
            query={[cart.fees]}
            $then={() => (
                <$Each
                    list={cart.fees}
                    $then={(fee) => (
                        <li className="cart-total">
                            <div className="cart-total-label">
                                <strong>
                                    {fee.display_name}
                                    <$Unless query={[cart.multi_coupon_ui_enabled]} $then={() => <>:</>}/>
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
            query={[cart.shipping_handling.show_estimator]}
            $then={() => (
                <>
                    <$AssignVar keyName={$string('hasBackorderedItem')} value={$number(0)}/>
                    <$Each
                        list={cart.items}
                        $then={(item) => (
                            <>
                                <$If
                                    query={[item.stock_position.quantity_backordered]}
                                    $then={() => <$AssignVar keyName={$string('hasBackorderedItem')} value={$number(1)}/>}
                                />
                                <$Each
                                    list={item.options}
                                    $then={(option) => (
                                        <$If
                                            query={[option.linked_bundled_item.stock_position.quantity_backordered]}
                                            $then={() => <$AssignVar keyName={$string('hasBackorderedItem')} value={$number(1)}/>}
                                        />
                                    )}
                                />
                            </>
                        )}
                    />
                    <li className={`cart-total ${$if(cart.multi_coupon_ui_enabled).then(() => $$raw('cart-total-shipping-estimator'))}`}>
                        <div className="cart-total-label">
                            <strong>
                                <$Lang translationKey={$string('cart.checkout.shipping')}/>
                                <$Unless query={[cart.multi_coupon_ui_enabled]} $then={() => <>:</>}/>
                            </strong>
                            <$If
                                query={[cart.multi_coupon_ui_enabled]}
                                $then={() => <ShippingEstimatorTrigger cart={cart}/>}
                            />
                        </div>
                        <$Neither
                            a={cart.multi_coupon_ui_enabled}
                            b={cart.shipping_handling.shipping_cost}
                            $then={() => <ShippingEstimatorTrigger cart={cart}/>}
                        />
                        <$Partial
                            name="components/cart/shipping-estimator"
                            context={cart.shipping_handling}
                            hash={{multi_coupon_ui_enabled: cart.multi_coupon_ui_enabled}}
                        />
                        <$All
                            values={[cart.inventory_settings.show_default_shipping_expectation_prompt, $getVar($string('hasBackorderedItem'))]}
                            $then={() => (
                                <p className="cart-shipping-expectation-message">
                                    {cart.inventory_settings.default_shipping_expectation_prompt}
                                </p>
                            )}
                        />
                    </li>
                </>
            )}
        />
        <$Each
            list={cart.taxes}
            $then={(tax) => (
                <$Unless
                    query={[tax.included]}
                    $then={() => (
                        <li className="cart-total">
                            <div className="cart-total-label">
                                <strong>
                                    {tax.name}
                                    <$Unless query={[cart.multi_coupon_ui_enabled]} $then={() => <>:</>}/>
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
            query={[cart.multi_coupon_ui_enabled]}
            $then={() => (
                <>
                    <$If
                        query={[cart.discount]}
                        $then={() => (
                            <li className="cart-total">
                                <div className="cart-total-label">
                                    <strong>
                                        <$Lang translationKey={$string('cart.discount')}/>:
                                    </strong>
                                </div>
                                <div className="cart-total-value">{cart.discount.formatted}</div>
                            </li>
                        )}
                    />
                    <$If
                        query={[cart.coupons]}
                        $then={() => (
                            <$Each
                                list={cart.coupons}
                                $then={(coupon) => (
                                    <li className="cart-total">
                                        <div className="cart-total-label">
                                            <strong>
                                                <$Lang translationKey={$string('cart.coupons.code_label')} params={{code: coupon.code}}/>
                                            </strong>
                                            <div>
                                                <a href={coupon.remove_url}>
                                                    <$Lang translationKey={$string('cart.coupons.remove')}/>
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
                                        <$Lang translationKey={$string('cart.coupon_code')}/>:
                                    </strong>
                                </div>
                                <CouponInput urls={urls}/>
                            </li>
                        )}
                    />
                </>
            )}
        />
        <$If
            query={[settings.gift_certificates_enabled]}
            $then={() => (
                <>
                    <$Unless
                        query={[cart.multi_coupon_ui_enabled]}
                        $then={() => (
                            <$Each
                                list={cart.gift_certificates}
                                $then={(certificate) => (
                                    <li className="cart-total">
                                        <div className="cart-total-label">
                                            <strong>
                                                <$Lang translationKey={$string('cart.gift_certificates.code_label')} params={{code: certificate.code}}/>
                                            </strong>
                                            <span>
                                                {certificate.remaining.formatted} | <a href={certificate.remove_url}>
                                                    <$Lang translationKey={$string('cart.gift_certificates.remove')}/>
                                                </a>
                                            </span>
                                        </div>
                                        <div className="cart-total-value">{certificate.used.formatted}</div>
                                    </li>
                                )}
                            />
                        )}
                    />
                    <li className={`cart-total ${$if(cart.multi_coupon_ui_enabled).then(() => $$raw('cart-total-gift-certificate'))}`}>
                        <div className="cart-total-label">
                            <strong>
                                <$Lang translationKey={$string('cart.gift_certificates.gift_certificate')}/>
                                <$Unless query={[cart.multi_coupon_ui_enabled]} $then={() => <>:</>}/>
                            </strong>
                            <$If
                                query={[cart.multi_coupon_ui_enabled]}
                                $then={() => <GiftCertificate cart={cart}/>}
                            />
                        </div>
                        <$Unless
                            query={[cart.multi_coupon_ui_enabled]}
                            $then={() => <GiftCertificate cart={cart}/>}
                        />
                        <GiftCertificateInput urls={urls}/>
                    </li>
                    <$If
                        query={[cart.multi_coupon_ui_enabled]}
                        $then={() => (
                            <$Each
                                list={cart.gift_certificates}
                                $then={(certificate) => (
                                    <li className="cart-total cart-total-gift-certificate-list-item">
                                        <div className="cart-total-label">
                                            <i className="icon" aria-hidden="true">
                                                <svg>
                                                    <use href="#icon-gifts"/>
                                                </svg>
                                            </i>
                                            <span>{certificate.code}</span>
                                            <$If
                                                query={[certificate.remaining.value]}
                                                $then={() => <span>| {certificate.remaining.formatted} left</span>}
                                            />
                                            <a href={certificate.remove_url}>
                                                <$Lang translationKey={$string('cart.gift_certificates.remove')}/>
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
        <li className={`cart-total ${$if(cart.multi_coupon_ui_enabled).then(() => $$raw('cart-total-with-savings'))}`}>
            <$If
                query={[cart.multi_coupon_ui_enabled]}
                $then={() => (
                    <>
                        <div className="cart-total-label">
                            <strong>
                                <$Lang translationKey={$string('cart.checkout.total')}/>
                            </strong>
                        </div>
                        <div className="cart-total-value cart-total-grandTotal">
                            <$Or
                                values={[customer, $unless(settings.hide_price_from_guests)]}
                                $then={() => (
                                    <>
                                        <span className="cart-total-amount">{cart.grand_total.formatted}</span>
                                        <$If
                                            query={[cart.total_discount.value]}
                                            $then={() => (
                                                <span className="cart-total-savings">
                                                    <$Lang translationKey={$string('cart.checkout.you_saved')}/>{' '}
                                                    <span className="cart-savings-amount">{cart.total_discount.formatted}</span>{' '}
                                                    <$Lang translationKey={$string('cart.checkout.in_total')}/>
                                                </span>
                                            )}
                                        />
                                    </>
                                )}
                                $else={() => <$Partial name="components/common/login-for-pricing"/>}
                            />
                        </div>
                    </>
                )}
                $else={() => (
                    <>
                        <div className="cart-total-label">
                            <strong>
                                <$Lang translationKey={$string('cart.checkout.grand_total')}/>:
                            </strong>
                        </div>
                        <div className="cart-total-value cart-total-grandTotal">
                            <$Or
                                values={[customer, $unless(settings.hide_price_from_guests)]}
                                $then={() => <span>{cart.grand_total.formatted}</span>}
                                $else={() => <$Partial name="components/common/login-for-pricing"/>}
                            />
                        </div>
                    </>
                )}
            />
        </li>
        <$Each
            list={cart.taxes}
            $then={(tax) => (
                <$If
                    query={[tax.included]}
                    $then={() => (
                        <li className="cart-total">
                            <div className="cart-total-label">
                                <strong>
                                    {$concat(tax.name, $lang($string('cart.included_in_total')))}
                                    <$Unless query={[cart.multi_coupon_ui_enabled]} $then={() => <>:</>}/>
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
));
