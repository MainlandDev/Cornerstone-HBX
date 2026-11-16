import {$Each, $If, $Lang, $nl2br, $Page, $pointer, $raw, $stylesheet, $string, $unescaped, $Unless, $sanitize, place} from "@mainlanddev/hbx-bigcommerce";

// Local shapes: the library's `Order` / `OrderItemsItem` lack these keys (pickup_addresses, customizations,
// shipping_discounts, new_address, ...). Fields are read from invoice.html, not from the API docs.
interface Address {
    full_name: string;
    company: string;
    address_lines: string[];
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    email: string;
}

interface PickupAddress {
    location_line_1: string;
    location_line_2: string;
    location_city: string;
    location_state: string;
    location_zip: string;
    location_country_name: string;
    location_phone: string;
    location_email: string;
}

interface ShippingRow {
    is_pickup: boolean;
    is_shipping: boolean;
    is_digital: boolean;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

interface NameValue {
    name: string;
    value: string;
}

interface InvoiceItem {
    new_address: boolean;
    shipping_rows: ShippingRow[];
    quantity: number;
    sku: string;
    name: string;
    options: NameValue[];
    customizations: NameValue[];
    gift_wrapping_name: string;
    event_date: {name: string; date: string};
    pre_ordered: boolean;
    price: {formatted: string};
    total: {formatted: string};
}

interface ShippingDiscount {
    label: string;
}

interface TotalRow {
    label: string;
    value: {formatted: string};
    shipping_discounts: ShippingDiscount[];
}

interface Order {
    id: number;
    billing_address: Address;
    shipping_address: Address;
    has_multiple_shipping_addresses: boolean;
    pickup_addresses: PickupAddress[];
    payment_method: string;
    total: {formatted: string};
    date: string;
    shipping_method: string;
    items: InvoiceItem[];
    total_rows: TotalRow[];
    comments: string;
}

export default () => {
    const order = $pointer<Order>("order");
    const logoTitle = $pointer("settings.store_logo.title");
    const addressBlock = (address: typeof order.billing_address) => (
        <>
            <li>
                <strong>{address.full_name}</strong>
            </li>
            <li>{address.company}</li>
            <li>{address.address_lines[0]}</li>
            <li>{address.address_lines[1]}</li>
            <li>
                {address.city}, {address.state} {address.zip}
            </li>
            <li>{address.country}</li>
            <li>{$raw("&nbsp;")}</li>
            <li>
                <$Lang keyName={$string("invoice.phone")} number={address.phone} />
            </li>
            <$If
                test={address.email}
                $then={() => (
                    <li>
                        <$Lang keyName={$string("invoice.email")} email={address.email} />
                    </li>
                )}
            />
        </>
    );
    return (
        <$Page
            blocks={{
                head: () => place($unescaped($stylesheet($string("/assets/css/invoice.css")))),
                page: () => (
                    <>
                        <div className="Invoice">
                            <h1>
                                <$If
                                    test={$pointer("settings.store_logo.image")}
                                    $then={() => (
                                        <>
                                            <$If
                                                test={$pointer("theme_settings.logo_size")}
                                                operator={$string("===")}
                                                rvalue={$string("original")}
                                                $then={() => (
                                                    <>
                                                        <img
                                                            className="header-logo-image-unknown-size"
                                                            dangerouslyInlineAttributes={{attributes: `src="${$raw("{{getImage settings.store_logo.image 'logo_size'}}")}"`}}
                                                            alt={logoTitle}
                                                            title={logoTitle}
                                                        />
                                                    </>
                                                )}
                                                $else={() => (
                                                    <>
                                                        <div className="header-logo-image-container">
                                                            <img
                                                                className="header-logo-image"
                                                                dangerouslyInlineAttributes={{attributes: `data-sizes="auto" src="${$raw("{{getImage settings.store_logo.image 'logo_size'}}")}"`}}
                                                                alt={logoTitle}
                                                                title={logoTitle}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                            />
                                        </>
                                    )}
                                    $else={() => <span className="header-logo-text">{logoTitle}</span>}
                                />
                            </h1>
                            <div className="InvoiceTitle">
                                <$Lang keyName={$string("invoice.for_order")} name={$pointer("settings.store_name")} id={order.id} />
                            </div>

                            <address>
                                <strong>{$nl2br($pointer("settings.address"))}</strong>
                            </address>

                            <div className="AddressRow">
                                <div className="BillingAddress">
                                    <h3>
                                        <$Lang keyName={$string("account.orders.details.bill_to")} />
                                    </h3>
                                    <ul>{addressBlock(order.billing_address)}</ul>
                                </div>
                                <$If
                                    test={order.shipping_address}
                                    $then={() => (
                                        <$Unless
                                            test={order.has_multiple_shipping_addresses}
                                            $then={() => (
                                                <div className="ShippingAddress">
                                                    <h3>
                                                        <$Lang keyName={$string("account.orders.details.ship_to")} />
                                                    </h3>
                                                    <ul>{addressBlock(order.shipping_address)}</ul>
                                                </div>
                                            )}
                                        />
                                    )}
                                />
                                <$If
                                    test={order.pickup_addresses}
                                    $then={() => (
                                        <$Unless
                                            test={order.has_multiple_shipping_addresses}
                                            $then={() => (
                                                <div className="ShippingAddress">
                                                    <h3>
                                                        <$Lang keyName={$string("account.orders.details.pickup_details")} />
                                                    </h3>
                                                    <ul>
                                                        <$Each
                                                            list={order.pickup_addresses}
                                                            $then={(pickup) => (
                                                                <>
                                                                    <li>
                                                                        <strong>{pickup.location_line_1}</strong>
                                                                    </li>
                                                                    <li>{pickup.location_line_2}</li>
                                                                    <li>
                                                                        {pickup.location_city}, {pickup.location_state} {pickup.location_zip}
                                                                    </li>
                                                                    <li>{pickup.location_country_name}</li>
                                                                    <li>{$raw("&nbsp;")}</li>
                                                                    <li>
                                                                        <$Lang keyName={$string("invoice.phone")} number={pickup.location_phone} />
                                                                    </li>
                                                                    <$If
                                                                        test={pickup.location_email}
                                                                        $then={() => (
                                                                            <li>
                                                                                <$Lang keyName={$string("invoice.email")} email={pickup.location_email} />
                                                                            </li>
                                                                        )}
                                                                    />
                                                                </>
                                                            )}
                                                        />
                                                    </ul>
                                                </div>
                                            )}
                                        />
                                    )}
                                />
                            </div>

                            <div className="InvoiceDetails">
                                <div className="InvoiceDetailsLeft">
                                    <div className="DetailRow">
                                        <div className="Label">
                                            <$Lang keyName={$string("invoice.order")} />
                                        </div>
                                        <div className="Value">#{order.id}</div>
                                    </div>
                                    <div className="DetailRow">
                                        <div className="Label">
                                            <$Lang keyName={$string("invoice.payment_method")} />
                                        </div>
                                        <div className="Value">
                                            {order.payment_method} ({order.total.formatted})
                                        </div>
                                    </div>
                                </div>
                                <div className="InvoiceDetailsRight">
                                    <div className="DetailRow">
                                        <div className="Label">
                                            <$Lang keyName={$string("invoice.order_date")} />
                                        </div>
                                        <div className="Value">{order.date}</div>
                                    </div>
                                    <$If
                                        test={order.shipping_method}
                                        $then={() => (
                                            <div className="DetailRow">
                                                <div className="Label">
                                                    <$Lang keyName={$string("invoice.shipping_method")} />
                                                </div>
                                                <div className="Value">{order.shipping_method}</div>
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="InvoiceItems">
                                <h2 className="InvoiceHeading">
                                    <$Lang keyName={$string("invoice.order_items")} />
                                </h2>
                                <table className="InvoiceTable">
                                    <thead>
                                        <tr>
                                            <$If
                                                test={order.has_multiple_shipping_addresses}
                                                $then={() => (
                                                    <th className="ProductAddress">
                                                        <$Lang keyName={$string("invoice.fulfillment")} />
                                                    </th>
                                                )}
                                            />
                                            <th className="ProductQuantity">
                                                <$Lang keyName={$string("invoice.qty")} />
                                            </th>
                                            <th className="ProductSku">
                                                <$Lang keyName={$string("invoice.code")} />
                                            </th>
                                            <th className="ProductDetails">
                                                <$Lang keyName={$string("invoice.product_name")} />
                                            </th>
                                            <th className="ProductCost" align="right">
                                                <$Lang keyName={$string("invoice.price")} />
                                            </th>
                                            <th className="ProductTotal" align="right">
                                                <$Lang keyName={$string("invoice.total")} />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="InvoiceItemList">
                                        <$Each
                                            list={order.items}
                                            $then={(item) => (
                                                <tr dangerouslyInlineAttributes={{attributes: `${$If({test: item.new_address, $then: () => $raw('class="NewAddress"')})}`}}>
                                                    <$If
                                                        test={$pointer("../order.has_multiple_shipping_addresses")}
                                                        $then={() => (
                                                            <td className="ProductAddress">
                                                                <$Each
                                                                    list={item.shipping_rows}
                                                                    $then={(row) => (
                                                                        <>
                                                                            <$If
                                                                                test={row.is_pickup}
                                                                                $then={() => (
                                                                                    <div>
                                                                                        <b>
                                                                                            <$Lang keyName={$string("invoice.pickup")} />
                                                                                        </b>
                                                                                    </div>
                                                                                )}
                                                                            />
                                                                            <$If
                                                                                test={row.is_shipping}
                                                                                $then={() => (
                                                                                    <div>
                                                                                        <b>
                                                                                            <$Lang keyName={$string("invoice.shipping")} />
                                                                                        </b>
                                                                                    </div>
                                                                                )}
                                                                            />
                                                                            <$If
                                                                                test={row.is_digital}
                                                                                $then={() => (
                                                                                    <div>
                                                                                        <b>
                                                                                            <$Lang keyName={$string("invoice.digital")} />
                                                                                        </b>
                                                                                    </div>
                                                                                )}
                                                                            />
                                                                            <div>{row.address}</div>
                                                                            <div>
                                                                                {row.city} {row.state} {row.zip}
                                                                            </div>
                                                                            <div>{row.country}</div>
                                                                        </>
                                                                    )}
                                                                />
                                                            </td>
                                                        )}
                                                    />
                                                    <td className="ProductQuantity">{item.quantity}</td>
                                                    <td className="ProductSku">{item.sku}</td>
                                                    <td className="ProductDetails">
                                                        {item.name}
                                                        <div className="ProductAttributes">
                                                            <$Each
                                                                list={item.options}
                                                                $then={(option) => (
                                                                    <div className="ConfigurableProductRow">
                                                                        <div className="Label">{option.name}:</div>
                                                                        <div className="Value"></div>
                                                                        <div className="Value">{$unescaped($sanitize(option.value))}</div>
                                                                    </div>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="ProductConfigurableFields">
                                                            <$Each
                                                                list={item.customizations}
                                                                $then={(field) => (
                                                                    <div className="ConfigurableProductRow">
                                                                        <div className="Label">{field.name}:</div>
                                                                        <div className="Value"></div>
                                                                        <div className="Value">{field.value}</div>
                                                                    </div>
                                                                )}
                                                            />
                                                        </div>
                                                        <$If
                                                            test={item.gift_wrapping_name}
                                                            $then={() => <div className="ProductGiftWrapping">{item.gift_wrapping_name}</div>}
                                                        />
                                                        <$If
                                                            test={item.event_date}
                                                            $then={() => (
                                                                <div className="ProductEventDate">
                                                                    <div className="ConfigurableProductRow">
                                                                        <div className="Label">{item.event_date.name}:</div>
                                                                        <div className="Value"></div>
                                                                        <div className="Value">{item.event_date.date}</div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        />
                                                        <$If
                                                            test={item.pre_ordered}
                                                            $then={() => (
                                                                <div className="ProductPreOrder">
                                                                    <div className="ConfigurableProductRow">
                                                                        <div className="Label">Preordered:</div>
                                                                        <div className="Value">
                                                                            <$Lang keyName={$string("common.yes")} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        />
                                                    </td>
                                                    <td className="ProductCost">{item.price.formatted}</td>
                                                    <td className="ProductTotal">{item.total.formatted}</td>
                                                </tr>
                                            )}
                                        />
                                    </tbody>
                                    <tfoot className="InvoiceTotals">
                                        <$Each
                                            list={order.total_rows}
                                            $then={(row) => (
                                                <>
                                                    <tr className="InvoiceTotalRow">
                                                        <td
                                                            className="Title"
                                                            colSpan={`${$If({test: $pointer("../order.has_multiple_shipping_addresses"), $then: () => "5", $else: () => "4"})}`}
                                                        >
                                                            {row.label}
                                                        </td>
                                                        <td className="Total">{row.value.formatted}</td>
                                                    </tr>
                                                    <$If
                                                        test={row.shipping_discounts}
                                                        $then={() => (
                                                            <$Each
                                                                list={row.shipping_discounts}
                                                                $then={(discount) => (
                                                                    <tr className="InvoiceTotalRow">
                                                                        <td className="Title" colSpan={5}>
                                                                            {discount.label}
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            />
                                                        )}
                                                    />
                                                </>
                                            )}
                                        />
                                    </tfoot>
                                </table>
                                <div className="InvoiceComments">
                                    <div className="InvoiceHeading">
                                        <$Lang keyName={$string("invoice.comments")} />
                                    </div>
                                    <blockquote>{order.comments}</blockquote>
                                </div>
                            </div>
                        </div>
                        <script dangerouslySetInnerHTML={{__html: "window.print();"}} />
                    </>
                ),
            }}
            layout="layout/empty"
        />
    );
};
