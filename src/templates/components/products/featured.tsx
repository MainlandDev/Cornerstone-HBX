/**
 * Source: templates/components/products/featured.html (10 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $number, $string} from '@mainlanddev/bigcommerce-react';
import {$add, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import Card from '@/templates/components/products/card';
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
        {/* html L1: <h2 class="page-heading">{{lang 'products.featured' }}</h2> */}
        <h2 className="page-heading">{/* html L1: {{lang 'products.featured' }} */}{$lang($string('products.featured'))}</h2>

        {/* html L3: <ul class="productGrid productGrid--maxCol{{ columns }}" data-product-type="featured" data-list-name="Featured Products"> */}
        <ul className={`productGrid productGrid--maxCol${columns}`} data-product-type="featured" data-list-name="Featured Products">
            {/* html L4: {{#each products}} */}
            <$Each
                list={products}
                $then={(item, loop) => (
                    /* html L5: <li class="product"> */
                    <li className="product">
                        {/* html L6: {{>components/products/card settings=../settings theme_settings=../theme_settings customer=../customer event="list" position=(add @index 1)}} */}
                        <Card
                            id={item.id}
                            name={item.name}
                            url={item.url}
                            image={item.image}
                            brand={item.brand}
                            category={item.category}
                            price={item.price}
                            stock_level={item.stock_level}
                            rating={item.rating}
                            show_cart_action={item.show_cart_action}
                            has_options={item.has_options}
                            pre_order={item.pre_order}
                            pre_order_add_to_cart_url={item.pre_order_add_to_cart_url}
                            add_to_cart_url={item.add_to_cart_url}
                            out_of_stock_message={item.out_of_stock_message}
                            hide_product_quick_view={item.hide_product_quick_view}
                            featured_promotions={item.featured_promotions}
                            settings={settings}
                            theme_settings={theme_settings}
                            customer={customer}
                            event={$string('list')}
                            position={$add(loop['@index'], $number(1))}
                            page_type={page_type}
                        />
                    </li>
                )}
            />
        </ul>
    </>
));
