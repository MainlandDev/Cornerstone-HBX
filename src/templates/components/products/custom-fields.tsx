import {$Each, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductDetailHint} from '@/context-products';

export default $asPartial<{
    product: ProductDetailHint;
}>(({product}) => (
    <$Each
        list={product.custom_fields}
        $then={(field) => (
            <>
                <dt className="productView-info-name">{field.name}:</dt>
                <dd className="productView-info-value">{$unescaped(field.value)}</dd>
            </>
        )}
    />
));
