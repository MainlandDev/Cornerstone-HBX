"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $pointer} from "@mainlanddev/hbx-bigcommerce";

interface Attribute {
    display_name: string;
    value: string;
}

export default (_props: PartialProps) => (
    <$Each
        list={$pointer<Attribute[]>("product.attributes")}
        $then={(attribute) => (
            <>
                <dt className="productView-info-name">{attribute.display_name}:</dt>
                <dd className="productView-info-value">{attribute.value}</dd>
            </>
        )}
    />
);
