import {$dashcase, $Each, $If, $Lang, $partial, $pointer, $sanitize, $string, $unescaped, $Unless} from "@mainlanddev/hbx-bigcommerce";

interface FacetOption {
    id: string;
    url: string;
    title: string;
    count: number;
    selected: boolean;
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
                        data-facet={$pointer("facet")}
                        className="navList"
                        data-has-more-results={$pointer("has_more_results")}
                    >
                        <$Each
                            list={$pointer<FacetOption[]>("items")}
                            $then={(item) => (
                                <li className="navList-item">
                                    <a
                                        href={item.url}
                                        className={`navList-action navList-action--checkbox${$If({test: item.selected, $then: () => " is-selected"})}`}
                                        rel="nofollow"
                                        data-faceted-search-facet={""}
                                    >
                                        {$unescaped($sanitize(item.title))}{" "}
                                        <$If
                                            test={$pointer("../show_product_counts")}
                                            $then={() => <span>({item.count})</span>}
                                        />{" "}
                                        <span className="navList-action-close" aria-hidden="true">
                                            <svg className="icon">
                                                <use href="#icon-close" />
                                            </svg>
                                        </span>
                                    </a>
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
