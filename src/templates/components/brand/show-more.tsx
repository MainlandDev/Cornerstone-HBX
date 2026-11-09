import {$If, $Partial} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageBrand} from '@mainlanddev/bigcommerce-react/theme';

type Hint = ThemeContextHint<ThemePageBrand>;

export default $asPartial<{brand: Hint['brand']}>(({brand}) => (
    <$If query={[brand.facets]} $then={() => <$Partial name="components/faceted-search/show-more-facets" context={brand}/>}/>
));
