"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Each, $Inject, $Lang, $lang, $pointer, $raw, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";

interface Option {
    id: string;
    name: string;
    selected: boolean;
}

export default (_props: PartialProps) => (
    <>
        <$Inject keyName={$string("shippingCountryErrorMessage")} value={$lang($string("cart.shipping_estimator.empty_country_error"))} />{" "}
        <$Inject keyName={$string("shippingProvinceErrorMessage")} value={$lang($string("cart.shipping_estimator.empty_province_error"))} />

        <$If
            test={$pointer("shipping_cost")}
            $then={() => (
                <div className="cart-total-value">
                    <div className={`subtotal${$Unless({test: $pointer("multi_coupon_ui_enabled"), $then: () => " shipping-estimate-show"})}`}>
                        <$If
                            test={$pointer("multi_coupon_ui_enabled")}
                            $then={() => (
                                <>
                                    {$raw("{{#and shipping_cost_discounted (if shipping_cost_discounted.formatted '!==' shipping_cost.formatted)}}")}
                                    <span className="price--discounted">{$pointer("shipping_cost.formatted")}</span>{" "}
                                    <span id="shipping-cost-discounted">{$pointer("shipping_cost_discounted.formatted")}</span>
                                    {$raw("{{else}}")}
                                    <span id="shipping-cost-discounted">{$pointer("shipping_cost.formatted")}</span>
                                    {$raw("{{/and}}")}
                                </>
                            )}
                            $else={() => (
                                <a href="#" className="shipping-estimate-value">
                                    <span className={`${$If({test: $pointer("shipping_cost_discounted"), $then: () => "price--discounted"})}`}>
                                        {$pointer("shipping_cost.formatted")}
                                    </span>{" "}
                                    <$If
                                        test={$pointer("shipping_cost_discounted")}
                                        $then={() => <span id="shipping-cost-discounted">{$pointer("shipping_cost_discounted.formatted")}</span>}
                                    />
                                </a>
                            )}
                        />
                    </div>
                </div>
            )}
        />

        <div id="add-shipping" className="shipping-estimator u-hidden">
            <form className="form estimator-form" data-shipping-estimator={""}>
                <dl>
                    <dt className="estimator-form-label">
                        <label className="form-label" htmlFor="shipping-country">
                            <$Lang keyName={$string("cart.shipping_estimator.select_a_country")} />
                        </label>
                    </dt>

                    <dd className="estimator-form-input">
                        <select className="form-select" id="shipping-country" name="shipping-country" data-field-type="Country">
                            <option>
                                <$Lang keyName={$string("cart.shipping_estimator.select_a_country")} />
                            </option>
                            <$Each
                                list={$pointer<Option[]>("countries")}
                                $then={(country) => (
                                    <option
                                        dangerouslyInlineAttributes={{
                                            attributes: `value="${country.id}"${$If({test: country.selected, $then: () => $raw(' selected="selected"')})}`,
                                        }}
                                    >
                                        {country.name}
                                    </option>
                                )}
                            />
                        </select>
                    </dd>

                    <dt className="estimator-form-label">
                        <label className="form-label" htmlFor="shipping-state">
                            <$Lang keyName={$string("cart.shipping_estimator.select_a_state")} />
                        </label>
                    </dt>

                    <dd className="estimator-form-input">
                        <$If
                            test={$pointer("states.length")}
                            $then={() => (
                                <select className="form-select" id="shipping-state" name="shipping-state" data-field-type="State">
                                    <option>
                                        <$Lang keyName={$string("cart.shipping_estimator.select_a_state")} />
                                    </option>
                                    <$Each
                                        list={$pointer<Option[]>("states")}
                                        $then={(state) => (
                                            <option
                                                dangerouslyInlineAttributes={{
                                                    attributes: `value="${state.id}"${$If({test: state.selected, $then: () => $raw(' selected="selected"')})}`,
                                                }}
                                            >
                                                {state.name}
                                            </option>
                                        )}
                                    />
                                </select>
                            )}
                            $else={() => (
                                <input
                                    className="form-input"
                                    type="text"
                                    id="shipping-state"
                                    name="shipping-state"
                                    data-field-type="State"
                                    placeholder={$lang($string("cart.shipping_estimator.select_a_state"))}
                                />
                            )}
                        />
                    </dd>

                    <dt className="estimator-form-label">
                        <label className="form-label" htmlFor="shipping-city">
                            <$Lang keyName={$string("cart.shipping_estimator.suburb_city")} />
                        </label>
                    </dt>
                    <dd className="estimator-form-input">
                        <input
                            className="form-input"
                            type="text"
                            id="shipping-city"
                            name="shipping-city"
                            value={$pointer("selected_city")}
                            placeholder={$lang($string("cart.shipping_estimator.suburb_city"))}
                        />
                    </dd>

                    <dt className="estimator-form-label">
                        <label className="form-label" htmlFor="shipping-zip">
                            <$Lang keyName={$string("cart.shipping_estimator.zip_postal_code")} />
                        </label>
                    </dt>
                    <dd className="estimator-form-input">
                        <input
                            autoComplete="postal-code"
                            className="form-input"
                            type="text"
                            id="shipping-zip"
                            name="shipping-zip"
                            value={$pointer("selected_zip")}
                            placeholder={$lang($string("cart.shipping_estimator.zip_postal_code"))}
                        />
                    </dd>
                    <button className="button button--primary button--small shipping-estimate-submit">
                        <$Lang keyName={$string("cart.shipping_estimator.estimate_shipping")} />
                    </button>
                </dl>
            </form>
            <div className="shipping-quotes" role="alert" aria-atomic="true" aria-live="assertive"></div>
        </div>
    </>
);
