import {$Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <h1 className="page-heading" data-cart-page-title={""}>
        <$Lang keyName={$string("cart.label")} quantity={$pointer("cart.quantity")} />
    </h1>
);
