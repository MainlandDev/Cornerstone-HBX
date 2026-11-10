/**
 * Source: templates/components/search/product-listing.html (15 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageSearch} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {SearchPagination} from '@/context-misc';

type Hint = ThemeContextHint<ThemePageSearch>;

export default $asPartial<{
    product_results: Hint['product_results'];
    pagination: SearchPagination;
    theme_settings: Hint['theme_settings'];
}>(({product_results, pagination, theme_settings}) => (
    <>
        {/* html L1: {{inject 'noCompareMessage' (lang 'compare.no_compare')}} */}
        <$Inject keyName={$string('noCompareMessage')} value={$lang($string('compare.no_compare'))}/>

        {/* html L3: {{#if product_results.products.length}} */}
        <$If
            query={[product_results.products.length]}
            $then={() => /* html L4: {{> components/products/filter sort=pagination.product_results.sort}} */ <$Partial name="components/products/filter" hash={{sort: pagination.product_results.sort}}/>}
        />
        {/* html L6: <div data-list-name="Search Results"> */}
        <div data-list-name="Search Results">
            {/* html L7: {{#if theme_settings.product_list_display_mode '===' 'grid'}} */}
            <$If
                query={[theme_settings.product_list_display_mode, '===', $string('grid')]}
                $then={() => (
                    /* html L8: {{> components/products/grid products=product_results.products show_compare=product_results.show_compare event="list" theme_settings=theme_settings}} */
                    <$Partial
                        name="components/products/grid"
                        hash={{
                            products: product_results.products,
                            show_compare: product_results.show_compare,
                            event: $string('list'),
                            theme_settings: theme_settings,
                        }}
                    />
                )}
                $else={() => (
                    /* html L9: {{else}}
                                              html L10: {{> components/products/list products=product_results.products show_compare=product_results.show_compare event="list" theme_settings=theme_settings}}
                    */
                    <$Partial
                        name="components/products/list"
                        hash={{
                            products: product_results.products,
                            show_compare: product_results.show_compare,
                            event: $string('list'),
                            theme_settings: theme_settings,
                        }}
                    />
                )}
            />
        </div>

        {/* html L14: {{> components/common/paginator pagination.product_results}} */}
        <$Partial name="components/common/paginator" context={pagination.product_results}/>
    </>
));
