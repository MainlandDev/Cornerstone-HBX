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
        <ul className="tabs" data-tab="" role="tablist">
            <$If
                query={[product.related_products]}
                $then={() => (
                    <li className="tab is-active" role="presentation">
                        <a className="tab-title" href="#tab-related" role="tab" tabIndex={0} aria-selected="true" $$={$$raw('controls="tab-related"')}>
                            {$lang($string('products.related_products'))}
                        </a>
                    </li>
                )}
            />
            <$If
                query={[product.similar_by_views]}
                $then={() => (
                    <li className={`tab${$unless(product.related_products).then(() => $$raw(' is-active'))}`} role="presentation">
                        <a
                            className="tab-title"
                            href="#tab-similar"
                            role="tab"
                            tabIndex={0}
                            {...ariaSelected}
                            $$={$$raw('controls="tab-similar"')}
                        >
                            {$lang($string('products.similar_by_views'))}
                        </a>
                    </li>
                )}
            />
        </ul>

        <div className="tabs-contents">
            <$If
                query={[product.related_products]}
                $then={() => (
                    <div role="tabpanel" aria-hidden="false" className="tab-content has-jsContent is-active" id="tab-related">
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

            <$If
                query={[product.similar_by_views]}
                $then={() => (
                    <div
                        role="tabpanel"
                        {...ariaHidden}
                        className={`tab-content has-jsContent${$unless(product.related_products).then(() => $$raw(' is-active'))}`}
                        id="tab-similar"
                    >
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
