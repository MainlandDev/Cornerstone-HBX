import {$If, $Partial} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageSearch} from '@mainlanddev/bigcommerce-react/theme';

type Hint = ThemeContextHint<ThemePageSearch>;

export default $asPartial<{product_results: Hint['product_results']}>(({product_results}) => (
    <$If
        query={[product_results]}
        $then={() => <$Partial name="components/faceted-search/show-more-facets" context={product_results}/>}
    />
));
