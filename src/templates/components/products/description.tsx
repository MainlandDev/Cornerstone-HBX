/**
 * Source: templates/components/products/description.html (14 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';

type Str = HandlebarsInlineValueToken<string>;

export default $asPartial<{
    product: {description: Str; warranty: Str};
}>(({product}) => (
    <>
        {/* html L1: {{#if product.description}} */}
        <$If
            query={[product.description]}
            $then={() => (
                <>
                    {/* html L2: <p class="productView-title">{{lang 'products.description'}}</p> */}
                    <p className="productView-title">{/* html L2: {{lang 'products.description'}} */}{$lang($string('products.description'))}</p>
                    {/* html L3: <div class="productView-description" data-event-type="product"> */}
                    <div className="productView-description" data-event-type="product">
                        {/* html L4: {{{product.description}}} */}
                        {$unescaped(product.description)}
                    </div>
                </>
            )}
        />

        {/* html L8: {{#if product.warranty}} */}
        <$If
            query={[product.warranty]}
            $then={() => (
                <>
                    {/* html L9: <p class="productView-title">{{lang 'products.warranty'}}</p> */}
                    <p className="productView-title">{/* html L9: {{lang 'products.warranty'}} */}{$lang($string('products.warranty'))}</p>
                    {/* html L10: <div class="productView-description"> */}
                    <div className="productView-description">
                        {/* html L11: {{{product.warranty}}} */}
                        {$unescaped(product.warranty)}
                    </div>
                </>
            )}
        />
    </>
));
