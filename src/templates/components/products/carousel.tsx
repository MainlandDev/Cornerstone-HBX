/**
 * Source: templates/components/products/carousel.html (36 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $number, $string} from '@mainlanddev/bigcommerce-react';
import {$add} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import Card from '@/templates/components/products/card';
import type {CustomerHint, ProductCardHint, ProductPageHint, SettingsHint, ThemeSettingsHint} from '@/context-products';

export default $asPartial<{
    products: Array<ProductCardHint>;
    list: HandlebarsInlineValueToken<string>;
    columns: HandlebarsInlineValueToken<number>;
    settings: SettingsHint;
    theme_settings: ThemeSettingsHint;
    customer: CustomerHint;
    page_type: ProductPageHint['page_type'];
}>(({products, list, columns, settings, theme_settings, customer, page_type}) => (
    /* html L1-26:
       <section class="productCarousel"
           data-list-name="{{list}}"
           data-slick='{
               "infinite": false,
               "mobileFirst": true,
               "slidesToShow": 2,
               "slidesToScroll": 2,
               "slide": "[data-product-slide]",
               "responsive": [
                   {
                       "breakpoint": 800,
                       "settings": {
                           "slidesToShow": {{ columns }},
                           "slidesToScroll": {{ columns }}
                       }
                   },
                   {
                       "breakpoint": 550,
                       "settings": {
                           "slidesToShow": 3,
                           "slidesToScroll": 3
                       }
                   }
               ]
           }'
       >
    */
    <section
        className="productCarousel"
        data-list-name={list}
        data-slick={`{
        "infinite": false,
        "mobileFirst": true,
        "slidesToShow": 2,
        "slidesToScroll": 2,
        "slide": "[data-product-slide]",
        "responsive": [
            {
                "breakpoint": 800,
                "settings": {
                    "slidesToShow": ${columns},
                    "slidesToScroll": ${columns}
                }
            },
            {
                "breakpoint": 550,
                "settings": {
                    "slidesToShow": 3,
                    "slidesToScroll": 3
                }
            }
        ]
    }`}
    >
        {/* html L27: {{#each products}} */}
        <$Each
            list={products}
            $then={(item, loop) => (
                /* html L28: <div data-product-slide class="productCarousel-slide"> */
                <div data-product-slide="" className="productCarousel-slide">
                    {/* html L29: {{> components/products/card settings=../settings theme_settings=../theme_settings customer=../customer event="list" position=(add @index 1)}} */}
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
                </div>
            )}
        />
        {/* html L32: {{#if products.length '>' 1}} */}
        <$If
            query={[products.length, '>', $number(1)]}
            $then={() => /* html L33: {{> components/carousel-content-announcement}} */ <$Partial name="components/carousel-content-announcement"/>}
        />
    </section>
));
