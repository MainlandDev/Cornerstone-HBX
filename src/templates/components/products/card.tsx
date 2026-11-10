/**
 * Source: templates/components/products/card.html (145 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$And, $Or} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$If, $Partial, $Unless, $each, $if, $number, $string, $unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$lang, $or} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$_Region} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
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
    show_cart_action: ProductCardHint['show_cart_action'];
    has_options: ProductCardHint['has_options'];
    pre_order: ProductCardHint['pre_order'];
    pre_order_add_to_cart_url?: ProductCardHint['pre_order_add_to_cart_url'];
    add_to_cart_url?: ProductCardHint['add_to_cart_url'];
    out_of_stock_message?: ProductCardHint['out_of_stock_message'];
    hide_product_quick_view?: ProductCardHint['hide_product_quick_view'];
    featured_promotions?: ProductCardHint['featured_promotions'];
    /** Hash arguments: passed by the caller, not read from the product. */
    alternate?: Bool;
    event: Str;
    position: Num;
    show_compare?: Bool;
    show_rating?: SettingsHint['show_product_rating'];
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
    show_cart_action,
    has_options,
    pre_order,
    pre_order_add_to_cart_url,
    add_to_cart_url,
    out_of_stock_message,
    hide_product_quick_view,
    featured_promotions,
    alternate,
    event,
    position,
    show_compare,
    show_rating,
    customer,
    settings,
    theme_settings,
    page_type,
}) => (
    /* html L1-28:
       <article
           class="card
           {{#if alternate}} card--alternate{{/if}}"
           data-test="card-{{id}}"
           data-event-type="{{event}}"
           data-entity-id="{{id}}"
           data-position="{{position}}"
           data-name="{{name}}"
           data-product-category="
           {{#each category}}
               {{#if @last}}
                   {{this}}
               {{else}}
                   {{this}},
               {{/if}}
           {{/each}}"
           data-product-brand="{{brand.name}}"
           data-product-price="
           {{#or customer (unless settings.hide_price_from_guests)}}
               {{#if price.with_tax}}
                   {{price.with_tax.value}}
               {{else}}
                   {{price.without_tax.value}}
               {{/if}}
           {{else}}
               {{lang 'common.login_for_pricing'}}
           {{/or}}"
       >
    */
    <article
        className={`card ${$if(alternate).then(() => $$raw(' card--alternate'))} `}
        data-test={`card-${id}`}
        data-event-type={event}
        data-entity-id={id}
        data-position={position}
        data-name={name}
        data-product-category={` ${$each(category).then((item, loop) => $if(loop['@last']).then(() => item).else(() => [item, $$raw(', ')]))} `}
        data-product-brand={brand.name}
        data-product-price={` ${$or(customer, $unless(settings.hide_price_from_guests))
            .then(() => $if(price.with_tax).then(() => price.with_tax.value).else(() => price.without_tax.value))
            .else(() => $lang($string('common.login_for_pricing')))} `}
    >
        {/* html L29: <figure class="card-figure"> */}
        <figure className="card-figure">
            {/* html L30: {{#if stock_level '===' 0}} */}
            <$If
                query={[stock_level, '===', $number(0)]}
                $then={() => (
                    /* html L31: {{#if theme_settings.pdp_sold_out_label '===' ''}} */
                    <$If
                        query={[theme_settings.pdp_sold_out_label, '===', $string('')]}
                        $then={() => (
                            /* html L32-36:
                               {{> components/products/product-badge
                                   badge-type='sold-out'
                                   badge_view=theme_settings.product_sold_out_badges
                                   badge_label=(lang "page_builder.pdp_sold_out_label")
                               }}
                            */
                            <ProductBadge
                                badge-type="sold-out"
                                badge_view={theme_settings.product_sold_out_badges}
                                badge_label={$lang($string('page_builder.pdp_sold_out_label'))}
                            />
                        )}
                        $else={() => (
                            /* html L37: {{else}}
                                                              html L38-42:
                               {{> components/products/product-badge
                                   badge-type='sold-out'
                                   badge_view=theme_settings.product_sold_out_badges
                                   badge_label=theme_settings.pdp_sold_out_label
                               }}
                            */
                            <ProductBadge
                                badge-type="sold-out"
                                badge_view={theme_settings.product_sold_out_badges}
                                badge_label={theme_settings.pdp_sold_out_label}
                            />
                        )}
                    />
                )}
                $else={() => (
                    /* html L44: {{else}}
                                              html L45: {{#or price.sale_price_with_tax.value price.sale_price_without_tax.value}}
                    */
                    <$Or
                        values={[price.sale_price_with_tax.value, price.sale_price_without_tax.value]}
                        $then={() => (
                            /* html L46: {{#if theme_settings.pdp_sale_badge_label '===' ''}} */
                            <$If
                                query={[theme_settings.pdp_sale_badge_label, '===', $string('')]}
                                $then={() => (
                                    /* html L47-51:
                                       {{> components/products/product-badge
                                           badge-type='sale'
                                           badge_view=theme_settings.product_sale_badges
                                           badge_label=(lang "page_builder.pdp_sale_badge_label")
                                       }}
                                    */
                                    <ProductBadge
                                        badge-type="sale"
                                        badge_view={theme_settings.product_sale_badges}
                                        badge_label={$lang($string('page_builder.pdp_sale_badge_label'))}
                                    />
                                )}
                                $else={() => (
                                    /* html L52: {{else}}
                                                                              html L53-57:
                                       {{> components/products/product-badge
                                           badge-type='sale'
                                           badge_view=theme_settings.product_sale_badges
                                           badge_label=theme_settings.pdp_sale_badge_label
                                       }}
                                    */
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

            {/* html L62-66:
               <a href="{{url}}"
                  class="card-figure__link"
                  aria-label="{{> components/products/product-info}}"
                  data-event-type="product-click"
               >
            */}
            <a
                href={url}
                className="card-figure__link"
                aria-label={ProductInfo({name, customer, settings, price, theme_settings})}
                data-event-type="product-click"
            >
                {/* html L67: <div class="card-img-container"> */}
                <div className="card-img-container">
                    {/* html L68-74:
                       {{> components/common/responsive-img
                           image=image
                           class="card-image"
                           fallback_size=theme_settings.productgallery_size
                           lazyload=theme_settings.lazyload_mode
                           default_image=theme_settings.default_image_product
                       }}
                    */}
                    <$Partial
                        name="components/common/responsive-img"
                        hash={{
                            image: image,
                            class: $string('card-image'),
                            fallback_size: theme_settings.productgallery_size,
                            lazyload: theme_settings.lazyload_mode,
                            default_image: theme_settings.default_image_product,
                        }}
                    />
                </div>
            </a>

            {/* html L78: <figcaption class="card-figcaption"> */}
            <figcaption className="card-figcaption">
                {/* html L79: <div class="card-figcaption-body"> */}
                <div className="card-figcaption-body">
                    {/* html L80: {{#unless hide_product_quick_view}} */}
                    <$Unless
                        query={[hide_product_quick_view]}
                        $then={() => (
                            /* html L81: {{#if theme_settings.show_product_quick_view}} */
                            <$If
                                query={[theme_settings.show_product_quick_view]}
                                $then={() => (
                                    /* html L82: <button type="button" class="button button--small card-figcaption-button quickview" data-event-type="product-click" data-product-id="{{id}}">{{lang 'products.quick_view'}}</button> */
                                    <button type="button" className="button button--small card-figcaption-button quickview" data-event-type="product-click" data-product-id={id}>
                                        {/* html L82: {{lang 'products.quick_view'}} */}
                                        {$lang($string('products.quick_view'))}
                                    </button>
                                )}
                            />
                        )}
                    />
                    {/* html L85: {{#if show_compare}} */}
                    <$If
                        query={[show_compare]}
                        $then={() => (
                            /* html L86: <label class="button button--small card-figcaption-button" for="compare-{{id}}"> */
                            <label className="button button--small card-figcaption-button" htmlFor={`compare-${id}`}>
                                {/* html L87: {{lang 'products.compare'}} <input type="checkbox" name="products[]" value="{{id}}" id="compare-{{id}}" data-compare-id="{{id}}"> */}
                                {$lang($string('products.compare'))} {/* html L87: <input type="checkbox" name="products[]" value="{{id}}" id="compare-{{id}}" data-compare-id="{{id}}"> */}<input type="checkbox" name="products[]" value={id} id={`compare-${id}`} data-compare-id={id}/>
                            </label>
                        )}
                    />
                    {/* html L90: {{#if show_cart_action}} */}
                    <$If
                        query={[show_cart_action]}
                        $then={() => (
                            <>
                                {/* html L91: {{#if has_options}} */}
                                <$If
                                    query={[has_options]}
                                    $then={() => (
                                        /* html L92: <a href="{{url}}" data-event-type="product-click" class="button button--small card-figcaption-button" data-product-id="{{id}}">{{lang 'products.choose_options'}}</a> */
                                        <a href={url} data-event-type="product-click" className="button button--small card-figcaption-button" data-product-id={id}>
                                            {/* html L92: {{lang 'products.choose_options'}} */}
                                            {$lang($string('products.choose_options'))}
                                        </a>
                                    )}
                                />
                                {/* html L94: {{#if pre_order}} */}
                                <$If
                                    query={[pre_order]}
                                    $then={() => (
                                        /* html L95: <a href="{{pre_order_add_to_cart_url}}" data-event-type="product-click" class="button button--small card-figcaption-button">{{lang 'products.pre_order'}}</a> */
                                        <a href={pre_order_add_to_cart_url} data-event-type="product-click" className="button button--small card-figcaption-button">
                                            {/* html L95: {{lang 'products.pre_order'}} */}
                                            {$lang($string('products.pre_order'))}
                                        </a>
                                    )}
                                />
                                {/* html L97: {{#if add_to_cart_url }} */}
                                <$If
                                    query={[add_to_cart_url]}
                                    $then={() => (
                                        <>
                                            {/* html L98: <a href="{{add_to_cart_url}}" data-event-type="product-click" data-button-type="add-cart" class="button button--small card-figcaption-button">{{lang 'products.add_to_cart'}}</a> */}
                                            <a href={add_to_cart_url} data-event-type="product-click" data-button-type="add-cart" className="button button--small card-figcaption-button">
                                                {/* html L98: {{lang 'products.add_to_cart'}} */}
                                                {$lang($string('products.add_to_cart'))}
                                            </a>
                                            {/* html L99: <span class="product-status-message aria-description--hidden">{{lang 'category.add_cart_announcement'}}</span> */}
                                            <span className="product-status-message aria-description--hidden">{/* html L99: {{lang 'category.add_cart_announcement'}} */}{$lang($string('category.add_cart_announcement'))}</span>
                                        </>
                                    )}
                                />
                                {/* html L101: {{#if out_of_stock_message }} */}
                                <$If
                                    query={[out_of_stock_message]}
                                    $then={() => (
                                        /* html L102: <a href="{{url}}" data-event-type="product-click" class="button button--small card-figcaption-button" data-product-id="{{id}}">{{out_of_stock_message}}</a> */
                                        <a href={url} data-event-type="product-click" className="button button--small card-figcaption-button" data-product-id={id}>
                                            {/* html L102: {{out_of_stock_message}} */}
                                            {out_of_stock_message}
                                        </a>
                                    )}
                                />
                            </>
                        )}
                    />
                </div>
            </figcaption>
        </figure>
        {/* html L108: <div class="card-body"> */}
        <div className="card-body">
            {/* html L109: {{#and rating show_rating}} */}
            <$And
                a={rating}
                b={show_rating}
                $then={() => (
                    /* html L110: <p class="card-text" data-test-info-type="productRating"> */
                    <p className="card-text" data-test-info-type="productRating">
                        {/* html L111: <span class="rating--small"> */}
                        <span className="rating--small">
                            {/* html L112: {{> components/products/ratings rating_target=name rating=rating}} */}
                            <Ratings rating_target={name} rating={rating}/>
                        </span>
                    </p>
                )}
            />
            {/* html L116: {{#if brand.name}} */}
            <$If
                query={[brand.name]}
                $then={() => (
                    /* html L117: <p class="card-text" data-test-info-type="brandName">{{brand.name}}</p> */
                    <p className="card-text" data-test-info-type="brandName">{/* html L117: {{brand.name}} */}{brand.name}</p>
                )}
            />
            {/* html L119: <h3 class="card-title"> */}
            <h3 className="card-title">
                {/* html L120-123:
                   <a aria-label="{{> components/products/product-info}}"
                      href="{{url}}"
                      data-event-type="product-click"
                   >
                */}
                <a
                    aria-label={ProductInfo({name, customer, settings, price, theme_settings})}
                    href={url}
                    data-event-type="product-click"
                >
                    {/* html L124: {{name}} */}
                    {name}
                </a>
            </h3>

            {/* html L128: <div class="card-text" data-test-info-type="price"> */}
            <div className="card-text" data-test-info-type="price">
                {/* html L129: {{#or customer (unless settings.hide_price_from_guests)}} */}
                <$Or
                    values={[customer, $unless(settings.hide_price_from_guests)]}
                    $then={() => /* html L130: {{> components/products/price price=price}} */ <Price price={price} theme_settings={theme_settings} page_type={page_type}/>}
                    $else={() => /* html L131: {{else}}
                                                                        html L132: {{> components/common/login-for-pricing}}
                                 */ <$Partial name="components/common/login-for-pricing"/>}
                />
            </div>
            {/* html L135: {{{region name="product_item_below_price"}}} */}
            <$_Region name={$string('product_item_below_price')}/>
            {/* html L136: {{> components/products/bulk-discount-rates}} */}
            <$Partial name="components/products/bulk-discount-rates"/>
            {/* html L137: {{#if theme_settings.show_featured_promotions}} */}
            <$If
                query={[theme_settings.show_featured_promotions]}
                $then={() => /* html L138-141:
                                {{> components/products/promotion-callout
                                    promotions=featured_promotions
                                    mode="compact"
                                }}
                             */ <PromotionCallout promotions={featured_promotions} mode={$string('compact')}/>}
            />
        </div>
    </article>
));
