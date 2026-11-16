"use server";
import FacetedSearchSelectedFacets from "./selected-facets.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Any, $boolean, $Each, $If, $join, $Lang, $lang, $number, $pluck, $pointer, $string, $toLowerCase, $unescaped, $dynamicComponent} from "@mainlanddev/hbx-bigcommerce";

interface Facet {
    title: string;
    visible: boolean;
}

export default (_props: PartialProps) => (
    <div id="facetedSearch" className="facetedSearch sidebarBlock" role="region" aria-label={$lang($string("search.faceted.label"))}>
        <FacetedSearchSelectedFacets $positionalHash={$pointer("selected")} />

        <a href="#facetedSearch-navList" role="button" className="facetedSearch-toggle toggleLink" data-collapsible={""}>
            <span className="facetedSearch-toggle-text">
                <$If
                    test={$pointer("facets.length")}
                    operator={$string(">")}
                    rvalue={$number(2)}
                    $then={() => (
                        <>
                            <$Lang keyName={$string("search.faceted.browse-by")} />{" "}
                            {$join($pluck($pointer<Facet[]>("facets"), $string("title")), $string(", "), {limit: $number(2)})}
                            {" & "}
                            {$toLowerCase($lang($string("search.faceted.more")))}
                        </>
                    )}
                    $else={() => (
                        <>
                            <$Lang keyName={$string("search.faceted.browse-by")} />{" "}
                            {$join($pluck($pointer<Facet[]>("facets"), $string("title")), $string(", "), {lastSeparator: $string(" & ")})}
                        </>
                    )}
                />
            </span>{" "}

            <span className="facetedSearch-toggle-indicator">
                <span className="toggleLink-text toggleLink-text--on">
                    <$Lang keyName={$string("search.faceted.hide-filters")} />{" "}

                    <i className="icon" aria-hidden="true">
                        <svg>
                            <use href="#icon-keyboard-arrow-up" />
                        </svg>
                    </i>
                </span>{" "}

                <span className="toggleLink-text toggleLink-text--off">
                    <$Lang keyName={$string("search.faceted.show-filters")} />{" "}

                    <i className="icon" aria-hidden="true">
                        <svg>
                            <use href="#icon-keyboard-arrow-down" />
                        </svg>
                    </i>
                </span>
            </span>
        </a>

        <$Any
            list={$pointer<Facet[]>("facets")}
            predicate={{visible: $boolean(true)}}
            $then={() => (
                <div id="facetedSearch-navList" className="facetedSearch-navList">
                    <div className="accordion accordion--navList">
                        <$Each
                            list={$pointer<Facet[]>("facets")}
                            $then={(facet) => (
                                <$If
                                    test={facet.visible}
                                    $then={() => $unescaped($dynamicComponent($string("components/faceted-search/facets")))}
                                />
                            )}
                        />
                    </div>

                    <div className="blocker" style={{display: "none"}}></div>
                </div>
            )}
        />
    </div>
);
