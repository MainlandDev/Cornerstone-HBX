/**
 * Source: templates/components/category/product-listing.html (28 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageCategory} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';

type Hint = ThemeContextHint<ThemePageCategory>;

export default $asPartial<{
    category: Hint['category'];
    pagination: Hint['pagination'];
    theme_settings: Hint['theme_settings'];
}>(({category, pagination, theme_settings}) => (
    <>
        {/* html L1: {{inject 'noCompareMessage' (lang 'compare.no_compare')}} */}
        <$Inject keyName={$string('noCompareMessage')} value={$lang($string('compare.no_compare'))}/>

        {/* html L3: {{#if category.products}} */}
        <$If
            query={[category.products]}
            $then={() => (
                <>
                    {/* html L4: {{> components/products/filter sort=pagination.category.sort}} */}
                    <$Partial name="components/products/filter" hash={{sort: pagination.category.sort}}/>

                    {/* html L6: <div data-list-name="Category: {{category.name}}" role="region" aria-label="{{lang 'category.product_label'}}"> */}
                    <div data-list-name={`Category: ${category.name}`} role="region" aria-label={$lang($string('category.product_label'))}>
                        {/* html L7: {{#if theme_settings.product_list_display_mode '===' 'grid'}} */}
                        <$If
                            query={[theme_settings.product_list_display_mode, '===', $string('grid')]}
                            $then={() => (
                                /* html L8: {{> components/products/grid products=category.products show_compare=category.show_compare theme_settings=theme_settings event="list" }} */
                                <$Partial
                                    name="components/products/grid"
                                    hash={{
                                        products: category.products,
                                        show_compare: category.show_compare,
                                        theme_settings: theme_settings,
                                        event: $string('list'),
                                    }}
                                />
                            )}
                            $else={() => (
                                /* html L9: {{else}}
                                                                      html L10: {{> components/products/list products=category.products show_compare=category.show_compare theme_settings=theme_settings event="list" }}
                                */
                                <$Partial
                                    name="components/products/list"
                                    hash={{
                                        products: category.products,
                                        show_compare: category.show_compare,
                                        theme_settings: theme_settings,
                                        event: $string('list'),
                                    }}
                                />
                            )}
                        />
                    </div>

                    {/* html L14: {{> components/common/paginator pagination.category}} */}
                    <$Partial name="components/common/paginator" context={pagination.category}/>
                </>
            )}
            $else={() => (
                /* html L15: {{else}}
                                      html L16: {{#if category.search_error}}
                */
                <$If
                    query={[category.search_error]}
                    $then={() => (
                        /* html L17: <p>{{lang 'search.errorMessage'}}</p> */
                        <p>
                            {/* html L17: {{lang 'search.errorMessage'}} */}
                            <$Lang translationKey={$string('search.errorMessage')}/>
                        </p>
                    )}
                    $else={() => (
                        /* html L18: {{else}}
                                                      html L19-23:
                           <p data-no-products-notification
                              role="alert"
                              aria-live="assertive"
                              tabindex="-1"
                           >
                        */
                        <p data-no-products-notification="" role="alert" aria-live="assertive" tabIndex={-1}>
                            {/* html L24: {{lang 'categories.no_products'}} */}
                            <$Lang translationKey={$string('categories.no_products')}/>
                        </p>
                    )}
                />
            )}
        />
    </>
));
