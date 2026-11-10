/**
 * Source: templates/components/products/add-to-cart.html (74 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $Unless, $if, $string, $unless} from '@mainlanddev/bigcommerce-react';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Inject, $Or} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {Icon} from '@/components/icon';
import type {CustomerHint, ProductDetailHint, SettingsHint, ThemeSettingsHint} from '@/context-products';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';

type Bool = HandlebarsInlineValueToken<boolean>;

export default $asPartial<{
    product: ProductDetailHint;
    customer: CustomerHint;
    settings: SettingsHint;
    theme_settings: ThemeSettingsHint;
    /** Hash argument: `with_wallet_buttons=true` from `product-view`. */
    with_wallet_buttons: Bool;
}>(({product, customer, settings, with_wallet_buttons}) => (
    /* html L1: <div id="add-to-cart-wrapper" class="add-to-cart-wrapper" {{#unless product.can_purchase}}style="display: none"{{/unless}}> */
    <div id="add-to-cart-wrapper" className="add-to-cart-wrapper" $$={$unless(product.can_purchase).then(() => $$raw('style="display: none"'))}>
        {/* html L2: {{#if product.show_quantity_input}} */}
        <$If
            query={[product.show_quantity_input]}
            $then={() => (
                <>
                    {/* html L3: {{inject 'productQuantityErrorMessage'  (lang 'products.quantity_error_message')}} */}
                    <$Inject keyName={$string('productQuantityErrorMessage')} value={$lang($string('products.quantity_error_message'))}/>
                    {/* html L4: <div class="form-field form-field--increments"> */}
                    <div className="form-field form-field--increments">
                        {/* html L5-6:
                           <label class="form-label form-label--alternate"
                                  for="qty[]">{{lang 'products.quantity'}}</label>
                        */}
                        <label className="form-label form-label--alternate" htmlFor="qty[]">
                            {/* html L6: {{lang 'products.quantity'}} */}
                            {$lang($string('products.quantity'))}
                        </label>
                        {/* html L7: <div class="form-increment" data-quantity-change> */}
                        <div className="form-increment" data-quantity-change="">
                            {/* html L8: <button class="button button--icon" data-action="dec"> */}
                            <button className="button button--icon" data-action="dec">
                                {/* html L9: <span class="is-srOnly">{{lang 'products.quantity_decrease' name=product.title}}</span> */}
                                <span className="is-srOnly">{/* html L9: {{lang 'products.quantity_decrease' name=product.title}} */}{$lang($string('products.quantity_decrease'), {name: product.title})}</span>
                                {/* html L10: <i class="icon" aria-hidden="true"> */}
                                <i className="icon" aria-hidden="true">
                                    {/* html L11: <svg> */}
                                    <svg>
                                        {/* html L12: <use href="#icon-keyboard-arrow-down"/> */}
                                        <use href="#icon-keyboard-arrow-down"/>
                                    </svg>
                                </i>
                            </button>
                            {/* html L16-25:
                               <input class="form-input form-input--incrementTotal"
                                      id="qty[]"
                                      name="qty[]"
                                      type="tel"
                                      value="{{#if product.min_purchase_quantity}}{{product.min_purchase_quantity}}{{else}}1{{/if}}"
                                      data-quantity-min="{{product.min_purchase_quantity}}"
                                      data-quantity-max="{{product.max_purchase_quantity}}"
                                      min="1"
                                      pattern="[0-9]*"
                                      aria-live="polite">
                            */}
                            <input
                                className="form-input form-input--incrementTotal"
                                id="qty[]"
                                name="qty[]"
                                type="tel"
                                value={`${$if(product.min_purchase_quantity).then(() => product.min_purchase_quantity).else(() => $$raw('1'))}`}
                                data-quantity-min={product.min_purchase_quantity}
                                data-quantity-max={product.max_purchase_quantity}
                                min="1"
                                pattern="[0-9]*"
                                aria-live="polite"
                            />
                            {/* html L26: <button class="button button--icon" data-action="inc"> */}
                            <button className="button button--icon" data-action="inc">
                                {/* html L27: <span class="is-srOnly">{{lang 'products.quantity_increase' name=product.title}}</span> */}
                                <span className="is-srOnly">{/* html L27: {{lang 'products.quantity_increase' name=product.title}} */}{$lang($string('products.quantity_increase'), {name: product.title})}</span>
                                {/* html L28: <i class="icon" aria-hidden="true"> */}
                                <i className="icon" aria-hidden="true">
                                    {/* html L29: <svg> */}
                                    <svg>
                                        {/* html L30: <use href="#icon-keyboard-arrow-up"/> */}
                                        <use href="#icon-keyboard-arrow-up"/>
                                    </svg>
                                </i>
                            </button>
                        </div>
                    </div>
                </>
            )}
        />

        {/* html L38: {{#if product.out_of_stock}} */}
        <$If
            query={[product.out_of_stock]}
            $then={() => (
                /* html L39: {{#unless product.available_to_sell}} */
                <$Unless
                    query={[product.available_to_sell]}
                    $then={() => (
                        /* html L40: {{#if product.out_of_stock_message}} */
                        <$If
                            query={[product.out_of_stock_message]}
                            $then={() => /* html L41: {{> components/common/alert/alert-error product.out_of_stock_message}} */ <$Partial name="components/common/alert/alert-error" context={product.out_of_stock_message}/>}
                            $else={() => /* html L42: {{else}}
                                                                                        html L43: {{> components/common/alert/alert-error (lang 'products.sold_out')}}
                                         */ <$Partial name="components/common/alert/alert-error" context={$lang($string('products.sold_out'))}/>}
                        />
                    )}
                />
            )}
        />

        {/* html L48: <div class="alertBox alertBox--error productAttributes-message" style="display:none"> */}
        <div className="alertBox alertBox--error productAttributes-message" style={{display: 'none'}}>
            {/* html L49: <div class="alertBox-column alertBox-icon"> */}
            <div className="alertBox-column alertBox-icon">
                {/* html L50: <icon glyph="ic-error" class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg></icon> */}
                <Icon glyph="ic-error" className="icon">
                    {/* html L50: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        {/* html L50: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"> */}
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                    </svg>
                </Icon>
            </div>
            {/* html L52: <p class="alertBox-column alertBox-message"></p> */}
            <p className="alertBox-column alertBox-message"></p>
        </div>
        {/* html L54: {{#or customer (unless settings.hide_price_from_guests)}} */}
        <$Or
            values={[customer, $unless(settings.hide_price_from_guests)]}
            $then={() => (
                /* html L55: <div class="add-to-cart-buttons {{#if product.pre_order}}pre-order-buttons{{/if}}"> */
                <div className={`add-to-cart-buttons ${$if(product.pre_order).then(() => $$raw('pre-order-buttons'))}`}>
                    {/* html L56: <div class="form-action"> */}
                    <div className="form-action">
                        {/* html L57-63:
                           <input
                                   id="form-action-addToCart"
                                   data-wait-message="{{lang 'products.adding_to_cart'}}"
                                   class="button button--primary"
                                   type="submit"
                                   value="{{#if product.pre_order}}{{lang 'products.pre_order'}}{{else}}{{lang 'products.add_to_cart'}}{{/if}}"
                           >
                        */}
                        <input
                            id="form-action-addToCart"
                            data-wait-message={$lang($string('products.adding_to_cart'))}
                            className="button button--primary"
                            type="submit"
                            value={`${$if(product.pre_order).then(() => $lang($string('products.pre_order'))).else(() => $lang($string('products.add_to_cart')))}`}
                        />
                        {/* html L64: <span class="product-status-message aria-description--hidden">{{lang 'products.adding_to_cart'}} {{lang 'category.add_cart_announcement'}}</span> */}
                        <span className="product-status-message aria-description--hidden">
                            {/* html L64: {{lang 'products.adding_to_cart'}} */}
                            {$lang($string('products.adding_to_cart'))} {/* html L64: {{lang 'category.add_cart_announcement'}} */}{$lang($string('category.add_cart_announcement'))}
                        </span>
                    </div>
                    {/* html L66: {{#if this.with_wallet_buttons}} */}
                    <$If
                        query={[with_wallet_buttons]}
                        $then={() => (
                            /* html L67: <div class="add-to-cart-wallet-buttons" data-add-to-cart-wallet-buttons> */
                            <div className="add-to-cart-wallet-buttons" data-add-to-cart-wallet-buttons="">
                                {/* html L68: {{> components/common/wallet-buttons}} */}
                                <$Partial name="components/common/wallet-buttons"/>
                            </div>
                        )}
                    />
                </div>
            )}
        />
    </div>
));
