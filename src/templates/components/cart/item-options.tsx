"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$dynamicComponent, $Each, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
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
