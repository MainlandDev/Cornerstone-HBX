/**
 * Source: templates/components/brand/show-more.html (4 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageBrand} from '@mainlanddev/bigcommerce-react/theme';

type Hint = ThemeContextHint<ThemePageBrand>;

export default $asPartial<{brand: Hint['brand']}>(({brand}) => (
    /* html L1: {{#if brand.facets}} */
    <$If query={[brand.facets]} $then={() => /* html L2: {{> components/faceted-search/show-more-facets brand}} */ <$Partial name="components/faceted-search/show-more-facets" context={brand}/>}/>
));
