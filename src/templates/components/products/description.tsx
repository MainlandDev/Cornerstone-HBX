"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => {
    const description = $pointer<string>("product.description");
    const warranty = $pointer<string>("product.warranty");
    return (
        <>
            <$If
                test={description}
                $then={() => (
                    <>
                        <p className="productView-title">
                            <$Lang keyName={$string("products.description")} />
                        </p>
                        <div className="productView-description" data-event-type="product">
                            {$unescaped(description)}
                        </div>
                    </>
                )}
            />
            <$If
                test={warranty}
                $then={() => (
                    <>
                        <p className="productView-title">
                            <$Lang keyName={$string("products.warranty")} />
                        </p>
                        <div className="productView-description">{$unescaped(warranty)}</div>
                    </>
                )}
            />
        </>
    );
};
