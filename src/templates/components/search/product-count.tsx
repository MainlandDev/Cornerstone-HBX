"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <span data-url={$pointer("forms.search.product_url")} data-count={$pointer("pagination.product_results.total")}>
        {" "}
        <$Lang keyName={$string("search.results.product_count")} count={$pointer<number>("pagination.product_results.total")} />
        {" "}
    </span>
);
