import Breadcrumbs from "../components/common/breadcrumbs.tsx";
import {
    $$themeSettings,
    $Each,
    $frontmatter,
    $If,
    $Inject,
    $Lang,
    $lang,
    $number,
    $Page,
    $partial,
    $pointer,
    $raw,
    $region,
    $sanitize,
    $string,
    $stylesheet,
    $this,
    $unescaped,
    $Unless,
} from "@mainlanddev/hbx-bigcommerce";

const {setting} = $frontmatter;

export const frontmatter = $frontmatter.search({product_results: {limit: setting("searchpage_products_per_page")}});

interface Crumb {
    url: string;
    name: string;
}

interface Brand {
    url: string;
    name: string;
}

/** `{{{region name="…"}}}` */
const region = (name: string) => $unescaped($region({name: $string(name)}));

export default () => {
    const settings = $$themeSettings();
    return (
        <>
            <$Inject keyName={$string("categoryTree")} value={$pointer("forms.search.category_options")} />
            {" "}
            <$Inject keyName={$string("searchProductsPerPage")} value={settings.searchpage_products_per_page} />
            {" "}
            <$Inject
                keyName={$string("searchResultsCount")}
                value={$lang($string("search.results.count"), {
                    count: $pointer<number>("result_count"),
                    search_query: $sanitize($pointer<string>("forms.search.query")),
                })}
            />
            <$Page
                blocks={{
                    head: () => (
                        <>
                            <$If
                                test={$pointer("pagination.product_results.previous")}
                                $then={() => <link rel="prev" href={$pointer("pagination.product_results.previous")} />}
                            />
                            <$If
                                test={$pointer("pagination.product_results.next")}
                                $then={() => <link rel="next" href={$pointer("pagination.product_results.next")} />}
                            />
                        </>
                    ),
                    page: () => (
                        <>
                            {$unescaped($stylesheet($string("/assets/scss/vendor/jstree/style.css")))}
                            <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                            <section className="nav">
                                <$If
                                    test={$pointer("forms.search.query")}
                                    $then={() => (
                                        <div id="search-results-heading">{$partial("components/search/heading")}</div>
                                    )}
                                />
                                <nav className="navBar navBar--sub search-nav">
                                    <span id="search-tabs-widget-description" className="aria-description--hidden">
                                        <$Lang keyName={$string("search.tabs_accesibility_hint")} />
                                    </span>
                                    <ul role="tablist" className="navBar-section account-navigation" data-search-page-tabs={""}>
                                        <li role="presentation" className="navBar-item">
                                            <a
                                                aria-describedby="search-tabs-widget-description"
                                                role="tab"
                                                aria-controls="product-listing-container"
                                                id="search-results-product-count"
                                                className="navBar-action"
                                                href={$pointer("forms.search.product_url")}
                                                data-product-results-toggle={""}
                                            >
                                                {" "}{$partial("components/search/product-count")}{" "}
                                            </a>
                                        </li>
                                        <li role="presentation" className="navBar-item">
                                            <a
                                                aria-describedby="search-tabs-widget-description"
                                                role="tab"
                                                aria-controls="search-results-content"
                                                id="search-results-content-count"
                                                className="navBar-action"
                                                href={$pointer("forms.search.content_url")}
                                                data-content-results-toggle={""}
                                            >
                                                {" "}{$partial("components/search/content-count")}{" "}
                                            </a>
                                        </li>
                                        <$Unless
                                            test={$pointer("product_results.faceted_search_enabled")}
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
                                                            <$Lang keyName={$string("forms.search.hide")} />
                                                        </span>
                                                        <span className="toggleLink-text toggleLink-text--off">
                                                            <$Lang keyName={$string("forms.search.show")} />
                                                        </span>
                                                    </a>
                                                </li>
                                            )}
                                        />
                                    </ul>
                                </nav>
                                <$Unless
                                    test={$pointer("product_results.faceted_search_enabled")}
                                    $then={() => $partial("components/search/advanced-search")}
                                />
                            </section>
                            <section className="page">
                                <$If
                                    test={$pointer("product_results.faceted_search_enabled")}
                                    $then={() => (
                                        <aside
                                            className={`page-sidebar${$If({test: $pointer("forms.search.section"), operator: $string("!="), rvalue: $string("product"), $then: () => " u-hiddenVisually"})}`}
                                            id="faceted-search-container"
                                        >
                                            {$partial("components/faceted-search/index", $pointer("product_results"))}
                                        </aside>
                                    )}
                                />
                                <main className="page-content">
                                    <$If
                                        test={$pointer("forms.search.has_suggestions")}
                                        $then={() => (
                                            <div className="panel panel--large">
                                                <div className="panel-body">
                                                    <$If
                                                        test={$pointer("forms.search.suggested_query")}
                                                        $then={() => (
                                                            <>
                                                                <div className="search-suggestion">
                                                                    <$Lang keyName={$string("forms.search.did_you_mean")} />{" "}
                                                                    <strong>{$pointer("forms.search.suggested_query.query")}</strong>{" "}
                                                                    <a href={$pointer("forms.search.suggested_query.url")} className="search-refine">
                                                                        <$Lang keyName={$string("forms.search.refine")} />
                                                                    </a>
                                                                </div>
                                                                <$If
                                                                    test={$pointer("result_count")}
                                                                    operator={$string("===")}
                                                                    rvalue={$number(0)}
                                                                    $then={() => (
                                                                        <div className="search-suggestion">
                                                                            <p>
                                                                                <$Lang keyName={$string("forms.search.your_search_for")} />{" "}
                                                                                {$raw('"')}
                                                                                <strong>{$unescaped($sanitize($pointer<string>("forms.search.query")))}</strong>
                                                                                {$raw('"')}{" "}
                                                                                <$Lang keyName={$string("forms.search.no_match")} />
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                />
                                                            </>
                                                        )}
                                                    />
                                                    <$If
                                                        test={$pointer("category_results.length")}
                                                        $then={() => (
                                                            <div className="search-suggestion">
                                                                <h5 className="suggestion-title">
                                                                    <$Lang keyName={$string("forms.search.categories")} />
                                                                </h5>
                                                                <ul className="category-suggestion-list">
                                                                    <$Each
                                                                        list={$pointer<Crumb[][]>("category_results")}
                                                                        $then={() => (
                                                                            <li className="category-suggestion">
                                                                                <$Each
                                                                                    list={$this<Crumb[]>()}
                                                                                    $then={(crumb, loop) => (
                                                                                        <>
                                                                                            <a href={crumb.url}>{crumb.name}</a>
                                                                                            <$Unless
                                                                                                test={loop["@last"]}
                                                                                                $then={() => $raw(" > ")}
                                                                                            />
                                                                                        </>
                                                                                    )}
                                                                                />
                                                                            </li>
                                                                        )}
                                                                    />
                                                                </ul>
                                                            </div>
                                                        )}
                                                    />
                                                    <$If
                                                        test={$pointer("brand_results.length")}
                                                        $then={() => (
                                                            <div className="search-suggestion">
                                                                <h5 className="suggestion-title">
                                                                    <$Lang keyName={$string("forms.search.brand")} />
                                                                </h5>
                                                                <$Each
                                                                    list={$pointer<Brand[]>("brand_results")}
                                                                    $then={(brand, loop) => (
                                                                        <>
                                                                            <a href={brand.url}>{brand.name}</a>
                                                                            {" "}
                                                                            <$Unless test={loop["@last"]} $then={() => ", "} />
                                                                        </>
                                                                    )}
                                                                />
                                                            </div>
                                                        )}
                                                    />
                                                    <$If
                                                        test={$pointer("result_count")}
                                                        operator={$string("===")}
                                                        rvalue={$number(0)}
                                                        $then={() => (
                                                            <div className="search-suggestion">
                                                                <h5 className="suggestion-title">
                                                                    <$Lang keyName={$string("forms.search.suggestions.title")} />
                                                                </h5>
                                                                <ul>
                                                                    <li>
                                                                        <$Lang keyName={$string("forms.search.suggestions.line1")} />
                                                                    </li>
                                                                    <li>
                                                                        <$Lang keyName={$string("forms.search.suggestions.line2")} />
                                                                    </li>
                                                                    <li>
                                                                        <$Lang keyName={$string("forms.search.suggestions.line3")} />
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    />
                                    <div
                                        role="tabpanel"
                                        id="search-results-content"
                                        aria-labelledby="search-results-content-count"
                                        dangerouslyInlineAttributes={{
                                            attributes: `${$If({test: $pointer("forms.search.section"), operator: $string("!="), rvalue: $string("content"), $then: () => $raw('class="u-hidden"')})}`,
                                        }}
                                    >
                                        {$partial("components/search/content-listing")}
                                    </div>
                                    <div
                                        role="tabpanel"
                                        id="product-listing-container"
                                        aria-labelledby="search-results-product-count"
                                        dangerouslyInlineAttributes={{
                                            attributes: `${$If({test: $pointer("forms.search.section"), operator: $string("!="), rvalue: $string("product"), $then: () => $raw('class="u-hidden"')})}`,
                                        }}
                                    >
                                        {$partial("components/search/product-listing")}
                                    </div>
                                    {region("search_below_content")}
                                </main>
                            </section>
                        </>
                    ),
                }}
                layout="layout/base"
            />
        </>
    );
};
