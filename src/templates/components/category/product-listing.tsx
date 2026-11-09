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
        <$Inject keyName={$string('noCompareMessage')} value={$lang($string('compare.no_compare'))}/>

        <$If
            query={[category.products]}
            $then={() => (
                <>
                    <$Partial name="components/products/filter" hash={{sort: pagination.category.sort}}/>

                    <div data-list-name={`Category: ${category.name}`} role="region" aria-label={$lang($string('category.product_label'))}>
                        <$If
                            query={[theme_settings.product_list_display_mode, '===', $string('grid')]}
                            $then={() => (
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

                    <$Partial name="components/common/paginator" context={pagination.category}/>
                </>
            )}
            $else={() => (
                <$If
                    query={[category.search_error]}
                    $then={() => (
                        <p>
                            <$Lang translationKey={$string('search.errorMessage')}/>
                        </p>
                    )}
                    $else={() => (
                        <p data-no-products-notification="" role="alert" aria-live="assertive" tabIndex={-1}>
                            <$Lang translationKey={$string('categories.no_products')}/>
                        </p>
                    )}
                />
            )}
        />
    </>
));
