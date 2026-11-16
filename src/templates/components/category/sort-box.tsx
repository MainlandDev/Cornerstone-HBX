"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <fieldset className="form-fieldset actionBar-section">
        <div className="form-field">
            <label className="form-label" htmlFor="sort">
                <$Lang keyName={$string("common.sorter.sort_by")} />
            </label>
            <select className="form-select form-select--small " name="sort" id="sort" role="listbox">
                <option dangerouslyInlineAttributes={{attributes: `value="featured" ${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("featured"), $then: () => "selected"})}`}}>
                    <$Lang keyName={$string("common.sorter.featured")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="newest" ${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("newest"), $then: () => "selected"})}`}}>
                    <$Lang keyName={$string("common.sorter.newest")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="bestselling" ${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("bestselling"), $then: () => "selected"})}`}}>
                    <$Lang keyName={$string("common.sorter.top_sellers")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="alphaasc" ${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("alphaasc"), $then: () => "selected"})}`}}>
                    <$Lang keyName={$string("common.sorter.alpha_asc")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="alphadesc" ${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("alphadesc"), $then: () => "selected"})}`}}>
                    <$Lang keyName={$string("common.sorter.alpha_desc")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="avgcustomerreview" ${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("avgcustomerreview"), $then: () => "selected"})}`}}>
                    <$Lang keyName={$string("common.sorter.reviews")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="priceasc" ${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("priceasc"), $then: () => "selected"})}`}}>
                    <$Lang keyName={$string("common.sorter.price_asc")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="pricedesc" ${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("pricedesc"), $then: () => "selected"})}`}}>
                    <$Lang keyName={$string("common.sorter.price_desc")} />
                </option>
                <$If
                    test={$pointer("result_count")}
                    $then={() => (
                        <option dangerouslyInlineAttributes={{attributes: `value="relevance" ${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("relevance"), $then: () => "selected"})}`}}>
                            <$Lang keyName={$string("common.sorter.relevance")} />
                        </option>
                    )}
                />
            </select>
        </div>
    </fieldset>
);
