import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Or} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$If, $Partial, $Unless, $each, $if, $number, $string, $unescaped, $unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$_Region} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang, $or} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import ProductBadge from '@/templates/components/products/product-badge';
import ProductInfo from '@/templates/components/products/product-info';
import Price from '@/templates/components/products/price';
import Ratings from '@/templates/components/products/ratings';
import PromotionCallout from '@/templates/components/products/promotion-callout';
import type {
    CustomerHint,
    ProductCardHint,
    ProductPageHint,
    SettingsHint,
    ThemeSettingsHint,
} from '@/context-products';

type Bool = HandlebarsInlineValueToken<boolean>;
type Num = HandlebarsInlineValueToken<number>;
type Str = HandlebarsInlineValueToken<string>;

export default $asPartial<{
    id: ProductCardHint['id'];
    name: ProductCardHint['name'];
    url: ProductCardHint['url'];
    image: ProductCardHint['image'];
    brand: ProductCardHint['brand'];
    category: ProductCardHint['category'];
    price: ProductCardHint['price'];
    stock_level: ProductCardHint['stock_level'];
    rating: ProductCardHint['rating'];
    summary: ProductCardHint['summary'];
    show_cart_action: ProductCardHint['show_cart_action'];
    has_options: ProductCardHint['has_options'];
    pre_order: ProductCardHint['pre_order'];
    pre_order_add_to_cart_url: ProductCardHint['pre_order_add_to_cart_url'];
    add_to_cart_url: ProductCardHint['add_to_cart_url'];
    out_of_stock_message: ProductCardHint['out_of_stock_message'];
    hide_product_quick_view: ProductCardHint['hide_product_quick_view'];
    featured_promotions: ProductCardHint['featured_promotions'];
    /** Hash arguments: passed by the caller, not read from the product. */
    event: Str;
    position: Num;
    show_compare: Bool;
    show_rating: SettingsHint['show_product_rating'];
    customer: CustomerHint;
    settings: SettingsHint;
    theme_settings: ThemeSettingsHint;
    page_type: ProductPageHint['page_type'];
}>(({
    id,
    name,
    url,
    image,
    brand,
    category,
    price,
    stock_level,
    rating,
    summary,
    show_cart_action,
    has_options,
    pre_order,
    pre_order_add_to_cart_url,
    add_to_cart_url,
    out_of_stock_message,
    hide_product_quick_view,
    featured_promotions,
    event,
    position,
    show_compare,
    show_rating,
    customer,
    settings,
    theme_settings,
    page_type,
}) => (
    <article
        className="listItem"
        data-event-type={event}
        data-entity-id={id}
        data-position={position}
        data-name={name}
        data-product-category={`${$each(category).then((item, loop) => $if(loop['@last']).then(() => item).else(() => [item, $$raw(', ')]))} `}
        data-product-brand={brand.name}
        data-product-price={` ${$or(customer, $unless(settings.hide_price_from_guests))
            .then(() => $if(price.with_tax).then(() => price.with_tax.value).else(() => price.without_tax.value))
            .else(() => $lang($string('common.login_for_pricing')))} `}
    >
        <figure className="listItem-figure">
            <a
                href={url}
                className="listItem-figure__link"
                aria-label={ProductInfo({name, customer, settings, price, theme_settings})}
                data-event-type="product-click"
            >
                <$If
                    query={[stock_level, '===', $number(0)]}
                    $then={() => (
                        <$If
                            query={[theme_settings.pdp_sold_out_label, '===', $string('')]}
                            $then={() => (
                                <ProductBadge
                                    badge-type="sold-out"
                                    badge_view={theme_settings.product_sold_out_badges}
                                    badge_label={$lang($string('page_builder.pdp_sold_out_label'))}
                                />
                            )}
                            $else={() => (
                                <ProductBadge
                                    badge-type="sold-out"
                                    badge_view={theme_settings.product_sold_out_badges}
                                    badge_label={theme_settings.pdp_sold_out_label}
                                />
                            )}
                        />
                    )}
                    $else={() => (
                        <$Or
                            values={[price.sale_price_with_tax.value, price.sale_price_without_tax.value]}
                            $then={() => (
                                <$If
                                    query={[theme_settings.pdp_sale_badge_label, '===', $string('')]}
                                    $then={() => (
                                        <ProductBadge
                                            badge-type="sale"
                                            badge_view={theme_settings.product_sale_badges}
                                            badge_label={$lang($string('page_builder.pdp_sale_badge_label'))}
                                        />
                                    )}
                                    $else={() => (
                                        <ProductBadge
                                            badge-type="sale"
                                            badge_view={theme_settings.product_sale_badges}
                                            badge_label={theme_settings.pdp_sale_badge_label}
                                        />
                                    )}
                                />
                            )}
                        />
                    )}
                />
                <$Partial
                    name="components/common/responsive-img"
                    hash={{
                        image: image,
                        class: $string('listItem-image'),
                        fallback_size: theme_settings.productgallery_size,
                        lazyload: theme_settings.lazyload_mode,
                        default_image: theme_settings.default_image_product,
                    }}
                />
            </a>
            <$Unless
                query={[hide_product_quick_view]}
                $then={() => (
                    <$If
                        query={[theme_settings.show_product_quick_view]}
                        $then={() => (
                            <div className="listItem-figureBody">
                                <button type="button" data-event-type="product-click" className="button button--small listItem-button quickview" data-product-id={id}>
                                    {$lang($string('products.quick_view'))}
                                </button>
                            </div>
                        )}
                    />
                )}
            />
        </figure>
        <div className="listItem-body">
            <div className="listItem-content">
                <div className="listItem-details">
                    <$If
                        query={[show_rating]}
                        $then={() => (
                            <p className="listItem-rating">
                                <Ratings rating_target={name} rating={rating}/>
                            </p>
                        )}
                    />
                    <$If
                        query={[brand.name]}
                        $then={() => <p className="listItem-brand">{brand.name}</p>}
                    />
                    <h4 className="listItem-title">
                        <a
                            href={url}
                            aria-label={ProductInfo({name, customer, settings, price, theme_settings})}
                            data-event-type="product-click"
                        >
                            {name}
                        </a>
                    </h4>
                    <$If
                        query={[summary]}
                        $then={() => <p>{$unescaped(summary)}</p>}
                    />
                </div>
                <div className="listItem-actions">
                    <$Or
                        values={[customer, $unless(settings.hide_price_from_guests)]}
                        $then={() => (
                            <$If
                                query={[price]}
                                $then={() => (
                                    <>
                                        <div className="listItem-price">
                                            <Price price={price} theme_settings={theme_settings} page_type={page_type}/>
                                        </div>
                                        <$_Region name={$string('product_item_below_price')}/>
                                    </>
                                )}
                            />
                        )}
                        $else={() => <$Partial name="components/common/login-for-pricing"/>}
                    />
                    <$If
                        query={[theme_settings.show_featured_promotions]}
                        $then={() => <PromotionCallout promotions={featured_promotions} mode={$string('compact')}/>}
                    />
                    <$If
                        query={[show_cart_action]}
                        $then={() => (
                            <>
                                <$If
                                    query={[has_options]}
                                    $then={() => (
                                        <a href={url} data-event-type="product-click" className="button button--small" data-product-id={id}>
                                            {$lang($string('products.choose_options'))}
                                        </a>
                                    )}
                                />
                                <$If
                                    query={[pre_order]}
                                    $then={() => (
                                        <a href={pre_order_add_to_cart_url} data-event-type="product-click" className="button button--primary">
                                            {$lang($string('products.pre_order'))}
                                        </a>
                                    )}
                                />
                                <$If
                                    query={[add_to_cart_url]}
                                    $then={() => (
                                        <a href={add_to_cart_url} data-event-type="product-click" className="button button--primary">
                                            {$lang($string('products.add_to_cart'))}
                                        </a>
                                    )}
                                />
                                <$If
                                    query={[out_of_stock_message]}
                                    $then={() => (
                                        <a href={url} data-event-type="product-click" className="button button--small" data-product-id={id}>
                                            {out_of_stock_message}
                                        </a>
                                    )}
                                />
                            </>
                        )}
                    />
                    <$If
                        query={[show_compare]}
                        $then={() => (
                            <label className="button button--small" htmlFor={`compare-${id}`}>
                                {$lang($string('products.compare'))} <input type="checkbox" name="products[]" value={id} id={`compare-${id}`} data-compare-id={id}/>
                            </label>
                        )}
                    />
                </div>
            </div>
        </div>
    </article>
));
