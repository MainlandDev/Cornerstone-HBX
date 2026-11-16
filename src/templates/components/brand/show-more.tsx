import {$If, $partial, $pointer} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$If
        test={$pointer("brand.facets")}
        $then={() => $partial("components/faceted-search/show-more-facets", $pointer("brand"))}
    />
);
