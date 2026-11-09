import {$If, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageSearch} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $_Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$sanitize} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {SearchForms} from '@/context-misc';

type Hint = ThemeContextHint<ThemePageSearch>;

export default $asPartial<{forms: SearchForms; result_count: Hint['result_count']}>(({forms, result_count}) => (
    <h1 className="page-heading">
        <$If
            query={[forms.search.search_error]}
            $then={() => <$Lang translationKey={$string('search.errorMessage')}/>}
            $else={() => (
                <$_Lang
                    translationKey={$string('search.results.count')}
                    params={{count: result_count, search_query: $sanitize(forms.search.query)}}
                />
            )}
        />
    </h1>
));
