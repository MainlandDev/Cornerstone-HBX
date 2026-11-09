import {$string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {SearchForms, SearchPagination} from '@/context-misc';

export default $asPartial<{forms: SearchForms; pagination: SearchPagination}>(({forms, pagination}) => (
    <span data-url={forms.search.product_url} data-count={pagination.product_results.total}>
        <$Lang translationKey={$string('search.results.product_count')} params={{count: pagination.product_results.total}}/>
    </span>
));
