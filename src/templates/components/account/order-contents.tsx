import {$Each, $If, $Lang, $partial, $pointer, $raw, $string, $unescaped, $Unless, $cdn, place} from "@mainlanddev/hbx-bigcommerce";

interface ShippingRow {
    is_shipping: boolean;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

interface OrderOption {
    name: string;
    linked_bundled_item: {
        quantity_ready_to_ship: number;
        quantity_backordered: number;
        backorder_message: string;
    };
}

interface OrderItem {
    shipping_rows: ShippingRow[];
    show_reorder: boolean;
    order_product_id: string;
    type: string;
    image: unknown;
    refunded: boolean;
    refunded_qty: number;
    download_url: string;
    price: {formatted: string};
    quantity: number;
    name: string;
    brand: {name: string};
    quantity_ready_to_ship: number;
    quantity_backordered: number;
    backorder_message: string;
    options: OrderOption[];
    gift_wrapping_name: string;
    event_date: {name: string; date: string};
    reorder_message: string;
}

export default () => (
    <>
        <h3 className="account-heading">
            <$Lang keyName={$string("account.orders.details.order_contents")} />
        </h3>

        <ul className="account-list">
            <$Each
                list={$pointer<OrderItem[]>("order.items")}
                $then={(item) => (
                    <>
                        <$Each
                            list={item.shipping_rows}
                            $then={(row) => (
                                <$If
                                    test={row.is_shipping}
                                    $then={() => (
                                        <li className="account-listShipping">
                                            <h5 className="account-listShipping-title">
                                                <$Lang
                                                    keyName={$string("account.orders.details.ship_to_multi")}
                                                    street={row.address}
                                                    city={row.city}
                                                    state={row.state}
                                                    zip={row.zip}
                                                    country={row.country}
                                                />
                                            </h5>
                                        </li>
                                    )}
                                />
                            )}
                        />
                        <li className="account-listItem">
                            <div className="account-product account-product--alignMiddle">
                                <div className="account-product-checkItem">
                                    <$If
                                        test={item.show_reorder}
                                        $then={() => (
                                            <>
                                                <input
                                                    className="form-checkbox"
                                                    type="checkbox"
                                                    id={`account-product-id-${item.order_product_id}`}
                                                    value={item.order_product_id}
                                                />{" "}
                                                <label htmlFor={`account-product-id-${item.order_product_id}`} className="form-label">
                                                    <span className="is-srOnly">Checkbox {item.order_product_id} label</span>
                                                </label>
                                            </>
                                        )}
                                    />
                                </div>
                                <figure className="account-product-figure">
                                    {$raw("{{#if type '===' 'giftcertificate'}}")}
                                    <img
                                        src={$cdn($pointer("../theme_settings.default_image_gift_certificate"))}
                                        alt="Gift Certificate"
                                        title="Gift Certificate"
                                    />
                                    {$raw("{{else}}")}
                                    {place(
                                        $partial("components/common/responsive-img", {
                                            image: item.image,
                                            class: $string("account-product-image"),
                                            fallback_size: $pointer("../theme_settings.productthumb_size"),
                                            lazyload: $pointer("../theme_settings.lazyload_mode"),
                                            default_image: $pointer("../theme_settings.default_image_product"),
                                        }),
                                    )}
                                    {$raw("{{/if}}")}{" "}
                                    <$Unless
                                        test={item.refunded}
                                        $then={() => (
                                            <$If
                                                test={item.download_url}
                                                $then={() => (
                                                    <a href={item.download_url} className="account-product-download button button--primary">
                                                        <span className="is-srOnly">
                                                            <$Lang keyName={$string("account.orders.details.download_items")} />
                                                        </span>
                                                        <span className="icon">
                                                            <svg>
                                                                <use href="#icon-arrow-down"></use>
                                                            </svg>
                                                        </span>
                                                    </a>
                                                )}
                                            />
                                        )}
                                    />
                                </figure>
                                <div className="account-product-body">
                                    <span className="account-product-price">{item.price.formatted}</span>
                                    <h5 className="account-product-title">
                                        {item.quantity} {$raw("&#215;")} {item.name}
                                    </h5>
                                    <$If
                                        test={item.brand}
                                        $then={() => (
                                            <h6>{item.brand.name}</h6>
                                        )}
                                    />
                                    <$If
                                        test={item.quantity_ready_to_ship}
                                        $then={() => (
                                            <p className="account-product-backorder-prompts">
                                                <$Lang keyName={$string("products.quantity_on_hand")} quantity={item.quantity_ready_to_ship} />
                                            </p>
                                        )}
                                    />
                                    <$If
                                        test={item.quantity_backordered}
                                        $then={() => (
                                            <p className="account-product-backorder-prompts">
                                                <$Lang keyName={$string("products.quantity_backordered")} quantity={item.quantity_backordered} />
                                            </p>
                                        )}
                                    />
                                    <$If
                                        test={item.backorder_message}
                                        $then={() => <p className="account-product-backorder-prompts">{item.backorder_message}</p>}
                                    />
                                    <$If
                                        test={item.options}
                                        $then={() => (
                                            <dl className="definitionList">
                                                <$Each
                                                    list={item.options}
                                                    $then={(option) => (
                                                        <>
                                                            <dt className="definitionList-key">{option.name}:</dt>
                                                            <dd className="definitionList-value">{place($partial("components/common/product-options"))}</dd>
                                                            <$If
                                                                test={option.linked_bundled_item.quantity_ready_to_ship}
                                                                $then={() => (
                                                                    <dd className="definitionList-value account-product-backorder-prompts">
                                                                        <$Lang
                                                                            keyName={$string("products.quantity_on_hand")}
                                                                            quantity={option.linked_bundled_item.quantity_ready_to_ship}
                                                                        />
                                                                    </dd>
                                                                )}
                                                            />
                                                            <$If
                                                                test={option.linked_bundled_item.quantity_backordered}
                                                                $then={() => (
                                                                    <dd className="definitionList-value account-product-backorder-prompts">
                                                                        <$Lang
                                                                            keyName={$string("products.quantity_backordered")}
                                                                            quantity={option.linked_bundled_item.quantity_backordered}
                                                                        />
                                                                    </dd>
                                                                )}
                                                            />
                                                            <$If
                                                                test={option.linked_bundled_item.backorder_message}
                                                                $then={() => (
                                                                    <dd className="definitionList-value account-product-backorder-prompts">
                                                                        {option.linked_bundled_item.backorder_message}
                                                                    </dd>
                                                                )}
                                                            />
                                                        </>
                                                    )}
                                                />
                                            </dl>
                                        )}
                                    />
                                    <$If
                                        test={item.gift_wrapping_name}
                                        $then={() => (
                                            <dl className="definitionList">
                                                <dt className="definitionList-key">
                                                    <$Lang keyName={$string("account.orders.gift_wrapping")} />
                                                </dt>
                                                <dd className="definitionList-value">{item.gift_wrapping_name}</dd>
                                            </dl>
                                        )}
                                    />
                                    <$If
                                        test={item.event_date}
                                        $then={() => (
                                            <dl className="definitionList">
                                                <dt className="definitionList-key">{item.event_date.name}:</dt>

                                                <dd className="definitionList-value">{item.event_date.date}</dd>
                                            </dl>
                                        )}
                                    />
                                    <$If
                                        test={item.refunded}
                                        $then={() => (
                                            <p className="account-product-refundQty">
                                                <$Lang keyName={$string("account.orders.refunded_quantity")} qty={item.refunded_qty} />
                                            </p>
                                        )}
                                        $else={() => (
                                            <$If
                                                test={item.refunded_qty}
                                                $then={() => (
                                                    <p className="account-product-refundQty">
                                                        <$Lang keyName={$string("account.orders.refunded_quantity")} qty={item.refunded_qty} />
                                                    </p>
                                                )}
                                            />
                                        )}
                                    />
                                    <$If
                                        test={item.reorder_message}
                                        $then={() => (
                                            <p>{$unescaped(item.reorder_message)}</p>
                                        )}
                                    />
                                </div>
                            </div>
                        </li>
                    </>
                )}
            />
        </ul>
    </>
);
