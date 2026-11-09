import {$If, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';

type Str = HandlebarsInlineValueToken<string>;

export default $asPartial<{
    product: {description: Str; warranty: Str};
}>(({product}) => (
    <>
        <$If
            query={[product.description]}
            $then={() => (
                <>
                    <p className="productView-title">{$lang($string('products.description'))}</p>
                    <div className="productView-description" data-event-type="product">
                        {$unescaped(product.description)}
                    </div>
                </>
            )}
        />

        <$If
            query={[product.warranty]}
            $then={() => (
                <>
                    <p className="productView-title">{$lang($string('products.warranty'))}</p>
                    <div className="productView-description">
                        {$unescaped(product.warranty)}
                    </div>
                </>
            )}
        />
    </>
));
