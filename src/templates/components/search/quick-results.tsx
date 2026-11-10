/**
 * Source: templates/components/search/quick-results.html (23 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$boolean, $Each, $If, $Partial, $number, $string, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageSearch} from '@mainlanddev/bigcommerce-react/theme';
import {$_Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$add, $sanitize} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {SearchForms, SearchPagination} from '@/context-misc';

type Hint = ThemeContextHint<ThemePageSearch>;

export default $asPartial<{
    product_results: Hint['product_results'];
    pagination: SearchPagination;
    forms: SearchForms;
    settings: Hint['settings'];
    show_compare: HandlebarsInlineValueToken<number>;
    theme_settings: Hint['theme_settings'];
    customer: Hint['customer'];
}>(({product_results, pagination, forms, settings, show_compare, theme_settings, customer}) => (
    /* html L1: {{#if product_results.products}} */
    <$If
        query={[product_results.products]}
        $then={() => (
            <>
                {/* html L2: {{> components/common/modal/modal-close-btn additional_attr='data-drop-down-close'}} */}
                <$Partial name="components/common/modal/modal-close-btn" hash={{additional_attr: $string('data-drop-down-close')}}/>
                {/* html L3: <ul class="productGrid" data-list-name="Quick Search Results"> */}
                <ul className="productGrid" data-list-name="Quick Search Results">
                    {/* html L4: {{#each product_results.products}} */}
                    <$Each
                        list={product_results.products}
                        $then={(_product, loop) => (
                            /* html L5: <li class="product"> */
                            <li className="product">
                                {/* html L6-14:
                                   {{> components/products/card
                                           settings=../settings
                                           alternate=true
                                           show_compare=../show_compare
                                           theme_settings=../theme_settings
                                           customer=../customer
                                           event="list"
                                           position=(add @index 1)
                                   }}
                                */}
                                <$Partial
                                    name="components/products/card"
                                    hash={{
                                        settings: settings,
                                        alternate: $boolean(true),
                                        show_compare: show_compare,
                                        theme_settings: theme_settings,
                                        customer: customer,
                                        event: $string('list'),
                                        position: $add(loop['@index'], $number(1)),
                                    }}
                                />
                            </li>
                        )}
                    />
                </ul>
            </>
        )}
        $else={() => (
            /* html L18: {{else}}
                              html L19: <p class="quickSearchMessage">
            */
            <p className="quickSearchMessage">
                {/* html L20: {{{lang 'search.results.quick_count' count=pagination.product_results.total search_query=(sanitize forms.search.query) }}} */}
                <$_Lang
                    translationKey={$string('search.results.quick_count')}
                    params={{count: pagination.product_results.total, search_query: $sanitize(forms.search.query)}}
                />
            </p>
        )}
    />
));
