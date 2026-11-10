/**
 * Source: templates/components/category/show-more.html (4 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageCategory} from '@mainlanddev/bigcommerce-react/theme';

type Hint = ThemeContextHint<ThemePageCategory>;

export default $asPartial<{category: Hint['category']}>(({category}) => (
    /* html L1: {{#if category}} */
    <$If query={[category]} $then={() => /* html L2: {{> components/faceted-search/show-more-facets category}} */ <$Partial name="components/faceted-search/show-more-facets" context={category}/>}/>
));
