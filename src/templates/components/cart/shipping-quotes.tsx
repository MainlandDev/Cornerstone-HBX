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
    <$If
        query={[errors]}
        $then={() => (
            <>
                <$Lang translationKey={$string('errors.shipping_quote_failure')}/>
                <ul>
                    <$Each list={errors} $then={() => <li>{$this()}</li>}/>
                </ul>
            </>
        )}
        $else={() => (
            <form>
                <$If
                    query={[quotes.shipping_methods]}
                    $then={() => (
                        <div className="estimator-form--default">
                            <ul>
                                <$Each
                                    list={quotes.shipping_methods}
                                    $then={(method) => (
                                        <li className="estimator-form-row">
                                            <dl>
                                                <dt className="estimator-form-label">
                                                    <input
                                                        id={`shipping-quote-${method.type}-${method.id}`}
                                                        className="shipping-quote"
                                                        type="radio"
                                                        name="shipping_method"
                                                        value={method.id}
                                                    />
                                                    <label className="estimator-form-label-text" htmlFor={`shipping-quote-${method.type}-${method.id}`}>
                                                        {method.provider_name}
                                                    </label>
                                                </dt>
                                                <dd className="estimator-form-input estimator-form-input--price">
                                                    <label htmlFor={`shipping-quote-${method.type}-${method.id}`}>
                                                        <span className={`${$if(method.cost_after_discount).then(() => $$raw('price--discounted'))}`}>
                                                            <b>{method.cost.formatted}</b>
                                                        </span>
                                                        <$If
                                                            query={[method.cost_after_discount]}
                                                            $then={() => (
                                                                <> <span><b>{method.cost_after_discount.formatted}</b></span></>
                                                            )}
                                                        />
                                                    </label>
                                                </dd>
                                            </dl>
                                        </li>
                                    )}
                                />
                            </ul>
                            <$If
                                query={[quotes.ups_shipping_methods]}
                                $then={() => (
                                    <a className="estimator-form-toggleUPSRate" href="#">
                                        <$Lang translationKey={$string('cart.shipping_estimator.show_ups_rates')}/>
                                    </a>
                                )}
                            />
                        </div>
                    )}
                />
                <$If
                    query={[quotes.ups_shipping_methods]}
                    $then={() => (
                        <div $$={$if(quotes.shipping_methods).then(() => $$raw('class="estimator-form--ups u-hiddenVisually"'))}>
                            <ul>
                                <$Each
                                    list={quotes.ups_shipping_methods}
                                    $then={(method) => (
                                        <li className="estimator-form-row">
                                            <dl>
                                                <dt className="estimator-form-label">
                                                    <input
                                                        id={`shipping-quote-${method.type}-${method.id}`}
                                                        className="shipping-quote"
                                                        type="radio"
                                                        name="shipping_method"
                                                        value={method.id}
                                                    />
                                                    <label className="estimator-form-label-text" htmlFor={`shipping-quote-${method.type}-${method.id}`}>
                                                        <$If
                                                            query={[method.logo_path]}
                                                            $then={() => (
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
                                                        {method.provider_name} {$$raw('&mdash;')} {method.description}
                                                    </label>
                                                </dt>
                                                <dd className="estimator-form-input estimator-form-input--price">
                                                    <label htmlFor={`shipping-quote-${method.type}-${method.id}`}>
                                                        <span className={`${$if(method.cost_after_discount).then(() => $$raw('price--discounted'))}`}>
                                                            <b>{method.cost.formatted}</b>
                                                        </span>
                                                        <$If
                                                            query={[method.cost_after_discount]}
                                                            $then={() => (
                                                                <> <span><b>{method.cost_after_discount.formatted}</b></span></>
                                                            )}
                                                        />
                                                    </label>
                                                </dd>
                                            </dl>
                                        </li>
                                    )}
                                />
                            </ul>
                            <$If
                                query={[quotes.shipping_methods]}
                                $then={() => (
                                    <a className="estimator-form-toggleUPSRate" href="#">
                                        <$Lang translationKey={$string('cart.shipping_estimator.hide_ups_rates')}/>
                                    </a>
                                )}
                            />
                        </div>
                    )}
                />
                <input
                    className="button button--small button--primary select-shipping-quote"
                    type="submit"
                    value={$lang($string('cart.checkout.update'))}
                />
            </form>
        )}
    />
));
