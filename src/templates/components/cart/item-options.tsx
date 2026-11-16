import {$dynamicComponent, $Each, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <form method="post" action={$pointer("urls.cart")} encType="multipart/form-data">
        <input type="hidden" name="item_id" value={$pointer("item.id")} />
        <p>
            {" "}Options
            <$Each
                list={$pointer<unknown[]>("product.options")}
                $then={() => <div>{$unescaped($dynamicComponent($string("components/products/options")))}</div>}
            />
        </p>
        <input type="submit" className="btn btn-success" value="Save" />
    </form>
);
