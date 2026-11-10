/**
 * Source: templates/components/search/product-count.html (4 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {SearchForms, SearchPagination} from '@/context-misc';

export default $asPartial<{forms: SearchForms; pagination: SearchPagination}>(({forms, pagination}) => (
    /* html L1: <span data-url="{{forms.search.product_url}}" data-count="{{pagination.product_results.total}}"> */
    <span data-url={forms.search.product_url} data-count={pagination.product_results.total}>
        {/* html L2: {{lang 'search.results.product_count' count=pagination.product_results.total}} */}
        <$Lang translationKey={$string('search.results.product_count')} params={{count: pagination.product_results.total}}/>
    </span>
));
