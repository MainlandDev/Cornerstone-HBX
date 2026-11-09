import {$Each, $number, $string} from '@mainlanddev/bigcommerce-react';
import {$add, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import Card from '@/templates/components/products/card';
import type {CustomerHint, ProductCardHint, ProductPageHint, SettingsHint, ThemeSettingsHint} from '@/context-products';

/**
 * The original iterates its own context (`{{#each this}}`, the related-products array). A named prop cannot be the root of the
 * context, so the array is passed as `products` (deviation, see DEVIATIONS.md).
 */
export default $asPartial<{
    products: Array<ProductCardHint>;
    settings: SettingsHint;
    theme_settings: ThemeSettingsHint;
    customer: CustomerHint;
    page_type: ProductPageHint['page_type'];
}>(({products, settings, theme_settings, customer, page_type}) => (
    <>
        <h4>{$lang($string('products.related_products'))}</h4>
        <ul className="product-list" data-list-name="Related Products">
            <$Each
                list={products}
                $then={(item, loop) => (
                    <li className="product-card">
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
