import {$If, $if, $string, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $asPartial<{
    sort: HandlebarsInlineValueToken<string>;
    result_count: HandlebarsInlineValueToken<number>;
}>(({sort, result_count}) => (
    <fieldset className="form-fieldset actionBar-section">
        <div className="form-field">
            <label className="form-label" htmlFor="sort">
                <$Lang translationKey={$string('common.sorter.sort_by')}/>
            </label>
            <select className="form-select form-select--small " name="sort" id="sort" role="listbox">
                <option value="featured" $$={$if(sort, '==', $string('featured')).then(() => $$raw('selected'))}>
                    <$Lang translationKey={$string('common.sorter.featured')}/>
                </option>
                <option value="newest" $$={$if(sort, '==', $string('newest')).then(() => $$raw('selected'))}>
                    <$Lang translationKey={$string('common.sorter.newest')}/>
                </option>
                <option value="bestselling" $$={$if(sort, '==', $string('bestselling')).then(() => $$raw('selected'))}>
                    <$Lang translationKey={$string('common.sorter.top_sellers')}/>
                </option>
                <option value="alphaasc" $$={$if(sort, '==', $string('alphaasc')).then(() => $$raw('selected'))}>
                    <$Lang translationKey={$string('common.sorter.alpha_asc')}/>
                </option>
                <option value="alphadesc" $$={$if(sort, '==', $string('alphadesc')).then(() => $$raw('selected'))}>
                    <$Lang translationKey={$string('common.sorter.alpha_desc')}/>
                </option>
                <option value="avgcustomerreview" $$={$if(sort, '==', $string('avgcustomerreview')).then(() => $$raw('selected'))}>
                    <$Lang translationKey={$string('common.sorter.reviews')}/>
                </option>
                <option value="priceasc" $$={$if(sort, '==', $string('priceasc')).then(() => $$raw('selected'))}>
                    <$Lang translationKey={$string('common.sorter.price_asc')}/>
                </option>
                <option value="pricedesc" $$={$if(sort, '==', $string('pricedesc')).then(() => $$raw('selected'))}>
                    <$Lang translationKey={$string('common.sorter.price_desc')}/>
                </option>
                <$If
                    query={[result_count]}
                    $then={() => (
                        <option value="relevance" $$={$if(sort, '==', $string('relevance')).then(() => $$raw('selected'))}>
                            <$Lang translationKey={$string('common.sorter.relevance')}/>
                        </option>
                    )}
                />
            </select>
        </div>
    </fieldset>
));
