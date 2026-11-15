import {$Lang, $partial, $pointer, $string, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <h2 className="page-heading">
            <$Lang keyName={$string("products.new")} />
        </h2>
        {place($partial("components/products/carousel", {products: $pointer("products"), list: $string("New Products")}))}
    </>
);
