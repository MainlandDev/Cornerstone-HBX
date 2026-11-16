import {$Each, $If, $Inject, $Lang, $lang, $nl2br, $Page, $partial, $pointer, $raw, $sanitize, $string, $unescaped, place} from "@mainlanddev/hbx-bigcommerce";

// Local shapes: the library's `Order` lacks these keys and types `shipments` as Record<string, unknown>.
// Fields are read from details.html, not from the API docs.
interface StatusMessage {
    message: string;
}

interface ShippingDiscount {
    label: string;
}

interface TotalRow {
    label: string;
    value: {value: number; formatted: string};
    shipping_discounts: ShippingDiscount[];
}

interface Address {
    full_name: string;
    company: string;
    address_lines: string[];
    city: string;
    state: string;
    zip: string;
    country: string;
}

interface PickupAddress {
    pickup_method_display_name: string;
    location_name: string;
    location_line_1: string;
    location_line_2: string;
    location_city: string;
    location_state: string;
    location_zip: string;
    location_country_name: string;
    location_phone: string;
    location_email: string;
    collection_time_description: string;
}

interface ReorderItem {
    show_reorder: boolean;
    order_product_id: string;
}

interface Order {
    id: number;
    status_messages: StatusMessage[];
    total_rows: TotalRow[];
    status_text: string;
    date: string;
    total: {formatted: string};
    payment_method: string;
    card_number_last_four: string;
    order_instructions: string;
    invoice_url: string;
    shipping_address: Address;
    backorder_shipping_expectation_message: string;
    pickup_addresses: PickupAddress[];
    has_multiple_shipping_addresses: boolean;
    billing_address: Address;
    comments: string;
    reorder_url: string;
    items: ReorderItem[];
    is_complete: boolean;
    return_url: string;
}

interface Shipment {
    date_shipped: string;
    shipping_provider: string;
    shipping_track: {url: string; number: string};
    show_shipping_method: boolean;
    shipping_method: string;
}

export default () => {
    const order = $pointer<Order>("order");
    const shipments = $pointer<Shipment[]>("shipments");
    const addressLines = (address: typeof order.shipping_address) => (
        <>
            <li>{$unescaped($sanitize(address.full_name))}</li>
            <li>{$unescaped($sanitize(address.company))}</li>
            <li>{$unescaped($sanitize(address.address_lines[0]))}</li>
            <li>{$unescaped($sanitize(address.address_lines[1]))}</li>
            <li>
                {$unescaped($sanitize(address.city))}, {$unescaped($sanitize(address.state))} {$unescaped($sanitize(address.zip))}
            </li>
            <li>{$unescaped($sanitize(address.country))}</li>
        </>
    );
    return (
        <$Page
            blocks={{
                page: () => (
                    <>
                        <$Inject keyName={$string("selectItem")} value={$lang($string("forms.validate.account.reorder.select_item"))} />
                        {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                        <h2 className="page-heading title">
                            <$Lang keyName={$string("account.orders.details.heading")} number={order.id} />
                        </h2>
                        {place($partial("components/account/navigation", {account_page: $string("orders")}))}

                        <div className="account">
                            <div className="account-body">
                                <$Each
                                    list={order.status_messages}
                                    $then={(status) => place($partial("components/common/alert/alert-info", status.message))}
                                />
                                <div className="account-content account-content--fixedSmall">
                                    {place($partial("components/account/order-contents", {order: order}))}

                                    <dl className="account-orderTotal">
                                        <$Each
                                            list={order.total_rows}
                                            $then={(row) => (
                                                <$If
                                                    test={row.value.value}
                                                    $then={() => (
                                                        <>
                                                            <dt className="account-orderTotal-key">{row.label}:</dt>
                                                            <dd className="account-orderTotal-value">{row.value.formatted}</dd>
                                                            <$If
                                                                test={row.shipping_discounts}
                                                                $then={() => (
                                                                    <dl>
                                                                        <$Each
                                                                            list={row.shipping_discounts}
                                                                            $then={(discount) => <dt className="account-orderTotal-discount">{discount.label}</dt>}
                                                                        />
                                                                    </dl>
                                                                )}
                                                            />
                                                        </>
                                                    )}
                                                />
                                            )}
                                        />
                                    </dl>
                                </div>

                                <aside className="account-sidebar">
                                    <section className="account-sidebar-block">
                                        <h3 className="account-heading">
                                            <$Lang keyName={$string("account.orders.details.order_details")} />
                                        </h3>
                                        <dl className="definitionList">
                                            <dt className="definitionList-key">
                                                <$Lang keyName={$string("account.orders.details.order_status")} />
                                            </dt>
                                            <dd className="definitionList-value">{order.status_text}</dd>
                                            <dt className="definitionList-key">
                                                <$Lang keyName={$string("account.orders.details.payment_date")} />
                                            </dt>
                                            <dd className="definitionList-value">{order.date}</dd>
                                            <dt className="definitionList-key">
                                                <$Lang keyName={$string("account.orders.details.order_total")} />
                                            </dt>
                                            <dd className="definitionList-value">{order.total.formatted}</dd>
                                            <$If
                                                test={order.payment_method}
                                                $then={() => (
                                                    <>
                                                        <dt className="definitionList-key">
                                                            <$Lang keyName={$string("account.orders.details.payment_method")} />
                                                        </dt>
                                                        <dd className="definitionList-value">
                                                            {order.payment_method}{" "}
                                                            <$If
                                                                test={order.card_number_last_four}
                                                                $then={() => <$Lang keyName={$string("account.orders.details.card_ending")} card={order.card_number_last_four} />}
                                                            />
                                                        </dd>
                                                    </>
                                                )}
                                            />
                                            <$If
                                                test={order.order_instructions}
                                                $then={() => (
                                                    <>
                                                        <dt className="order-payments-description">
                                                            <$Lang keyName={$string("account.orders.details.how_to_pay")} />
                                                        </dt>
                                                        <dd className="order-payments-value order-payments-value--long">{$nl2br(order.order_instructions)}</dd>
                                                    </>
                                                )}
                                            />
                                        </dl>

                                        <button data-print-invoice={order.invoice_url} className="button">
                                            <$Lang keyName={$string("account.orders.details.print_invoice")} />
                                        </button>
                                    </section>

                                    <$If
                                        test={order.shipping_address}
                                        $then={() => (
                                            <section className="account-sidebar-block">
                                                <h3 className="account-heading">
                                                    <$Lang keyName={$string("account.orders.details.ship_to")} />
                                                </h3>
                                                <ul className="account-order-address">{addressLines(order.shipping_address)}</ul>
                                                <$If
                                                    test={order.backorder_shipping_expectation_message}
                                                    $then={() => <p className="account-order-backorder-expectation">{order.backorder_shipping_expectation_message}</p>}
                                                />
                                            </section>
                                        )}
                                    />
                                    <$If
                                        test={order.pickup_addresses}
                                        $then={() => (
                                            <section className="account-sidebar-block">
                                                <h3 className="account-heading">
                                                    <$Lang keyName={$string("account.orders.details.pickup")} />
                                                </h3>
                                                <$Each
                                                    list={order.pickup_addresses}
                                                    $then={(pickup) => (
                                                        <>
                                                            <dl className="definitionList">
                                                                <dt className="definitionList-key">
                                                                    <$Lang keyName={$string("account.orders.details.pickup_method")} />
                                                                </dt>
                                                                <dd className="definitionList-value">{$sanitize(pickup.pickup_method_display_name)}</dd>
                                                            </dl>

                                                            <ul className="account-order-address">
                                                                <li>
                                                                    <b>{$unescaped($sanitize(pickup.location_name))}</b>
                                                                </li>
                                                                <li>{$unescaped($sanitize(pickup.location_line_1))}</li>
                                                                <li>{$unescaped($sanitize(pickup.location_line_2))}</li>
                                                                <li>
                                                                    {$unescaped($sanitize(pickup.location_city))}, {$unescaped($sanitize(pickup.location_state))},{" "}
                                                                    {$unescaped($sanitize(pickup.location_zip))}
                                                                </li>
                                                                <li>{$unescaped($sanitize(pickup.location_country_name))}</li>
                                                            </ul>

                                                            <dl className="definitionList">
                                                                <$If
                                                                    test={pickup.location_phone}
                                                                    $then={() => (
                                                                        <>
                                                                            <dt className="definitionList-key">
                                                                                <$Lang keyName={$string("account.orders.details.phone")} />
                                                                            </dt>
                                                                            <dd className="definitionList-value">{$unescaped($sanitize(pickup.location_phone))}</dd>
                                                                        </>
                                                                    )}
                                                                />
                                                                <$If
                                                                    test={pickup.location_email}
                                                                    $then={() => (
                                                                        <>
                                                                            <dt className="definitionList-key">
                                                                                <$Lang keyName={$string("account.orders.details.email")} />
                                                                            </dt>
                                                                            <dd className="definitionList-value">{$unescaped($sanitize(pickup.location_email))}</dd>
                                                                        </>
                                                                    )}
                                                                />
                                                            </dl>

                                                            <ul className="account-order-address">
                                                                <li>
                                                                    <b>{$unescaped($lang($string("account.orders.details.opening_hours")))}</b>
                                                                </li>
                                                                <li>{$unescaped($sanitize(pickup.collection_time_description))}</li>
                                                            </ul>
                                                        </>
                                                    )}
                                                />
                                            </section>
                                        )}
                                        $else={() => (
                                            <$If
                                                test={order.has_multiple_shipping_addresses}
                                                $then={() => (
                                                    <section className="account-sidebar-block">
                                                        <h3 className="account-heading">
                                                            <$Lang keyName={$string("account.orders.details.ship_to")} />
                                                        </h3>
                                                        <div className="account-order-address">
                                                            <$Lang keyName={$string("account.orders.details.ship_to_multi_text")} />
                                                        </div>
                                                        <$If
                                                            test={order.backorder_shipping_expectation_message}
                                                            $then={() => <p className="account-order-backorder-expectation">{order.backorder_shipping_expectation_message}</p>}
                                                        />
                                                    </section>
                                                )}
                                            />
                                        )}
                                    />

                                    <section className="account-sidebar-block">
                                        <h3 className="account-heading">
                                            <$Lang keyName={$string("account.orders.details.bill_to")} />
                                        </h3>
                                        <ul className="account-order-address">{addressLines(order.billing_address)}</ul>
                                    </section>

                                    <$If
                                        test={shipments}
                                        $then={() => (
                                            <section className="account-sidebar-block">
                                                <h3 className="account-heading">
                                                    <$Lang keyName={$string("account.orders.details.shipments.header")} />
                                                </h3>
                                                <$Each
                                                    list={shipments}
                                                    $then={(shipment) => (
                                                        <dl className="definitionList">
                                                            <dt className="definitionList-key">
                                                                <$Lang keyName={$string("account.orders.details.shipments.date")} />:
                                                            </dt>
                                                            <dd className="definitionList-value">{shipment.date_shipped}</dd>
                                                            <dt className="definitionList-key">
                                                                <$Lang keyName={$string("account.orders.details.shipments.method")} />:
                                                            </dt>
                                                            <dd className="definitionList-value">{shipment.shipping_provider}</dd>
                                                            <dt className="definitionList-key">
                                                                <$Lang keyName={$string("account.orders.details.shipments.link")} />:
                                                            </dt>
                                                            <dd className="definitionList-value">
                                                                <$If
                                                                    test={shipment.shipping_track.url}
                                                                    $then={() => (
                                                                        <>
                                                                            {$raw('<a href="')}
                                                                            {shipment.shipping_track.url}
                                                                            {$raw('">')}
                                                                        </>
                                                                    )}
                                                                />
                                                                <$If
                                                                    test={shipment.show_shipping_method}
                                                                    $then={() => (
                                                                        <>
                                                                            {shipment.shipping_track.number} {$raw("&mdash;")} {shipment.shipping_method}
                                                                        </>
                                                                    )}
                                                                    $else={() => <>{shipment.shipping_track.number}</>}
                                                                />
                                                                <$If test={shipment.shipping_track.url} $then={() => $raw("</a>")} />
                                                            </dd>
                                                        </dl>
                                                    )}
                                                />
                                            </section>
                                        )}
                                    />

                                    <$If
                                        test={order.comments}
                                        $then={() => (
                                            <section className="account-sidebar-block">
                                                <h3 className="account-heading">
                                                    <$Lang keyName={$string("account.orders.details.comments")} />
                                                </h3>
                                                <p>{order.comments}</p>
                                            </section>
                                        )}
                                    />

                                    <section className="account-sidebar-block">
                                        <h3 className="account-heading">
                                            <$Lang keyName={$string("account.orders.details.actions")} />
                                        </h3>
                                        <div className="order-details-info">
                                            <form className="account-reorder-form" action={order.reorder_url} method="post" data-account-reorder-form={""}>
                                                <input type="hidden" name="orderid" value={order.id} />
                                                <$Each
                                                    list={order.items}
                                                    $then={(item) => (
                                                        <$If
                                                            test={item.show_reorder}
                                                            $then={() => <input type="hidden" name={`reorderitem[${item.order_product_id}]`} />}
                                                        />
                                                    )}
                                                />
                                                <input type="submit" className="button" value={$lang($string("account.orders.details.reorder"))} />
                                            </form>
                                            <$If
                                                test={$pointer("settings.returns_enabled")}
                                                $then={() => (
                                                    <$If
                                                        test={order.is_complete}
                                                        $then={() => (
                                                            <a href={order.return_url} className="button">
                                                                <$Lang keyName={$string("account.orders.details.return")} />
                                                            </a>
                                                        )}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </section>
                                </aside>
                            </div>
                        </div>
                    </>
                ),
            }}
            layout="layout/base"
        />
    );
};
