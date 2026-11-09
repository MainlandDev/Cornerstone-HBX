import {$Each, $If, $Partial, $string, $unescaped, $Unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$cdn} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {ExtendedThemePageOrderDetails} from '@/context-account';

type Hint = ThemeContextHint<ExtendedThemePageOrderDetails>;

export default $asPartial<{ order: Hint['order']; theme_settings: Hint['theme_settings'] }>(({order, theme_settings}) => (
    <>
        <h3 className="account-heading">
            <$Lang translationKey={$string('account.orders.details.order_contents')}/>
        </h3>

        <ul className="account-list">
            <$Each
                list={order.items}
                $then={(item) => (
                    <>
                        <$Each
                            list={item.shipping_rows}
                            $then={(row) => (
                                <$If
                                    query={[row.is_shipping]}
                                    $then={() => (
                                        <li className="account-listShipping">
                                            <h5 className="account-listShipping-title">
                                                <$Lang
                                                    translationKey={$string('account.orders.details.ship_to_multi')}
                                                    params={{
                                                        street: row.address,
                                                        city: row.city,
                                                        state: row.state,
                                                        zip: row.zip,
                                                        country: row.country,
                                                    }}
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
                                        query={[item.show_reorder]}
                                        $then={() => (
                                            <>
                                                <input
                                                    className="form-checkbox"
                                                    type="checkbox"
                                                    id={`account-product-id-${item.order_product_id}`}
                                                    value={item.order_product_id}
                                                />
                                                <label htmlFor={`account-product-id-${item.order_product_id}`} className="form-label">
                                                    <span className="is-srOnly">Checkbox {item.order_product_id} label</span>
                                                </label>
                                            </>
                                        )}
                                    />
                                </div>
                                <figure className="account-product-figure">
                                    <$If
                                        query={[item.type, '===', $string('giftcertificate')]}
                                        $then={() => (
                                            <img
                                                src={$cdn(theme_settings.default_image_gift_certificate)}
                                                alt="Gift Certificate"
                                                title="Gift Certificate"
                                            />
                                        )}
                                        $else={() => (
                                            <$Partial
                                                name="components/common/responsive-img"
                                                hash={{
                                                    image: item.image,
                                                    class: $string('account-product-image'),
                                                    fallback_size: theme_settings.productthumb_size,
                                                    lazyload: theme_settings.lazyload_mode,
                                                    default_image: theme_settings.default_image_product,
                                                }}
                                            />
                                        )}
                                    />
                                    <$Unless
                                        query={[item.refunded]}
                                        $then={() => (
                                            <$If
                                                query={[item.download_url]}
                                                $then={() => (
                                                    <a href={item.download_url} className="account-product-download button button--primary">
                                                        <span className="is-srOnly">
                                                            <$Lang translationKey={$string('account.orders.details.download_items')}/>
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
                                        {item.quantity} {$$raw('&#215;')} {item.name}
                                    </h5>
                                    <$If query={[item.brand]} $then={() => <h6>{item.brand.name}</h6>}/>
                                    <$If
                                        query={[item.quantity_ready_to_ship]}
                                        $then={() => (
                                            <p className="account-product-backorder-prompts">
                                                <$Lang
                                                    translationKey={$string('products.quantity_on_hand')}
                                                    params={{quantity: item.quantity_ready_to_ship}}
                                                />
                                            </p>
                                        )}
                                    />
                                    <$If
                                        query={[item.quantity_backordered]}
                                        $then={() => (
                                            <p className="account-product-backorder-prompts">
                                                <$Lang
                                                    translationKey={$string('products.quantity_backordered')}
                                                    params={{quantity: item.quantity_backordered}}
                                                />
                                            </p>
                                        )}
                                    />
                                    <$If
                                        query={[item.backorder_message]}
                                        $then={() => <p className="account-product-backorder-prompts">{item.backorder_message}</p>}
                                    />
                                    <$If
                                        query={[item.options]}
                                        $then={() => (
                                            <dl className="definitionList">
                                                <$Each
                                                    list={item.options}
                                                    $then={(option) => (
                                                        <>
                                                            <dt className="definitionList-key">{option.name}:</dt>
                                                            <dd className="definitionList-value">
                                                                <$Partial name="components/common/product-options"/>
                                                            </dd>
                                                            <$If
                                                                query={[option.linked_bundled_item.quantity_ready_to_ship]}
                                                                $then={() => (
                                                                    <dd className="definitionList-value account-product-backorder-prompts">
                                                                        <$Lang
                                                                            translationKey={$string('products.quantity_on_hand')}
                                                                            params={{quantity: option.linked_bundled_item.quantity_ready_to_ship}}
                                                                        />
                                                                    </dd>
                                                                )}
                                                            />
                                                            <$If
                                                                query={[option.linked_bundled_item.quantity_backordered]}
                                                                $then={() => (
                                                                    <dd className="definitionList-value account-product-backorder-prompts">
                                                                        <$Lang
                                                                            translationKey={$string('products.quantity_backordered')}
                                                                            params={{quantity: option.linked_bundled_item.quantity_backordered}}
                                                                        />
                                                                    </dd>
                                                                )}
                                                            />
                                                            <$If
                                                                query={[option.linked_bundled_item.backorder_message]}
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
                                        query={[item.gift_wrapping_name]}
                                        $then={() => (
                                            <dl className="definitionList">
                                                <dt className="definitionList-key">
                                                    <$Lang translationKey={$string('account.orders.gift_wrapping')}/>
                                                </dt>
                                                <dd className="definitionList-value">{item.gift_wrapping_name}</dd>
                                            </dl>
                                        )}
                                    />
                                    <$If
                                        query={[item.event_date]}
                                        $then={() => (
                                            <dl className="definitionList">
                                                <dt className="definitionList-key">{item.event_date.name}:</dt>

                                                <dd className="definitionList-value">{item.event_date.date}</dd>
                                            </dl>
                                        )}
                                    />
                                    <$If
                                        query={[item.refunded]}
                                        $then={() => (
                                            <p className="account-product-refundQty">
                                                <$Lang translationKey={$string('account.orders.refunded_quantity')} params={{qty: item.refunded_qty}}/>
                                            </p>
                                        )}
                                        $else={() => (
                                            <$If
                                                query={[item.refunded_qty]}
                                                $then={() => (
                                                    <p className="account-product-refundQty">
                                                        <$Lang
                                                            translationKey={$string('account.orders.refunded_quantity')}
                                                            params={{qty: item.refunded_qty}}
                                                        />
                                                    </p>
                                                )}
                                            />
                                        )}
                                    />
                                    <$If query={[item.reorder_message]} $then={() => <p>{$unescaped(item.reorder_message)}</p>}/>
                                </div>
                            </div>
                        </li>
                    </>
                )}
            />
        </ul>
    </>
));
