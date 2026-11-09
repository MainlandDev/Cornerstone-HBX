import {$Each, $If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageAccountOrders} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$cdn} from '@mainlanddev/bigcommerce-react/bigcommerce';

type Hint = ThemeContextHint<ThemePageAccountOrders>;

export default $asPartial<{
    orders: Hint['customer']['orders'];
    settings: Hint['settings'];
    theme_settings: Hint['theme_settings'];
}>(({orders, settings, theme_settings}) => (
    <>
        <h3 className="account-heading">
            <$Lang translationKey={$string('account.orders.heading')}/>
        </h3>

        <ul className="account-list">
            <$Each
                list={orders}
                $then={(order) => (
                    <li className="account-listItem">
                        <div className="account-product">
                            <div className="account-product-figure">
                                <$If
                                    query={[order.items[0].type, '===', $string('giftcertificate')]}
                                    $then={() => (
                                        <img alt="GiftCertificate" title="GiftCertificate" src={$cdn(theme_settings.default_image_gift_certificate)}/>
                                    )}
                                    $else={() => (
                                        <$Partial
                                            name="components/common/responsive-img"
                                            hash={{
                                                image: order.image,
                                                class: $string('account-product-image'),
                                                fallback_size: theme_settings.productthumb_size,
                                                lazyload: theme_settings.lazyload_mode,
                                                default_image: theme_settings.default_image_product,
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            <div className="account-product-body">
                                <div className="account-orderStatus">
                                    <h6 className="account-orderStatus-label">{order.status}</h6>
                                    <$If
                                        query={[settings.returns_enabled]}
                                        $then={() => (
                                            <$If
                                                query={[order.return_url]}
                                                $then={() => (
                                                    <a className="account-orderStatus-action" href={order.return_url}>
                                                        <$Lang translationKey={$string('account.orders.return_items')}/>
                                                    </a>
                                                )}
                                            />
                                        )}
                                    />
                                </div>

                                <h5 className="account-product-title">
                                    <a href={order.details_url}>
                                        <$Lang translationKey={$string('account.orders.list.order_number')} params={{number: order.id}}/>
                                    </a>
                                </h5>
                                <p className="account-product-description">
                                    <$Lang
                                        translationKey={$string('account.orders.list.product_details')}
                                        params={{num_products: order.total_quantity, cost: order.total.formatted}}
                                    />
                                </p>

                                <div className="account-product-details">
                                    <div className="account-product-detail">
                                        <h6 className="account-product-detail-heading">
                                            <$Lang translationKey={$string('account.orders.order_placed')}/>
                                        </h6>
                                        <span>{order.date}</span>
                                    </div>
                                    <div className="account-product-detail">
                                        <h6 className="account-product-detail-heading">
                                            <$Lang translationKey={$string('account.orders.last_update')}/>
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
));
