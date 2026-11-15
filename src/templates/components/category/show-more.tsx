import {$If, $partial, $pointer, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$If
        test={$pointer("category")}
        $then={() => place($partial("components/faceted-search/show-more-facets", $pointer("category")))}
    />
);
