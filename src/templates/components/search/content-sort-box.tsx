"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <form className="actionBar" method="get" data-sort-by="content">
        <fieldset className="form-fieldset actionBar-section">
            <div className="form-field">
                <label className="form-label" htmlFor="sort">
                    <$Lang keyName={$string("common.sorter.sort_by")} />
                </label>
                <select className="form-select form-select--small" name="sort" id="sort">
                    <option value="relevance" dangerouslyInlineAttributes={{attributes: `${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("relevance"), $then: () => "selected"})}`}}>
                        <$Lang keyName={$string("common.sorter.relevance")} />
                    </option>
                    <option value="alphaasc" dangerouslyInlineAttributes={{attributes: `${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("alphaasc"), $then: () => "selected"})}`}}>
                        <$Lang keyName={$string("common.sorter.alpha_asc")} />
                    </option>
                    <option value="alphadesc" dangerouslyInlineAttributes={{attributes: `${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("alphadesc"), $then: () => "selected"})}`}}>
                        <$Lang keyName={$string("common.sorter.alpha_desc")} />
                    </option>
                </select>
            </div>
        </fieldset>
    </form>
);
