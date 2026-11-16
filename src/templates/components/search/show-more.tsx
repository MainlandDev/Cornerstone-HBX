"use server";
import FacetedSearchShowMoreFacets from "../faceted-search/show-more-facets.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $pointer} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <$If
        test={$pointer("product_results")}
        $then={() => <FacetedSearchShowMoreFacets $positionalHash={$pointer("product_results")} />}
    />
);
