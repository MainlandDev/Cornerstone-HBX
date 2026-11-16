"use server";
import FacetedSearchIndex from "../faceted-search/index.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $pointer} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <nav>
        <$If
            test={$pointer("product_results.faceted_search_enabled")}
            $then={() => <FacetedSearchIndex $positionalHash={$pointer("product_results")} />}
        />
    </nav>
);
