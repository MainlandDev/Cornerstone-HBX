/**
 * Source: templates/components/products/product-info.html (6 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
    /* html L1: {{#or customer (unless settings.hide_price_from_guests)}} */
    <$Or
        values={[customer, $unless(settings.hide_price_from_guests)]}
        $then={() => (
            <>
                {/* html L2: {{name}}, {{> components/products/product-aria-label}} */}
                {name}, {/* html L2: {{> components/products/product-aria-label}} */}<ProductAriaLabel price={price} theme_settings={theme_settings}/>
            </>
        )}
        $else={() => <>{/* html L3: {{else}}
                                                    html L4: {{name}}
                       */}{name}</>}
    />
));
