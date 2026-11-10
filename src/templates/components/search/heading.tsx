/**
 * Source: templates/components/search/heading.html (8 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageSearch} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $_Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$sanitize} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {SearchForms} from '@/context-misc';

type Hint = ThemeContextHint<ThemePageSearch>;

export default $asPartial<{forms: SearchForms; result_count: Hint['result_count']}>(({forms, result_count}) => (
    /* html L1: <h1 class="page-heading"> */
    <h1 className="page-heading">
        {/* html L2: {{#if forms.search.search_error}} */}
        <$If
            query={[forms.search.search_error]}
            $then={() => /* html L3: {{lang 'search.errorMessage' }} */ <$Lang translationKey={$string('search.errorMessage')}/>}
            $else={() => (
                /* html L4: {{else}}
                                      html L5: {{{lang 'search.results.count' count=result_count search_query=(sanitize forms.search.query) }}}
                */
                <$_Lang
                    translationKey={$string('search.results.count')}
                    params={{count: result_count, search_query: $sanitize(forms.search.query)}}
                />
            )}
        />
    </h1>
));
