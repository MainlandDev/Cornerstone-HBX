/**
 * Source: templates/components/cart/shipping-quotes.html (70 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $if, $string, $this, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$cdn, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {ShippingQuote} from '@/context-cart';

export default $asPartial<{
    errors?: Array<HandlebarsInlineValueToken<string>>;
    quotes?: {
        shipping_methods?: Array<ShippingQuote>;
        ups_shipping_methods?: Array<ShippingQuote>;
    };
}>(({errors, quotes}) => (
    /* html L1: {{#if errors}} */
    <$If
        query={[errors]}
        $then={() => (
            <>
                {/* html L2: {{lang 'errors.shipping_quote_failure'}} */}
                <$Lang translationKey={$string('errors.shipping_quote_failure')}/>
                {/* html L3: <ul> */}
                <ul>
                    {/* html L4: {{#each errors}} */}
                    <$Each list={errors} $then={() => /* html L5: <li>{{this}}</li> */ <li>{/* html L5: {{this}} */}{$this()}</li>}/>
                </ul>
            </>
        )}
        $else={() => (
            /* html L8: {{else}}
                              html L9: <form>
            */
            <form>
                {/* html L10: {{#if quotes.shipping_methods}} */}
                <$If
                    query={[quotes.shipping_methods]}
                    $then={() => (
                        /* html L11: <div class="estimator-form--default"> */
                        <div className="estimator-form--default">
                            {/* html L12: <ul> */}
                            <ul>
                                {/* html L13: {{#each quotes.shipping_methods}} */}
                                <$Each
                                    list={quotes.shipping_methods}
                                    $then={(method) => (
                                        /* html L14: <li class="estimator-form-row"> */
                                        <li className="estimator-form-row">
                                            {/* html L15: <dl> */}
                                            <dl>
                                                {/* html L16: <dt class="estimator-form-label"> */}
                                                <dt className="estimator-form-label">
                                                    {/* html L17: <input id="shipping-quote-{{type}}-{{id}}" class="shipping-quote" type="radio" name="shipping_method" value="{{id}}"> */}
                                                    <input
                                                        id={`shipping-quote-${method.type}-${method.id}`}
                                                        className="shipping-quote"
                                                        type="radio"
                                                        name="shipping_method"
                                                        value={method.id}
                                                    />
                                                    {/* html L18: <label class="estimator-form-label-text" for="shipping-quote-{{type}}-{{id}}"> */}
                                                    <label className="estimator-form-label-text" htmlFor={`shipping-quote-${method.type}-${method.id}`}>
                                                        {/* html L19: {{provider_name}} */}
                                                        {method.provider_name}
                                                    </label>
                                                </dt>
                                                {/* html L22: <dd class="estimator-form-input estimator-form-input--price"> */}
                                                <dd className="estimator-form-input estimator-form-input--price">
                                                    {/* html L23: <label for="shipping-quote-{{type}}-{{id}}"> */}
                                                    <label htmlFor={`shipping-quote-${method.type}-${method.id}`}>
                                                        {/* html L24: <span class="{{#if cost_after_discount}}price--discounted{{/if}}"><b>{{cost.formatted}}</b></span> */}
                                                        <span className={`${$if(method.cost_after_discount).then(() => $$raw('price--discounted'))}`}>
                                                            {/* html L24: <b> */}
                                                            <b>{/* html L24: {{cost.formatted}} */}{method.cost.formatted}</b>
                                                        </span>
                                                        {/* html L25: {{#if cost_after_discount}} <span><b>{{cost_after_discount.formatted}}</b></span>{{/if}} */}
                                                        <$If
                                                            query={[method.cost_after_discount]}
                                                            $then={() => (
                                                                <> {/* html L25: <span> */}<span>{/* html L25: <b> */}<b>{/* html L25: {{cost_after_discount.formatted}} */}{method.cost_after_discount.formatted}</b></span></>
                                                            )}
                                                        />
                                                    </label>
                                                </dd>
                                            </dl>
                                        </li>
                                    )}
                                />
                            </ul>
                            {/* html L32: {{#if quotes.ups_shipping_methods}} */}
                            <$If
                                query={[quotes.ups_shipping_methods]}
                                $then={() => (
                                    /* html L33: <a class="estimator-form-toggleUPSRate" href="#">{{lang 'cart.shipping_estimator.show_ups_rates'}}</a> */
                                    <a className="estimator-form-toggleUPSRate" href="#">
                                        {/* html L33: {{lang 'cart.shipping_estimator.show_ups_rates'}} */}
                                        <$Lang translationKey={$string('cart.shipping_estimator.show_ups_rates')}/>
                                    </a>
                                )}
                            />
                        </div>
                    )}
                />
                {/* html L37: {{#if quotes.ups_shipping_methods}} */}
                <$If
                    query={[quotes.ups_shipping_methods]}
                    $then={() => (
                        /* html L38: <div {{#if quotes.shipping_methods}}class="estimator-form--ups u-hiddenVisually"{{/if}}> */
                        <div $$={$if(quotes.shipping_methods).then(() => $$raw('class="estimator-form--ups u-hiddenVisually"'))}>
                            {/* html L39: <ul> */}
                            <ul>
                                {/* html L40: {{#each quotes.ups_shipping_methods}} */}
                                <$Each
                                    list={quotes.ups_shipping_methods}
                                    $then={(method) => (
                                        /* html L41: <li class="estimator-form-row"> */
                                        <li className="estimator-form-row">
                                            {/* html L42: <dl> */}
                                            <dl>
                                                {/* html L43: <dt class="estimator-form-label"> */}
                                                <dt className="estimator-form-label">
                                                    {/* html L44: <input id="shipping-quote-{{type}}-{{id}}" class="shipping-quote" type="radio" name="shipping_method" value="{{id}}"> */}
                                                    <input
                                                        id={`shipping-quote-${method.type}-${method.id}`}
                                                        className="shipping-quote"
                                                        type="radio"
                                                        name="shipping_method"
                                                        value={method.id}
                                                    />
                                                    {/* html L45: <label class="estimator-form-label-text" for="shipping-quote-{{type}}-{{id}}"> */}
                                                    <label className="estimator-form-label-text" htmlFor={`shipping-quote-${method.type}-${method.id}`}>
                                                        {/* html L46: {{#if logo_path}} */}
                                                        <$If
                                                            query={[method.logo_path]}
                                                            $then={() => (
                                                                /* html L47: <img class="lazyload" data-sizes="auto" src="{{cdn 'img/loading.svg'}}" data-src="{{logo_path}}" alt="{{description}}" title="{{description}}"> */
                                                                <img
                                                                    className="lazyload"
                                                                    data-sizes="auto"
                                                                    src={$cdn($string('img/loading.svg'))}
                                                                    data-src={method.logo_path}
                                                                    alt={method.description}
                                                                    title={method.description}
                                                                />
                                                            )}
                                                        />
                                                        {/* html L49: {{provider_name}} &mdash; {{description}} */}
                                                        {method.provider_name} {$$raw('&mdash;')} {/* html L49: {{description}} */}{method.description}
                                                    </label>
                                                </dt>
                                                {/* html L52: <dd class="estimator-form-input estimator-form-input--price"> */}
                                                <dd className="estimator-form-input estimator-form-input--price">
                                                    {/* html L53: <label for="shipping-quote-{{type}}-{{id}}"> */}
                                                    <label htmlFor={`shipping-quote-${method.type}-${method.id}`}>
                                                        {/* html L54: <span class="{{#if cost_after_discount}}price--discounted{{/if}}"><b>{{cost.formatted}}</b></span> */}
                                                        <span className={`${$if(method.cost_after_discount).then(() => $$raw('price--discounted'))}`}>
                                                            {/* html L54: <b> */}
                                                            <b>{/* html L54: {{cost.formatted}} */}{method.cost.formatted}</b>
                                                        </span>
                                                        {/* html L55: {{#if cost_after_discount}} <span><b>{{cost_after_discount.formatted}}</b></span>{{/if}} */}
                                                        <$If
                                                            query={[method.cost_after_discount]}
                                                            $then={() => (
                                                                <> {/* html L55: <span> */}<span>{/* html L55: <b> */}<b>{/* html L55: {{cost_after_discount.formatted}} */}{method.cost_after_discount.formatted}</b></span></>
                                                            )}
                                                        />
                                                    </label>
                                                </dd>
                                            </dl>
                                        </li>
                                    )}
                                />
                            </ul>
                            {/* html L62: {{#if quotes.shipping_methods}} */}
                            <$If
                                query={[quotes.shipping_methods]}
                                $then={() => (
                                    /* html L63: <a class="estimator-form-toggleUPSRate" href="#">{{lang 'cart.shipping_estimator.hide_ups_rates'}}</a> */
                                    <a className="estimator-form-toggleUPSRate" href="#">
                                        {/* html L63: {{lang 'cart.shipping_estimator.hide_ups_rates'}} */}
                                        <$Lang translationKey={$string('cart.shipping_estimator.hide_ups_rates')}/>
                                    </a>
                                )}
                            />
                        </div>
                    )}
                />
                {/* html L67: <input class="button button--small button--primary select-shipping-quote" type="submit" value="{{lang 'cart.checkout.update'}}"> */}
                <input
                    className="button button--small button--primary select-shipping-quote"
                    type="submit"
                    value={$lang($string('cart.checkout.update'))}
                />
            </form>
        )}
    />
));
