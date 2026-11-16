import {$dashcase, $Each, $If, $Lang, $partial, $pointer, $sanitize, $string, $unescaped, $Unless} from "@mainlanddev/hbx-bigcommerce";

interface Facet {
    id: string;
    url: string;
    title: string;
    count: number;
    selected: boolean;
    has_sub_categories: boolean;
    children: Facet[];
}

export default () => (
    <$If
        test={$pointer("items")}
        $then={() => (
            <div className="accordion-block">
                {$partial("components/faceted-search/faceted-search-navigation")}

                <div
                    id={`facetedSearch-content--${$dashcase($pointer("facet"))}`}
                    className={`accordion-content${$Unless({test: $pointer("start_collapsed"), $then: () => " is-open"})}`}
                >
                    <ul
                        id={`facetedSearch-navList--${$dashcase($pointer("facet"))}`}
                        className="navList"
                        data-facet={$pointer("facet")}
                        data-has-more-results={$pointer("has_more_results")}
                    >
                        <$Each
                            list={$pointer<Facet[]>("items")}
                            $then={(item) => (
                                <li className="navList-item">
                                    <a
                                        href={item.url}
                                        className={`navList-action navList-action--checkbox${$If({test: item.selected, $then: () => " is-selected"})}${$If({test: item.has_sub_categories, $then: () => " has-children"})}`}
                                        rel="nofollow"
                                        data-id={item.id}
                                        data-faceted-search-facet={""}
                                    >
                                        {$unescaped($sanitize(item.title))}{" "}
                                        <$If
                                            test={$pointer("../show_product_counts")}
                                            $then={() => <span>({item.count})</span>}
                                        />
                                    </a>
                                    <$If
                                        test={item.children}
                                        $then={() => $partial("components/faceted-search/facets/hierarchy-children", item.children)}
                                    />
                                </li>
                            )}
                        />
                    </ul>

                    <$If
                        test={$pointer("show_more_toggle")}
                        $then={() => (
                            <a href={`#facetedSearch-navList--${$dashcase($pointer("facet"))}`} role="button" className="toggleLink">
                                <span className="toggleLink-text toggleLink-text--off">
                                    <$Lang keyName={$string("search.faceted.show-more")} />
                                </span>
                            </a>
                        )}
                    />
                </div>
            </div>
        )}
    />
);
