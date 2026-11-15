import {$dashcase, $partial, $pointer, $Unless, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <div className="accordion-block">
        {place($partial("components/faceted-search/faceted-search-navigation"))}

        <div
            id={`facetedSearch-content--${$dashcase($pointer("facet"))}`}
            className={`accordion-content${$Unless({test: $pointer("start_collapsed"), $then: () => " is-open"})}`}
        >
            {place($partial("components/faceted-search/range-form"))}
        </div>
    </div>
);
