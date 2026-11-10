/**
 * Source: templates/components/search/content-sort-box.html (13 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$if, $string, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $asPartial<{sort: HandlebarsInlineValueToken<string>}>(({sort}) => (
    /* html L1: <form class="actionBar" method="get" data-sort-by="content"> */
    <form className="actionBar" method="get" data-sort-by="content">
        {/* html L2: <fieldset class="form-fieldset actionBar-section"> */}
        <fieldset className="form-fieldset actionBar-section">
            {/* html L3: <div class="form-field"> */}
            <div className="form-field">
                {/* html L4: <label class="form-label" for="sort">{{lang 'common.sorter.sort_by'}}</label> */}
                <label className="form-label" htmlFor="sort">
                    {/* html L4: {{lang 'common.sorter.sort_by'}} */}
                    <$Lang translationKey={$string('common.sorter.sort_by')}/>
                </label>
                {/* html L5: <select class="form-select form-select--small" name="sort" id="sort"> */}
                <select className="form-select form-select--small" name="sort" id="sort">
                    {/* html L6: <option value="relevance" {{#if sort '==' 'relevance'}}selected{{/if}}>{{lang 'common.sorter.relevance'}}</option> */}
                    <option value="relevance" $$={$if(sort, '==', $string('relevance')).then(() => $$raw('selected'))}>
                        {/* html L6: {{lang 'common.sorter.relevance'}} */}
                        <$Lang translationKey={$string('common.sorter.relevance')}/>
                    </option>
                    {/* html L7: <option value="alphaasc" {{#if sort '==' 'alphaasc'}}selected{{/if}}>{{lang 'common.sorter.alpha_asc'}}</option> */}
                    <option value="alphaasc" $$={$if(sort, '==', $string('alphaasc')).then(() => $$raw('selected'))}>
                        {/* html L7: {{lang 'common.sorter.alpha_asc'}} */}
                        <$Lang translationKey={$string('common.sorter.alpha_asc')}/>
                    </option>
                    {/* html L8: <option value="alphadesc" {{#if sort '==' 'alphadesc'}}selected{{/if}}>{{lang 'common.sorter.alpha_desc'}}</option> */}
                    <option value="alphadesc" $$={$if(sort, '==', $string('alphadesc')).then(() => $$raw('selected'))}>
                        {/* html L8: {{lang 'common.sorter.alpha_desc'}} */}
                        <$Lang translationKey={$string('common.sorter.alpha_desc')}/>
                    </option>
                </select>
            </div>
        </fieldset>
    </form>
));
