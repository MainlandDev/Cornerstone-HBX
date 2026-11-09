import {$if, $string, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $asPartial<{sort: HandlebarsInlineValueToken<string>}>(({sort}) => (
    <form className="actionBar" method="get" data-sort-by="content">
        <fieldset className="form-fieldset actionBar-section">
            <div className="form-field">
                <label className="form-label" htmlFor="sort">
                    <$Lang translationKey={$string('common.sorter.sort_by')}/>
                </label>
                <select className="form-select form-select--small" name="sort" id="sort">
                    <option value="relevance" $$={$if(sort, '==', $string('relevance')).then(() => $$raw('selected'))}>
                        <$Lang translationKey={$string('common.sorter.relevance')}/>
                    </option>
                    <option value="alphaasc" $$={$if(sort, '==', $string('alphaasc')).then(() => $$raw('selected'))}>
                        <$Lang translationKey={$string('common.sorter.alpha_asc')}/>
                    </option>
                    <option value="alphadesc" $$={$if(sort, '==', $string('alphadesc')).then(() => $$raw('selected'))}>
                        <$Lang translationKey={$string('common.sorter.alpha_desc')}/>
                    </option>
                </select>
            </div>
        </fieldset>
    </form>
));
