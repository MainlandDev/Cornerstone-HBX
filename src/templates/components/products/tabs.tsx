/**
 * Source: templates/components/products/tabs.html (27 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $if, $number, $string, $unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import Carousel from '@/templates/components/products/carousel';
import type {CustomerHint, ProductCardHint, ProductPageHint, SettingsHint, ThemeSettingsHint} from '@/context-products';

export default $asPartial<{
    product: {
        related_products?: Array<ProductCardHint>;
        similar_by_views?: Array<ProductCardHint>;
    };
    settings: SettingsHint;
    theme_settings: ThemeSettingsHint;
    customer: CustomerHint;
    page_type: ProductPageHint['page_type'];
}>(({product, settings, theme_settings, customer, page_type}) => {
    // `aria-*` values are strings in the markup; typed as Record so the typed JSX props are not checked against Booleanish.
    const ariaSelected: Record<string, string> = {'aria-selected': `${$if(product.related_products).then(() => $$raw('false')).else(() => $$raw('true'))}`};
    const ariaHidden: Record<string, string> = {'aria-hidden': `${$if(product.related_products).then(() => $$raw('true')).else(() => $$raw('false'))}`};
    return (
    <>
        {/* html L1: <ul class="tabs" data-tab role="tablist"> */}
        <ul className="tabs" data-tab="" role="tablist">
            {/* html L2: {{#if product.related_products}} */}
            <$If
                query={[product.related_products]}
                $then={() => (
                    /* html L3: <li class="tab is-active" role="presentation"> */
                    <li className="tab is-active" role="presentation">
                        {/* html L4: <a class="tab-title" href="#tab-related" role="tab" tabindex="0" aria-selected="true" controls="tab-related">{{lang 'products.related_products'}}</a> */}
                        <a className="tab-title" href="#tab-related" role="tab" tabIndex={0} aria-selected="true" $$={$$raw('controls="tab-related"')}>
                            {/* html L4: {{lang 'products.related_products'}} */}
                            {$lang($string('products.related_products'))}
                        </a>
                    </li>
                )}
            />
            {/* html L7: {{#if product.similar_by_views}} */}
            <$If
                query={[product.similar_by_views]}
                $then={() => (
                    /* html L8: <li class="tab{{#unless product.related_products}} is-active{{/unless}}" role="presentation"> */
                    <li className={`tab${$unless(product.related_products).then(() => $$raw(' is-active'))}`} role="presentation">
                        {/* html L9: <a class="tab-title" href="#tab-similar" role="tab" tabindex="0" aria-selected="{{#if product.related_products}}false{{else}}true{{/if}}" controls="tab-similar">{{lang 'products.similar_by_views'}}</a> */}
                        <a
                            className="tab-title"
                            href="#tab-similar"
                            role="tab"
                            tabIndex={0}
                            {...ariaSelected}
                            $$={$$raw('controls="tab-similar"')}
                        >
                            {/* html L9: {{lang 'products.similar_by_views'}} */}
                            {$lang($string('products.similar_by_views'))}
                        </a>
                    </li>
                )}
            />
        </ul>

        {/* html L14: <div class="tabs-contents"> */}
        <div className="tabs-contents">
            {/* html L15: {{#if product.related_products}} */}
            <$If
                query={[product.related_products]}
                $then={() => (
                    /* html L16: <div role="tabpanel" aria-hidden="false" class="tab-content has-jsContent is-active" id="tab-related"> */
                    <div role="tabpanel" aria-hidden="false" className="tab-content has-jsContent is-active" id="tab-related">
                        {/* html L17: {{> components/products/carousel products=product.related_products columns=6 list="Related Products"}} */}
                        <Carousel
                            products={product.related_products}
                            columns={$number(6)}
                            list={$string('Related Products')}
                            settings={settings}
                            theme_settings={theme_settings}
                            customer={customer}
                            page_type={page_type}
                        />
                    </div>
                )}
            />

            {/* html L21: {{#if product.similar_by_views}} */}
            <$If
                query={[product.similar_by_views]}
                $then={() => (
                    /* html L22: <div role="tabpanel" aria-hidden="{{#if product.related_products}}true{{else}}false{{/if}}" class="tab-content has-jsContent{{#unless product.related_products}} is-active{{/unless}}" id="tab-similar"> */
                    <div
                        role="tabpanel"
                        {...ariaHidden}
                        className={`tab-content has-jsContent${$unless(product.related_products).then(() => $$raw(' is-active'))}`}
                        id="tab-similar"
                    >
                        {/* html L23: {{> components/products/carousel products=product.similar_by_views columns=6 list="Customers Also Viewed"}} */}
                        <Carousel
                            products={product.similar_by_views}
                            columns={$number(6)}
                            list={$string('Customers Also Viewed')}
                            settings={settings}
                            theme_settings={theme_settings}
                            customer={customer}
                            page_type={page_type}
                        />
                    </div>
                )}
            />
        </div>
    </>
    );
});
