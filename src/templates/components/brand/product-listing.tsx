/**
 * Source: templates/components/brand/product-listing.html (14 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageBrand} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {BrandPagination} from '@/context-misc';

type Hint = ThemeContextHint<ThemePageBrand>;

export default $asPartial<{
    brand: Hint['brand'];
    pagination: BrandPagination;
    theme_settings: Hint['theme_settings'];
}>(({brand, pagination, theme_settings}) => (
    <>
        {/* html L1: {{inject 'noCompareMessage' (lang 'compare.no_compare')}} */}
        <$Inject keyName={$string('noCompareMessage')} value={$lang($string('compare.no_compare'))}/>

        {/* html L3: {{> components/products/filter sort=pagination.brand.sort}} */}
        <$Partial name="components/products/filter" hash={{sort: pagination.brand.sort}}/>

        {/* html L5: <div data-list-name="Brand: {{brand.name}}"> */}
        <div data-list-name={`Brand: ${brand.name}`}>
            {/* html L6: {{#if theme_settings.product_list_display_mode '===' 'grid'}} */}
            <$If
                query={[theme_settings.product_list_display_mode, '===', $string('grid')]}
                $then={() => (
                    /* html L7: {{> components/products/grid products=brand.products show_compare=brand.show_compare theme_settings=theme_settings event="list"}} */
                    <$Partial
                        name="components/products/grid"
                        hash={{
                            products: brand.products,
                            show_compare: brand.show_compare,
                            theme_settings: theme_settings,
                            event: $string('list'),
                        }}
                    />
                )}
                $else={() => (
                    /* html L8: {{else}}
                                              html L9: {{> components/products/list products=brand.products show_compare=brand.show_compare theme_settings=theme_settings event="list"}}
                    */
                    <$Partial
                        name="components/products/list"
                        hash={{
                            products: brand.products,
                            show_compare: brand.show_compare,
                            theme_settings: theme_settings,
                            event: $string('list'),
                        }}
                    />
                )}
            />
        </div>

        {/* html L13: {{> components/common/paginator pagination.brand}} */}
        <$Partial name="components/common/paginator" context={pagination.brand}/>
    </>
));
