import {$cdn, $Each, $If, $Lang, $partial, $pointer, $string, place} from "@mainlanddev/hbx-bigcommerce";

interface Order {
    id: string;
    status: string;
    return_url: string;
    details_url: string;
    total_quantity: number;
    total: {formatted: string};
    date: string;
    last_update_date: string;
    image: unknown;
}

export default () => (
    <>
        <h3 className="account-heading">
            <$Lang keyName={$string("account.orders.heading")} />
        </h3>

        <ul className="account-list">
            <$Each
                list={$pointer<Order[]>("orders")}
                $then={(order) => (
                    <li className="account-listItem">
                        <div className="account-product">
                            <div className="account-product-figure">
                                <$If
                                    test={$pointer("items.0.type")}
                                    operator={$string("===")}
                                    rvalue={$string("giftcertificate")}
                                    $then={() => <img alt="GiftCertificate" title="GiftCertificate" src={$cdn($pointer("../theme_settings.default_image_gift_certificate"))} />}
                                    $else={() =>
                                        place(
                                            $partial("components/common/responsive-img", {
                                                image: order.image,
                                                class: $string("account-product-image"),
                                                fallback_size: $pointer("../theme_settings.productthumb_size"),
                                                lazyload: $pointer("../theme_settings.lazyload_mode"),
                                                default_image: $pointer("../theme_settings.default_image_product"),
                                            }),
                                        )
                                    }
                                />
                            </div>
                            <div className="account-product-body">
                                <div className="account-orderStatus">
                                    <h6 className="account-orderStatus-label">{order.status}</h6>
                                    <$If
                                        test={$pointer("../settings.returns_enabled")}
                                        $then={() => (
                                            <$If
                                                test={order.return_url}
                                                $then={() => (
                                                    <a className="account-orderStatus-action" href={order.return_url}>
                                                        <$Lang keyName={$string("account.orders.return_items")} />
                                                    </a>
                                                )}
                                            />
                                        )}
                                    />
                                </div>

                                <h5 className="account-product-title">
                                    <a href={order.details_url}>
                                        <$Lang keyName={$string("account.orders.list.order_number")} number={order.id} />
                                    </a>
                                </h5>
                                <p className="account-product-description">
                                    <$Lang
                                        keyName={$string("account.orders.list.product_details")}
                                        num_products={order.total_quantity}
                                        cost={order.total.formatted}
                                    />
                                </p>

                                <div className="account-product-details">
                                    <div className="account-product-detail">
                                        <h6 className="account-product-detail-heading">
                                            <$Lang keyName={$string("account.orders.order_placed")} />
                                        </h6>
                                        <span>{order.date}</span>
                                    </div>
                                    <div className="account-product-detail">
                                        <h6 className="account-product-detail-heading">
                                            <$Lang keyName={$string("account.orders.last_update")} />
                                        </h6>
                                        <span>{order.last_update_date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                )}
            />
        </ul>
    </>
);
