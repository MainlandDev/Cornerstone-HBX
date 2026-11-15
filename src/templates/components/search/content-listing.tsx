import {$Each, $If, $partial, $pointer, $unescaped, $boolean, place} from "@mainlanddev/hbx-bigcommerce";

interface ContentResult {
    url: string;
    title: string;
    type: string;
    content: string;
}

export default () => (
    <$If
        test={$pointer("content_results")}
        $then={() => (
            <>
                {place($partial("components/search/content-sort-box", {sort: $pointer("pagination.content_results.sort")}))}
                <ul>
                    <$Each
                        list={$pointer<ContentResult[]>("content_results")}
                        $then={(item) => (
                            <>
                                <strong>
                                    <a href={item.url}>{$unescaped(item.title)}</a>
                                </strong>
                                ({item.type})
                                <p>{$unescaped(item.content)}</p>
                            </>
                        )}
                    />
                </ul>
                {place($partial("components/common/paginator", $pointer("pagination.content_results"), {reload: $boolean(true)}))}
            </>
        )}
    />
);
