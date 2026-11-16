"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $lang, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <form id="facet-range-form" className="form" method="get" data-faceted-search-range={""} noValidate={true}>
        <input type="hidden" name="search_query" value={$pointer("search_query")} />
        <$If
            test={$pointer("this.sort")}
            $then={() => <input type="hidden" name="sort" value={$pointer("this.sort")} />}
        />
        <fieldset className="form-fieldset">
            <div className="form-minMaxRow">
                <div className="form-field">
                    <input
                        name={`${$If({test: $pointer("shop_by_price"), $then: () => "price_min", $else: () => "min_price"})}`}
                        placeholder={$lang($string("search.faceted.range.min-placeholder"))}
                        min="0"
                        className="form-input form-input--small"
                        required={true}
                        type="number"
                        value={$pointer("min_price")}
                        aria-label={$lang($string("search.faceted.range.min-placeholder"))}
                        aria-describedby="min_price_description"
                    />{" "}
                    <span id="min_price_description" className="aria-description--hidden">
                        <$Lang keyName={$string("search.faceted.range.min-description")} />
                    </span>
                </div>

                <div className="form-field">
                    <input
                        name={`${$If({test: $pointer("shop_by_price"), $then: () => "price_max", $else: () => "max_price"})}`}
                        placeholder={$lang($string("search.faceted.range.max-placeholder"))}
                        min="0"
                        className="form-input form-input--small"
                        required={true}
                        type="number"
                        value={$pointer("max_price")}
                        aria-label={$lang($string("search.faceted.range.max-placeholder"))}
                        aria-describedby="max_price_description"
                    />{" "}
                    <span id="max_price_description" className="aria-description--hidden">
                        <$Lang keyName={$string("search.faceted.range.max-description")} />
                    </span>
                </div>

                <div className="form-field">
                    <button className="button button--small" type="submit">
                        <$Lang keyName={$string("search.faceted.range.update")} />
                    </button>
                </div>
            </div>

            <div className="form-inlineMessage" aria-live="polite" role="alert"></div>
        </fieldset>
    </form>
);
