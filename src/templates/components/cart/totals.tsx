/**
 * Source: templates/components/cart/totals.html (259 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
    /* html L1: <ul class="cart-totals {{#if cart.multi_coupon_ui_enabled}}cart-total-enhanced{{/if}}"> */
    <ul className={`cart-totals ${$if(cart.multi_coupon_ui_enabled).then(() => $$raw('cart-total-enhanced'))}`}>
        {/* html L2: <li class="cart-total"> */}
        <li className="cart-total">
            {/* html L3: <div class="cart-total-label"> */}
            <div className="cart-total-label">
                {/* html L4: <strong>{{lang 'cart.checkout.subtotal'}}{{#unless cart.multi_coupon_ui_enabled}}:{{/unless}}</strong> */}
                <strong>
                    {/* html L4: {{lang 'cart.checkout.subtotal'}} */}
                    <$Lang translationKey={$string('cart.checkout.subtotal')}/>
                    {/* html L4: {{#unless cart.multi_coupon_ui_enabled}} */}
                    <$Unless query={[cart.multi_coupon_ui_enabled]} $then={() => <>:</>}/>
                </strong>
            </div>
            {/* html L6: <div class="cart-total-value"> */}
            <div className="cart-total-value">
                {/* html L7: {{#or customer (unless settings.hide_price_from_guests)}} */}
                <$Or
                    values={[customer, $unless(settings.hide_price_from_guests)]}
                    $then={() => /* html L8: <span>{{cart.sub_total.formatted}}</span> */ <span>{/* html L8: {{cart.sub_total.formatted}} */}{cart.sub_total.formatted}</span>}
                    $else={() => /* html L9: {{else}}
                                                                        html L10: {{> components/common/login-for-pricing}}
                                 */ <$Partial name="components/common/login-for-pricing"/>}
                />
            </div>
        </li>
        {/* html L14: {{#if cart.multi_coupon_ui_enabled}} */}
        <$If
            query={[cart.multi_coupon_ui_enabled]}
            $then={() => (
                /* html L15: {{#or cart.coupons cart.display_discount_total.value}} */
                <$Or
                    values={[cart.coupons, cart.display_discount_total.value]}
                    $then={() => (
                        /* html L16: <div class="cart-total cart-total-discounts"> */
                        <div className="cart-total cart-total-discounts">
                            {/* html L17: <div class="cart-total-label" data-discount-toggle> */}
                            <div className="cart-total-label" data-discount-toggle="">
                                {/* html L18: <strong>{{lang 'cart.discounts'}}</strong> */}
                                <strong>
                                    {/* html L18: {{lang 'cart.discounts'}} */}
                                    <$Lang translationKey={$string('cart.discounts')}/>
                                </strong>
                                {/* html L19: <i class="icon cart-discount-icon" aria-hidden="true"><svg><use href="#icon-keyboard-arrow-up" /></svg></i> */}
                                <i className="icon cart-discount-icon" aria-hidden="true">
                                    {/* html L19: <svg> */}
                                    <svg>
                                        {/* html L19: <use href="#icon-keyboard-arrow-up" /> */}
                                        <use href="#icon-keyboard-arrow-up"/>
                                    </svg>
                                </i>
                            </div>
                            {/* html L21: <div class="cart-total-value" data-discount-toggle> */}
                            <div className="cart-total-value" data-discount-toggle="">
                                {/* html L22: <span>{{cart.display_discount_total.formatted}}</span> */}
                                <span>{/* html L22: {{cart.display_discount_total.formatted}} */}{cart.display_discount_total.formatted}</span>
                            </div>
                            {/* html L24: <ul data-discount-details class="cart-discount-list"> */}
                            <ul data-discount-details="" className="cart-discount-list">
                                {/* html L25: {{#if cart.order_based_auto_discount_total.value}} */}
                                <$If
                                    query={[cart.order_based_auto_discount_total.value]}
                                    $then={() => (
                                        /* html L26: <li class="cart-discount-item"> */
                                        <li className="cart-discount-item">
                                            {/* html L27: <div class="cart-discount-item-label"> */}
                                            <div className="cart-discount-item-label">
                                                {/* html L28: <i class="icon" aria-hidden="true"><svg><use href="#icon-promotions" /></svg></i> */}
                                                <i className="icon" aria-hidden="true">
                                                    {/* html L28: <svg> */}
                                                    <svg>
                                                        {/* html L28: <use href="#icon-promotions" /> */}
                                                        <use href="#icon-promotions"/>
                                                    </svg>
                                                </i>
                                                {/* html L29: <span class="cart-coupon-name"> */}
                                                <span className="cart-coupon-name">
                                                    {/* html L30: {{lang 'cart.automatic_discount'}} */}
                                                    <$Lang translationKey={$string('cart.automatic_discount')}/>
                                                    {/* html L31: {{#if cart.order_based_auto_discount_max_limit_reached}} */}
                                                    <$If
                                                        query={[cart.order_based_auto_discount_max_limit_reached]}
                                                        $then={() => (
                                                            /* html L32: <span class="cart-coupon-limit">{{lang 'cart.coupons.maximum_discount_applied'}}</span> */
                                                            <span className="cart-coupon-limit">
                                                                {/* html L32: {{lang 'cart.coupons.maximum_discount_applied'}} */}
                                                                <$Lang translationKey={$string('cart.coupons.maximum_discount_applied')}/>
                                                            </span>
                                                        )}
                                                    />
                                                </span>
                                            </div>
                                            {/* html L36: <div class="cart-discount-item-value"> */}
                                            <div className="cart-discount-item-value">{/* html L37: {{cart.order_based_auto_discount_total.formatted}} */}{cart.order_based_auto_discount_total.formatted}</div>
                                        </li>
                                    )}
                                />
                                {/* html L41: {{#if cart.manual_discount_total.value}} */}
                                <$If
                                    query={[cart.manual_discount_total.value]}
                                    $then={() => (
                                        /* html L42: <li class="cart-discount-item"> */
                                        <li className="cart-discount-item">
                                            {/* html L43: <div class="cart-discount-item-label"> */}
                                            <div className="cart-discount-item-label">
                                                {/* html L44: <i class="icon" aria-hidden="true"><svg><use href="#icon-promotions" /></svg></i> */}
                                                <i className="icon" aria-hidden="true">
                                                    {/* html L44: <svg> */}
                                                    <svg>
                                                        {/* html L44: <use href="#icon-promotions" /> */}
                                                        <use href="#icon-promotions"/>
                                                    </svg>
                                                </i>
                                                {/* html L45: <span class="cart-coupon-name">{{lang 'cart.manual_discount'}}</span> */}
                                                <span className="cart-coupon-name">
                                                    {/* html L45: {{lang 'cart.manual_discount'}} */}
                                                    <$Lang translationKey={$string('cart.manual_discount')}/>
                                                </span>
                                            </div>
                                            {/* html L47: <div class="cart-discount-item-value"> */}
                                            <div className="cart-discount-item-value">{/* html L48: {{cart.manual_discount_total.formatted}} */}{cart.manual_discount_total.formatted}</div>
                                        </li>
                                    )}
                                />
                                {/* html L52: {{#each cart.coupons}} */}
                                <$Each
                                    list={cart.coupons}
                                    $then={(coupon) => (
                                        /* html L53: <li class="cart-discount-item"> */
                                        <li className="cart-discount-item">
                                            {/* html L54: <div class="cart-discount-item-label"> */}
                                            <div className="cart-discount-item-label">
                                                {/* html L55: <i class="icon" aria-hidden="true"><svg><use href="#icon-promotions" /></svg></i> */}
                                                <i className="icon" aria-hidden="true">
                                                    {/* html L55: <svg> */}
                                                    <svg>
                                                        {/* html L55: <use href="#icon-promotions" /> */}
                                                        <use href="#icon-promotions"/>
                                                    </svg>
                                                </i>
                                                {/* html L56: <span class="cart-coupon-name"> */}
                                                <span className="cart-coupon-name">
                                                    {/* html L57: {{#if display_name}} */}
                                                    <$If
                                                        query={[coupon.display_name]}
                                                        $then={() => (
                                                            <>
                                                                {/* html L58: {{display_name}} ({{code}}) */}
                                                                {coupon.display_name} ({/* html L58: {{code}} */}{coupon.code})
                                                            </>
                                                        )}
                                                        $else={() => <>{/* html L59: {{else}}
                                                                                                                                                    html L60: {{code}}
                                                                       */}{coupon.code}</>}
                                                    />
                                                    {/* html L62: {{#if has_max_limit_reached}} */}
                                                    <$If
                                                        query={[coupon.has_max_limit_reached]}
                                                        $then={() => (
                                                            /* html L63: <span class="cart-coupon-limit">{{lang 'cart.coupons.maximum_discount_applied'}}</span> */
                                                            <span className="cart-coupon-limit">
                                                                {/* html L63: {{lang 'cart.coupons.maximum_discount_applied'}} */}
                                                                <$Lang translationKey={$string('cart.coupons.maximum_discount_applied')}/>
                                                            </span>
                                                        )}
                                                    />
                                                </span>
                                            </div>
                                            {/* html L67: <div class="cart-discount-item-value"> */}
                                            <div className="cart-discount-item-value">
                                                {/* html L68: {{#if discount.value '===' 0}}-{{/if}}{{discount.formatted}} */}
                                                <$If query={[coupon.discount.value, '===', $number(0)]} $then={() => <>-</>}/>
                                                {/* html L68: {{discount.formatted}} */}
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
        {/* html L76: {{#if cart.gift_wrapping_cost.value}} */}
        <$If
            query={[cart.gift_wrapping_cost.value]}
            $then={() => (
                /* html L77: <li class="cart-total"> */
                <li className="cart-total">
                    {/* html L78: <div class="cart-total-label"> */}
                    <div className="cart-total-label">
                        {/* html L79: <strong>{{lang 'cart.checkout.gift_wrapping'}}{{#unless cart.multi_coupon_ui_enabled}}:{{/unless}}</strong> */}
                        <strong>
                            {/* html L79: {{lang 'cart.checkout.gift_wrapping'}} */}
                            <$Lang translationKey={$string('cart.checkout.gift_wrapping')}/>
                            {/* html L79: {{#unless cart.multi_coupon_ui_enabled}} */}
                            <$Unless query={[cart.multi_coupon_ui_enabled]} $then={() => <>:</>}/>
                        </strong>
                    </div>
                    {/* html L81: <div class="cart-total-value"> */}
                    <div className="cart-total-value">
                        {/* html L82: <span>{{cart.gift_wrapping_cost.formatted}}</span> */}
                        <span>{/* html L82: {{cart.gift_wrapping_cost.formatted}} */}{cart.gift_wrapping_cost.formatted}</span>
                    </div>
                </li>
            )}
        />
        {/* html L86: {{#if cart.fees}} */}
        <$If
            query={[cart.fees]}
            $then={() => (
                /* html L87: {{#each cart.fees}} */
                <$Each
                    list={cart.fees}
                    $then={(fee) => (
                        /* html L88: <li class="cart-total"> */
                        <li className="cart-total">
                            {/* html L89: <div class="cart-total-label"> */}
                            <div className="cart-total-label">
                                {/* html L90: <strong>{{display_name}}{{#unless ../cart.multi_coupon_ui_enabled}}:{{/unless}}</strong> */}
                                <strong>
                                    {/* html L90: {{display_name}} */}
                                    {fee.display_name}
                                    {/* html L90: {{#unless ../cart.multi_coupon_ui_enabled}} */}
                                    <$Unless query={[cart.multi_coupon_ui_enabled]} $then={() => <>:</>}/>
                                </strong>
                            </div>
                            {/* html L92: <div class="cart-total-value"> */}
                            <div className="cart-total-value">
                                {/* html L93: <span>{{cost.formatted}}</span> */}
                                <span>{/* html L93: {{cost.formatted}} */}{fee.cost.formatted}</span>
                            </div>
                        </li>
                    )}
                />
            )}
        />
        {/* html L98: {{#if cart.shipping_handling.show_estimator}} */}
        <$If
            query={[cart.shipping_handling.show_estimator]}
            $then={() => (
                <>
                    {/* html L99: {{assignVar "hasBackorderedItem" 0}} */}
                    <$AssignVar keyName={$string('hasBackorderedItem')} value={$number(0)}/>
                    {/* html L100: {{#each cart.items}} */}
                    <$Each
                        list={cart.items}
                        $then={(item) => (
                            <>
                                {/* html L101: {{#if stock_position.quantity_backordered}} */}
                                <$If
                                    query={[item.stock_position.quantity_backordered]}
                                    $then={() => /* html L102: {{assignVar "hasBackorderedItem" 1}} */ <$AssignVar keyName={$string('hasBackorderedItem')} value={$number(1)}/>}
                                />
                                {/* html L104: {{#each options}} */}
                                <$Each
                                    list={item.options}
                                    $then={(option) => (
                                        /* html L105: {{#if linked_bundled_item.stock_position.quantity_backordered}} */
                                        <$If
                                            query={[option.linked_bundled_item.stock_position.quantity_backordered]}
                                            $then={() => /* html L106: {{assignVar "hasBackorderedItem" 1}} */ <$AssignVar keyName={$string('hasBackorderedItem')} value={$number(1)}/>}
                                        />
                                    )}
                                />
                            </>
                        )}
                    />
                    {/* html L110: <li class="cart-total {{#if cart.multi_coupon_ui_enabled}}cart-total-shipping-estimator{{/if}}"> */}
                    <li className={`cart-total ${$if(cart.multi_coupon_ui_enabled).then(() => $$raw('cart-total-shipping-estimator'))}`}>
                        {/* html L111: <div class="cart-total-label"> */}
                        <div className="cart-total-label">
                            {/* html L112: <strong>{{lang 'cart.checkout.shipping'}}{{#unless cart.multi_coupon_ui_enabled}}:{{/unless}}</strong> */}
                            <strong>
                                {/* html L112: {{lang 'cart.checkout.shipping'}} */}
                                <$Lang translationKey={$string('cart.checkout.shipping')}/>
                                {/* html L112: {{#unless cart.multi_coupon_ui_enabled}} */}
                                <$Unless query={[cart.multi_coupon_ui_enabled]} $then={() => <>:</>}/>
                            </strong>
                            {/* html L113: {{#if cart.multi_coupon_ui_enabled}} */}
                            <$If
                                query={[cart.multi_coupon_ui_enabled]}
                                $then={() => /* html L114: {{> components/cart/shipping-estimator-trigger}} */ <ShippingEstimatorTrigger cart={cart}/>}
                            />
                        </div>
                        {/* html L117: {{#neither cart.multi_coupon_ui_enabled cart.shipping_handling.shipping_cost}} */}
                        <$Neither
                            a={cart.multi_coupon_ui_enabled}
                            b={cart.shipping_handling.shipping_cost}
                            $then={() => /* html L118: {{> components/cart/shipping-estimator-trigger}} */ <ShippingEstimatorTrigger cart={cart}/>}
                        />
                        {/* html L120: {{> components/cart/shipping-estimator cart.shipping_handling multi_coupon_ui_enabled=cart.multi_coupon_ui_enabled}} */}
                        <$Partial
                            name="components/cart/shipping-estimator"
                            context={cart.shipping_handling}
                            hash={{multi_coupon_ui_enabled: cart.multi_coupon_ui_enabled}}
                        />
                        {/* html L121: {{#all cart.inventory_settings.show_default_shipping_expectation_prompt (getVar "hasBackorderedItem")}} */}
                        <$All
                            values={[cart.inventory_settings.show_default_shipping_expectation_prompt, $getVar($string('hasBackorderedItem'))]}
                            $then={() => (
                                /* html L122: <p class="cart-shipping-expectation-message">{{cart.inventory_settings.default_shipping_expectation_prompt}}</p> */
                                <p className="cart-shipping-expectation-message">
                                    {/* html L122: {{cart.inventory_settings.default_shipping_expectation_prompt}} */}
                                    {cart.inventory_settings.default_shipping_expectation_prompt}
                                </p>
                            )}
                        />
                    </li>
                </>
            )}
        />
        {/* html L126: {{#each cart.taxes}} */}
        <$Each
            list={cart.taxes}
            $then={(tax) => (
                /* html L127: {{#unless included}} */
                <$Unless
                    query={[tax.included]}
                    $then={() => (
                        /* html L128: <li class="cart-total"> */
                        <li className="cart-total">
                            {/* html L129: <div class="cart-total-label"> */}
                            <div className="cart-total-label">
                                {/* html L130: <strong>{{name}}{{#unless ../cart.multi_coupon_ui_enabled}}:{{/unless}}</strong> */}
                                <strong>
                                    {/* html L130: {{name}} */}
                                    {tax.name}
                                    {/* html L130: {{#unless ../cart.multi_coupon_ui_enabled}} */}
                                    <$Unless query={[cart.multi_coupon_ui_enabled]} $then={() => <>:</>}/>
                                </strong>
                            </div>
                            {/* html L132: <div class="cart-total-value"> */}
                            <div className="cart-total-value">
                                {/* html L133: <span>{{cost.formatted}}</span> */}
                                <span>{/* html L133: {{cost.formatted}} */}{tax.cost.formatted}</span>
                            </div>
                        </li>
                    )}
                />
            )}
        />
        {/* html L138: {{#unless cart.multi_coupon_ui_enabled}} */}
        <$Unless
            query={[cart.multi_coupon_ui_enabled]}
            $then={() => (
                <>
                    {/* html L139: {{#if cart.discount }} */}
                    <$If
                        query={[cart.discount]}
                        $then={() => (
                            /* html L140: <li class="cart-total"> */
                            <li className="cart-total">
                                {/* html L141: <div class="cart-total-label"> */}
                                <div className="cart-total-label">
                                    {/* html L142: <strong>{{lang 'cart.discount'}}:</strong> */}
                                    <strong>
                                        {/* html L142: {{lang 'cart.discount'}} */}
                                        <$Lang translationKey={$string('cart.discount')}/>:
                                    </strong>
                                </div>
                                {/* html L144: <div class="cart-total-value"> */}
                                <div className="cart-total-value">{/* html L145: {{cart.discount.formatted}} */}{cart.discount.formatted}</div>
                            </li>
                        )}
                    />
                    {/* html L149: {{#if cart.coupons}} */}
                    <$If
                        query={[cart.coupons]}
                        $then={() => (
                            /* html L150: {{#each cart.coupons}} */
                            <$Each
                                list={cart.coupons}
                                $then={(coupon) => (
                                    /* html L151: <li class="cart-total"> */
                                    <li className="cart-total">
                                        {/* html L152: <div class="cart-total-label"> */}
                                        <div className="cart-total-label">
                                            {/* html L153: <strong>{{lang 'cart.coupons.code_label' code=code}}</strong> */}
                                            <strong>
                                                {/* html L153: {{lang 'cart.coupons.code_label' code=code}} */}
                                                <$Lang translationKey={$string('cart.coupons.code_label')} params={{code: coupon.code}}/>
                                            </strong>
                                            {/* html L154: <div> */}
                                            <div>
                                                {/* html L155: <a href="{{remove_url}}">{{lang 'cart.coupons.remove'}}</a> */}
                                                <a href={coupon.remove_url}>
                                                    {/* html L155: {{lang 'cart.coupons.remove'}} */}
                                                    <$Lang translationKey={$string('cart.coupons.remove')}/>
                                                </a>
                                            </div>
                                        </div>
                                        {/* html L158: <div class="cart-total-value"> */}
                                        <div className="cart-total-value">
                                            {/* html L159: <span>{{discount.formatted}}</span> */}
                                            <span>{/* html L159: {{discount.formatted}} */}{coupon.discount.formatted}</span>
                                        </div>
                                    </li>
                                )}
                            />
                        )}
                        $else={() => (
                            /* html L163: {{else}}
                                                              html L164: <li class="cart-total">
                            */
                            <li className="cart-total">
                                {/* html L165: <div class="cart-total-label"> */}
                                <div className="cart-total-label">
                                    {/* html L166: <strong>{{lang 'cart.coupon_code'}}:</strong> */}
                                    <strong>
                                        {/* html L166: {{lang 'cart.coupon_code'}} */}
                                        <$Lang translationKey={$string('cart.coupon_code')}/>:
                                    </strong>
                                </div>
                                {/* html L168: {{> components/cart/coupon-input}} */}
                                <CouponInput urls={urls}/>
                            </li>
                        )}
                    />
                </>
            )}
        />
        {/* html L172: {{#if settings.gift_certificates_enabled}} */}
        <$If
            query={[settings.gift_certificates_enabled]}
            $then={() => (
                <>
                    {/* html L173: {{#unless cart.multi_coupon_ui_enabled}} */}
                    <$Unless
                        query={[cart.multi_coupon_ui_enabled]}
                        $then={() => (
                            /* html L174: {{#each cart.gift_certificates}} */
                            <$Each
                                list={cart.gift_certificates}
                                $then={(certificate) => (
                                    /* html L175: <li class="cart-total"> */
                                    <li className="cart-total">
                                        {/* html L176: <div class="cart-total-label"> */}
                                        <div className="cart-total-label">
                                            {/* html L177: <strong>{{lang 'cart.gift_certificates.code_label' code=code}}</strong> */}
                                            <strong>
                                                {/* html L177: {{lang 'cart.gift_certificates.code_label' code=code}} */}
                                                <$Lang translationKey={$string('cart.gift_certificates.code_label')} params={{code: certificate.code}}/>
                                            </strong>
                                            {/* html L178: <span> */}
                                            <span>
                                                {/* html L179: {{remaining.formatted}} | <a href="{{remove_url}}">{{lang 'cart.gift_certificates.remove'}}</a> */}
                                                {certificate.remaining.formatted} | {/* html L179: <a href="{{remove_url}}"> */}<a href={certificate.remove_url}>
                                                    {/* html L179: {{lang 'cart.gift_certificates.remove'}} */}
                                                    <$Lang translationKey={$string('cart.gift_certificates.remove')}/>
                                                </a>
                                            </span>
                                        </div>
                                        {/* html L182: <div class="cart-total-value"> */}
                                        <div className="cart-total-value">{/* html L183: {{used.formatted}} */}{certificate.used.formatted}</div>
                                    </li>
                                )}
                            />
                        )}
                    />
                    {/* html L188: <li class="cart-total {{#if cart.multi_coupon_ui_enabled}}cart-total-gift-certificate{{/if}}"> */}
                    <li className={`cart-total ${$if(cart.multi_coupon_ui_enabled).then(() => $$raw('cart-total-gift-certificate'))}`}>
                        {/* html L189: <div class="cart-total-label"> */}
                        <div className="cart-total-label">
                            {/* html L190: <strong>{{lang 'cart.gift_certificates.gift_certificate'}}{{#unless cart.multi_coupon_ui_enabled}}:{{/unless}}</strong> */}
                            <strong>
                                {/* html L190: {{lang 'cart.gift_certificates.gift_certificate'}} */}
                                <$Lang translationKey={$string('cart.gift_certificates.gift_certificate')}/>
                                {/* html L190: {{#unless cart.multi_coupon_ui_enabled}} */}
                                <$Unless query={[cart.multi_coupon_ui_enabled]} $then={() => <>:</>}/>
                            </strong>
                            {/* html L191: {{#if cart.multi_coupon_ui_enabled}} */}
                            <$If
                                query={[cart.multi_coupon_ui_enabled]}
                                $then={() => /* html L192: {{> components/cart/gift-certificate}} */ <GiftCertificate cart={cart}/>}
                            />
                        </div>
                        {/* html L195: {{#unless cart.multi_coupon_ui_enabled}} */}
                        <$Unless
                            query={[cart.multi_coupon_ui_enabled]}
                            $then={() => /* html L196: {{> components/cart/gift-certificate}} */ <GiftCertificate cart={cart}/>}
                        />
                        {/* html L198: {{> components/cart/gift-certificate-input}} */}
                        <GiftCertificateInput urls={urls}/>
                    </li>
                    {/* html L200: {{#if cart.multi_coupon_ui_enabled}} */}
                    <$If
                        query={[cart.multi_coupon_ui_enabled]}
                        $then={() => (
                            /* html L201: {{#each cart.gift_certificates}} */
                            <$Each
                                list={cart.gift_certificates}
                                $then={(certificate) => (
                                    /* html L202: <li class="cart-total cart-total-gift-certificate-list-item"> */
                                    <li className="cart-total cart-total-gift-certificate-list-item">
                                        {/* html L203: <div class="cart-total-label"> */}
                                        <div className="cart-total-label">
                                            {/* html L204: <i class="icon" aria-hidden="true"><svg><use href="#icon-gifts" /></svg></i> */}
                                            <i className="icon" aria-hidden="true">
                                                {/* html L204: <svg> */}
                                                <svg>
                                                    {/* html L204: <use href="#icon-gifts" /> */}
                                                    <use href="#icon-gifts"/>
                                                </svg>
                                            </i>
                                            {/* html L205: <span>{{code}}</span> */}
                                            <span>{/* html L205: {{code}} */}{certificate.code}</span>
                                            {/* html L206: {{#if remaining.value}} */}
                                            <$If
                                                query={[certificate.remaining.value]}
                                                $then={() => /* html L207: <span>| {{remaining.formatted}} left</span> */ <span>| {/* html L207: {{remaining.formatted}} */}{certificate.remaining.formatted} left</span>}
                                            />
                                            {/* html L209: <a href="{{remove_url}}">{{lang 'cart.gift_certificates.remove'}}</a> */}
                                            <a href={certificate.remove_url}>
                                                {/* html L209: {{lang 'cart.gift_certificates.remove'}} */}
                                                <$Lang translationKey={$string('cart.gift_certificates.remove')}/>
                                            </a>
                                        </div>
                                        {/* html L211: <div class="cart-total-value"> */}
                                        <div className="cart-total-value">{/* html L212: {{used.formatted}} */}{certificate.used.formatted}</div>
                                    </li>
                                )}
                            />
                        )}
                    />
                </>
            )}
        />
        {/* html L218: <li class="cart-total {{#if cart.multi_coupon_ui_enabled}}cart-total-with-savings{{/if}}"> */}
        <li className={`cart-total ${$if(cart.multi_coupon_ui_enabled).then(() => $$raw('cart-total-with-savings'))}`}>
            {/* html L219: {{#if cart.multi_coupon_ui_enabled}} */}
            <$If
                query={[cart.multi_coupon_ui_enabled]}
                $then={() => (
                    <>
                        {/* html L220: <div class="cart-total-label"> */}
                        <div className="cart-total-label">
                            {/* html L221: <strong>{{lang 'cart.checkout.total'}}</strong> */}
                            <strong>
                                {/* html L221: {{lang 'cart.checkout.total'}} */}
                                <$Lang translationKey={$string('cart.checkout.total')}/>
                            </strong>
                        </div>
                        {/* html L223: <div class="cart-total-value cart-total-grandTotal"> */}
                        <div className="cart-total-value cart-total-grandTotal">
                            {/* html L224: {{#or customer (unless settings.hide_price_from_guests) }} */}
                            <$Or
                                values={[customer, $unless(settings.hide_price_from_guests)]}
                                $then={() => (
                                    <>
                                        {/* html L225: <span class="cart-total-amount">{{cart.grand_total.formatted}}</span> */}
                                        <span className="cart-total-amount">{/* html L225: {{cart.grand_total.formatted}} */}{cart.grand_total.formatted}</span>
                                        {/* html L226: {{#if cart.total_discount.value}} */}
                                        <$If
                                            query={[cart.total_discount.value]}
                                            $then={() => (
                                                /* html L227: <span class="cart-total-savings">{{lang 'cart.checkout.you_saved'}} <span class="cart-savings-amount">{{cart.total_discount.formatted}}</span> {{lang 'cart.checkout.in_total'}}</span> */
                                                <span className="cart-total-savings">
                                                    {/* html L227: {{lang 'cart.checkout.you_saved'}} */}
                                                    <$Lang translationKey={$string('cart.checkout.you_saved')}/>{' '}
                                                    {/* html L227: <span class="cart-savings-amount"> */}
                                                    <span className="cart-savings-amount">{/* html L227: {{cart.total_discount.formatted}} */}{cart.total_discount.formatted}</span>{' '}
                                                    {/* html L227: {{lang 'cart.checkout.in_total'}} */}
                                                    <$Lang translationKey={$string('cart.checkout.in_total')}/>
                                                </span>
                                            )}
                                        />
                                    </>
                                )}
                                $else={() => /* html L229: {{else}}
                                                                                                html L230: {{> components/common/login-for-pricing}}
                                             */ <$Partial name="components/common/login-for-pricing"/>}
                            />
                        </div>
                    </>
                )}
                $else={() => (
                    <>
                        {/* html L233: {{else}}
                                                      html L234: <div class="cart-total-label">
                        */}
                        <div className="cart-total-label">
                            {/* html L235: <strong>{{lang 'cart.checkout.grand_total'}}:</strong> */}
                            <strong>
                                {/* html L235: {{lang 'cart.checkout.grand_total'}} */}
                                <$Lang translationKey={$string('cart.checkout.grand_total')}/>:
                            </strong>
                        </div>
                        {/* html L237: <div class="cart-total-value cart-total-grandTotal"> */}
                        <div className="cart-total-value cart-total-grandTotal">
                            {/* html L238: {{#or customer (unless settings.hide_price_from_guests)}} */}
                            <$Or
                                values={[customer, $unless(settings.hide_price_from_guests)]}
                                $then={() => /* html L239: <span>{{cart.grand_total.formatted}}</span> */ <span>{/* html L239: {{cart.grand_total.formatted}} */}{cart.grand_total.formatted}</span>}
                                $else={() => /* html L240: {{else}}
                                                                                                html L241: {{> components/common/login-for-pricing}}
                                             */ <$Partial name="components/common/login-for-pricing"/>}
                            />
                        </div>
                    </>
                )}
            />
        </li>
        {/* html L246: {{#each cart.taxes}} */}
        <$Each
            list={cart.taxes}
            $then={(tax) => (
                /* html L247: {{#if included}} */
                <$If
                    query={[tax.included]}
                    $then={() => (
                        /* html L248: <li class="cart-total"> */
                        <li className="cart-total">
                            {/* html L249: <div class="cart-total-label"> */}
                            <div className="cart-total-label">
                                {/* html L250: <strong>{{concat name (lang 'cart.included_in_total')}}{{#unless ../cart.multi_coupon_ui_enabled}}:{{/unless}}</strong> */}
                                <strong>
                                    {/* html L250: {{concat name (lang 'cart.included_in_total')}} */}
                                    {$concat(tax.name, $lang($string('cart.included_in_total')))}
                                    {/* html L250: {{#unless ../cart.multi_coupon_ui_enabled}} */}
                                    <$Unless query={[cart.multi_coupon_ui_enabled]} $then={() => <>:</>}/>
                                </strong>
                            </div>
                            {/* html L252: <div class="cart-total-value"> */}
                            <div className="cart-total-value">
                                {/* html L253: <span>{{cost.formatted}}</span> */}
                                <span>{/* html L253: {{cost.formatted}} */}{tax.cost.formatted}</span>
                            </div>
                        </li>
                    )}
                />
            )}
        />
    </ul>
));
