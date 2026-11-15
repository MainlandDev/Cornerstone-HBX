import {$dashcase, $Each, $If, $Lang, $partial, $pointer, $string, $Unless, place} from "@mainlanddev/hbx-bigcommerce";

interface RatingOption {
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
                {place($partial("components/faceted-search/faceted-search-navigation"))}

                <div
                    id={`facetedSearch-content--${$dashcase($pointer("facet"))}`}
                    className={`accordion-content facetedSearch-content--${$dashcase($pointer("facet"))}${$Unless({test: $pointer("start_collapsed"), $then: () => " is-open"})}`}
                >
                    <ul className="navList">
                        <$Each
                            list={$pointer<RatingOption[]>("items")}
                            $then={(item) => (
                                <li className="navList-item">
                                    <a
                                        href={item.url}
                                        className={`navList-action${$If({test: item.selected, $then: () => " is-selected"})}`}
                                        rel="nofollow"
                                        data-faceted-search-facet={""}
                                    >
                                        <span className="rating--small">
                                            {place($partial("components/products/ratings", {rating: item.title}))}
                                        </span>{" "}
                                        <$Lang keyName={$string("search.faceted.rating.and-up")} />{" "}
                                        <$If
                                            test={$pointer("../show_product_counts")}
                                            $then={() => <span>({item.count})</span>}
                                        />
                                    </a>
                                </li>
                            )}
                        />
                    </ul>
                </div>
            </div>
        )}
    />
);
