import {$If, $Partial, $Unless, $if, $parseHandlebarsDangerously, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Inject, $Lang, $StencilPartial, $_Region, $_Stylesheet} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang, $sanitize} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {ExtendedThemePageSearch} from '@/context-hard';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ExtendedThemePageSearch>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* Escape hatch: the original front-matter key is top-level `product_results`; AnyFrontMatter only knows it nested under `search`. */}
            {$parseHandlebarsDangerously(
                '---\nproduct_results:\n    limit: {{theme_settings.searchpage_products_per_page}}\n---\n',
            )}
            <$Inject keyName={$string('categoryTree')} value={ctx.forms.search.category_options}/>
            <$Inject keyName={$string('searchProductsPerPage')} value={ctx.theme_settings.searchpage_products_per_page}/>
            <$Inject
                keyName={$string('searchResultsCount')}
                value={$lang($string('search.results.count'), {count: ctx.result_count, search_query: $sanitize(ctx.forms.search.query)})}
            />
            <$StencilPartial
                name={$string('head')}
                $then={() => (
                    <>
                        <$If
                            query={[ctx.pagination.product_results.previous]}
                            $then={() => <link rel="prev" href={ctx.pagination.product_results.previous}/>}
                        />
                        <$If
                            query={[ctx.pagination.product_results.next]}
                            $then={() => <link rel="next" href={ctx.pagination.product_results.next}/>}
                        />
                    </>
                )}
            />

            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <$_Stylesheet assetPath={$string('/assets/scss/vendor/jstree/style.css')}/>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <section className="nav">
                            <$If
                                query={[ctx.forms.search.query]}
                                $then={() => (
                                    <div id="search-results-heading">
                                        <$Partial name="components/search/heading"/>
                                    </div>
                                )}
                            />
                            <nav className="navBar navBar--sub search-nav">
                                <span id="search-tabs-widget-description" className="aria-description--hidden">
                                    <$Lang translationKey={$string('search.tabs_accesibility_hint')}/>
                                </span>
                                <ul role="tablist" className="navBar-section account-navigation" data-search-page-tabs="">
                                    <li role="presentation" className="navBar-item">
                                        <a
                                            aria-describedby="search-tabs-widget-description"
                                            role="tab"
                                            aria-controls="product-listing-container"
                                            id="search-results-product-count"
                                            className="navBar-action"
                                            href={ctx.forms.search.product_url}
                                            data-product-results-toggle=""
                                        >
                                            <$Partial name="components/search/product-count"/>
                                        </a>
                                    </li>
                                    <li role="presentation" className="navBar-item">
                                        <a
                                            aria-describedby="search-tabs-widget-description"
                                            role="tab"
                                            aria-controls="search-results-content"
                                            id="search-results-content-count"
                                            className="navBar-action"
                                            href={ctx.forms.search.content_url}
                                            data-content-results-toggle=""
                                        >
                                            <$Partial name="components/search/content-count"/>
                                        </a>
                                    </li>
                                    <$Unless
                                        query={[ctx.product_results.faceted_search_enabled]}
                                        $then={() => (
                                            <li className="navBar-item navBar-item--separate">
                                                <a
                                                    className="navBar-action toggleLink"
                                                    data-collapsible="advanced-search-content"
                                                    href="#"
                                                    aria-controls="advanced-search-content"
                                                    aria-expanded="false"
                                                >
                                                    <span className="toggleLink-text toggleLink-text--on">
                                                        <$Lang translationKey={$string('forms.search.hide')}/>
                                                    </span>
                                                    <span className="toggleLink-text toggleLink-text--off">
                                                        <$Lang translationKey={$string('forms.search.show')}/>
                                                    </span>
                                                </a>
                                            </li>
                                        )}
                                    />
                                </ul>
                            </nav>
                            <$Unless
                                query={[ctx.product_results.faceted_search_enabled]}
                                $then={() => <$Partial name="components/search/advanced-search"/>}
                            />
                        </section>

                        <section className="page">
                            <$If
                                query={[ctx.product_results.faceted_search_enabled]}
                                $then={() => (
                                    <aside
                                        className={`page-sidebar${$if(ctx.forms.search.section, '!=', $string('product')).then(() => $$raw(' u-hiddenVisually'))}`}
                                        id="faceted-search-container"
                                    >
                                        <$Partial name="components/faceted-search/index" context={ctx.product_results}/>
                                    </aside>
                                )}
                            />
                            <main className="page-content">
                                {$parseHandlebarsDangerously(`{{#if forms.search.has_suggestions}}
            <div class="panel panel--large">
                <div class="panel-body">
                    {{#if forms.search.suggested_query}}
                        <div class="search-suggestion">
                            {{lang 'forms.search.did_you_mean'}} <strong>{{forms.search.suggested_query.query}}</strong>
                            <a href="{{forms.search.suggested_query.url}}" class="search-refine">{{lang 'forms.search.refine'}}</a>
                        </div>

                        {{#if result_count '===' 0}}
                            <div class="search-suggestion">
                                <p>
                                    {{lang 'forms.search.your_search_for'}}
                                    "<strong>{{{sanitize forms.search.query}}}</strong>"
                                    {{lang 'forms.search.no_match'}}
                                </p>
                            </div>
                        {{/if}}
                    {{/if}}

                    {{#if category_results.length}}
                        <div class="search-suggestion">
                            <h5 class="suggestion-title">{{lang 'forms.search.categories'}}</h5>
                            <ul class="category-suggestion-list">

                                {{#each category_results}}
                                <li class="category-suggestion">

                                    {{#each this}}
                                        <a href="{{url}}">{{name}}</a>
                                        {{#unless @last}} > {{/unless}}
                                    {{/each}}

                                </li>
                                {{/each}}
                            </ul>
                        </div>
                    {{/if}}

                    {{#if brand_results.length}}
                        <div class="search-suggestion">
                            <h5 class="suggestion-title">{{lang 'forms.search.brand'}}</h5>
                            {{#each brand_results}}
                                <a href="{{url}}">{{name}}</a>
                                {{#unless @last}}, {{/unless}}
                            {{/each}}
                        </div>
                    {{/if}}

                    {{#if result_count '===' 0}}
                        <div class="search-suggestion">
                            <h5 class="suggestion-title">{{lang 'forms.search.suggestions.title'}}</h5>
                            <ul>
                                <li>{{lang 'forms.search.suggestions.line1'}}</li>
                                <li>{{lang 'forms.search.suggestions.line2'}}</li>
                                <li>{{lang 'forms.search.suggestions.line3'}}</li>
                            </ul>
                        </div>
                    {{/if}}
                </div>
            </div>
        {{/if}}`)}

                                <div
                                    role="tabpanel"
                                    id="search-results-content"
                                    aria-labelledby="search-results-content-count"
                                    $$={$if(ctx.forms.search.section, '!=', $string('content')).then(() => $$raw('class="u-hidden"'))}
                                >
                                    <$Partial name="components/search/content-listing"/>
                                </div>

                                <div
                                    role="tabpanel"
                                    id="product-listing-container"
                                    aria-labelledby="search-results-product-count"
                                    $$={$if(ctx.forms.search.section, '!=', $string('product')).then(() => $$raw('class="u-hidden"'))}
                                >
                                    <$Partial name="components/search/product-listing"/>
                                </div>

                                <$_Region name={$string('search_below_content')}/>
                            </main>
                        </section>
                    </>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});

