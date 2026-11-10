/**
 * Source: templates/pages/search.html (144 lines). Per-element comments below quote the original lines (`html L<n>`).
 * Front matter of the original (lines 1-4):
 *   ---
 *   product_results:
 *       limit: {{theme_settings.searchpage_products_per_page}}
 *   ---
 */
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
            {/* html L5: {{inject 'categoryTree' forms.search.category_options}} */}
            <$Inject keyName={$string('categoryTree')} value={ctx.forms.search.category_options}/>
            {/* html L6: {{inject 'searchProductsPerPage' theme_settings.searchpage_products_per_page}} */}
            <$Inject keyName={$string('searchProductsPerPage')} value={ctx.theme_settings.searchpage_products_per_page}/>
            {/* html L7: {{inject 'searchResultsCount' (lang 'search.results.count' count=result_count search_query=(sanitize forms.search.query))}} */}
            <$Inject
                keyName={$string('searchResultsCount')}
                value={$lang($string('search.results.count'), {count: ctx.result_count, search_query: $sanitize(ctx.forms.search.query)})}
            />
            {/* html L8: {{#partial "head"}} */}
            <$StencilPartial
                name={$string('head')}
                $then={() => (
                    <>
                        {/* html L9: {{#if pagination.product_results.previous}} */}
                        <$If
                            query={[ctx.pagination.product_results.previous]}
                            $then={() => /* html L10: <link rel="prev" href="{{pagination.product_results.previous}}"> */ <link rel="prev" href={ctx.pagination.product_results.previous}/>}
                        />
                        {/* html L12: {{#if pagination.product_results.next}} */}
                        <$If
                            query={[ctx.pagination.product_results.next]}
                            $then={() => /* html L13: <link rel="next" href="{{pagination.product_results.next}}"> */ <link rel="next" href={ctx.pagination.product_results.next}/>}
                        />
                    </>
                )}
            />

            {/* html L17: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L18: {{{ stylesheet '/assets/scss/vendor/jstree/style.css' }}} */}
                        <$_Stylesheet assetPath={$string('/assets/scss/vendor/jstree/style.css')}/>
                        {/* html L19: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        {/* html L20: <section class="nav"> */}
                        <section className="nav">
                            {/* html L21: {{#if forms.search.query}} */}
                            <$If
                                query={[ctx.forms.search.query]}
                                $then={() => (
                                    /* html L22: <div id="search-results-heading"> */
                                    <div id="search-results-heading">
                                        {/* html L23: {{>components/search/heading}} */}
                                        <$Partial name="components/search/heading"/>
                                    </div>
                                )}
                            />
                            {/* html L26: <nav class="navBar navBar--sub search-nav"> */}
                            <nav className="navBar navBar--sub search-nav">
                                {/* html L27: <span id="search-tabs-widget-description" class="aria-description--hidden"> */}
                                <span id="search-tabs-widget-description" className="aria-description--hidden">
                                    {/* html L28: {{lang 'search.tabs_accesibility_hint'}} */}
                                    <$Lang translationKey={$string('search.tabs_accesibility_hint')}/>
                                </span>
                                {/* html L30: <ul role="tablist" class="navBar-section account-navigation" data-search-page-tabs> */}
                                <ul role="tablist" className="navBar-section account-navigation" data-search-page-tabs="">
                                    {/* html L31: <li role="presentation" class="navBar-item"> */}
                                    <li role="presentation" className="navBar-item">
                                        {/* html L32: <a aria-describedby="search-tabs-widget-description" role="tab" aria-controls="product-listing-container" id="search-results-product-count" class="navBar-action" href="{{forms.search.product_url}}" data-product-results-toggle> */}
                                        <a
                                            aria-describedby="search-tabs-widget-description"
                                            role="tab"
                                            aria-controls="product-listing-container"
                                            id="search-results-product-count"
                                            className="navBar-action"
                                            href={ctx.forms.search.product_url}
                                            data-product-results-toggle=""
                                        >
                                            {/* html L33: {{>components/search/product-count}} */}
                                            <$Partial name="components/search/product-count"/>
                                        </a>
                                    </li>
                                    {/* html L36: <li role="presentation" class="navBar-item"> */}
                                    <li role="presentation" className="navBar-item">
                                        {/* html L37: <a aria-describedby="search-tabs-widget-description" role="tab" aria-controls="search-results-content" id="search-results-content-count" class="navBar-action" href="{{forms.search.content_url}}" data-content-results-toggle> */}
                                        <a
                                            aria-describedby="search-tabs-widget-description"
                                            role="tab"
                                            aria-controls="search-results-content"
                                            id="search-results-content-count"
                                            className="navBar-action"
                                            href={ctx.forms.search.content_url}
                                            data-content-results-toggle=""
                                        >
                                            {/* html L38: {{>components/search/content-count}} */}
                                            <$Partial name="components/search/content-count"/>
                                        </a>
                                    </li>
                                    {/* html L41: {{#unless product_results.faceted_search_enabled}} */}
                                    <$Unless
                                        query={[ctx.product_results.faceted_search_enabled]}
                                        $then={() => (
                                            /* html L42: <li class="navBar-item navBar-item--separate"> */
                                            <li className="navBar-item navBar-item--separate">
                                                {/* html L43: <a class="navBar-action toggleLink" data-collapsible="advanced-search-content" href="#" aria-controls="advanced-search-content" aria-expanded="false"> */}
                                                <a
                                                    className="navBar-action toggleLink"
                                                    data-collapsible="advanced-search-content"
                                                    href="#"
                                                    aria-controls="advanced-search-content"
                                                    aria-expanded="false"
                                                >
                                                    {/* html L44: <span class="toggleLink-text toggleLink-text--on"> */}
                                                    <span className="toggleLink-text toggleLink-text--on">
                                                        {/* html L45: {{lang 'forms.search.hide'}} */}
                                                        <$Lang translationKey={$string('forms.search.hide')}/>
                                                    </span>
                                                    {/* html L47: <span class="toggleLink-text toggleLink-text--off"> */}
                                                    <span className="toggleLink-text toggleLink-text--off">
                                                        {/* html L48: {{lang 'forms.search.show'}} */}
                                                        <$Lang translationKey={$string('forms.search.show')}/>
                                                    </span>
                                                </a>
                                            </li>
                                        )}
                                    />
                                </ul>
                            </nav>
                            {/* html L55: {{#unless product_results.faceted_search_enabled}} */}
                            <$Unless
                                query={[ctx.product_results.faceted_search_enabled]}
                                $then={() => /* html L56: {{>components/search/advanced-search}} */ <$Partial name="components/search/advanced-search"/>}
                            />
                        </section>

                        {/* html L60: <section class="page"> */}
                        <section className="page">
                            {/* html L61: {{#if product_results.faceted_search_enabled}} */}
                            <$If
                                query={[ctx.product_results.faceted_search_enabled]}
                                $then={() => (
                                    /* html L62: <aside class="page-sidebar{{#if forms.search.section '!=' 'product'}} u-hiddenVisually{{/if}}" id="faceted-search-container"> */
                                    <aside
                                        className={`page-sidebar${$if(ctx.forms.search.section, '!=', $string('product')).then(() => $$raw(' u-hiddenVisually'))}`}
                                        id="faceted-search-container"
                                    >
                                        {/* html L63: {{> components/faceted-search/index product_results}} */}
                                        <$Partial name="components/faceted-search/index" context={ctx.product_results}/>
                                    </aside>
                                )}
                            />
                            {/* html L66: <main class="page-content"> */}
                            <main className="page-content">
                                {/* html L72: {{lang 'forms.search.did_you_mean'}} <strong>{{forms.search.suggested_query.query}}</strong> */}
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

                                {/* html L130: <div role="tabpanel" id="search-results-content" aria-labelledby="search-results-content-count" {{#if forms.search.section '!=' 'content'}}class="u-hidden"{{/if}}> */}
                                <div
                                    role="tabpanel"
                                    id="search-results-content"
                                    aria-labelledby="search-results-content-count"
                                    $$={$if(ctx.forms.search.section, '!=', $string('content')).then(() => $$raw('class="u-hidden"'))}
                                >
                                    {/* html L131: {{> components/search/content-listing}} */}
                                    <$Partial name="components/search/content-listing"/>
                                </div>

                                {/* html L134: <div role="tabpanel" id="product-listing-container" aria-labelledby="search-results-product-count" {{#if forms.search.section '!=' 'product'}}class="u-hidden"{{/if}}> */}
                                <div
                                    role="tabpanel"
                                    id="product-listing-container"
                                    aria-labelledby="search-results-product-count"
                                    $$={$if(ctx.forms.search.section, '!=', $string('product')).then(() => $$raw('class="u-hidden"'))}
                                >
                                    {/* html L135: {{> components/search/product-listing}} */}
                                    <$Partial name="components/search/product-listing"/>
                                </div>

                                {/* html L138: {{{region name="search_below_content"}}} */}
                                <$_Region name={$string('search_below_content')}/>
                            </main>
                        </section>
                    </>
                )}
            />
            {/* html L143: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});

