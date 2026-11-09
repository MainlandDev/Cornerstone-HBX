import {$string} from '@mainlanddev/bigcommerce-react';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import Carousel from '@/templates/components/products/carousel';
import type {CustomerHint, ProductCardHint, ProductPageHint, SettingsHint, ThemeSettingsHint} from '@/context-products';

export default $asPartial<{
    columns: HandlebarsInlineValueToken<number>;
    products: Array<ProductCardHint>;
    settings: SettingsHint;
    theme_settings: ThemeSettingsHint;
    customer: CustomerHint;
    page_type: ProductPageHint['page_type'];
}>(({columns, products, settings, theme_settings, customer, page_type}) => (
    <>
        <h2 className="page-heading">{$lang($string('products.new'))}</h2>
        <Carousel
            products={products}
            list={$string('New Products')}
            columns={columns}
            settings={settings}
            theme_settings={theme_settings}
            customer={customer}
            page_type={page_type}
        />
    </>
));
