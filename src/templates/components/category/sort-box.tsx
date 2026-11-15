import {$If, $Lang, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <fieldset className="form-fieldset actionBar-section">
        <div className="form-field">
            <label className="form-label" htmlFor="sort">
                <$Lang keyName={$string("common.sorter.sort_by")} />
            </label>
            <select className="form-select form-select--small " name="sort" id="sort" role="listbox">
                <option dangerouslyInlineAttributes={{attributes: `value="featured" ${$raw("{{#if sort '==' 'featured'}}selected{{/if}}")}`}}>
                    <$Lang keyName={$string("common.sorter.featured")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="newest" ${$raw("{{#if sort '==' 'newest'}}selected{{/if}}")}`}}>
                    <$Lang keyName={$string("common.sorter.newest")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="bestselling" ${$raw("{{#if sort '==' 'bestselling'}}selected{{/if}}")}`}}>
                    <$Lang keyName={$string("common.sorter.top_sellers")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="alphaasc" ${$raw("{{#if sort '==' 'alphaasc'}}selected{{/if}}")}`}}>
                    <$Lang keyName={$string("common.sorter.alpha_asc")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="alphadesc" ${$raw("{{#if sort '==' 'alphadesc'}}selected{{/if}}")}`}}>
                    <$Lang keyName={$string("common.sorter.alpha_desc")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="avgcustomerreview" ${$raw("{{#if sort '==' 'avgcustomerreview'}}selected{{/if}}")}`}}>
                    <$Lang keyName={$string("common.sorter.reviews")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="priceasc" ${$raw("{{#if sort '==' 'priceasc'}}selected{{/if}}")}`}}>
                    <$Lang keyName={$string("common.sorter.price_asc")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="pricedesc" ${$raw("{{#if sort '==' 'pricedesc'}}selected{{/if}}")}`}}>
                    <$Lang keyName={$string("common.sorter.price_desc")} />
                </option>
                <$If
                    test={$pointer("result_count")}
                    $then={() => (
                        <option dangerouslyInlineAttributes={{attributes: `value="relevance" ${$raw("{{#if sort '==' 'relevance'}}selected{{/if}}")}`}}>
                            <$Lang keyName={$string("common.sorter.relevance")} />
                        </option>
                    )}
                />
            </select>
        </div>
    </fieldset>
);
