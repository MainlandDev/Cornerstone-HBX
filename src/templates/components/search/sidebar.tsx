import {$If, $partial, $pointer, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <nav>
        <$If
            test={$pointer("product_results.faceted_search_enabled")}
            $then={() => place($partial("components/faceted-search/index", $pointer("product_results")))}
        />
    </nav>
);
