import {$Partial} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';

export default $asPartial<{
    sort: HandlebarsInlineValueToken<string>;
}>(({sort}) => (
    <form className="actionBar" method="get" data-sort-by="product">
        <$Partial name="components/category/sort-box" hash={{sort: sort}}/>
    </form>
));
