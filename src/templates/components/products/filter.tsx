/**
 * Source: templates/components/products/filter.html (4 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Partial} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';

export default $asPartial<{
    sort: HandlebarsInlineValueToken<string>;
}>(({sort}) => (
    /* html L1: <form class="actionBar" method="get" data-sort-by="product"> */
    <form className="actionBar" method="get" data-sort-by="product">
        {/* html L2: {{> components/category/sort-box sort=sort}} */}
        <$Partial name="components/category/sort-box" hash={{sort: sort}}/>
    </form>
));
