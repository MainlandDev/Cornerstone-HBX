"use server";
import FacetedSearchShowMoreFacets from "../faceted-search/show-more-facets.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $pointer} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <$If
        test={$pointer("brand.facets")}
        $then={() => <FacetedSearchShowMoreFacets $positionalHash={$pointer("brand")} />}
    />
);
