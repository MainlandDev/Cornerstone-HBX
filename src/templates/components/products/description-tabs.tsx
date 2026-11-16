import {$$themeSettings, $All, $dashcase, $If, $Lang, $lowercase, $partial, $pointer, $sanitize, $string, $unescaped, $Unless, place} from "@mainlanddev/hbx-bigcommerce";

export default () => {
    const theme = $$themeSettings();
    const product = $pointer<{description: string; warranty: string; reviews: {total: number}}>("product");
    const customFieldsTab = $pointer<string>("theme_settings.pdp-custom-fields-tab-label");
    // `theme[...]` is typed string | number | boolean, which `$sanitize` refuses; the same setting as a string prints the same path.
    const customFieldsTabId = $dashcase($lowercase($sanitize($pointer<string>("@root.theme_settings.pdp-custom-fields-tab-label"))));
    return (
        <>
            <ul className="tabs" data-tab={""}>
                <$If
                    test={product.description}
                    $then={() => (
                        <li className="tab is-active">
                            <a className="tab-title" href="#tab-description">
                                <$Lang keyName={$string("products.description")} />
                            </a>
                        </li>
                    )}
                />
                <$If
                    test={product.warranty}
                    $then={() => (
                        <li className={`tab ${$Unless({test: product.description, $then: () => "is-active"})}`}>
                            <a className="tab-title" href="#tab-warranty">
                                <$Lang keyName={$string("products.warranty")} />
                            </a>
                        </li>
                    )}
                />
                <$All
                    values={[$pointer("product.custom_fields"), theme.show_custom_fields_tabs]}
                    $then={() => (
                        <li className="tab">
                            <a className="tab-title" href={`#tab-${customFieldsTabId}`}>
                                {$sanitize(customFieldsTab)}
                            </a>
                        </li>
                    )}
                />
                <$All
                    values={[$pointer("settings.show_product_reviews"), theme.show_product_reviews, product.reviews.total]}
                    $then={() => (
                        <li className="tab">
                            <a className="tab-title productView-reviewTabLink" href="#tab-reviews">
                                <$Lang keyName={$string("products.reviews.header")} total={product.reviews.total} />
                            </a>
                        </li>
                    )}
                />
            </ul>
            <div className="tabs-contents">
                <$If
                    test={product.description}
                    $then={() => (
                        <div className="tab-content is-active" id="tab-description">
                            {$unescaped(product.description)}
                        </div>
                    )}
                />
                <$If
                    test={product.warranty}
                    $then={() => (
                        <div className={`tab-content ${$Unless({test: product.description, $then: () => "is-active"})}`} id="tab-warranty">
                            {$unescaped(product.warranty)}
                        </div>
                    )}
                />
                <$All
                    values={[$pointer("product.custom_fields"), theme.show_custom_fields_tabs]}
                    $then={() => (
                        <div className="tab-content" id={`tab-${customFieldsTabId}`}>
                            <dl className="productView-info">{place($partial("components/products/custom-fields"))}</dl>
                        </div>
                    )}
                />
                <$All
                    values={[$pointer("settings.show_product_reviews"), theme.show_product_reviews]}
                    $then={() => (
                        <div className="tab-content" id="tab-reviews">
                            {place(
                                $partial("components/products/reviews", {
                                    reviews: $pointer("product.reviews"),
                                    product: $pointer("product"),
                                    urls: $pointer("urls"),
                                }),
                            )}
                        </div>
                    )}
                />
            </div>
        </>
    );
};
