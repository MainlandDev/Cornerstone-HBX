import {$string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {SearchForms, SearchPagination} from '@/context-misc';

export default $asPartial<{forms: SearchForms; pagination: SearchPagination}>(({forms, pagination}) => (
    <span data-url={forms.search.content_url} data-count={pagination.content_results.total}>
        <$Lang translationKey={$string('search.results.content_count')} params={{count: pagination.content_results.total}}/>
    </span>
));
