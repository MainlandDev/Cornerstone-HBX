"use server";
import FacetedSearchFacetedSearchNavigation from "../faceted-search-navigation.tsx";
import FacetedSearchRangeForm from "../range-form.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$dashcase, $pointer, $Unless} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div className="accordion-block">
        <FacetedSearchFacetedSearchNavigation />

        <div
            id={`facetedSearch-content--${$dashcase($pointer("facet"))}`}
            className={`accordion-content${$Unless({test: $pointer("start_collapsed"), $then: () => " is-open"})}`}
        >
            <FacetedSearchRangeForm />
        </div>
    </div>
);
