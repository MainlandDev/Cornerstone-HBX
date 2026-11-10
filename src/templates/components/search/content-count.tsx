/**
 * Source: templates/components/search/content-count.html (4 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {SearchForms, SearchPagination} from '@/context-misc';

export default $asPartial<{forms: SearchForms; pagination: SearchPagination}>(({forms, pagination}) => (
    /* html L1: <span data-url="{{forms.search.content_url}}" data-count="{{pagination.content_results.total}}"> */
    <span data-url={forms.search.content_url} data-count={pagination.content_results.total}>
        {/* html L2: {{lang 'search.results.content_count' count=pagination.content_results.total}} */}
        <$Lang translationKey={$string('search.results.content_count')} params={{count: pagination.content_results.total}}/>
    </span>
));
