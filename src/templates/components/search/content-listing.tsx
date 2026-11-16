"use server";
import SearchContentSortBox from "./content-sort-box.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import Paginator from "../common/paginator.tsx";
import {$Each, $If, $pointer, $unescaped, $boolean} from "@mainlanddev/hbx-bigcommerce";

interface ContentResult {
    url: string;
    title: string;
    type: string;
    content: string;
}

export default (_props: PartialProps) => (
    <$If
        test={$pointer("content_results")}
        $then={() => (
            <>
                <SearchContentSortBox sort={$pointer("pagination.content_results.sort")} />
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
                <Paginator $positionalHash={$pointer("pagination.content_results")} reload={$boolean(true)} />
            </>
        )}
    />
);
