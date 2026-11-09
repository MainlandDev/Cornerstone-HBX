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
        <$Inject keyName={$string('noCompareMessage')} value={$lang($string('compare.no_compare'))}/>

        <$If
            query={[product_results.products.length]}
            $then={() => <$Partial name="components/products/filter" hash={{sort: pagination.product_results.sort}}/>}
        />
        <div data-list-name="Search Results">
            <$If
                query={[theme_settings.product_list_display_mode, '===', $string('grid')]}
                $then={() => (
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

        <$Partial name="components/common/paginator" context={pagination.product_results}/>
    </>
));
