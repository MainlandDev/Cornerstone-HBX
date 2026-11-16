import {$If, $Lang, $number, $partial, $pointer, $raw, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";

export default () => {
    const relatedProducts = $pointer("product.related_products");
    const similarByViews = $pointer("product.similar_by_views");
    return (
        <>
            <ul className="tabs" data-tab={""} role="tablist">
                <$If
                    test={relatedProducts}
                    $then={() => (
                        <li className="tab is-active" role="presentation">
                            <a className="tab-title" href="#tab-related" role="tab" tabIndex={0} aria-selected="true" dangerouslyInlineAttributes={{attributes: `controls="tab-related"`}}>
                                <$Lang keyName={$string("products.related_products")} />
                            </a>
                        </li>
                    )}
                />
                <$If
                    test={similarByViews}
                    $then={() => (
                        <li className={`tab${$Unless({test: relatedProducts, $then: () => $raw(" is-active")})}`} role="presentation">
                            <a
                                className="tab-title"
                                href="#tab-similar"
                                role="tab"
                                tabIndex={0}
                                dangerouslyInlineAttributes={{
                                    attributes: `aria-selected="${$If({test: relatedProducts, $then: () => "false", $else: () => "true"})}" controls="tab-similar"`,
                                }}
                            >
                                <$Lang keyName={$string("products.similar_by_views")} />
                            </a>
                        </li>
                    )}
                />
            </ul>

            <div className="tabs-contents">
                <$If
                    test={relatedProducts}
                    $then={() => (
                        <div role="tabpanel" aria-hidden="false" className="tab-content has-jsContent is-active" id="tab-related">
                            {$partial("components/products/carousel", {
                                    products: $pointer("product.related_products"),
                                    columns: $number(6),
                                    list: $string("Related Products"),
                                })}
                        </div>
                    )}
                />

                <$If
                    test={similarByViews}
                    $then={() => (
                        <div
                            role="tabpanel"
                            className={`tab-content has-jsContent${$Unless({test: relatedProducts, $then: () => $raw(" is-active")})}`}
                            id="tab-similar"
                            dangerouslyInlineAttributes={{
                                attributes: `aria-hidden="${$If({test: relatedProducts, $then: () => "true", $else: () => "false"})}"`,
                            }}
                        >
                            {$partial("components/products/carousel", {
                                    products: $pointer("product.similar_by_views"),
                                    columns: $number(6),
                                    list: $string("Customers Also Viewed"),
                                })}
                        </div>
                    )}
                />
            </div>
        </>
    );
};
