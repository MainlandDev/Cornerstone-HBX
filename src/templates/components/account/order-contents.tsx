/**
 * Source: templates/components/account/order-contents.html (115 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $string, $unescaped, $Unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$cdn} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {ExtendedThemePageOrderDetails} from '@/context-account';

type Hint = ThemeContextHint<ExtendedThemePageOrderDetails>;

export default $asPartial<{ order: Hint['order']; theme_settings: Hint['theme_settings'] }>(({order, theme_settings}) => (
    <>
        {/* html L1: <h3 class="account-heading">{{lang 'account.orders.details.order_contents'}}</h3> */}
        <h3 className="account-heading">
            {/* html L1: {{lang 'account.orders.details.order_contents'}} */}
            <$Lang translationKey={$string('account.orders.details.order_contents')}/>
        </h3>

        {/* html L3: <ul class="account-list"> */}
        <ul className="account-list">
            {/* html L4: {{#each order.items}} */}
            <$Each
                list={order.items}
                $then={(item) => (
                    <>
                        {/* html L5: {{#each shipping_rows}} */}
                        <$Each
                            list={item.shipping_rows}
                            $then={(row) => (
                                /* html L6: {{#if is_shipping}} */
                                <$If
                                    query={[row.is_shipping]}
                                    $then={() => (
                                        /* html L7: <li class="account-listShipping"> */
                                        <li className="account-listShipping">
                                            {/* html L8: <h5 class="account-listShipping-title">{{lang 'account.orders.details.ship_to_multi' street=address city=city state=state zip=zip country=country}}</h5> */}
                                            <h5 className="account-listShipping-title">
                                                {/* html L8: {{lang 'account.orders.details.ship_to_multi' street=address city=city state=state zip=zip country=country}} */}
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
                        {/* html L12: <li class="account-listItem"> */}
                        <li className="account-listItem">
                            {/* html L13: <div class="account-product account-product--alignMiddle"> */}
                            <div className="account-product account-product--alignMiddle">
                                {/* html L14: <div class="account-product-checkItem"> */}
                                <div className="account-product-checkItem">
                                    {/* html L15: {{#if show_reorder}} */}
                                    <$If
                                        query={[item.show_reorder]}
                                        $then={() => (
                                            <>
                                                {/* html L16: <input class="form-checkbox" type="checkbox" id="account-product-id-{{order_product_id}}" value="{{order_product_id}}"> */}
                                                <input
                                                    className="form-checkbox"
                                                    type="checkbox"
                                                    id={`account-product-id-${item.order_product_id}`}
                                                    value={item.order_product_id}
                                                />
                                                {/* html L17: <label for="account-product-id-{{order_product_id}}" class="form-label"> */}
                                                <label htmlFor={`account-product-id-${item.order_product_id}`} className="form-label">
                                                    {/* html L18: <span class="is-srOnly">Checkbox {{order_product_id}} label</span> */}
                                                    <span className="is-srOnly">Checkbox {/* html L18: {{order_product_id}} */}{item.order_product_id} label</span>
                                                </label>
                                            </>
                                        )}
                                    />
                                </div>
                                {/* html L22: <figure class="account-product-figure"> */}
                                <figure className="account-product-figure">
                                    {/* html L23: {{#if type '===' 'giftcertificate'}} */}
                                    <$If
                                        query={[item.type, '===', $string('giftcertificate')]}
                                        $then={() => (
                                            /* html L24-28:
                                               <img
                                                   src="{{cdn ../theme_settings.default_image_gift_certificate}}"
                                                   alt="Gift Certificate"
                                                   title="Gift Certificate"
                                               >
                                            */
                                            <img
                                                src={$cdn(theme_settings.default_image_gift_certificate)}
                                                alt="Gift Certificate"
                                                title="Gift Certificate"
                                            />
                                        )}
                                        $else={() => (
                                            /* html L29: {{else}}
                                                                                              html L30-36:
                                               {{> components/common/responsive-img
                                                   image=image
                                                   class="account-product-image"
                                                   fallback_size=../theme_settings.productthumb_size
                                                   lazyload=../theme_settings.lazyload_mode
                                                   default_image=../theme_settings.default_image_product
                                               }}
                                            */
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
                                    {/* html L38: {{#unless refunded}} */}
                                    <$Unless
                                        query={[item.refunded]}
                                        $then={() => (
                                            /* html L39: {{#if download_url}} */
                                            <$If
                                                query={[item.download_url]}
                                                $then={() => (
                                                    /* html L40: <a href="{{download_url}}" class="account-product-download button button--primary"> */
                                                    <a href={item.download_url} className="account-product-download button button--primary">
                                                        {/* html L41: <span class="is-srOnly">{{lang 'account.orders.details.download_items'}}</span> */}
                                                        <span className="is-srOnly">
                                                            {/* html L41: {{lang 'account.orders.details.download_items'}} */}
                                                            <$Lang translationKey={$string('account.orders.details.download_items')}/>
                                                        </span>
                                                        {/* html L42: <span class="icon"> */}
                                                        <span className="icon">
                                                            {/* html L43: <svg> */}
                                                            <svg>
                                                                {/* html L44: <use href="#icon-arrow-down"></use> */}
                                                                <use href="#icon-arrow-down"></use>
                                                            </svg>
                                                        </span>
                                                    </a>
                                                )}
                                            />
                                        )}
                                    />
                                </figure>
                                {/* html L51: <div class="account-product-body"> */}
                                <div className="account-product-body">
                                    {/* html L52: <span class="account-product-price">{{price.formatted}}</span> */}
                                    <span className="account-product-price">{/* html L52: {{price.formatted}} */}{item.price.formatted}</span>
                                    {/* html L53: <h5 class="account-product-title">{{quantity}} &#215; {{name}}</h5> */}
                                    <h5 className="account-product-title">
                                        {/* html L53: {{quantity}} */}
                                        {item.quantity} {$$raw('&#215;')} {/* html L53: {{name}} */}{item.name}
                                    </h5>
                                    {/* html L54: {{#if brand}} */}
                                    <$If query={[item.brand]} $then={() => /* html L55: <h6>{{brand.name}}</h6> */ <h6>{/* html L55: {{brand.name}} */}{item.brand.name}</h6>}/>
                                    {/* html L57: {{#if quantity_ready_to_ship}} */}
                                    <$If
                                        query={[item.quantity_ready_to_ship]}
                                        $then={() => (
                                            /* html L58: <p class="account-product-backorder-prompts">{{lang 'products.quantity_on_hand' quantity=quantity_ready_to_ship}}</p> */
                                            <p className="account-product-backorder-prompts">
                                                {/* html L58: {{lang 'products.quantity_on_hand' quantity=quantity_ready_to_ship}} */}
                                                <$Lang
                                                    translationKey={$string('products.quantity_on_hand')}
                                                    params={{quantity: item.quantity_ready_to_ship}}
                                                />
                                            </p>
                                        )}
                                    />
                                    {/* html L60: {{#if quantity_backordered}} */}
                                    <$If
                                        query={[item.quantity_backordered]}
                                        $then={() => (
                                            /* html L61: <p class="account-product-backorder-prompts">{{lang 'products.quantity_backordered' quantity=quantity_backordered}}</p> */
                                            <p className="account-product-backorder-prompts">
                                                {/* html L61: {{lang 'products.quantity_backordered' quantity=quantity_backordered}} */}
                                                <$Lang
                                                    translationKey={$string('products.quantity_backordered')}
                                                    params={{quantity: item.quantity_backordered}}
                                                />
                                            </p>
                                        )}
                                    />
                                    {/* html L63: {{#if backorder_message}} */}
                                    <$If
                                        query={[item.backorder_message]}
                                        $then={() => /* html L64: <p class="account-product-backorder-prompts">{{backorder_message}}</p> */ <p className="account-product-backorder-prompts">{/* html L64: {{backorder_message}} */}{item.backorder_message}</p>}
                                    />
                                    {/* html L66: {{#if options}} */}
                                    <$If
                                        query={[item.options]}
                                        $then={() => (
                                            /* html L67: <dl class="definitionList"> */
                                            <dl className="definitionList">
                                                {/* html L68: {{#each options}} */}
                                                <$Each
                                                    list={item.options}
                                                    $then={(option) => (
                                                        <>
                                                            {/* html L69: <dt class="definitionList-key">{{name}}:</dt> */}
                                                            <dt className="definitionList-key">{/* html L69: {{name}} */}{option.name}:</dt>
                                                            {/* html L70: <dd class="definitionList-value">{{> components/common/product-options}}</dd> */}
                                                            <dd className="definitionList-value">
                                                                {/* html L70: {{> components/common/product-options}} */}
                                                                <$Partial name="components/common/product-options"/>
                                                            </dd>
                                                            {/* html L71: {{#if linked_bundled_item.quantity_ready_to_ship}} */}
                                                            <$If
                                                                query={[option.linked_bundled_item.quantity_ready_to_ship]}
                                                                $then={() => (
                                                                    /* html L72: <dd class="definitionList-value account-product-backorder-prompts">{{lang 'products.quantity_on_hand' quantity=linked_bundled_item.quantity_ready_to_ship}}</dd> */
                                                                    <dd className="definitionList-value account-product-backorder-prompts">
                                                                        {/* html L72: {{lang 'products.quantity_on_hand' quantity=linked_bundled_item.quantity_ready_to_ship}} */}
                                                                        <$Lang
                                                                            translationKey={$string('products.quantity_on_hand')}
                                                                            params={{quantity: option.linked_bundled_item.quantity_ready_to_ship}}
                                                                        />
                                                                    </dd>
                                                                )}
                                                            />
                                                            {/* html L74: {{#if linked_bundled_item.quantity_backordered}} */}
                                                            <$If
                                                                query={[option.linked_bundled_item.quantity_backordered]}
                                                                $then={() => (
                                                                    /* html L75: <dd class="definitionList-value account-product-backorder-prompts">{{lang 'products.quantity_backordered' quantity=linked_bundled_item.quantity_backordered}}</dd> */
                                                                    <dd className="definitionList-value account-product-backorder-prompts">
                                                                        {/* html L75: {{lang 'products.quantity_backordered' quantity=linked_bundled_item.quantity_backordered}} */}
                                                                        <$Lang
                                                                            translationKey={$string('products.quantity_backordered')}
                                                                            params={{quantity: option.linked_bundled_item.quantity_backordered}}
                                                                        />
                                                                    </dd>
                                                                )}
                                                            />
                                                            {/* html L77: {{#if linked_bundled_item.backorder_message}} */}
                                                            <$If
                                                                query={[option.linked_bundled_item.backorder_message]}
                                                                $then={() => (
                                                                    /* html L78: <dd class="definitionList-value account-product-backorder-prompts">{{linked_bundled_item.backorder_message}}</dd> */
                                                                    <dd className="definitionList-value account-product-backorder-prompts">
                                                                        {/* html L78: {{linked_bundled_item.backorder_message}} */}
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
                                    {/* html L83: {{#if gift_wrapping_name}} */}
                                    <$If
                                        query={[item.gift_wrapping_name]}
                                        $then={() => (
                                            /* html L84: <dl class="definitionList"> */
                                            <dl className="definitionList">
                                                {/* html L85: <dt class="definitionList-key">{{lang 'account.orders.gift_wrapping'}}</dt> */}
                                                <dt className="definitionList-key">
                                                    {/* html L85: {{lang 'account.orders.gift_wrapping'}} */}
                                                    <$Lang translationKey={$string('account.orders.gift_wrapping')}/>
                                                </dt>
                                                {/* html L86: <dd class="definitionList-value">{{gift_wrapping_name}}</dd> */}
                                                <dd className="definitionList-value">{/* html L86: {{gift_wrapping_name}} */}{item.gift_wrapping_name}</dd>
                                            </dl>
                                        )}
                                    />
                                    {/* html L89: {{#if event_date}} */}
                                    <$If
                                        query={[item.event_date]}
                                        $then={() => (
                                            /* html L90: <dl class="definitionList"> */
                                            <dl className="definitionList">
                                                {/* html L91: <dt class="definitionList-key"> */}
                                                <dt className="definitionList-key">{/* html L92: {{event_date.name}}: */}{item.event_date.name}:</dt>

                                                {/* html L95: <dd class="definitionList-value"> */}
                                                <dd className="definitionList-value">{/* html L96: {{event_date.date}} */}{item.event_date.date}</dd>
                                            </dl>
                                        )}
                                    />
                                    {/* html L100: {{#if refunded}} */}
                                    <$If
                                        query={[item.refunded]}
                                        $then={() => (
                                            /* html L101: <p class="account-product-refundQty">{{lang 'account.orders.refunded_quantity' qty=refunded_qty}}</p> */
                                            <p className="account-product-refundQty">
                                                {/* html L101: {{lang 'account.orders.refunded_quantity' qty=refunded_qty}} */}
                                                <$Lang translationKey={$string('account.orders.refunded_quantity')} params={{qty: item.refunded_qty}}/>
                                            </p>
                                        )}
                                        $else={() => (
                                            /* html L102: {{else}}
                                                                                              html L103: {{#if refunded_qty}}
                                            */
                                            <$If
                                                query={[item.refunded_qty]}
                                                $then={() => (
                                                    /* html L104: <p class="account-product-refundQty">{{lang 'account.orders.refunded_quantity' qty=refunded_qty}}</p> */
                                                    <p className="account-product-refundQty">
                                                        {/* html L104: {{lang 'account.orders.refunded_quantity' qty=refunded_qty}} */}
                                                        <$Lang
                                                            translationKey={$string('account.orders.refunded_quantity')}
                                                            params={{qty: item.refunded_qty}}
                                                        />
                                                    </p>
                                                )}
                                            />
                                        )}
                                    />
                                    {/* html L107: {{#if reorder_message}} */}
                                    <$If query={[item.reorder_message]} $then={() => /* html L108: <p>{{{reorder_message}}}</p> */ <p>{/* html L108: {{{reorder_message}}} */}{$unescaped(item.reorder_message)}</p>}/>
                                </div>
                            </div>
                        </li>
                    </>
                )}
            />
        </ul>
    </>
));
