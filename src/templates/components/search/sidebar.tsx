/**
 * Source: templates/components/search/sidebar.html (6 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageSearch} from '@mainlanddev/bigcommerce-react/theme';

type Hint = ThemeContextHint<ThemePageSearch>;

export default $asPartial<{product_results: Hint['product_results']}>(({product_results}) => (
    /* html L1: <nav> */
    <nav>
        {/* html L2: {{#if product_results.faceted_search_enabled}} */}
        <$If
            query={[product_results.faceted_search_enabled]}
            $then={() => /* html L3: {{> components/faceted-search/index product_results}} */ <$Partial name="components/faceted-search/index" context={product_results}/>}
        />
    </nav>
));
