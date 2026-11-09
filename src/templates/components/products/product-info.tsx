import {$unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Or} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

import ProductAriaLabel from '@/templates/components/products/product-aria-label';
import type {CustomerHint, ProductCardHint, ProductPriceHint, SettingsHint, ThemeSettingsHint} from '@/context-products';

export default $asPartial<{
    name: ProductCardHint['name'];
    customer: CustomerHint;
    settings: SettingsHint;
    price: ProductPriceHint;
    theme_settings: ThemeSettingsHint;
}>(({name, customer, settings, price, theme_settings}) => (
    <$Or
        values={[customer, $unless(settings.hide_price_from_guests)]}
        $then={() => (
            <>
                {name}, <ProductAriaLabel price={price} theme_settings={theme_settings}/>
            </>
        )}
        $else={() => <>{name}</>}
    />
));
