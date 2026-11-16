import {$If, $partial, $pointer} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$If
        test={$pointer("category")}
        $then={() => $partial("components/faceted-search/show-more-facets", $pointer("category"))}
    />
);
