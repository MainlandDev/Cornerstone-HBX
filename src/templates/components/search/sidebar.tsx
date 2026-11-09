import {$If, $Partial} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageSearch} from '@mainlanddev/bigcommerce-react/theme';

type Hint = ThemeContextHint<ThemePageSearch>;

export default $asPartial<{product_results: Hint['product_results']}>(({product_results}) => (
    <nav>
        <$If
            query={[product_results.faceted_search_enabled]}
            $then={() => <$Partial name="components/faceted-search/index" context={product_results}/>}
        />
    </nav>
));
