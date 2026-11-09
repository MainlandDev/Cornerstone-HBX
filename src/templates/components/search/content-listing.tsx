import {$boolean, $Each, $If, $Partial, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageSearch} from '@mainlanddev/bigcommerce-react/theme';
import type {SearchPagination} from '@/context-misc';

type Hint = ThemeContextHint<ThemePageSearch>;

export default $asPartial<{content_results: Hint['content_results']; pagination: SearchPagination}>(
    ({content_results, pagination}) => (
        <$If
            query={[content_results]}
            $then={() => (
                <>
                    <$Partial name="components/search/content-sort-box" hash={{sort: pagination.content_results.sort}}/>
                    <ul>
                        <$Each
                            list={content_results}
                            $then={(result) => (
                                <>
                                    <strong>
                                        <a href={result.url}>{$unescaped(result.title)}</a>
                                    </strong>
                                    ({result.type})
                                    <p>{$unescaped(result.content)}</p>
                                </>
                            )}
                        />
                    </ul>
                    <$Partial
                        name="components/common/paginator"
                        context={pagination.content_results}
                        hash={{reload: $boolean(true)}}
                    />
                </>
            )}
        />
    ),
);
