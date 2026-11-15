import {$cdn, $If, $Each, $Lang, $lang, $pointer, $raw, $string, $this} from "@mainlanddev/hbx-bigcommerce";

interface Quote {
    id: string;
    type: string;
    provider_name: string;
    description: string;
    logo_path: string;
    cost: {formatted: string};
    cost_after_discount: {formatted: string};
}

export default () => (
    <$If
        test={$pointer("errors")}
        $then={() => (
            <>
                <$Lang keyName={$string("errors.shipping_quote_failure")} />
                <ul>
                    <$Each list={$pointer<string[]>("errors")} $then={() => <li>{$this<string>()}</li>} />
                </ul>
            </>
        )}
        $else={() => (
            <form>
                <$If
                    test={$pointer("quotes.shipping_methods")}
                    $then={() => (
                        <div className="estimator-form--default">
                            <ul>
                                <$Each
                                    list={$pointer<Quote[]>("quotes.shipping_methods")}
                                    $then={(quote) => (
                                        <li className="estimator-form-row">
                                            <dl>
                                                <dt className="estimator-form-label">
                                                    <input
                                                        id={`shipping-quote-${quote.type}-${quote.id}`}
                                                        className="shipping-quote"
                                                        type="radio"
                                                        name="shipping_method"
                                                        value={quote.id}
                                                    />
                                                    <label className="estimator-form-label-text" htmlFor={`shipping-quote-${quote.type}-${quote.id}`}>
                                                        {quote.provider_name}
                                                    </label>
                                                </dt>
                                                <dd className="estimator-form-input estimator-form-input--price">
                                                    <label htmlFor={`shipping-quote-${quote.type}-${quote.id}`}>
                                                        <span className={`${$If({test: quote.cost_after_discount, $then: () => "price--discounted"})}`}>
                                                            <b>{quote.cost.formatted}</b>
                                                        </span>
                                                        <$If
                                                            test={quote.cost_after_discount}
                                                            $then={() => (
                                                                <>
                                                                    {" "}
                                                                    <span>
                                                                        <b>{quote.cost_after_discount.formatted}</b>
                                                                    </span>
                                                                </>
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
                                test={$pointer("quotes.ups_shipping_methods")}
                                $then={() => (
                                    <a className="estimator-form-toggleUPSRate" href="#">
                                        <$Lang keyName={$string("cart.shipping_estimator.show_ups_rates")} />
                                    </a>
                                )}
                            />
                        </div>
                    )}
                />
                <$If
                    test={$pointer("quotes.ups_shipping_methods")}
                    $then={() => (
                        <div
                            dangerouslyInlineAttributes={{
                                attributes: `${$If({test: $pointer("quotes.shipping_methods"), $then: () => $raw('class="estimator-form--ups u-hiddenVisually"')})}`,
                            }}
                        >
                            <ul>
                                <$Each
                                    list={$pointer<Quote[]>("quotes.ups_shipping_methods")}
                                    $then={(quote) => (
                                        <li className="estimator-form-row">
                                            <dl>
                                                <dt className="estimator-form-label">
                                                    <input
                                                        id={`shipping-quote-${quote.type}-${quote.id}`}
                                                        className="shipping-quote"
                                                        type="radio"
                                                        name="shipping_method"
                                                        value={quote.id}
                                                    />
                                                    <label className="estimator-form-label-text" htmlFor={`shipping-quote-${quote.type}-${quote.id}`}>
                                                        <$If
                                                            test={quote.logo_path}
                                                            $then={() => (
                                                                <>
                                                                    <img
                                                                        className="lazyload"
                                                                        data-sizes="auto"
                                                                        src={$cdn($string("img/loading.svg"))}
                                                                        data-src={quote.logo_path}
                                                                        alt={quote.description}
                                                                        title={quote.description}
                                                                    />{" "}
                                                                </>
                                                            )}
                                                        />
                                                        {quote.provider_name} {$raw("&mdash;")} {quote.description}
                                                    </label>
                                                </dt>
                                                <dd className="estimator-form-input estimator-form-input--price">
                                                    <label htmlFor={`shipping-quote-${quote.type}-${quote.id}`}>
                                                        <span className={`${$If({test: quote.cost_after_discount, $then: () => "price--discounted"})}`}>
                                                            <b>{quote.cost.formatted}</b>
                                                        </span>
                                                        <$If
                                                            test={quote.cost_after_discount}
                                                            $then={() => (
                                                                <>
                                                                    {" "}
                                                                    <span>
                                                                        <b>{quote.cost_after_discount.formatted}</b>
                                                                    </span>
                                                                </>
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
                                test={$pointer("quotes.shipping_methods")}
                                $then={() => (
                                    <a className="estimator-form-toggleUPSRate" href="#">
                                        <$Lang keyName={$string("cart.shipping_estimator.hide_ups_rates")} />
                                    </a>
                                )}
                            />
                        </div>
                    )}
                />
                <input
                    className="button button--small button--primary select-shipping-quote"
                    type="submit"
                    value={$lang($string("cart.checkout.update"))}
                />
            </form>
        )}
    />
);
