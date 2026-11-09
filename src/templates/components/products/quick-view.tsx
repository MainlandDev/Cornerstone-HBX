import {$Partial, $boolean, $if} from '@mainlanddev/bigcommerce-react';
import {$All} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import Reviews from '@/templates/components/products/reviews';
import type {CustomerHint, ProductDetailHint, ProductPageHint, SettingsHint, ThemeSettingsHint} from '@/context-products';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';

/**
 * Requested at runtime by JS (quick view). `product-view` is not ported yet, so it is included by name with the context it reads.
 */
export default $asPartial<{
    product: ProductDetailHint;
    settings: SettingsHint;
    theme_settings: ThemeSettingsHint;
    customer: CustomerHint;
    urls: ProductPageHint['urls'];
    pagination: Extract<ProductPageHint['pagination'], {reviews?: unknown}>;
    is_ajax: HandlebarsInlineValueToken<boolean>;
    backorder_messages: ProductPageHint['backorder_messages'];
    page_type: ProductPageHint['page_type'];
}>(({product, settings, theme_settings, customer, urls, pagination, is_ajax, backorder_messages, page_type}) => (
    <div className="modal-body quickView">
        <$Partial
            name="components/products/product-view"
            hash={{product, settings, theme_settings, customer, urls, pagination, is_ajax, backorder_messages, page_type}}
        />

        <$All
            values={[settings.show_product_reviews, theme_settings.show_product_reviews, $if(theme_settings.show_product_details_tabs, '!==', $boolean(true))]}
            $then={() => <Reviews reviews={product.reviews} product={product} urls={urls} theme_settings={theme_settings} pagination={pagination}/>}
        />
    </div>
));
