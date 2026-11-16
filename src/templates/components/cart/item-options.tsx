"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$dynamicComponent, $Each, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <form method="post" action={$pointer("urls.cart")} encType="multipart/form-data">
        <input type="hidden" name="item_id" value={$pointer("item.id")} />
        {/* The <div>s sit beside the <p>, not in it: a <div> in a <p> is invalid HTML and the browser closes the <p> at the first one anyway. */}
        <p>{" "}Options</p>
        <$Each
            list={$pointer<unknown[]>("product.options")}
            $then={() => <div>{$unescaped($dynamicComponent($string("components/products/options")))}</div>}
        />
        <input type="submit" className="btn btn-success" value="Save" />
    </form>
);
