import {$Each, $number} from '@mainlanddev/bigcommerce-react';
import {$add} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import ListItem from '@/templates/components/products/list-item';
import type {CustomerHint, ProductCardHint, ProductPageHint, SettingsHint, ThemeSettingsHint} from '@/context-products';

export default $asPartial<{
    products: Array<ProductCardHint>;
    settings: SettingsHint;
    show_compare: HandlebarsInlineValueToken<boolean>;
    theme_settings: ThemeSettingsHint;
    customer: CustomerHint;
    event: HandlebarsInlineValueToken<string>;
    page_type: ProductPageHint['page_type'];
}>(({products, settings, show_compare, theme_settings, customer, event, page_type}) => (
    <ul className="productList">
        <$Each
            list={products}
            $then={(item, loop) => (
                <li className="product">
                    <ListItem
                        id={item.id}
                        name={item.name}
                        url={item.url}
                        image={item.image}
                        brand={item.brand}
                        category={item.category}
                        price={item.price}
                        stock_level={item.stock_level}
                        rating={item.rating}
                        summary={item.summary}
                        show_cart_action={item.show_cart_action}
                        has_options={item.has_options}
                        pre_order={item.pre_order}
                        pre_order_add_to_cart_url={item.pre_order_add_to_cart_url}
                        add_to_cart_url={item.add_to_cart_url}
                        out_of_stock_message={item.out_of_stock_message}
                        hide_product_quick_view={item.hide_product_quick_view}
                        featured_promotions={item.featured_promotions}
                        show_compare={show_compare}
                        show_rating={settings.show_product_rating}
                        theme_settings={theme_settings}
                        customer={customer}
                        event={event}
                        settings={settings}
                        position={$add(loop['@index'], $number(1))}
                        page_type={page_type}
                    />
                </li>
            )}
        />
    </ul>
));
