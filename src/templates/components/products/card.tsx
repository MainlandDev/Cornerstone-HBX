"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import ProductsProductBadge from "./product-badge.tsx";
import ProductsRatings from "./ratings.tsx";
import ProductsPrice from "./price.tsx";
import ProductsBulkDiscountRates from "./bulk-discount-rates.tsx";
import ProductsPromotionCallout from "./promotion-callout.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import ResponsiveImg from "../common/responsive-img.tsx";
import LoginForPricing from "../common/login-for-pricing.tsx";
import {
    $partial,
    $And,
    $Each,
    $If,
    $Lang,
    $lang,
    $number,
    $Or,
    $pointer,
    $raw,
    $region,
    $string,
    $unescaped,
    $Unless, $unlessExpression,
} from "@mainlanddev/hbx-bigcommerce";

/** `{{{region name="…"}}}` */
const region = (name: string) => $unescaped($region({name: $string(name)}));

export default (_props: PartialProps) => {
    const settings = $pointer<ThemeSettingsObject>("theme_settings");
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
    const showRating = $pointer<boolean>("show_rating");
    return (
        <article
            className={`card ${$If({test: $pointer("alternate"), $then: () => $raw(" card--alternate")})}`}
            data-test={`card-${id}`}
            data-event-type={$pointer("event")}
            data-entity-id={id}
            data-position={$pointer("position")}
            data-name={name}
            data-product-brand={brand.name}
            dangerouslyInlineAttributes={{
                attributes: `data-product-category="${$Each({list: $pointer<string[]>("category"), $then: (item, loop) => ` ${$If({test: loop["@last"], $then: () => ` ${item} `, $else: () => ` ${item}, `})} `})}" data-product-price="${$raw("{{#or customer (unless settings.hide_price_from_guests)}} ")}${$If({test: price.with_tax, $then: () => ` ${price.with_tax.value} `, $else: () => ` ${price.without_tax.value} `})}${$raw(" {{else}} ")}${$lang($string("common.login_for_pricing"))}${$raw(" {{/or}}")}"`,
            }}
        >
            <figure className="card-figure">
                <$If
                    test={$pointer("stock_level")}
                    operator={$string("===")}
                    rvalue={$number(0)}
                    $then={() => (
                        <$If
                            test={$pointer("theme_settings.pdp_sold_out_label")}
                            operator={$string("===")}
                            rvalue={$string("")}
                            $then={() => <ProductsProductBadge badge-type={$string("sold-out")} badge_view={settings.product_sold_out_badges} badge_label={$lang($string("page_builder.pdp_sold_out_label"))} />}
                            $else={() => <ProductsProductBadge badge-type={$string("sold-out")} badge_view={settings.product_sold_out_badges} badge_label={settings.pdp_sold_out_label} />}
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
                                    $then={() => <ProductsProductBadge badge-type={$string("sale")} badge_view={settings.product_sale_badges} badge_label={$lang($string("page_builder.pdp_sale_badge_label"))} />}
                                    $else={() => <ProductsProductBadge badge-type={$string("sale")} badge_view={settings.product_sale_badges} badge_label={settings.pdp_sale_badge_label} />}
                                />
                            )}
                        />
                    )}
                />

                <a
                    href={url}
                    className="card-figure__link"
                    aria-label={$partial("components/products/product-info")}
                    data-event-type="product-click"
                >
                    <div className="card-img-container">
                        <ResponsiveImg image={$pointer("image")} class={$string("card-image")} fallback_size={settings.productgallery_size} lazyload={settings.lazyload_mode} default_image={settings.default_image_product} />
                    </div>
                </a>

                <figcaption className="card-figcaption">
                    <div className="card-figcaption-body">
                        <$Unless
                            test={$pointer("hide_product_quick_view")}
                            $then={() => (
                                <$If
                                    test={settings.show_product_quick_view}
                                    $then={() => (
                                        <button
                                            type="button"
                                            className="button button--small card-figcaption-button quickview"
                                            data-event-type="product-click"
                                            data-product-id={id}
                                        >
                                            <$Lang keyName={$string("products.quick_view")} />
                                        </button>
                                    )}
                                />
                            )}
                        />
                        <$If
                            test={$pointer("show_compare")}
                            $then={() => (
                                <label className="button button--small card-figcaption-button" htmlFor={`compare-${id}`}>
                                    <$Lang keyName={$string("products.compare")} /> <input type="checkbox" name="products[]" value={id} id={`compare-${id}`} data-compare-id={id} />
                                </label>
                            )}
                        />
                        <$If
                            test={showCartAction}
                            $then={() => (
                                <>
                                    <$If
                                        test={$pointer("has_options")}
                                        $then={() => (
                                            <a href={url} data-event-type="product-click" className="button button--small card-figcaption-button" data-product-id={id}>
                                                <$Lang keyName={$string("products.choose_options")} />
                                            </a>
                                        )}
                                    />
                                    <$If
                                        test={$pointer("pre_order")}
                                        $then={() => (
                                            <a href={$pointer("pre_order_add_to_cart_url")} data-event-type="product-click" className="button button--small card-figcaption-button">
                                                <$Lang keyName={$string("products.pre_order")} />
                                            </a>
                                        )}
                                    />
                                    <$If
                                        test={addToCartUrl}
                                        $then={() => (
                                            <>
                                                <a href={addToCartUrl} data-event-type="product-click" data-button-type="add-cart" className="button button--small card-figcaption-button">
                                                    <$Lang keyName={$string("products.add_to_cart")} />
                                                </a>
                                                <span className="product-status-message aria-description--hidden">
                                                    <$Lang keyName={$string("category.add_cart_announcement")} />
                                                </span>
                                            </>
                                        )}
                                    />
                                    <$If
                                        test={outOfStockMessage}
                                        $then={() => (
                                            <a href={url} data-event-type="product-click" className="button button--small card-figcaption-button" data-product-id={id}>
                                                {outOfStockMessage}
                                            </a>
                                        )}
                                    />
                                </>
                            )}
                        />
                    </div>
                </figcaption>
            </figure>
            <div className="card-body">
                <$And
                    a={$pointer("rating")}
                    b={showRating}
                    $then={() => (
                        <p className="card-text" data-test-info-type="productRating">
                            <span className="rating--small">
                                <ProductsRatings rating_target={name} rating={$pointer("rating")} />
                            </span>
                        </p>
                    )}
                />
                <$If
                    test={brand.name}
                    $then={() => (
                        <p className="card-text" data-test-info-type="brandName">
                            {brand.name}
                        </p>
                    )}
                />
                <h3 className="card-title">
                    <a aria-label={$partial("components/products/product-info")} href={url} data-event-type="product-click">
                        {name}
                    </a>
                </h3>

                <div className="card-text" data-test-info-type="price">
                    <$Or values={[$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))]} $then={() => (<><ProductsPrice price={$pointer("price")} /></>)} $else={() => (<><LoginForPricing /></>)} />
                </div>
                {region("product_item_below_price")}
                <ProductsBulkDiscountRates />
                <$If
                    test={settings.show_featured_promotions}
                    $then={() =>
                        <ProductsPromotionCallout promotions={$pointer("featured_promotions")} mode={$string("compact")} />
                    }
                />
            </div>
        </article>
    );
};
