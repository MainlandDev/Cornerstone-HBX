/**
 * Source: templates/components/products/list-item.html (123 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Or} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$If, $Partial, $Unless, $number, $parseHandlebarsDangerously, $string, $unescaped, $unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$_Region} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
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
    show_compare,
    show_rating,
    customer,
    settings,
    theme_settings,
    page_type,
}) => (
    /* html L1-10:
       <article class="listItem" data-event-type="{{event}}" data-entity-id="{{id}}" data-position="{{position}}" data-name="{{name}}" data-product-category="{{#each category}}{{#if @last}}{{this}}{{else}}{{this}}, {{/if}}{{/each}}" data-product-brand="{{brand.name}}" data-product-price="
           {{#or customer (unless settings.hide_price_from_guests)}}
               {{#if price.with_tax}}
                   {{price.with_tax.value}}
               {{else}}
                   {{price.without_tax.value}}
               {{/if}}
           {{else}}
               {{lang 'common.login_for_pricing'}}
           {{/or}}">
    */
    <article
        $$={$parseHandlebarsDangerously(`class="listItem" data-event-type="{{event}}" data-entity-id="{{id}}" data-position="{{position}}" data-name="{{name}}" data-product-category="{{#each category}}{{#if @last}}{{this}}{{else}}{{this}}, {{/if}}{{/each}}" data-product-brand="{{brand.name}}" data-product-price="
    {{#or customer (unless settings.hide_price_from_guests)}}
        {{#if price.with_tax}}
            {{price.with_tax.value}}
        {{else}}
            {{price.without_tax.value}}
        {{/if}}
    {{else}}
        {{lang 'common.login_for_pricing'}}
    {{/or}}"`)}
    >
        {/* html L11: <figure class="listItem-figure"> */}
        <figure className="listItem-figure">
            {/* html L12-16:
               <a href="{{url}}"
                  class="listItem-figure__link"
                  aria-label="{{> components/products/product-info}}"
                  data-event-type="product-click"
               >
            */}
            <a
                href={url}
                className="listItem-figure__link"
                aria-label={ProductInfo({name, customer, settings, price, theme_settings})}
                data-event-type="product-click"
            >
                {/* html L17: {{#if stock_level '===' 0}} */}
                <$If
                    query={[stock_level, '===', $number(0)]}
                    $then={() => (
                        /* html L18: {{#if theme_settings.pdp_sold_out_label '===' ''}} */
                        <$If
                            query={[theme_settings.pdp_sold_out_label, '===', $string('')]}
                            $then={() => (
                                /* html L19-23:
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
                                /* html L24: {{else}}
                                                                      html L25-29:
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
                        /* html L31: {{else}}
                                                      html L32: {{#or price.sale_price_with_tax.value price.sale_price_without_tax.value}}
                        */
                        <$Or
                            values={[price.sale_price_with_tax.value, price.sale_price_without_tax.value]}
                            $then={() => (
                                /* html L33: {{#if theme_settings.pdp_sale_badge_label '===' ''}} */
                                <$If
                                    query={[theme_settings.pdp_sale_badge_label, '===', $string('')]}
                                    $then={() => (
                                        /* html L34-38:
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
                                        /* html L39: {{else}}
                                                                                      html L40-44:
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
                {/* html L48-54:
                   {{> components/common/responsive-img
                       image=image
                       class="listItem-image"
                       fallback_size=theme_settings.productgallery_size
                       lazyload=theme_settings.lazyload_mode
                       default_image=theme_settings.default_image_product
                   }}
                */}
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
            {/* html L56: {{#unless hide_product_quick_view}} */}
            <$Unless
                query={[hide_product_quick_view]}
                $then={() => (
                    /* html L57: {{#if theme_settings.show_product_quick_view}} */
                    <$If
                        query={[theme_settings.show_product_quick_view]}
                        $then={() => (
                            /* html L58: <div class="listItem-figureBody"> */
                            <div className="listItem-figureBody">
                                {/* html L59: <button type="button" data-event-type="product-click" class="button button--small listItem-button quickview" data-product-id="{{id}}">{{lang 'products.quick_view'}}</button> */}
                                <button type="button" data-event-type="product-click" className="button button--small listItem-button quickview" data-product-id={id}>
                                    {/* html L59: {{lang 'products.quick_view'}} */}
                                    {$lang($string('products.quick_view'))}
                                </button>
                            </div>
                        )}
                    />
                )}
            />
        </figure>
        {/* html L64: <div class="listItem-body"> */}
        <div className="listItem-body">
            {/* html L65: <div class="listItem-content"> */}
            <div className="listItem-content">
                {/* html L66: <div class="listItem-details"> */}
                <div className="listItem-details">
                    {/* html L67: {{#if show_rating}} */}
                    <$If
                        query={[show_rating]}
                        $then={() => (
                            /* html L68: <p class="listItem-rating">{{> components/products/ratings rating_target=name rating=rating}}</p> */
                            <p className="listItem-rating">
                                {/* html L68: {{> components/products/ratings rating_target=name rating=rating}} */}
                                <Ratings rating_target={name} rating={rating}/>
                            </p>
                        )}
                    />
                    {/* html L70: {{#if brand.name}} */}
                    <$If
                        query={[brand.name]}
                        $then={() => /* html L71: <p class="listItem-brand">{{brand.name}}</p> */ <p className="listItem-brand">{/* html L71: {{brand.name}} */}{brand.name}</p>}
                    />
                    {/* html L73: <h4 class="listItem-title"> */}
                    <h4 className="listItem-title">
                        {/* html L74-77:
                           <a href="{{url}}"
                           aria-label="{{> components/products/product-info}}"
                           data-event-type="product-click"
                           >
                        */}
                        <a
                            href={url}
                            aria-label={ProductInfo({name, customer, settings, price, theme_settings})}
                            data-event-type="product-click"
                        >
                            {/* html L78: {{name}} */}
                            {name}
                        </a>
                    </h4>
                    {/* html L81: {{#if summary}} */}
                    <$If
                        query={[summary]}
                        $then={() => /* html L82: <p>{{{summary}}}</p> */ <p>{/* html L82: {{{summary}}} */}{$unescaped(summary)}</p>}
                    />
                </div>
                {/* html L85: <div class="listItem-actions"> */}
                <div className="listItem-actions">
                    {/* html L86: {{#or customer (unless settings.hide_price_from_guests)}} */}
                    <$Or
                        values={[customer, $unless(settings.hide_price_from_guests)]}
                        $then={() => (
                            /* html L87: {{#if price}} */
                            <$If
                                query={[price]}
                                $then={() => (
                                    <>
                                        {/* html L88: <div class="listItem-price">{{> components/products/price price=price}}</div> */}
                                        <div className="listItem-price">
                                            {/* html L88: {{> components/products/price price=price}} */}
                                            <Price price={price} theme_settings={theme_settings} page_type={page_type}/>
                                        </div>
                                        {/* html L89: {{{region name="product_item_below_price"}}} */}
                                        <$_Region name={$string('product_item_below_price')}/>
                                    </>
                                )}
                            />
                        )}
                        $else={() => /* html L91: {{else}}
                                                                                html L92: {{> components/common/login-for-pricing}}
                                     */ <$Partial name="components/common/login-for-pricing"/>}
                    />
                    {/* html L94: {{#if theme_settings.show_featured_promotions}} */}
                    <$If
                        query={[theme_settings.show_featured_promotions]}
                        $then={() => /* html L95-98:
                                        {{> components/products/promotion-callout
                                            promotions=featured_promotions
                                            mode="compact"
                                        }}
                                     */ <PromotionCallout promotions={featured_promotions} mode={$string('compact')}/>}
                    />
                    {/* html L100: {{#if show_cart_action}} */}
                    <$If
                        query={[show_cart_action]}
                        $then={() => (
                            <>
                                {/* html L101: {{#if has_options}} */}
                                <$If
                                    query={[has_options]}
                                    $then={() => (
                                        /* html L102: <a href="{{url}}" data-event-type="product-click" class="button button--small" data-product-id="{{id}}">{{lang 'products.choose_options'}}</a> */
                                        <a href={url} data-event-type="product-click" className="button button--small" data-product-id={id}>
                                            {/* html L102: {{lang 'products.choose_options'}} */}
                                            {$lang($string('products.choose_options'))}
                                        </a>
                                    )}
                                />
                                {/* html L104: {{#if pre_order}} */}
                                <$If
                                    query={[pre_order]}
                                    $then={() => (
                                        /* html L105: <a href="{{pre_order_add_to_cart_url}}" data-event-type="product-click" class="button button--primary">{{lang 'products.pre_order'}}</a> */
                                        <a href={pre_order_add_to_cart_url} data-event-type="product-click" className="button button--primary">
                                            {/* html L105: {{lang 'products.pre_order'}} */}
                                            {$lang($string('products.pre_order'))}
                                        </a>
                                    )}
                                />
                                {/* html L107: {{#if add_to_cart_url }} */}
                                <$If
                                    query={[add_to_cart_url]}
                                    $then={() => (
                                        /* html L108: <a href="{{add_to_cart_url}}" data-event-type="product-click" class="button button--primary">{{lang 'products.add_to_cart'}}</a> */
                                        <a href={add_to_cart_url} data-event-type="product-click" className="button button--primary">
                                            {/* html L108: {{lang 'products.add_to_cart'}} */}
                                            {$lang($string('products.add_to_cart'))}
                                        </a>
                                    )}
                                />
                                {/* html L110: {{#if out_of_stock_message }} */}
                                <$If
                                    query={[out_of_stock_message]}
                                    $then={() => (
                                        /* html L111: <a href="{{url}}" data-event-type="product-click" class="button button--small" data-product-id="{{id}}">{{out_of_stock_message}}</a> */
                                        <a href={url} data-event-type="product-click" className="button button--small" data-product-id={id}>
                                            {/* html L111: {{out_of_stock_message}} */}
                                            {out_of_stock_message}
                                        </a>
                                    )}
                                />
                            </>
                        )}
                    />
                    {/* html L114: {{#if show_compare}} */}
                    <$If
                        query={[show_compare]}
                        $then={() => (
                            /* html L115: <label class="button button--small" for="compare-{{id}}"> */
                            <label className="button button--small" htmlFor={`compare-${id}`}>
                                {/* html L116: {{lang "products.compare"}} <input type="checkbox" name="products[]" value="{{id}}" id="compare-{{id}}" data-compare-id="{{id}}"> */}
                                {$lang($string('products.compare'))} {/* html L116: <input type="checkbox" name="products[]" value="{{id}}" id="compare-{{id}}" data-compare-id="{{id}}"> */}<input type="checkbox" name="products[]" value={id} id={`compare-${id}`} data-compare-id={id}/>
                            </label>
                        )}
                    />
                </div>
            </div>
        </div>
    </article>
));
