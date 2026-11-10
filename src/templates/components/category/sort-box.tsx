/**
 * Source: templates/components/category/sort-box.html (19 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $if, $string, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $asPartial<{
    sort: HandlebarsInlineValueToken<string>;
    result_count: HandlebarsInlineValueToken<number>;
}>(({sort, result_count}) => (
    /* html L1: <fieldset class="form-fieldset actionBar-section"> */
    <fieldset className="form-fieldset actionBar-section">
        {/* html L2: <div class="form-field"> */}
        <div className="form-field">
            {/* html L3: <label class="form-label" for="sort">{{lang 'common.sorter.sort_by'}}</label> */}
            <label className="form-label" htmlFor="sort">
                {/* html L3: {{lang 'common.sorter.sort_by'}} */}
                <$Lang translationKey={$string('common.sorter.sort_by')}/>
            </label>
            {/* html L4: <select class="form-select form-select--small " name="sort" id="sort" role="listbox"> */}
            <select className="form-select form-select--small " name="sort" id="sort" role="listbox">
                {/* html L5: <option value="featured" {{#if sort '==' 'featured'}}selected{{/if}}>{{lang 'common.sorter.featured'}}</option> */}
                <option value="featured" $$={$if(sort, '==', $string('featured')).then(() => $$raw('selected'))}>
                    {/* html L5: {{lang 'common.sorter.featured'}} */}
                    <$Lang translationKey={$string('common.sorter.featured')}/>
                </option>
                {/* html L6: <option value="newest" {{#if sort '==' 'newest'}}selected{{/if}}>{{lang 'common.sorter.newest'}}</option> */}
                <option value="newest" $$={$if(sort, '==', $string('newest')).then(() => $$raw('selected'))}>
                    {/* html L6: {{lang 'common.sorter.newest'}} */}
                    <$Lang translationKey={$string('common.sorter.newest')}/>
                </option>
                {/* html L7: <option value="bestselling" {{#if sort '==' 'bestselling'}}selected{{/if}}>{{lang 'common.sorter.top_sellers'}}</option> */}
                <option value="bestselling" $$={$if(sort, '==', $string('bestselling')).then(() => $$raw('selected'))}>
                    {/* html L7: {{lang 'common.sorter.top_sellers'}} */}
                    <$Lang translationKey={$string('common.sorter.top_sellers')}/>
                </option>
                {/* html L8: <option value="alphaasc" {{#if sort '==' 'alphaasc'}}selected{{/if}}>{{lang 'common.sorter.alpha_asc'}}</option> */}
                <option value="alphaasc" $$={$if(sort, '==', $string('alphaasc')).then(() => $$raw('selected'))}>
                    {/* html L8: {{lang 'common.sorter.alpha_asc'}} */}
                    <$Lang translationKey={$string('common.sorter.alpha_asc')}/>
                </option>
                {/* html L9: <option value="alphadesc" {{#if sort '==' 'alphadesc'}}selected{{/if}}>{{lang 'common.sorter.alpha_desc'}}</option> */}
                <option value="alphadesc" $$={$if(sort, '==', $string('alphadesc')).then(() => $$raw('selected'))}>
                    {/* html L9: {{lang 'common.sorter.alpha_desc'}} */}
                    <$Lang translationKey={$string('common.sorter.alpha_desc')}/>
                </option>
                {/* html L10: <option value="avgcustomerreview" {{#if sort '==' 'avgcustomerreview'}}selected{{/if}}>{{lang 'common.sorter.reviews'}}</option> */}
                <option value="avgcustomerreview" $$={$if(sort, '==', $string('avgcustomerreview')).then(() => $$raw('selected'))}>
                    {/* html L10: {{lang 'common.sorter.reviews'}} */}
                    <$Lang translationKey={$string('common.sorter.reviews')}/>
                </option>
                {/* html L11: <option value="priceasc" {{#if sort '==' 'priceasc'}}selected{{/if}}>{{lang 'common.sorter.price_asc'}}</option> */}
                <option value="priceasc" $$={$if(sort, '==', $string('priceasc')).then(() => $$raw('selected'))}>
                    {/* html L11: {{lang 'common.sorter.price_asc'}} */}
                    <$Lang translationKey={$string('common.sorter.price_asc')}/>
                </option>
                {/* html L12: <option value="pricedesc" {{#if sort '==' 'pricedesc'}}selected{{/if}}>{{lang 'common.sorter.price_desc'}}</option> */}
                <option value="pricedesc" $$={$if(sort, '==', $string('pricedesc')).then(() => $$raw('selected'))}>
                    {/* html L12: {{lang 'common.sorter.price_desc'}} */}
                    <$Lang translationKey={$string('common.sorter.price_desc')}/>
                </option>
                {/* html L13: {{#if result_count}} */}
                <$If
                    query={[result_count]}
                    $then={() => (
                        /* html L14: <option value="relevance" {{#if sort '==' 'relevance'}}selected{{/if}}>{{lang 'common.sorter.relevance'}}</option> */
                        <option value="relevance" $$={$if(sort, '==', $string('relevance')).then(() => $$raw('selected'))}>
                            {/* html L14: {{lang 'common.sorter.relevance'}} */}
                            <$Lang translationKey={$string('common.sorter.relevance')}/>
                        </option>
                    )}
                />
            </select>
        </div>
    </fieldset>
));
