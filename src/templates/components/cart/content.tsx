import {
    $All,
    $AssignVar,
    $cdn,
    $Each,
    $getVar,
    $If,
    $Lang,
    $lang,
    $number,
    $Or,
    $partial,
    $pointer,
    $raw,
    $string,
    $Unless,
    place,
} from "@mainlanddev/hbx-bigcommerce";

interface StockPosition {
    quantity_on_hand: number;
    quantity_backordered: number;
    backorder_message: string;
}

interface Option {
    name: string;
    is_file: boolean;
    linked_bundled_item: {stock_position: StockPosition};
}

interface Item {
    id: string;
    product_id: number;
    type: string;
    name: string;
    url: string;
    edit_url: string;
    brand: {name: string};
    release_date: string;
    options: Option[];
    can_modify: boolean;
    event_date: {name: string; date: string};
    price: {formatted: string};
    price_discounted: {formatted: string};
    total: {formatted: string};
    total_discounted: {formatted: string};
    quantity: number;
    min_purchase_quantity: number;
    max_purchase_quantity: number;
    stock_position: StockPosition;
}

/** `{{assignVar "key" 1}}` / `{{assignVar "key" 0}}` as the two branches of an `all`. */
const assignBranch = (key: string, test: Parameters<typeof $All>[0]["values"]) => (
    <$All
        values={test}
        $then={() => <$AssignVar keyName={$string(key)} value={$number(1)} />}
        $else={() => <$AssignVar keyName={$string(key)} value={$number(0)} />}
    />
);

export default () => (
    <table className="cart" data-cart-quantity={$pointer("cart.quantity")}>
        <thead className="cart-header">
            <tr>
                <th className="cart-header-item" colSpan={2}>
                    <$Lang keyName={$string("cart.checkout.item")} />
                </th>
                <th className="cart-header-item">
                    <$Lang keyName={$string("cart.checkout.price")} />
                </th>
                <th className="cart-header-item cart-header-quantity">
                    <$Lang keyName={$string("cart.checkout.quantity")} />
                </th>
                <th className="cart-header-item">
                    <$Lang keyName={$string("cart.checkout.total")} />
                </th>
            </tr>
        </thead>
        <tbody className="cart-list">
            <$Each
                list={$pointer<Item[]>("cart.items")}
                $then={(item) => (
                    <tr className="cart-item" data-item-row={""}>
                        <td className="cart-item-block cart-item-figure">
                            {$raw("{{#if type '==' 'GiftCertificate'}}")}
                            <img
                                className="cart-item-fixed-image"
                                src={$cdn($pointer("../theme_settings.default_image_gift_certificate"))}
                                alt={$lang($string("cart.gift_certificates.gift_certificate"))}
                                title={$lang($string("cart.gift_certificates.gift_certificate"))}
                            />
                            {$raw("{{else}}")}
                            {place(
                                $partial("components/common/responsive-img", {
                                    image: $pointer("image"),
                                    class: $string("cart-item-image"),
                                    fallback_size: $pointer("../theme_settings.productthumb_size"),
                                    lazyload: $string("lazyload"),
                                    default_image: $pointer("../theme_settings.default_image_product"),
                                }),
                            )}
                            {$raw("{{/if}}")}
                        </td>
                        <td className="cart-item-block cart-item-title">
                            <$If test={item.brand.name} $then={() => <p className="cart-item-brand">{item.brand.name}</p>} />
                            <h2 className="cart-item-name">
                                <a className="cart-item-name__label" href={item.url}>
                                    {item.name}
                                </a>
                            </h2>
                            <$If test={item.release_date} $then={() => <p>({item.release_date})</p>} />

                            <$If
                                test={item.options}
                                $then={() => (
                                    <>
                                        <dl className="definitionList">
                                            <$Each
                                                list={item.options}
                                                $then={(option) => (
                                                    <>
                                                        <dt className="definitionList-key">{option.name}:</dt>
                                                        <dd className="definitionList-value">
                                                            <$If
                                                                test={option.is_file}
                                                                $then={() => (
                                                                    <a
                                                                        dangerouslyInlineAttributes={{
                                                                            attributes: `href="/viewfile.php?attributeId=${$pointer("id")}&cartitem=${$pointer("../id")}"`,
                                                                        }}
                                                                    >
                                                                        {$pointer("value")}
                                                                    </a>
                                                                )}
                                                                $else={() => place($partial("components/common/product-options"))}
                                                            />
                                                        </dd>
                                                    </>
                                                )}
                                            />
                                        </dl>

                                        <$If
                                            test={item.can_modify}
                                            $then={() => (
                                                <a
                                                    href="#"
                                                    data-item-edit={item.id}
                                                    data-product-id={item.product_id}
                                                    aria-label={$lang($string("products.change_product_options"), {name: item.name})}
                                                >
                                                    <$Lang keyName={$string("common.change")} />
                                                </a>
                                            )}
                                        />
                                    </>
                                )}
                            />

                            {$raw("{{#if type '==' 'GiftCertificate'}}")}
                            <a href={item.edit_url} aria-label={$lang($string("cart.gift_certificates.change_gift_certificate"), {certificate_name: item.name})}>
                                <$Lang keyName={$string("common.change")} />
                            </a>
                            {$raw("{{/if}}")}
                            {place($partial("components/cart/item-giftwrap", item))}
                            <$If
                                test={item.event_date}
                                $then={() => (
                                    <dl className="cart-item-options">
                                        <dt className="cart-item-option-title">{item.event_date.name}</dt>

                                        <dd className="cart-item-option-description">{item.event_date.date}</dd>
                                    </dl>
                                )}
                            />
                        </td>
                        <td className="cart-item-block cart-item-info">
                            <span className="cart-item-label">
                                <$Lang keyName={$string("cart.checkout.price")} />
                            </span>
                            {$raw("{{#or ../customer (unless ../settings.hide_price_from_guests) (if type '==' 'GiftCertificate')}}")}
                            <span className={`cart-item-value ${$If({test: item.price_discounted, $then: () => "price--discounted"})}`}>{item.price.formatted}</span>
                            <$If test={item.price_discounted} $then={() => <span className="cart-item-value">{item.price_discounted.formatted}</span>} />
                            {$raw("{{else}}")}
                            {place($partial("components/common/login-for-pricing"))}
                            {$raw("{{/or}}")}
                        </td>

                        <td className="cart-item-block cart-item-info cart-item-quantity">
                            <label className="form-label cart-item-label" htmlFor={`qty-${item.id}`}>
                                <$Lang keyName={$string("products.quantity")} />
                            </label>
                            <div className="form-increment">
                                <$If
                                    test={item.can_modify}
                                    $then={() => (
                                        <button className="button button--icon" data-cart-update={""} data-cart-itemid={item.id} data-action="dec">
                                            <span className="is-srOnly">
                                                <$Lang keyName={$string("products.quantity_decrease")} name={item.name} />
                                            </span>
                                            <i className="icon" aria-hidden="true">
                                                <svg>
                                                    <use href="#icon-keyboard-arrow-down" />
                                                </svg>
                                            </i>
                                        </button>
                                    )}
                                />
                                <input
                                    className="form-input form-input--incrementTotal cart-item-qty-input"
                                    id={`qty-${item.id}`}
                                    type="tel"
                                    data-quantity-min={item.min_purchase_quantity}
                                    data-quantity-max={item.max_purchase_quantity}
                                    data-quantity-min-error={$lang($string("products.quantity_min"), {quantity: item.min_purchase_quantity})}
                                    data-quantity-max-error={$lang($string("products.quantity_max"), {quantity: item.max_purchase_quantity})}
                                    min="1"
                                    pattern="[0-9]*"
                                    data-cart-itemid={item.id}
                                    data-action="manualQtyChange"
                                    aria-label={item.name}
                                    aria-live="polite"
                                    dangerouslyInlineAttributes={{attributes: `name="qty-${item.id}" value="${item.quantity}"${$Unless({test: item.can_modify, $then: () => " disabled"})}`}}
                                />
                                <$If
                                    test={item.can_modify}
                                    $then={() => (
                                        <button className="button button--icon" data-cart-update={""} data-cart-itemid={item.id} data-action="inc">
                                            <span className="is-srOnly">
                                                <$Lang keyName={$string("products.quantity_increase")} name={item.name} />
                                            </span>
                                            <i className="icon" aria-hidden="true">
                                                <svg>
                                                    <use href="#icon-keyboard-arrow-up" />
                                                </svg>
                                            </i>
                                        </button>
                                    )}
                                />
                            </div>
                            <$If
                                test={item.stock_position}
                                $then={() => (
                                    <>
                                        <$If
                                            test={$pointer<boolean>("../cart.inventory_settings.show_quantity_on_hand")}
                                            $then={() => (
                                                <$All
                                                    values={[item.stock_position.quantity_on_hand, item.stock_position.quantity_backordered]}
                                                    $then={() => (
                                                        <p className="cart-item-backorder-message">
                                                            <$Lang keyName={$string("products.quantity_on_hand")} quantity={item.stock_position.quantity_on_hand} />
                                                        </p>
                                                    )}
                                                />
                                            )}
                                        />
                                        <$If
                                            test={$pointer<boolean>("../cart.inventory_settings.show_quantity_on_backorder")}
                                            $then={() => (
                                                <$If
                                                    test={item.stock_position.quantity_backordered}
                                                    $then={() => (
                                                        <p className="cart-item-backorder-message">
                                                            <$Lang keyName={$string("products.quantity_backordered")} quantity={item.stock_position.quantity_backordered} />
                                                        </p>
                                                    )}
                                                />
                                            )}
                                        />
                                        <$If
                                            test={$pointer<boolean>("../cart.inventory_settings.show_backorder_message")}
                                            $then={() => (
                                                <$If
                                                    test={item.stock_position.backorder_message}
                                                    $then={() => <p className="cart-item-backorder-message">{item.stock_position.backorder_message}</p>}
                                                />
                                            )}
                                        />
                                        <$Each
                                            list={item.options}
                                            $then={(option) => (
                                                <$If
                                                    test={option.linked_bundled_item}
                                                    $then={() => {
                                                        const stock = option.linked_bundled_item.stock_position;
                                                        return (
                                                            <>
                                                                {assignBranch("showOnHandQty", [
                                                                    $pointer<boolean>("../../cart.inventory_settings.show_quantity_on_hand"),
                                                                    stock.quantity_on_hand,
                                                                    stock.quantity_backordered,
                                                                ])}
                                                                {" "}
                                                                {assignBranch("showBackorderedQty", [
                                                                    $pointer<boolean>("../../cart.inventory_settings.show_quantity_on_backorder"),
                                                                    stock.quantity_backordered,
                                                                ])}
                                                                {" "}
                                                                {assignBranch("showBackorderMessage", [
                                                                    $pointer<boolean>("../../cart.inventory_settings.show_backorder_message"),
                                                                    stock.backorder_message,
                                                                ])}
                                                                <$Or
                                                                    values={[$getVar($string("showOnHandQty")), $getVar($string("showBackorderedQty")), $getVar($string("showBackorderMessage"))]}
                                                                    $then={() => (
                                                                        <div className="cart-item-option-stock">
                                                                            <p className="cart-item-backorder-message">
                                                                                <strong>{option.name}:</strong>
                                                                            </p>
                                                                            <$If
                                                                                test={$getVar($string("showOnHandQty"))}
                                                                                $then={() => (
                                                                                    <p className="cart-item-backorder-message">
                                                                                        <$Lang keyName={$string("products.quantity_on_hand")} quantity={stock.quantity_on_hand} />
                                                                                    </p>
                                                                                )}
                                                                            />
                                                                            <$If
                                                                                test={$getVar($string("showBackorderedQty"))}
                                                                                $then={() => (
                                                                                    <p className="cart-item-backorder-message">
                                                                                        <$Lang keyName={$string("products.quantity_backordered")} quantity={stock.quantity_backordered} />
                                                                                    </p>
                                                                                )}
                                                                            />
                                                                            <$If
                                                                                test={$getVar($string("showBackorderMessage"))}
                                                                                $then={() => <p className="cart-item-backorder-message">{stock.backorder_message}</p>}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                />
                                                            </>
                                                        );
                                                    }}
                                                />
                                            )}
                                        />
                                    </>
                                )}
                            />
                        </td>

                        <td className="cart-item-block cart-item-info">
                            <span className="cart-item-label">
                                <$Lang keyName={$string("cart.checkout.total")} />
                            </span>
                            {$raw("{{#or ../customer (unless ../settings.hide_price_from_guests) (if type '==' 'GiftCertificate')}}")}
                            <strong className={`cart-item-value ${$If({test: item.total_discounted, $then: () => "price--discounted"})}`}>{item.total.formatted}</strong>
                            <$If test={item.total_discounted} $then={() => <strong className="cart-item-value">{item.total_discounted.formatted}</strong>} />
                            {$raw("{{else}}")}
                            --
                            {$raw("{{/or}}")}
                            {$raw("{{#or can_modify (if type '==' 'GiftCertificate')}}")}
                            <button
                                className="cart-remove icon"
                                data-cart-itemid={item.id}
                                data-confirm-delete={$lang($string("cart.confirm_delete"))}
                                aria-label={$lang($string("cart.remove_item"), {name: item.name})}
                            >
                                <svg aria-hidden="true">
                                    <use href="#icon-close"></use>
                                </svg>
                            </button>
                            {$raw("{{/or}}")}
                        </td>
                    </tr>
                )}
            />
        </tbody>
    </table>
);
