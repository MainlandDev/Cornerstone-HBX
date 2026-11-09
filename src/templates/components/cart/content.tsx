import {$Each, $If, $Partial, $string, $number, $if, $unless, $this} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import type {ExtendedThemePageCart} from '@/context';
import {$All, $AssignVar, $Lang, $Or} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$cdn, $getVar, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';

type Hint = ThemeContextHint<ExtendedThemePageCart>;

export default $asPartial<{
    cart: Hint['cart'];
    theme_settings: Hint['theme_settings'];
    customer: Hint['customer'];
    settings: Hint['settings'];
}>(({cart, theme_settings, customer, settings}) => (
    <table className="cart" data-cart-quantity={cart.quantity}>
        <thead className="cart-header">
            <tr>
                <th className="cart-header-item" colSpan={2}>
                    <$Lang translationKey={$string('cart.checkout.item')}/>
                </th>
                <th className="cart-header-item">
                    <$Lang translationKey={$string('cart.checkout.price')}/>
                </th>
                <th className="cart-header-item cart-header-quantity">
                    <$Lang translationKey={$string('cart.checkout.quantity')}/>
                </th>
                <th className="cart-header-item">
                    <$Lang translationKey={$string('cart.checkout.total')}/>
                </th>
            </tr>
        </thead>
        <tbody className="cart-list">
            <$Each
                list={cart.items}
                $then={(item) => (
                    <tr className="cart-item" data-item-row="">
                        <td className="cart-item-block cart-item-figure">
                            <$If
                                query={[item.type, '==', $string('GiftCertificate')]}
                                $then={() => (
                                    <img
                                        className="cart-item-fixed-image"
                                        src={$cdn(theme_settings.default_image_gift_certificate)}
                                        alt={$lang($string('cart.gift_certificates.gift_certificate'))}
                                        title={$lang($string('cart.gift_certificates.gift_certificate'))}
                                    />
                                )}
                                $else={() => (
                                    <$Partial
                                        name="components/common/responsive-img"
                                        hash={{
                                            image: item.image,
                                            class: $string('cart-item-image'),
                                            fallback_size: theme_settings.productthumb_size,
                                            lazyload: $string('lazyload'),
                                            default_image: theme_settings.default_image_product,
                                        }}
                                    />
                                )}
                            />
                        </td>
                        <td className="cart-item-block cart-item-title">
                            <$If
                                query={[item.brand.name]}
                                $then={() => <p className="cart-item-brand">{item.brand.name}</p>}
                            />
                            <h2 className="cart-item-name">
                                <a className="cart-item-name__label" href={item.url}>
                                    {item.name}
                                </a>
                            </h2>
                            <$If query={[item.release_date]} $then={() => <p>({item.release_date})</p>}/>

                            <$If
                                query={[item.options]}
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
                                                                query={[option.is_file]}
                                                                $then={() => (
                                                                    <a href={`/viewfile.php?attributeId=${option.id}&cartitem=${item.id}`}>
                                                                        {option.value}
                                                                    </a>
                                                                )}
                                                                $else={() => <$Partial name="components/common/product-options"/>}
                                                            />
                                                        </dd>
                                                    </>
                                                )}
                                            />
                                        </dl>

                                        <$If
                                            query={[item.can_modify]}
                                            $then={() => (
                                                <a
                                                    href="#"
                                                    data-item-edit={item.id}
                                                    data-product-id={item.product_id}
                                                    aria-label={$lang($string('products.change_product_options'), {name: item.name})}
                                                >
                                                    <$Lang translationKey={$string('common.change')}/>
                                                </a>
                                            )}
                                        />
                                    </>
                                )}
                            />

                            <$If
                                query={[item.type, '==', $string('GiftCertificate')]}
                                $then={() => (
                                    <a
                                        href={item.edit_url}
                                        aria-label={$lang($string('cart.gift_certificates.change_gift_certificate'), {
                                            certificate_name: item.name,
                                        })}
                                    >
                                        <$Lang translationKey={$string('common.change')}/>
                                    </a>
                                )}
                            />
                            <$Partial name="components/cart/item-giftwrap" context={$this()}/>
                            <$If
                                query={[item.event_date]}
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
                                <$Lang translationKey={$string('cart.checkout.price')}/>
                            </span>
                            <$Or
                                values={[customer, $unless(settings.hide_price_from_guests), $if(item.type, '==', $string('GiftCertificate'))]}
                                $then={() => (
                                    <>
                                        <span
                                            className={`cart-item-value ${$if(item.price_discounted).then(() => $$raw('price--discounted'))}`}
                                        >
                                            {item.price.formatted}
                                        </span>
                                        <$If
                                            query={[item.price_discounted]}
                                            $then={() => <span className="cart-item-value">{item.price_discounted.formatted}</span>}
                                        />
                                    </>
                                )}
                                $else={() => <$Partial name="components/common/login-for-pricing"/>}
                            />
                        </td>

                        <td className="cart-item-block cart-item-info cart-item-quantity">
                            <label className="form-label cart-item-label" htmlFor={`qty-${item.id}`}>
                                <$Lang translationKey={$string('products.quantity')}/>
                            </label>
                            <div className="form-increment">
                                <$If
                                    query={[item.can_modify]}
                                    $then={() => (
                                        <button className="button button--icon" data-cart-update="" data-cart-itemid={item.id} data-action="dec">
                                            <span className="is-srOnly">
                                                <$Lang translationKey={$string('products.quantity_decrease')} params={{name: item.name}}/>
                                            </span>
                                            <i className="icon" aria-hidden="true">
                                                <svg>
                                                    <use href="#icon-keyboard-arrow-down"/>
                                                </svg>
                                            </i>
                                        </button>
                                    )}
                                />
                                <input
                                    className="form-input form-input--incrementTotal cart-item-qty-input"
                                    id={`qty-${item.id}`}
                                    name={`qty-${item.id}`}
                                    type="tel"
                                    value={item.quantity}
                                    data-quantity-min={item.min_purchase_quantity}
                                    data-quantity-max={item.max_purchase_quantity}
                                    data-quantity-min-error={$lang($string('products.quantity_min'), {quantity: item.min_purchase_quantity})}
                                    data-quantity-max-error={$lang($string('products.quantity_max'), {quantity: item.max_purchase_quantity})}
                                    min="1"
                                    pattern="[0-9]*"
                                    data-cart-itemid={item.id}
                                    data-action="manualQtyChange"
                                    aria-label={item.name}
                                    aria-live="polite"
                                    disabled={$$when($unless(item.can_modify))}
                                />
                                <$If
                                    query={[item.can_modify]}
                                    $then={() => (
                                        <button className="button button--icon" data-cart-update="" data-cart-itemid={item.id} data-action="inc">
                                            <span className="is-srOnly">
                                                <$Lang translationKey={$string('products.quantity_increase')} params={{name: item.name}}/>
                                            </span>
                                            <i className="icon" aria-hidden="true">
                                                <svg>
                                                    <use href="#icon-keyboard-arrow-up"/>
                                                </svg>
                                            </i>
                                        </button>
                                    )}
                                />
                            </div>
                            <$If
                                query={[item.stock_position]}
                                $then={() => (
                                    <>
                                        <$If
                                            query={[cart.inventory_settings.show_quantity_on_hand]}
                                            $then={() => (
                                                <$All
                                                    values={[item.stock_position.quantity_on_hand, item.stock_position.quantity_backordered]}
                                                    $then={() => (
                                                        <p className="cart-item-backorder-message">
                                                            <$Lang
                                                                translationKey={$string('products.quantity_on_hand')}
                                                                params={{quantity: item.stock_position.quantity_on_hand}}
                                                            />
                                                        </p>
                                                    )}
                                                />
                                            )}
                                        />
                                        <$If
                                            query={[cart.inventory_settings.show_quantity_on_backorder]}
                                            $then={() => (
                                                <$If
                                                    query={[item.stock_position.quantity_backordered]}
                                                    $then={() => (
                                                        <p className="cart-item-backorder-message">
                                                            <$Lang
                                                                translationKey={$string('products.quantity_backordered')}
                                                                params={{quantity: item.stock_position.quantity_backordered}}
                                                            />
                                                        </p>
                                                    )}
                                                />
                                            )}
                                        />
                                        <$If
                                            query={[cart.inventory_settings.show_backorder_message]}
                                            $then={() => (
                                                <$If
                                                    query={[item.stock_position.backorder_message]}
                                                    $then={() => (
                                                        <p className="cart-item-backorder-message">{item.stock_position.backorder_message}</p>
                                                    )}
                                                />
                                            )}
                                        />
                                        <$Each
                                            list={item.options}
                                            $then={(option) => (
                                                <$If
                                                    query={[option.linked_bundled_item]}
                                                    $then={() => (
                                                        <>
                                                            <$All
                                                                values={[
                                                                    cart.inventory_settings.show_quantity_on_hand,
                                                                    option.linked_bundled_item.stock_position.quantity_on_hand,
                                                                    option.linked_bundled_item.stock_position.quantity_backordered,
                                                                ]}
                                                                $then={() => <$AssignVar keyName={$string('showOnHandQty')} value={$number(1)}/>}
                                                                $else={() => <$AssignVar keyName={$string('showOnHandQty')} value={$number(0)}/>}
                                                            />
                                                            <$All
                                                                values={[
                                                                    cart.inventory_settings.show_quantity_on_backorder,
                                                                    option.linked_bundled_item.stock_position.quantity_backordered,
                                                                ]}
                                                                $then={() => <$AssignVar keyName={$string('showBackorderedQty')} value={$number(1)}/>}
                                                                $else={() => <$AssignVar keyName={$string('showBackorderedQty')} value={$number(0)}/>}
                                                            />
                                                            <$All
                                                                values={[
                                                                    cart.inventory_settings.show_backorder_message,
                                                                    option.linked_bundled_item.stock_position.backorder_message,
                                                                ]}
                                                                $then={() => <$AssignVar keyName={$string('showBackorderMessage')} value={$number(1)}/>}
                                                                $else={() => <$AssignVar keyName={$string('showBackorderMessage')} value={$number(0)}/>}
                                                            />
                                                            <$Or
                                                                values={[
                                                                    $getVar($string('showOnHandQty')),
                                                                    $getVar($string('showBackorderedQty')),
                                                                    $getVar($string('showBackorderMessage')),
                                                                ]}
                                                                $then={() => (
                                                                    <div className="cart-item-option-stock">
                                                                        <p className="cart-item-backorder-message">
                                                                            <strong>{option.name}:</strong>
                                                                        </p>
                                                                        <$If
                                                                            query={[$getVar($string('showOnHandQty'))]}
                                                                            $then={() => (
                                                                                <p className="cart-item-backorder-message">
                                                                                    <$Lang
                                                                                        translationKey={$string('products.quantity_on_hand')}
                                                                                        params={{quantity: option.linked_bundled_item.stock_position.quantity_on_hand}}
                                                                                    />
                                                                                </p>
                                                                            )}
                                                                        />
                                                                        <$If
                                                                            query={[$getVar($string('showBackorderedQty'))]}
                                                                            $then={() => (
                                                                                <p className="cart-item-backorder-message">
                                                                                    <$Lang
                                                                                        translationKey={$string('products.quantity_backordered')}
                                                                                        params={{quantity: option.linked_bundled_item.stock_position.quantity_backordered}}
                                                                                    />
                                                                                </p>
                                                                            )}
                                                                        />
                                                                        <$If
                                                                            query={[$getVar($string('showBackorderMessage'))]}
                                                                            $then={() => (
                                                                                <p className="cart-item-backorder-message">
                                                                                    {option.linked_bundled_item.stock_position.backorder_message}
                                                                                </p>
                                                                            )}
                                                                        />
                                                                    </div>
                                                                )}
                                                            />
                                                        </>
                                                    )}
                                                />
                                            )}
                                        />
                                    </>
                                )}
                            />
                        </td>

                        <td className="cart-item-block cart-item-info">
                            <span className="cart-item-label">
                                <$Lang translationKey={$string('cart.checkout.total')}/>
                            </span>
                            <$Or
                                values={[customer, $unless(settings.hide_price_from_guests), $if(item.type, '==', $string('GiftCertificate'))]}
                                $then={() => (
                                    <>
                                        <strong
                                            className={`cart-item-value ${$if(item.total_discounted).then(() => $$raw('price--discounted'))}`}
                                        >
                                            {item.total.formatted}
                                        </strong>
                                        <$If
                                            query={[item.total_discounted]}
                                            $then={() => <strong className="cart-item-value">{item.total_discounted.formatted}</strong>}
                                        />
                                    </>
                                )}
                                $else={() => <>--</>}
                            />
                            <$Or
                                values={[item.can_modify, $if(item.type, '==', $string('GiftCertificate'))]}
                                $then={() => (
                                    <button
                                        className="cart-remove icon"
                                        data-cart-itemid={item.id}
                                        data-confirm-delete={$lang($string('cart.confirm_delete'))}
                                        aria-label={$lang($string('cart.remove_item'), {name: item.name})}
                                    >
                                        <svg aria-hidden="true">
                                            <use href="#icon-close"></use>
                                        </svg>
                                    </button>
                                )}
                            />
                        </td>
                    </tr>
                )}
            />
        </tbody>
    </table>
));
