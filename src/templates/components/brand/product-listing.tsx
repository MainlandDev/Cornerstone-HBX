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
        <$Inject keyName={$string('noCompareMessage')} value={$lang($string('compare.no_compare'))}/>

        <$Partial name="components/products/filter" hash={{sort: pagination.brand.sort}}/>

        <div data-list-name={`Brand: ${brand.name}`}>
            <$If
                query={[theme_settings.product_list_display_mode, '===', $string('grid')]}
                $then={() => (
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

        <$Partial name="components/common/paginator" context={pagination.brand}/>
    </>
));
