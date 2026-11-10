/**
 * Source: templates/components/products/attributes.html (5 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductDetailHint} from '@/context-products';

export default $asPartial<{
    product: ProductDetailHint;
}>(({product}) => (
    /* html L1: {{#each product.attributes}} */
    <$Each
        list={product.attributes}
        $then={(attribute) => (
            <>
                {/* html L2: <dt class="productView-info-name">{{display_name}}:</dt> */}
                <dt className="productView-info-name">{/* html L2: {{display_name}} */}{attribute.display_name}:</dt>
                {/* html L3: <dd class="productView-info-value">{{value}}</dd> */}
                <dd className="productView-info-value">{/* html L3: {{value}} */}{attribute.value}</dd>
            </>
        )}
    />
));
