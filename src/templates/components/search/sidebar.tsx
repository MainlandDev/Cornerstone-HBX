import {$If, $partial, $pointer} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <nav>
        <$If
            test={$pointer("product_results.faceted_search_enabled")}
            $then={() => $partial("components/faceted-search/index", $pointer("product_results"))}
        />
    </nav>
);
