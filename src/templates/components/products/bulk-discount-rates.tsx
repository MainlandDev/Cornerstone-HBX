import {$Each, $If, $Lang, $partial, $pointer, $raw, $string, $Unless, place} from "@mainlanddev/hbx-bigcommerce";

interface Rate {
    min: string;
    max: string;
    type: string;
    discount: {formatted: string};
    discount_inc_tax: {formatted: string};
}

export default () => {
    const id = $pointer<number>("id");
    const product = $pointer<{url: string; price: {tax_label: string}}>("product");
    return (
        <$If
            test={$pointer("bulk_discount_rates.length")}
            $then={() => (
                <>
                    <$If
                        test={$pointer("product")}
                        $then={() => (
                            <dt className="productView-info-name">
                                <$Lang keyName={$string("products.bulk_pricing.title")} />
                            </dt>
                        )}
                    />
                    <dd className="productView-info-value">
                        <a
                            href={`${product.url}#bulk_pricing`}
                            dangerouslyInlineAttributes={{
                                attributes: `${$Unless({
                                    test: $pointer("is_ajax"),
                                    $then: () => `${$raw("data-reveal-id=\"modal-bulk-pricing")}${$If({test: id, $then: () => `-${id}`})}${$raw("\"")}`,
                                })}`,
                            }}
                        >
                            <$Lang keyName={$string("products.bulk_pricing.view")} />
                        </a>
                    </dd>
                    <div id={`modal-bulk-pricing${$If({test: id, $then: () => `-${id}`})}`} className="modal modal--small" data-reveal={""}>
                        <div className="modal-header">
                            <h2 className="modal-header-title">
                                <$Lang keyName={$string("products.bulk_pricing.modal_title")} />
                            </h2>
                            {place($partial("components/common/modal/modal-close-btn"))}
                        </div>
                        <div className="modal-body">
                            <p>
                                <$Lang keyName={$string("products.bulk_pricing.instructions")} />
                            </p>
                            <ul>
                                <$Each
                                    list={$pointer<Rate[]>("bulk_discount_rates")}
                                    $then={(rate) => (
                                        <li>
                                            <$Lang keyName={$string("products.bulk_pricing.range")} min={rate.min} max={rate.max} />
                                            {$raw("{{#if type '===' 'percent'}}")}
                                            <$Lang keyName={$string("products.bulk_pricing.percent")} discount={rate.discount.formatted} />
                                            {" "}
                                            {$raw("{{else if type '===' 'fixed'}}")}
                                            {" "}
                                            <$If
                                                test={rate.discount_inc_tax}
                                                $then={() => (
                                                    <>
                                                        <$Lang keyName={$string("products.bulk_pricing.fixed_both.prefix")} />
                                                        <br />
                                                        {rate.discount_inc_tax.formatted}{" "}
                                                        <$Lang keyName={$string("products.price_with_tax")} tax_label={$pointer("../product.price.tax_label")} />
                                                        <br />
                                                        {rate.discount.formatted}{" "}
                                                        <$Lang keyName={$string("products.price_without_tax")} tax_label={$pointer("../product.price.tax_label")} />{" "}
                                                        <$Lang keyName={$string("products.bulk_pricing.fixed_both.suffix")} />
                                                    </>
                                                )}
                                                $else={() => <$Lang keyName={$string("products.bulk_pricing.fixed")} discount={rate.discount.formatted} />}
                                            />
                                            {" "}
                                            {$raw("{{else if type '===' 'price'}}")}
                                            {" "}
                                            <$Lang keyName={$string("products.bulk_pricing.price")} discount={rate.discount.formatted} />
                                            {$raw("{{/if}}")}
                                        </li>
                                    )}
                                />
                            </ul>
                        </div>
                    </div>
                </>
            )}
        />
    );
};
