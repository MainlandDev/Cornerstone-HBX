/**
 * Source: templates/components/cart/content.html (204 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
    /* html L1: <table class="cart" data-cart-quantity="{{cart.quantity}}"> */
    <table className="cart" data-cart-quantity={cart.quantity}>
        {/* html L2: <thead class="cart-header"> */}
        <thead className="cart-header">
            {/* html L3: <tr> */}
            <tr>
                {/* html L4: <th class="cart-header-item" colspan="2">{{lang 'cart.checkout.item'}}</th> */}
                <th className="cart-header-item" colSpan={2}>
                    {/* html L4: {{lang 'cart.checkout.item'}} */}
                    <$Lang translationKey={$string('cart.checkout.item')}/>
                </th>
                {/* html L5: <th class="cart-header-item">{{lang 'cart.checkout.price'}}</th> */}
                <th className="cart-header-item">
                    {/* html L5: {{lang 'cart.checkout.price'}} */}
                    <$Lang translationKey={$string('cart.checkout.price')}/>
                </th>
                {/* html L6: <th class="cart-header-item cart-header-quantity">{{lang 'cart.checkout.quantity'}}</th> */}
                <th className="cart-header-item cart-header-quantity">
                    {/* html L6: {{lang 'cart.checkout.quantity'}} */}
                    <$Lang translationKey={$string('cart.checkout.quantity')}/>
                </th>
                {/* html L7: <th class="cart-header-item">{{lang 'cart.checkout.total'}}</th> */}
                <th className="cart-header-item">
                    {/* html L7: {{lang 'cart.checkout.total'}} */}
                    <$Lang translationKey={$string('cart.checkout.total')}/>
                </th>
            </tr>
        </thead>
        {/* html L10: <tbody class="cart-list"> */}
        <tbody className="cart-list">
            {/* html L11: {{#each cart.items}} */}
            <$Each
                list={cart.items}
                $then={(item) => (
                    /* html L12: <tr class="cart-item" data-item-row> */
                    <tr className="cart-item" data-item-row="">
                        {/* html L13: <td class="cart-item-block cart-item-figure"> */}
                        <td className="cart-item-block cart-item-figure">
                            {/* html L14: {{#if type '==' 'GiftCertificate'}} */}
                            <$If
                                query={[item.type, '==', $string('GiftCertificate')]}
                                $then={() => (
                                    /* html L15-20:
                                       <img
                                           class="cart-item-fixed-image"
                                           src="{{cdn ../theme_settings.default_image_gift_certificate}}"
                                           alt="{{lang 'cart.gift_certificates.gift_certificate'}}"
                                           title="{{lang 'cart.gift_certificates.gift_certificate'}}"
                                       >
                                    */
                                    <img
                                        className="cart-item-fixed-image"
                                        src={$cdn(theme_settings.default_image_gift_certificate)}
                                        alt={$lang($string('cart.gift_certificates.gift_certificate'))}
                                        title={$lang($string('cart.gift_certificates.gift_certificate'))}
                                    />
                                )}
                                $else={() => (
                                    /* html L21: {{else}}
                                                                              html L22-28:
                                       {{> components/common/responsive-img
                                           image=image
                                           class="cart-item-image"
                                           fallback_size=../theme_settings.productthumb_size
                                           lazyload="lazyload"
                                           default_image=../theme_settings.default_image_product
                                       }}
                                    */
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
                        {/* html L31: <td class="cart-item-block cart-item-title"> */}
                        <td className="cart-item-block cart-item-title">
                            {/* html L32: {{#if brand.name}} */}
                            <$If
                                query={[item.brand.name]}
                                $then={() => /* html L33: <p class="cart-item-brand">{{brand.name}}</p> */ <p className="cart-item-brand">{/* html L33: {{brand.name}} */}{item.brand.name}</p>}
                            />
                            {/* html L35: <h2 class="cart-item-name"> */}
                            <h2 className="cart-item-name">
                                {/* html L36: <a class="cart-item-name__label" href="{{url}}">{{name}}</a> */}
                                <a className="cart-item-name__label" href={item.url}>
                                    {/* html L36: {{name}} */}
                                    {item.name}
                                </a>
                            </h2>
                            {/* html L38: {{#if release_date}} */}
                            <$If query={[item.release_date]} $then={() => /* html L39: <p>({{release_date}})</p> */ <p>({/* html L39: {{release_date}} */}{item.release_date})</p>}/>

                            {/* html L42: {{#if options}} */}
                            <$If
                                query={[item.options]}
                                $then={() => (
                                    <>
                                        {/* html L43: <dl class="definitionList"> */}
                                        <dl className="definitionList">
                                            {/* html L44: {{#each options}} */}
                                            <$Each
                                                list={item.options}
                                                $then={(option) => (
                                                    <>
                                                        {/* html L45: <dt class="definitionList-key">{{name}}:</dt> */}
                                                        <dt className="definitionList-key">{/* html L45: {{name}} */}{option.name}:</dt>
                                                        {/* html L46: <dd class="definitionList-value"> */}
                                                        <dd className="definitionList-value">
                                                            {/* html L47: {{#if is_file}} */}
                                                            <$If
                                                                query={[option.is_file]}
                                                                $then={() => (
                                                                    /* html L48: <a href="/viewfile.php?attributeId={{id}}&cartitem={{../id}}">{{value}}</a> */
                                                                    <a href={`/viewfile.php?attributeId=${option.id}&cartitem=${item.id}`}>
                                                                        {/* html L48: {{value}} */}
                                                                        {option.value}
                                                                    </a>
                                                                )}
                                                                $else={() => /* html L49: {{else}}
                                                                                                                                                                html L50: {{> components/common/product-options}}
                                                                             */ <$Partial name="components/common/product-options"/>}
                                                            />
                                                        </dd>
                                                    </>
                                                )}
                                            />
                                        </dl>

                                        {/* html L56: {{#if can_modify}} */}
                                        <$If
                                            query={[item.can_modify]}
                                            $then={() => (
                                                /* html L57-61:
                                                   <a href="#"
                                                   data-item-edit="{{id}}"
                                                   data-product-id="{{product_id}}"
                                                   aria-label="{{lang 'products.change_product_options' name=name}}"
                                                   >
                                                */
                                                <a
                                                    href="#"
                                                    data-item-edit={item.id}
                                                    data-product-id={item.product_id}
                                                    aria-label={$lang($string('products.change_product_options'), {name: item.name})}
                                                >
                                                    {/* html L62: {{lang 'common.change'}} */}
                                                    <$Lang translationKey={$string('common.change')}/>
                                                </a>
                                            )}
                                        />
                                    </>
                                )}
                            />

                            {/* html L67: {{#if type '==' 'GiftCertificate'}} */}
                            <$If
                                query={[item.type, '==', $string('GiftCertificate')]}
                                $then={() => (
                                    /* html L68-70:
                                       <a href="{{edit_url}}"
                                          aria-label="{{lang 'cart.gift_certificates.change_gift_certificate' certificate_name=name}}"
                                       >
                                    */
                                    <a
                                        href={item.edit_url}
                                        aria-label={$lang($string('cart.gift_certificates.change_gift_certificate'), {
                                            certificate_name: item.name,
                                        })}
                                    >
                                        {/* html L71: {{lang 'common.change'}} */}
                                        <$Lang translationKey={$string('common.change')}/>
                                    </a>
                                )}
                            />
                            {/* html L74: {{> components/cart/item-giftwrap this}} */}
                            <$Partial name="components/cart/item-giftwrap" context={$this()}/>
                            {/* html L75: {{#if event_date}} */}
                            <$If
                                query={[item.event_date]}
                                $then={() => (
                                    /* html L76: <dl class="cart-item-options"> */
                                    <dl className="cart-item-options">
                                        {/* html L77: <dt class="cart-item-option-title"> */}
                                        <dt className="cart-item-option-title">{/* html L78: {{event_date.name}} */}{item.event_date.name}</dt>

                                        {/* html L81: <dd class="cart-item-option-description"> */}
                                        <dd className="cart-item-option-description">{/* html L82: {{event_date.date}} */}{item.event_date.date}</dd>
                                    </dl>
                                )}
                            />
                        </td>
                        {/* html L88: <td class="cart-item-block cart-item-info"> */}
                        <td className="cart-item-block cart-item-info">
                            {/* html L89: <span class="cart-item-label">{{lang 'cart.checkout.price'}}</span> */}
                            <span className="cart-item-label">
                                {/* html L89: {{lang 'cart.checkout.price'}} */}
                                <$Lang translationKey={$string('cart.checkout.price')}/>
                            </span>
                            {/* html L90: {{#or ../customer (unless ../settings.hide_price_from_guests) (if type '==' 'GiftCertificate')}} */}
                            <$Or
                                values={[customer, $unless(settings.hide_price_from_guests), $if(item.type, '==', $string('GiftCertificate'))]}
                                $then={() => (
                                    <>
                                        {/* html L91: <span class="cart-item-value {{#if price_discounted}}price--discounted{{/if}}">{{price.formatted}}</span> */}
                                        <span
                                            className={`cart-item-value ${$if(item.price_discounted).then(() => $$raw('price--discounted'))}`}
                                        >
                                            {/* html L91: {{price.formatted}} */}
                                            {item.price.formatted}
                                        </span>
                                        {/* html L92: {{#if price_discounted}} */}
                                        <$If
                                            query={[item.price_discounted]}
                                            $then={() => /* html L93: <span class="cart-item-value">{{price_discounted.formatted}}</span> */ <span className="cart-item-value">{/* html L93: {{price_discounted.formatted}} */}{item.price_discounted.formatted}</span>}
                                        />
                                    </>
                                )}
                                $else={() => /* html L95: {{else}}
                                                                                                html L96: {{> components/common/login-for-pricing}}
                                             */ <$Partial name="components/common/login-for-pricing"/>}
                            />
                        </td>

                        {/* html L100: <td class="cart-item-block cart-item-info cart-item-quantity"> */}
                        <td className="cart-item-block cart-item-info cart-item-quantity">
                            {/* html L102: <label class="form-label cart-item-label" for="qty-{{id}}">{{lang 'products.quantity'}}</label> */}
                            <label className="form-label cart-item-label" htmlFor={`qty-${item.id}`}>
                                {/* html L102: {{lang 'products.quantity'}} */}
                                <$Lang translationKey={$string('products.quantity')}/>
                            </label>
                            {/* html L103: <div class="form-increment"> */}
                            <div className="form-increment">
                                {/* html L104: {{#if can_modify}} */}
                                <$If
                                    query={[item.can_modify]}
                                    $then={() => (
                                        /* html L105-109:
                                           <button class="button button--icon"
                                                   data-cart-update
                                                   data-cart-itemid="{{id}}"
                                                   data-action="dec"
                                           >
                                        */
                                        <button className="button button--icon" data-cart-update="" data-cart-itemid={item.id} data-action="dec">
                                            {/* html L110: <span class="is-srOnly">{{lang 'products.quantity_decrease' name=name}}</span> */}
                                            <span className="is-srOnly">
                                                {/* html L110: {{lang 'products.quantity_decrease' name=name}} */}
                                                <$Lang translationKey={$string('products.quantity_decrease')} params={{name: item.name}}/>
                                            </span>
                                            {/* html L111: <i class="icon" aria-hidden="true"><svg><use href="#icon-keyboard-arrow-down" /></svg></i> */}
                                            <i className="icon" aria-hidden="true">
                                                {/* html L111: <svg> */}
                                                <svg>
                                                    {/* html L111: <use href="#icon-keyboard-arrow-down" /> */}
                                                    <use href="#icon-keyboard-arrow-down"/>
                                                </svg>
                                            </i>
                                        </button>
                                    )}
                                />
                                {/* html L114-128:
                                   <input class="form-input form-input--incrementTotal cart-item-qty-input"
                                          id="qty-{{id}}"
                                          name="qty-{{id}}"
                                          type="tel"
                                          value="{{quantity}}"
                                          data-quantity-min="{{min_purchase_quantity}}"
                                          data-quantity-max="{{max_purchase_quantity}}"
                                          data-quantity-min-error="{{lang 'products.quantity_min' quantity=min_purchase_quantity}}"
                                          data-quantity-max-error="{{lang 'products.quantity_max' quantity=max_purchase_quantity}}"
                                          min="1"
                                          pattern="[0-9]*"
                                          data-cart-itemid="{{id}}"
                                          data-action="manualQtyChange"
                                          aria-label="{{name}}"
                                          aria-live="polite"{{#unless can_modify}} disabled{{/unless}}>
                                */}
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
                                {/* html L129: {{#if can_modify}} */}
                                <$If
                                    query={[item.can_modify]}
                                    $then={() => (
                                        /* html L130-134:
                                           <button class="button button--icon"
                                                   data-cart-update
                                                   data-cart-itemid="{{id}}"
                                                   data-action="inc"
                                           >
                                        */
                                        <button className="button button--icon" data-cart-update="" data-cart-itemid={item.id} data-action="inc">
                                            {/* html L135: <span class="is-srOnly">{{lang 'products.quantity_increase' name=name}}</span> */}
                                            <span className="is-srOnly">
                                                {/* html L135: {{lang 'products.quantity_increase' name=name}} */}
                                                <$Lang translationKey={$string('products.quantity_increase')} params={{name: item.name}}/>
                                            </span>
                                            {/* html L136: <i class="icon" aria-hidden="true"><svg><use href="#icon-keyboard-arrow-up" /></svg></i> */}
                                            <i className="icon" aria-hidden="true">
                                                {/* html L136: <svg> */}
                                                <svg>
                                                    {/* html L136: <use href="#icon-keyboard-arrow-up" /> */}
                                                    <use href="#icon-keyboard-arrow-up"/>
                                                </svg>
                                            </i>
                                        </button>
                                    )}
                                />
                            </div>
                            {/* html L140: {{#if stock_position}} */}
                            <$If
                                query={[item.stock_position]}
                                $then={() => (
                                    <>
                                        {/* html L141: {{#if ../cart.inventory_settings.show_quantity_on_hand}} */}
                                        <$If
                                            query={[cart.inventory_settings.show_quantity_on_hand]}
                                            $then={() => (
                                                /* html L142: {{#all stock_position.quantity_on_hand stock_position.quantity_backordered}} */
                                                <$All
                                                    values={[item.stock_position.quantity_on_hand, item.stock_position.quantity_backordered]}
                                                    $then={() => (
                                                        /* html L143: <p class="cart-item-backorder-message">{{lang 'products.quantity_on_hand' quantity=stock_position.quantity_on_hand}}</p> */
                                                        <p className="cart-item-backorder-message">
                                                            {/* html L143: {{lang 'products.quantity_on_hand' quantity=stock_position.quantity_on_hand}} */}
                                                            <$Lang
                                                                translationKey={$string('products.quantity_on_hand')}
                                                                params={{quantity: item.stock_position.quantity_on_hand}}
                                                            />
                                                        </p>
                                                    )}
                                                />
                                            )}
                                        />
                                        {/* html L146: {{#if ../cart.inventory_settings.show_quantity_on_backorder}} */}
                                        <$If
                                            query={[cart.inventory_settings.show_quantity_on_backorder]}
                                            $then={() => (
                                                /* html L147: {{#if stock_position.quantity_backordered}} */
                                                <$If
                                                    query={[item.stock_position.quantity_backordered]}
                                                    $then={() => (
                                                        /* html L148: <p class="cart-item-backorder-message">{{lang 'products.quantity_backordered' quantity=stock_position.quantity_backordered}}</p> */
                                                        <p className="cart-item-backorder-message">
                                                            {/* html L148: {{lang 'products.quantity_backordered' quantity=stock_position.quantity_backordered}} */}
                                                            <$Lang
                                                                translationKey={$string('products.quantity_backordered')}
                                                                params={{quantity: item.stock_position.quantity_backordered}}
                                                            />
                                                        </p>
                                                    )}
                                                />
                                            )}
                                        />
                                        {/* html L151: {{#if ../cart.inventory_settings.show_backorder_message}} */}
                                        <$If
                                            query={[cart.inventory_settings.show_backorder_message]}
                                            $then={() => (
                                                /* html L152: {{#if stock_position.backorder_message}} */
                                                <$If
                                                    query={[item.stock_position.backorder_message]}
                                                    $then={() => (
                                                        /* html L153: <p class="cart-item-backorder-message">{{stock_position.backorder_message}}</p> */
                                                        <p className="cart-item-backorder-message">{/* html L153: {{stock_position.backorder_message}} */}{item.stock_position.backorder_message}</p>
                                                    )}
                                                />
                                            )}
                                        />
                                        {/* html L156: {{#each options}} */}
                                        <$Each
                                            list={item.options}
                                            $then={(option) => (
                                                /* html L157: {{#if linked_bundled_item}} */
                                                <$If
                                                    query={[option.linked_bundled_item]}
                                                    $then={() => (
                                                        <>
                                                            {/* html L158: {{#all ../../cart.inventory_settings.show_quantity_on_hand linked_bundled_item.stock_position.quantity_on_hand linked_bundled_item.stock_position.quantity_backordered}}{{assignVar "showOnHandQty" 1}}{{else}}{{assignVar "showOnHandQty" 0}}{{/all}} */}
                                                            <$All
                                                                values={[
                                                                    cart.inventory_settings.show_quantity_on_hand,
                                                                    option.linked_bundled_item.stock_position.quantity_on_hand,
                                                                    option.linked_bundled_item.stock_position.quantity_backordered,
                                                                ]}
                                                                $then={() => /* html L158: {{assignVar "showOnHandQty" 1}} */ <$AssignVar keyName={$string('showOnHandQty')} value={$number(1)}/>}
                                                                $else={() => /* html L158: {{assignVar "showOnHandQty" 0}} */ <$AssignVar keyName={$string('showOnHandQty')} value={$number(0)}/>}
                                                            />
                                                            {/* html L159: {{#all ../../cart.inventory_settings.show_quantity_on_backorder linked_bundled_item.stock_position.quantity_backordered}}{{assignVar "showBackorderedQty" 1}}{{else}}{{assignVar "showBackorderedQty" 0}}{{/all}} */}
                                                            <$All
                                                                values={[
                                                                    cart.inventory_settings.show_quantity_on_backorder,
                                                                    option.linked_bundled_item.stock_position.quantity_backordered,
                                                                ]}
                                                                $then={() => /* html L159: {{assignVar "showBackorderedQty" 1}} */ <$AssignVar keyName={$string('showBackorderedQty')} value={$number(1)}/>}
                                                                $else={() => /* html L159: {{assignVar "showBackorderedQty" 0}} */ <$AssignVar keyName={$string('showBackorderedQty')} value={$number(0)}/>}
                                                            />
                                                            {/* html L160: {{#all ../../cart.inventory_settings.show_backorder_message linked_bundled_item.stock_position.backorder_message}}{{assignVar "showBackorderMessage" 1}}{{else}}{{assignVar "showBackorderMessage" 0}}{{/all}} */}
                                                            <$All
                                                                values={[
                                                                    cart.inventory_settings.show_backorder_message,
                                                                    option.linked_bundled_item.stock_position.backorder_message,
                                                                ]}
                                                                $then={() => /* html L160: {{assignVar "showBackorderMessage" 1}} */ <$AssignVar keyName={$string('showBackorderMessage')} value={$number(1)}/>}
                                                                $else={() => /* html L160: {{assignVar "showBackorderMessage" 0}} */ <$AssignVar keyName={$string('showBackorderMessage')} value={$number(0)}/>}
                                                            />
                                                            {/* html L161: {{#or (getVar "showOnHandQty") (getVar "showBackorderedQty") (getVar "showBackorderMessage")}} */}
                                                            <$Or
                                                                values={[
                                                                    $getVar($string('showOnHandQty')),
                                                                    $getVar($string('showBackorderedQty')),
                                                                    $getVar($string('showBackorderMessage')),
                                                                ]}
                                                                $then={() => (
                                                                    /* html L162: <div class="cart-item-option-stock"> */
                                                                    <div className="cart-item-option-stock">
                                                                        {/* html L163: <p class="cart-item-backorder-message"><strong>{{name}}:</strong></p> */}
                                                                        <p className="cart-item-backorder-message">
                                                                            {/* html L163: <strong> */}
                                                                            <strong>{/* html L163: {{name}} */}{option.name}:</strong>
                                                                        </p>
                                                                        {/* html L164: {{#if (getVar "showOnHandQty")}} */}
                                                                        <$If
                                                                            query={[$getVar($string('showOnHandQty'))]}
                                                                            $then={() => (
                                                                                /* html L165: <p class="cart-item-backorder-message">{{lang 'products.quantity_on_hand' quantity=linked_bundled_item.stock_position.quantity_on_hand}}</p> */
                                                                                <p className="cart-item-backorder-message">
                                                                                    {/* html L165: {{lang 'products.quantity_on_hand' quantity=linked_bundled_item.stock_position.quantity_on_hand}} */}
                                                                                    <$Lang
                                                                                        translationKey={$string('products.quantity_on_hand')}
                                                                                        params={{quantity: option.linked_bundled_item.stock_position.quantity_on_hand}}
                                                                                    />
                                                                                </p>
                                                                            )}
                                                                        />
                                                                        {/* html L167: {{#if (getVar "showBackorderedQty")}} */}
                                                                        <$If
                                                                            query={[$getVar($string('showBackorderedQty'))]}
                                                                            $then={() => (
                                                                                /* html L168: <p class="cart-item-backorder-message">{{lang 'products.quantity_backordered' quantity=linked_bundled_item.stock_position.quantity_backordered}}</p> */
                                                                                <p className="cart-item-backorder-message">
                                                                                    {/* html L168: {{lang 'products.quantity_backordered' quantity=linked_bundled_item.stock_position.quantity_backordered}} */}
                                                                                    <$Lang
                                                                                        translationKey={$string('products.quantity_backordered')}
                                                                                        params={{quantity: option.linked_bundled_item.stock_position.quantity_backordered}}
                                                                                    />
                                                                                </p>
                                                                            )}
                                                                        />
                                                                        {/* html L170: {{#if (getVar "showBackorderMessage")}} */}
                                                                        <$If
                                                                            query={[$getVar($string('showBackorderMessage'))]}
                                                                            $then={() => (
                                                                                /* html L171: <p class="cart-item-backorder-message">{{linked_bundled_item.stock_position.backorder_message}}</p> */
                                                                                <p className="cart-item-backorder-message">
                                                                                    {/* html L171: {{linked_bundled_item.stock_position.backorder_message}} */}
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

                        {/* html L180: <td class="cart-item-block cart-item-info"> */}
                        <td className="cart-item-block cart-item-info">
                            {/* html L181: <span class="cart-item-label">{{lang 'cart.checkout.total'}}</span> */}
                            <span className="cart-item-label">
                                {/* html L181: {{lang 'cart.checkout.total'}} */}
                                <$Lang translationKey={$string('cart.checkout.total')}/>
                            </span>
                            {/* html L182: {{#or ../customer (unless ../settings.hide_price_from_guests) (if type '==' 'GiftCertificate')}} */}
                            <$Or
                                values={[customer, $unless(settings.hide_price_from_guests), $if(item.type, '==', $string('GiftCertificate'))]}
                                $then={() => (
                                    <>
                                        {/* html L183: <strong class="cart-item-value {{#if total_discounted}}price--discounted{{/if}}">{{total.formatted}}</strong> */}
                                        <strong
                                            className={`cart-item-value ${$if(item.total_discounted).then(() => $$raw('price--discounted'))}`}
                                        >
                                            {/* html L183: {{total.formatted}} */}
                                            {item.total.formatted}
                                        </strong>
                                        {/* html L184: {{#if total_discounted}} */}
                                        <$If
                                            query={[item.total_discounted]}
                                            $then={() => /* html L185: <strong class="cart-item-value">{{total_discounted.formatted}}</strong> */ <strong className="cart-item-value">{/* html L185: {{total_discounted.formatted}} */}{item.total_discounted.formatted}</strong>}
                                        />
                                    </>
                                )}
                                $else={() => <>--</>}
                            />
                            {/* html L190: {{#or can_modify (if type '==' 'GiftCertificate')}} */}
                            <$Or
                                values={[item.can_modify, $if(item.type, '==', $string('GiftCertificate'))]}
                                $then={() => (
                                    /* html L191-195:
                                       <button class="cart-remove icon"
                                               data-cart-itemid="{{id}}"
                                               data-confirm-delete="{{lang 'cart.confirm_delete'}}"
                                               aria-label="{{lang 'cart.remove_item' name=name}}"
                                       >
                                    */
                                    <button
                                        className="cart-remove icon"
                                        data-cart-itemid={item.id}
                                        data-confirm-delete={$lang($string('cart.confirm_delete'))}
                                        aria-label={$lang($string('cart.remove_item'), {name: item.name})}
                                    >
                                        {/* html L196: <svg aria-hidden="true"><use href="#icon-close"></use></svg> */}
                                        <svg aria-hidden="true">
                                            {/* html L196: <use href="#icon-close"> */}
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
