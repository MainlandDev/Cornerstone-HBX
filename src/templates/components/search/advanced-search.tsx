"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

interface Brand {
    id: string;
    name: string;
}

export default (_props: PartialProps) => (
    <div className="page">
        <div className="page-content page-content--centered">
            <form
                className="advancedSearch-form toggle-content"
                action={$pointer("forms.search.action")}
                data-advanced-search-form={""}
                id="advanced-search-content"
                aria-hidden="true"
            >
                <input type="hidden" name="mode" value="1" />
                <h5 className="advancedSearch-title">
                    <$Lang keyName={$string("forms.search.title")} />
                </h5>
                <div className="form-row">
                    <fieldset className="form-fieldset form-column">
                        <div className="form-field">
                            <label className="form-label" htmlFor="search_query_adv">
                                <$Lang keyName={$string("forms.search.query")} />{" "}
                                <small>
                                    <$Lang keyName={$string("common.required")} />
                                </small>
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                name="search_query_adv"
                                data-error-message={$lang($string("search.error.empty_field"))}
                                id="search_query_adv"
                                value={$pointer("forms.search.query")}
                            />
                        </div>

                        <div className="form-field">
                            <label className="form-label" htmlFor="search-form-brand">
                                <$Lang keyName={$string("forms.search.brand")} />
                            </label>
                            <select className="form-select" name="brand" id="search-form-brand">
                                <option value="">
                                    <$Lang keyName={$string("common.no_preference")} />
                                </option>
                                <$Each
                                    list={$pointer<Brand[]>("forms.search.brands_list")}
                                    $then={(brand) => (
                                        <option
                                            value={brand.id}
                                            dangerouslyInlineAttributes={{
                                                attributes: `${$If({test: $pointer("../forms.search.values.brand"), operator: $string("=="), rvalue: $pointer("id"), $then: () => "selected"})}`,
                                            }}
                                        >
                                            {brand.name}
                                        </option>
                                    )}
                                />
                            </select>
                        </div>
                    </fieldset>
                    <fieldset className="form-fieldset form-column">
                        <div className="form-field">
                            <label className="form-label">
                                <$Lang keyName={$string("forms.search.categories")} />
                            </label>
                            <div className="form-field-group" data-search-category-tree={""}></div>
                        </div>
                        <div className="form-field">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                name="searchsubs"
                                value="ON"
                                id="search-form-searchsubs"
                                checked={true}
                            />{" "}
                            <label className="form-label" htmlFor="search-form-searchsubs">
                                <$Lang keyName={$string("forms.search.searchsubs")} />
                            </label>
                        </div>
                    </fieldset>
                </div>
                <hr />
                <div className="form-row">
                    <div className="form-field search-price-range">
                        <h5 className="advancedSearch-title">
                            <$Lang keyName={$string("forms.search.by_price")} />
                        </h5>
                        <p className="form-label" htmlFor="search-form-price_from">
                            <$Lang keyName={$string("forms.search.price_range")} />
                        </p>
                        <label>
                            <span className="is-srOnly">
                                <$Lang keyName={$string("forms.search.price_range")} />
                            </span>{" "}
                            <span>
                                <$Lang keyName={$string("common.from")} />
                            </span>
                            <input
                                type="number"
                                step="any"
                                className="form-input"
                                name="price_from"
                                id="search-form-price_from"
                                value={$pointer("forms.search.values.price_from")}
                            />
                        </label>
                        <label>
                            <span className="is-srOnly">
                                <$Lang keyName={$string("forms.search.price_range")} />
                            </span>{" "}
                            <span>
                                <$Lang keyName={$string("common.to")} />
                            </span>
                            <input
                                type="number"
                                step="any"
                                className="form-input"
                                name="price_to"
                                id="search-form-price_to"
                                value={$pointer("forms.search.values.price_to")}
                            />
                        </label>
                    </div>
                </div>
                <hr />
                <h5 className="advancedSearch-title">
                    <$Lang keyName={$string("forms.search.by_setting")} />
                </h5>
                <div className="form-row form-row--half">
                    <div className="form-field">
                        <label className="form-label" htmlFor="search-form-featured">
                            <$Lang keyName={$string("forms.search.featured_products.title")} />
                        </label>
                        <select className="form-select" name="featured" id="search-form-featured">
                            <option value="">
                                <$Lang keyName={$string("common.no_preference")} />
                            </option>
                            <option
                                value="1"
                                dangerouslyInlineAttributes={{
                                    attributes: `${$If({test: $pointer("forms.search.values.featured_products"), operator: $string("==="), rvalue: $string("1"), $then: () => "selected"})}`,
                                }}
                            >
                                <$Lang keyName={$string("forms.search.featured_products.enabled")} />
                            </option>
                            <option
                                value="2"
                                dangerouslyInlineAttributes={{
                                    attributes: `${$If({test: $pointer("forms.search.values.featured_products"), operator: $string("==="), rvalue: $string("2"), $then: () => "selected"})}`,
                                }}
                            >
                                <$Lang keyName={$string("forms.search.featured_products.disabled")} />
                            </option>
                        </select>
                    </div>
                    <div className="form-field">
                        <label className="form-label" htmlFor="search-form-shipping">
                            <$Lang keyName={$string("forms.search.free_shipping.title")} />
                        </label>
                        <select className="form-select" name="shipping" id="search-form-shipping">
                            <option value="">
                                <$Lang keyName={$string("common.no_preference")} />
                            </option>
                            <option
                                value="1"
                                dangerouslyInlineAttributes={{
                                    attributes: `${$If({test: $pointer("forms.search.values.free_shipping"), operator: $string("==="), rvalue: $string("1"), $then: () => "selected"})}`,
                                }}
                            >
                                <$Lang keyName={$string("forms.search.free_shipping.free")} />
                            </option>
                            <option
                                value="2"
                                dangerouslyInlineAttributes={{
                                    attributes: `${$If({test: $pointer("forms.search.values.free_shipping"), operator: $string("==="), rvalue: $string("2"), $then: () => "selected"})}`,
                                }}
                            >
                                <$Lang keyName={$string("forms.search.free_shipping.paid")} />
                            </option>
                        </select>
                    </div>
                </div>
                <div className="form-actions">
                    <input
                        id="advanced-search-submit"
                        className="button button--primary"
                        type="submit"
                        value={$lang($string("forms.search.search"))}
                    />
                </div>
            </form>
        </div>
    </div>
);
