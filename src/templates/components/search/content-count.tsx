import {$Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <span data-url={$pointer("forms.search.content_url")} data-count={$pointer("pagination.content_results.total")}>
        {" "}
        <$Lang keyName={$string("search.results.content_count")} count={$pointer<number>("pagination.content_results.total")} />
        {" "}
    </span>
);
