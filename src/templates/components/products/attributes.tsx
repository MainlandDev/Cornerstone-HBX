import {$Each} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductDetailHint} from '@/context-products';

export default $asPartial<{
    product: ProductDetailHint;
}>(({product}) => (
    <$Each
        list={product.attributes}
        $then={(attribute) => (
            <>
                <dt className="productView-info-name">{attribute.display_name}:</dt>
                <dd className="productView-info-value">{attribute.value}</dd>
            </>
        )}
    />
));
