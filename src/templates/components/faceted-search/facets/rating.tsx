"use server";
import FacetedSearchFacetedSearchNavigation from "../faceted-search-navigation.tsx";
import ProductsRatings from "../../products/ratings.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$dashcase, $Each, $If, $Lang, $pointer, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";

interface RatingOption {
    url: string;
    title: string;
    count: number;
    selected: boolean;
}

export default (_props: PartialProps) => (
    <$If
        test={$pointer("items")}
        $then={() => (
            <div className="accordion-block">
                <FacetedSearchFacetedSearchNavigation />

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
                                            <ProductsRatings rating={item.title} />
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
