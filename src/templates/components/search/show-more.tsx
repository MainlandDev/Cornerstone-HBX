/**
 * Source: templates/components/search/show-more.html (4 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageSearch} from '@mainlanddev/bigcommerce-react/theme';

type Hint = ThemeContextHint<ThemePageSearch>;

export default $asPartial<{product_results: Hint['product_results']}>(({product_results}) => (
    /* html L1: {{#if product_results}} */
    <$If
        query={[product_results]}
        $then={() => /* html L2: {{> components/faceted-search/show-more-facets product_results}} */ <$Partial name="components/faceted-search/show-more-facets" context={product_results}/>}
    />
));
