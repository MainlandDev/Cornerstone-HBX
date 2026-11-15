import {$Lang, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <form className="actionBar" method="get" data-sort-by="content">
        <fieldset className="form-fieldset actionBar-section">
            <div className="form-field">
                <label className="form-label" htmlFor="sort">
                    <$Lang keyName={$string("common.sorter.sort_by")} />
                </label>
                <select className="form-select form-select--small" name="sort" id="sort">
                    <option value="relevance" dangerouslyInlineAttributes={{attributes: `${$raw("{{#if sort '==' 'relevance'}}selected{{/if}}")}`}}>
                        <$Lang keyName={$string("common.sorter.relevance")} />
                    </option>
                    <option value="alphaasc" dangerouslyInlineAttributes={{attributes: `${$raw("{{#if sort '==' 'alphaasc'}}selected{{/if}}")}`}}>
                        <$Lang keyName={$string("common.sorter.alpha_asc")} />
                    </option>
                    <option value="alphadesc" dangerouslyInlineAttributes={{attributes: `${$raw("{{#if sort '==' 'alphadesc'}}selected{{/if}}")}`}}>
                        <$Lang keyName={$string("common.sorter.alpha_desc")} />
                    </option>
                </select>
            </div>
        </fieldset>
    </form>
);
