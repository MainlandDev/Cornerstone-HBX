import {$If, $partial, $pointer} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$If
        test={$pointer("product_results")}
        $then={() => $partial("components/faceted-search/show-more-facets", $pointer("product_results"))}
    />
);
