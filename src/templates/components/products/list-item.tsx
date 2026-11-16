import {
    $$themeSettings,
    $Each,
    $If,
    $Lang,
    $lang,
    $number,
    $Or,
    $partial,
    $pointer,
    $raw,
    $region,
    $string,
    $unescaped,
    $Unless,
    place,
} from "@mainlanddev/hbx-bigcommerce";

/** `{{{region name="…"}}}` */
const region = (name: string) => place($unescaped($region({name: $string(name)})));

export default () => {
    const settings = $$themeSettings();
    const id = $pointer<number>("id");
    const url = $pointer<string>("url");
    const name = $pointer<string>("name");
    const brand = $pointer<{name: string}>("brand");
    const price = $pointer<{
        with_tax: {value: number};
        without_tax: {value: number};
        sale_price_with_tax: {value: number};
        sale_price_without_tax: {value: number};
    }>("price");
    const addToCartUrl = $pointer<string>("add_to_cart_url");
    const outOfStockMessage = $pointer<string>("out_of_stock_message");
    const showCartAction = $pointer<boolean>("show_cart_action");
    return (
        <article
            className="listItem"
            data-event-type={$pointer("event")}
            data-entity-id={id}
            data-position={$pointer("position")}
            data-name={name}
            data-product-brand={brand.name}
            dangerouslyInlineAttributes={{
                attributes: `data-product-category="${$Each({list: $pointer<string[]>("category"), $then: (item, loop) => `${$If({test: loop["@last"], $then: () => `${item}`, $else: () => `${item}, `})}`})}" data-product-price="${$raw("{{#or customer (unless settings.hide_price_from_guests)}} ")}${$If({test: price.with_tax, $then: () => ` ${price.with_tax.value} `, $else: () => ` ${price.without_tax.value} `})}${$raw(" {{else}} ")}${$lang($string("common.login_for_pricing"))}${$raw(" {{/or}}")}"`,
            }}
        >
            <figure className="listItem-figure">
                <a
                    href={url}
                    className="listItem-figure__link"
                    aria-label={place($partial("components/products/product-info"))}
                    data-event-type="product-click"
                >
                    <$If
                        test={$pointer("stock_level")}
                        operator={$string("===")}
                        rvalue={$number(0)}
                        $then={() => (
                            <$If
                                test={$pointer("theme_settings.pdp_sold_out_label")}
                                operator={$string("===")}
                                rvalue={$string("")}
                                $then={() => place($partial("components/products/product-badge", {"badge-type": $string("sold-out"), badge_view: settings.product_sold_out_badges, badge_label: $lang($string("page_builder.pdp_sold_out_label"))}))}
                                $else={() => place($partial("components/products/product-badge", {"badge-type": $string("sold-out"), badge_view: settings.product_sold_out_badges, badge_label: settings.pdp_sold_out_label}))}
                            />
                        )}
                        $else={() => (
                            <$Or
                                values={[price.sale_price_with_tax.value, price.sale_price_without_tax.value]}
                                $then={() => (
                                    <$If
                                        test={$pointer("theme_settings.pdp_sale_badge_label")}
                                        operator={$string("===")}
                                        rvalue={$string("")}
                                        $then={() => place($partial("components/products/product-badge", {"badge-type": $string("sale"), badge_view: settings.product_sale_badges, badge_label: $lang($string("page_builder.pdp_sale_badge_label"))}))}
                                        $else={() => place($partial("components/products/product-badge", {"badge-type": $string("sale"), badge_view: settings.product_sale_badges, badge_label: settings.pdp_sale_badge_label}))}
                                    />
                                )}
                            />
                        )}
                    />
                    {place(
                        $partial("components/common/responsive-img", {
                            image: $pointer("image"),
                            class: $string("listItem-image"),
                            fallback_size: settings.productgallery_size,
                            lazyload: settings.lazyload_mode,
                            default_image: settings.default_image_product,
                        }),
                    )}
                </a>
                <$Unless
                    test={$pointer("hide_product_quick_view")}
                    $then={() => (
                        <$If
                            test={settings.show_product_quick_view}
                            $then={() => (
                                <div className="listItem-figureBody">
                                    <button type="button" data-event-type="product-click" className="button button--small listItem-button quickview" data-product-id={id}>
                                        <$Lang keyName={$string("products.quick_view")} />
                                    </button>
                                </div>
                            )}
                        />
                    )}
                />
            </figure>
            <div className="listItem-body">
                <div className="listItem-content">
                    <div className="listItem-details">
                        <$If
                            test={$pointer("show_rating")}
                            $then={() => (
                                <p className="listItem-rating">
                                    {place($partial("components/products/ratings", {rating_target: name, rating: $pointer("rating")}))}
                                </p>
                            )}
                        />
                        <$If
                            test={brand.name}
                            $then={() => <p className="listItem-brand">{brand.name}</p>}
                        />
                        <h4 className="listItem-title">
                            <a href={url} aria-label={place($partial("components/products/product-info"))} data-event-type="product-click">
                                {name}
                            </a>
                        </h4>
                        <$If test={$pointer("summary")} $then={() => <p>{$unescaped($pointer("summary"))}</p>} />
                    </div>
                    <div className="listItem-actions">
                        {$raw("{{#or customer (unless settings.hide_price_from_guests)}}")}
                        <$If
                            test={$pointer("price")}
                            $then={() => (
                                <>
                                    <div className="listItem-price">
                                        {place($partial("components/products/price", {price: $pointer("price")}))}
                                    </div>
                                    {region("product_item_below_price")}
                                </>
                            )}
                        />
                        {$raw("{{else}}")}
                        {place($partial("components/common/login-for-pricing"))}
                        {$raw("{{/or}}")}
                        <$If
                            test={settings.show_featured_promotions}
                            $then={() =>
                                place(
                                    $partial("components/products/promotion-callout", {
                                        promotions: $pointer("featured_promotions"),
                                        mode: $string("compact"),
                                    }),
                                )
                            }
                        />
                        <$If
                            test={showCartAction}
                            $then={() => (
                                <>
                                    <$If
                                        test={$pointer("has_options")}
                                        $then={() => (
                                            <a href={url} data-event-type="product-click" className="button button--small" data-product-id={id}>
                                                <$Lang keyName={$string("products.choose_options")} />
                                            </a>
                                        )}
                                    />
                                    <$If
                                        test={$pointer("pre_order")}
                                        $then={() => (
                                            <a href={$pointer("pre_order_add_to_cart_url")} data-event-type="product-click" className="button button--primary">
                                                <$Lang keyName={$string("products.pre_order")} />
                                            </a>
                                        )}
                                    />
                                    <$If
                                        test={addToCartUrl}
                                        $then={() => (
                                            <a href={addToCartUrl} data-event-type="product-click" className="button button--primary">
                                                <$Lang keyName={$string("products.add_to_cart")} />
                                            </a>
                                        )}
                                    />
                                    <$If
                                        test={outOfStockMessage}
                                        $then={() => (
                                            <a href={url} data-event-type="product-click" className="button button--small" data-product-id={id}>
                                                {outOfStockMessage}
                                            </a>
                                        )}
                                    />
                                </>
                            )}
                        />
                        <$If
                            test={$pointer("show_compare")}
                            $then={() => (
                                <label className="button button--small" htmlFor={`compare-${id}`}>
                                    <$Lang keyName={$string("products.compare")} /> <input type="checkbox" name="products[]" value={id} id={`compare-${id}`} data-compare-id={id} />
                                </label>
                            )}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
};
