import {$Each, $If, $partial, $pointer, $unescaped, $boolean} from "@mainlanddev/hbx-bigcommerce";

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
                {$partial("components/search/content-sort-box", {sort: $pointer("pagination.content_results.sort")})}
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
                {$partial("components/common/paginator", $pointer("pagination.content_results"), {reload: $boolean(true)})}
            </>
        )}
    />
);
