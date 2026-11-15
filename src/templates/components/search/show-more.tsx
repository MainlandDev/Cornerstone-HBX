import {$If, $partial, $pointer, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$If
        test={$pointer("product_results")}
        $then={() => place($partial("components/faceted-search/show-more-facets", $pointer("product_results")))}
    />
);
