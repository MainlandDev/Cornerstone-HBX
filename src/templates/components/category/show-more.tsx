import {$If, $Partial} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageCategory} from '@mainlanddev/bigcommerce-react/theme';

type Hint = ThemeContextHint<ThemePageCategory>;

export default $asPartial<{category: Hint['category']}>(({category}) => (
    <$If query={[category]} $then={() => <$Partial name="components/faceted-search/show-more-facets" context={category}/>}/>
));
