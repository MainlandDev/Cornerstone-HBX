import {
    $$themeSettings,
    $All,
    $boolean,
    $cdn,
    $dynamicComponent,
    $Each,
    $getImageSrcset,
    $Gt,
    $If,
    $Inject,
    $Lang,
    $lang,
    $number,
    $partial,
    $pointer,
    $raw,
    $region,
    $string,
    $unescaped,
    $Unless,
    place,
} from "@mainlanddev/hbx-bigcommerce";

/** The size a `getImageSrcset` descriptor accepts; the theme-settings type is a plain string (LIBRARY GAP, see PORT-NOTES.md). */
type SrcsetSize = `${bigint}x${bigint}` | `${bigint}w`;

interface Image {
    data: string;
}

interface Message {
    error: string;
    success: string;
}

interface Product {
    id: number;
    title: string;
    url: string;
    cart_url: string;
    cart_order_source: string;
    category: string[];
    brand: {name: string; url: string};
    price: unknown;
    call_for_price: string;
    main_image: Image;
    images: Image[];
    detail_messages: string;
    rating: number;
    num_reviews: number;
    sku: string;
    upc: string;
    condition: string;
    availability: string;
    weight: string;
    width: string;
    height: string;
    depth: string;
    min_purchase_quantity: number;
    max_purchase_quantity: number;
    gift_wrapping_available: boolean;
    shipping: {calculated: boolean; price: {formatted: string}};
    bulk_discount_rates: unknown;
    release_date: string;
    stock_level: number;
    show_backorder_availability_prompt: boolean;
    available_to_sell: boolean;
    available_for_backorder: boolean;
    backorder_availability_prompt: string;
    reviews: {messages: Message[]};
    featured_promotions: unknown;
}

interface Settings {
    show_product_rating: boolean;
    show_product_reviews: boolean;
    show_wishlist: boolean;
    bulk_discount_enabled: boolean;
}

/** `{{{region name="…"}}}` */
const region = (name: string) => place($unescaped($region({name: $string(name)})));

export default () => {
    const theme = $$themeSettings();
    const product = $pointer<Product>("product");
    const settings = $pointer<Settings>("settings");
    const isAjax = $pointer<boolean>("is_ajax");
    const zoomSizes = {"1x": $pointer<SrcsetSize>("theme_settings.zoom_size")};
    return (
        <>
            <$Inject keyName={$string("outOfStockDefaultMessage")} value={$lang($string("products.out_of_stock_default_message"))} />{" "}
            <$Inject keyName={$string("availableOnHand")} value={$pointer("product.available_on_hand")} />{" "}
            <$Inject keyName={$string("availableForBackorder")} value={$pointer("product.available_for_backorder")} />{" "}
            <$Inject keyName={$string("availableToSell")} value={$pointer("product.available_to_sell")} />{" "}
            <$Inject keyName={$string("unlimitedBackorder")} value={$pointer("product.unlimited_backorder")} />{" "}
            <$Inject keyName={$string("showQuantityOnBackorder")} value={$pointer("product.show_quantity_on_backorder")} />{" "}
            <$Inject keyName={$string("showBackorderAvailabilityPrompt")} value={$pointer("product.show_backorder_availability_prompt")} />{" "}
            <$Inject keyName={$string("backorderAvailabilityPrompt")} value={$pointer("product.backorder_availability_prompt")} />{" "}
            <$Inject keyName={$string("quantityBackorderedMessage")} value={$lang($string("products.quantity_backordered"), {quantity: $string("__QTY__")})} />{" "}
            <$Inject keyName={$string("quantityMaxMessage")} value={$lang($string("products.quantity_max"), {quantity: $string("__QTY__")})} />{" "}
            <$Inject
                keyName={$string("quantityMaxPicklistMessage")}
                value={$lang($string("products.quantity_max_picklist"), {name: $string("__NAME__"), quantity: $string("__QTY__")})}
            />{" "}
            <$Inject keyName={$string("backorderMessages")} value={$pointer("backorder_messages")} />{" "}
            <$Inject keyName={$string("showBackorderMessage")} value={$pointer("product.show_backorder_message")} />

            <div
                className="productView"
                data-event-type="product"
                data-entity-id={product.id}
                data-name={product.title}
                dangerouslyInlineAttributes={{
                    attributes: `data-product-category="${$Each({list: $pointer<string[]>("product.category"), $then: (item, loop) => ` ${$If({test: loop["@last"], $then: () => `${item}`, $else: () => `${item}, `})} `})}" data-product-brand="${product.brand.name}" data-product-price="${$raw("{{#or customer (unless settings.hide_price_from_guests)}} ")}${$If({test: $pointer("product.price.with_tax"), $then: () => ` ${$pointer("product.price.with_tax.value")} `, $else: () => ` ${$pointer("product.price.without_tax.value")} `})}${$raw(" {{else}} ")}${$lang($string("common.login_for_pricing"))}${$raw(" {{/or}}")}" data-product-variant="single-product-option"`,
                }}
            >
                <$Each
                    list={$pointer<Message[]>("product.reviews.messages")}
                    $then={(message) => (
                        <>
                            <$If test={message.error} $then={() => place($partial("components/common/alert/alert-error", message.error))} />
                            <$If test={message.success} $then={() => place($partial("components/common/alert/alert-success", message.success))} />
                        </>
                    )}
                />

                <section className="productView-images" data-image-gallery={""}>
                    {$raw("{{#if product.images.length '>' 1 }}")}
                    {place($partial("components/carousel-content-announcement"))}
                    {$raw("{{/if}}")}
                    <figure
                        className="productView-image"
                        data-image-gallery-main={""}
                        dangerouslyInlineAttributes={{
                            attributes: `${$If({test: product.main_image, $then: () => `${$raw('data-zoom-image="')}${$getImageSrcset(product.main_image, zoomSizes, $cdn(theme.default_image_product))}${$raw('"')}`})}`,
                        }}
                    >
                        <div className="productView-img-container">
                            <$If
                                test={product.main_image}
                                $then={() => (
                                    <>
                                        {$raw('<a href="')}
                                        {$getImageSrcset(product.main_image, zoomSizes, $cdn(theme.default_image_product))}
                                        {$raw('" target="_blank">')}
                                    </>
                                )}
                            />
                            {place(
                                $partial("components/common/responsive-img", {
                                    image: product.main_image,
                                    class: $string("productView-image--default"),
                                    fallback_size: theme.product_size,
                                    lazyload: theme.lazyload_mode,
                                    default_image: theme.default_image_product,
                                    otherAttributes: $string("data-main-image"),
                                }),
                            )}
                            <$If test={product.main_image} $then={() => $raw("</a>")} />
                        </div>
                    </figure>
                    <ul
                        className="productView-thumbnails"
                        dangerouslyInlineAttributes={{
                            attributes: `${$Gt({
                                a: $pointer<number>("product.images.length"),
                                b: $number(5),
                                $then: () => $raw(` data-slick='{ "infinite": false, "mobileFirst": true, "dots": false, "accessibility": false, "slidesToShow": 5, "slidesToScroll": 5 }'`),
                            })}`,
                        }}
                    >
                        <$Each
                            list={$pointer<Image[]>("product.images")}
                            $then={(image) => {
                                const defaultImage = $cdn($pointer<string>("../theme_settings.default_image_product"));
                                const zoom = {"1x": $pointer<SrcsetSize>("../theme_settings.zoom_size")};
                                const size = {"1x": $pointer<SrcsetSize>("../theme_settings.product_size")};
                                return (
                                    <li className="productView-thumbnail">
                                        <a
                                            className="productView-thumbnail-link"
                                            href={`${$getImageSrcset(image, zoom, defaultImage)}`}
                                            data-image-gallery-item={""}
                                            data-image-gallery-new-image-url={`${$getImageSrcset(image, size, defaultImage)}`}
                                            data-image-gallery-new-image-srcset={`${$getImageSrcset(image, {use_default_sizes: $boolean(true)})}`}
                                            data-image-gallery-zoom-image-url={`${$getImageSrcset(image, zoom, defaultImage)}`}
                                        >
                                            {place(
                                                $partial("components/common/responsive-img", {
                                                    image,
                                                    fallback_size: $pointer("../theme_settings.productview_thumb_size"),
                                                    lazyload: $pointer("../theme_settings.lazyload_mode"),
                                                }),
                                            )}
                                        </a>
                                    </li>
                                );
                            }}
                        />
                    </ul>
                </section>

                <section className="productView-details product-data">
                    <div className="productView-product">
                        <h1 className="productView-title">{product.title}</h1>
                        <$If
                            test={product.brand}
                            $then={() => (
                                <h2 className="productView-brand">
                                    <a href={product.brand.url}>
                                        <span>{product.brand.name}</span>
                                    </a>
                                </h2>
                            )}
                        />
                        <$If
                            test={product.call_for_price}
                            $then={() => (
                                <p className="productView-price">
                                    <span>{product.call_for_price}</span>
                                </p>
                            )}
                        />
                        <div className="productView-price">
                            {$raw("{{#or customer (unless settings.hide_price_from_guests)}}")}
                            {place($partial("components/products/price", {price: $pointer("product.price")}))}
                            {$raw("{{else}}")}
                            {place($partial("components/common/login-for-pricing"))}
                            {$raw("{{/or}}")}
                        </div>
                        {region("product_below_price")}
                        <$If
                            test={theme.show_featured_promotions}
                            $then={() =>
                                place(
                                    $partial("components/products/promotion-callout", {
                                        promotions: $pointer("product.featured_promotions"),
                                        mode: $string("full"),
                                    }),
                                )
                            }
                        />
                        <div className="productView-rating">
                            <$If
                                test={settings.show_product_rating}
                                $then={() => (
                                    <>
                                        {place($partial("components/products/ratings", {rating: $pointer("product.rating")}))}{" "}
                                        {$raw("{{#if product.num_reviews '>' 0}}")}
                                        <a href={`${product.url}${$If({test: isAjax, $then: () => "#product-reviews"})}`} id="productReview_link">
                                            <$Lang keyName={$string("products.reviews.link_to_review")} total={product.num_reviews} />
                                        </a>
                                        {$raw("{{else}}")}
                                        <span>
                                            <$Lang keyName={$string("products.reviews.link_to_review")} total={product.num_reviews} />
                                        </span>
                                        {$raw("{{/if}}")}
                                    </>
                                )}
                            />{" "}
                            <$If
                                test={settings.show_product_reviews}
                                $then={() => (
                                    <>
                                        <a
                                            href={`${product.url}${$If({test: isAjax, $then: () => "#write_review"})}`}
                                            className="productView-reviewLink productView-reviewLink--new"
                                            dangerouslyInlineAttributes={{
                                                attributes: `${$Unless({test: isAjax, $then: () => $raw('data-reveal-id="modal-review-form"')})}`,
                                            }}
                                            role="button"
                                        >
                                            <$Lang keyName={$string("products.reviews.new")} />
                                        </a>
                                        <$Unless test={isAjax} $then={() => place($partial("components/products/modals/writeReview"))} />
                                    </>
                                )}
                            />
                        </div>
                        {product.detail_messages}
                        <dl className="productView-info">
                            <dt
                                className="productView-info-name sku-label"
                                dangerouslyInlineAttributes={{attributes: `${$Unless({test: product.sku, $then: () => $raw(' style="display: none;"')})}`}}
                            >
                                <$Lang keyName={$string("products.sku")} />
                            </dt>
                            <dd className="productView-info-value" data-product-sku={""}>
                                {product.sku}
                            </dd>
                            <dt
                                className="productView-info-name upc-label"
                                dangerouslyInlineAttributes={{attributes: `${$Unless({test: product.upc, $then: () => $raw(' style="display: none;"')})}`}}
                            >
                                <$Lang keyName={$string("products.upc")} />
                            </dt>
                            <dd className="productView-info-value" data-product-upc={""}>
                                {product.upc}
                            </dd>
                            <$If
                                test={product.condition}
                                $then={() => (
                                    <>
                                        <dt className="productView-info-name">
                                            <$Lang keyName={$string("products.condition")} />
                                        </dt>
                                        <dd className="productView-info-value">{product.condition}</dd>
                                    </>
                                )}
                            />
                            <$If
                                test={product.availability}
                                $then={() => (
                                    <>
                                        <dt className="productView-info-name">
                                            <$Lang keyName={$string("products.availability")} />
                                        </dt>
                                        <dd className="productView-info-value">{product.availability}</dd>
                                    </>
                                )}
                            />
                            <$All
                                values={[product.weight, theme.show_product_weight]}
                                $then={() => (
                                    <>
                                        <dt className="productView-info-name">
                                            <$Lang keyName={$string("products.weight")} />
                                        </dt>
                                        <dd className="productView-info-value" data-product-weight={""}>
                                            {product.weight}
                                        </dd>
                                    </>
                                )}
                            />
                            <$All
                                values={[product.width, product.height, product.depth, theme.show_product_dimensions]}
                                $then={() => (
                                    <>
                                        <dt className="productView-info-name">
                                            <$Lang keyName={$string("products.width")} />
                                        </dt>
                                        <dd className="productView-info-value" data-product-width={""}>
                                            {product.width}{" "}
                                            {$raw("{{#if settings.measurements.length '==' 'Centimeters'}}")}(<$Lang keyName={$string("products.measurement.metric")} />)
                                            {$raw("{{else}}")}(<$Lang keyName={$string("products.measurement.imperial")} />)
                                            {$raw("{{/if}}")}
                                        </dd>
                                        <dt className="productView-info-name">
                                            <$Lang keyName={$string("products.height")} />
                                        </dt>
                                        <dd className="productView-info-value" data-product-height={""}>
                                            {product.height}{" "}
                                            {$raw("{{#if settings.measurements.length '==' 'Centimeters'}}")}(<$Lang keyName={$string("products.measurement.metric")} />)
                                            {$raw("{{else}}")}(<$Lang keyName={$string("products.measurement.imperial")} />)
                                            {$raw("{{/if}}")}
                                        </dd>
                                        <dt className="productView-info-name">
                                            <$Lang keyName={$string("products.depth")} />
                                        </dt>
                                        <dd className="productView-info-value" data-product-depth={""}>
                                            {product.depth}{" "}
                                            {$raw("{{#if settings.measurements.length '==' 'Centimeters'}}")}(<$Lang keyName={$string("products.measurement.metric")} />)
                                            {$raw("{{else}}")}(<$Lang keyName={$string("products.measurement.imperial")} />)
                                            {$raw("{{/if}}")}
                                        </dd>
                                    </>
                                )}
                            />
                            <$If
                                test={product.min_purchase_quantity}
                                $then={() => (
                                    <>
                                        <dt className="productView-info-name">
                                            <$Lang keyName={$string("products.min_purchase_quantity")} />
                                        </dt>
                                        <dd className="productView-info-value">
                                            <$Lang keyName={$string("products.purchase_units")} quantity={product.min_purchase_quantity} />
                                        </dd>
                                    </>
                                )}
                            />
                            <$If
                                test={product.max_purchase_quantity}
                                $then={() => (
                                    <>
                                        <dt className="productView-info-name">
                                            <$Lang keyName={$string("products.max_purchase_quantity")} />
                                        </dt>
                                        <dd className="productView-info-value">
                                            <$Lang keyName={$string("products.purchase_units")} quantity={product.max_purchase_quantity} />
                                        </dd>
                                    </>
                                )}
                            />
                            <$If
                                test={product.gift_wrapping_available}
                                $then={() => (
                                    <>
                                        <dt className="productView-info-name">
                                            <$Lang keyName={$string("products.gift_wrapping")} />
                                        </dt>
                                        <dd className="productView-info-value">
                                            <$Lang keyName={$string("products.gift_wrapping_available")} />
                                        </dd>
                                    </>
                                )}
                            />
                            <$If
                                test={product.shipping}
                                $then={() => (
                                    <$If
                                        test={product.shipping.calculated}
                                        $then={() => (
                                            <>
                                                <dt className="productView-info-name">
                                                    <$Lang keyName={$string("products.shipping")} />
                                                </dt>
                                                <dd className="productView-info-value">
                                                    <$Lang keyName={$string("products.shipping_calculated")} />
                                                </dd>
                                            </>
                                        )}
                                        $else={() => (
                                            <>
                                                {$raw("{{#if product.shipping.price.value '===' 0}}")}
                                                <dt className="productView-info-name">
                                                    <$Lang keyName={$string("products.shipping")} />
                                                </dt>
                                                <dd className="productView-info-value">
                                                    <$Lang keyName={$string("products.shipping_free")} />
                                                </dd>
                                                {$raw("{{else}}")}
                                                <dt className="productView-info-name">
                                                    <$Lang keyName={$string("products.shipping")} />
                                                </dt>
                                                <dd className="productView-info-value">
                                                    <$Lang keyName={$string("products.shipping_fixed")} amount={product.shipping.price.formatted} />
                                                </dd>
                                                {$raw("{{/if}}")}
                                            </>
                                        )}
                                    />
                                )}
                            />

                            <$If
                                test={settings.bulk_discount_enabled}
                                $then={() => (
                                    <div className="productView-info-bulkPricing">
                                        {place($partial("components/products/bulk-discount-rates", {bulk_discount_rates: $pointer("product.bulk_discount_rates")}))}
                                    </div>
                                )}
                            />

                            {$raw("{{#if theme_settings.show_custom_fields_tabs '!==' true}}")}
                            {place($partial("components/products/custom-fields"))}
                            {$raw("{{/if}}")}
                        </dl>
                    </div>
                </section>

                <section className="productView-details product-options">
                    <div className="productView-options">
                        <$If test={product.release_date} $then={() => <p>{product.release_date}</p>} />
                        <form className="form" method="post" action={product.cart_url} encType="multipart/form-data" data-cart-item-add={""}>
                            <input type="hidden" name="action" value="add" />
                            <input type="hidden" name="product_id" value={product.id} />
                            <$If
                                test={product.cart_order_source}
                                $then={() => <input type="hidden" name="cart_order_source" value={product.cart_order_source} />}
                            />
                            <div data-product-option-change={""} style={{display: "none"}}>
                                <$Inject keyName={$string("showSwatchNames")} value={theme.show_product_swatch_names} />
                                <$Each
                                    list={$pointer<unknown[]>("product.options")}
                                    $then={() => place($unescaped($dynamicComponent($string("components/products/options"))))}
                                />
                            </div>
                            <div className={`form-field form-field--stock${$Unless({test: product.stock_level, $then: () => " u-hiddenVisually"})}`}>
                                <label className="form-label form-label--alternate">
                                    <span className="productView-stock-message">
                                        <span data-product-stock={""}>{product.stock_level}</span>{" "}
                                        <$Lang keyName={$string("products.in_stock")} />
                                    </span>{" "}
                                    <$All
                                        values={[product.show_backorder_availability_prompt, product.available_to_sell, product.available_for_backorder]}
                                        $then={() => (
                                            <span className="productView-backorder-availability-prompt" data-backorder-prompt={""}>
                                                {product.backorder_availability_prompt}
                                            </span>
                                        )}
                                        $else={() => <span className="productView-backorder-availability-prompt" data-backorder-prompt={""} style={{display: "none"}}></span>}
                                    />
                                </label>
                                <p className="form-label form-label--alternate" data-product-backordered={""} style={{display: "none"}}>
                                    <span data-qty-backordered-message={""}></span>
                                    <span data-backorder-message={""}></span>
                                </p>
                                <ul className="productView-picklist-backorder" data-picklist-backorder-list={""} style={{display: "none"}}></ul>
                            </div>
                            {place($partial("components/products/add-to-cart", {with_wallet_buttons: $boolean(true)}))}
                        </form>
                        <$If test={settings.show_wishlist} $then={() => place($partial("components/common/wishlist-dropdown"))} />
                    </div>
                    {place($partial("components/common/share", {url: product.url}))}
                </section>

                <article className="productView-description">
                    <$If
                        test={theme.show_product_details_tabs}
                        $then={() => place($partial("components/products/description-tabs"))}
                        $else={() => place($partial("components/products/description"))}
                    />
                </article>
            </div>

            <div id="previewModal" className="modal modal--large" data-reveal={""}>
                {place($partial("components/common/modal/modal-close-btn"))}
                <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-header-title"></div>
                <div className="loadingOverlay"></div>
            </div>
        </>
    );
};
