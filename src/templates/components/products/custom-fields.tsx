/**
 * Source: templates/components/products/custom-fields.html (5 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductDetailHint} from '@/context-products';

export default $asPartial<{
    product: ProductDetailHint;
}>(({product}) => (
    /* html L1: {{#each product.custom_fields}} */
    <$Each
        list={product.custom_fields}
        $then={(field) => (
            <>
                {/* html L2: <dt class="productView-info-name">{{name}}:</dt> */}
                <dt className="productView-info-name">{/* html L2: {{name}} */}{field.name}:</dt>
                {/* html L3: <dd class="productView-info-value">{{{value}}}</dd> */}
                <dd className="productView-info-value">{/* html L3: {{{value}}} */}{$unescaped(field.value)}</dd>
            </>
        )}
    />
));
