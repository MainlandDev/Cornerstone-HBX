import {$If, $Lang, $pointer, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";

/** The label is printed twice in the original (visible text and the hidden copy), so it is written once and called twice. */
const shippingLabel = () => (
    <$If
        test={$pointer("cart.shipping_handling.shipping_cost")}
        $then={() => <$Lang keyName={$string("cart.gift_wrapping.change")} />}
        $else={() => (
            <$If
                test={$pointer("cart.multi_coupon_ui_enabled")}
                $then={() => <$Lang keyName={$string("cart.gift_wrapping.add")} />}
                $else={() => <$Lang keyName={$string("cart.shipping_estimator.add_info")} />}
            />
        )}
    />
);

export default () => (
    <div className={`${$Unless({test: $pointer("cart.multi_coupon_ui_enabled"), $then: () => "cart-total-value"})}`}>
        <button data-collapsible="add-shipping" className="shipping-estimate-show" aria-labelledby="estimator-add">
            <span className="shipping-estimate-show__btn-name">{shippingLabel()}</span>
            <span id="estimator-add" className="u-hidden">
                {shippingLabel()}
            </span>
            <span id="estimator-close" className="u-hidden">
                <$Lang keyName={$string("cart.shipping_estimator.cancel")} />
            </span>
        </button>
    </div>
);
