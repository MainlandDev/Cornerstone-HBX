/**
 * Source: templates/components/search/content-listing.html (11 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$boolean, $Each, $If, $Partial, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageSearch} from '@mainlanddev/bigcommerce-react/theme';
import type {SearchPagination} from '@/context-misc';

type Hint = ThemeContextHint<ThemePageSearch>;

export default $asPartial<{content_results: Hint['content_results']; pagination: SearchPagination}>(
    ({content_results, pagination}) => (
        /* html L1: {{#if content_results}} */
        <$If
            query={[content_results]}
            $then={() => (
                <>
                    {/* html L2: {{> components/search/content-sort-box sort=pagination.content_results.sort}} */}
                    <$Partial name="components/search/content-sort-box" hash={{sort: pagination.content_results.sort}}/>
                    {/* html L3: <ul> */}
                    <ul>
                        {/* html L4: {{#each content_results}} */}
                        <$Each
                            list={content_results}
                            $then={(result) => (
                                <>
                                    {/* html L5: <strong><a href="{{url}}">{{{title}}}</a></strong>({{type}}) */}
                                    <strong>
                                        {/* html L5: <a href="{{url}}"> */}
                                        <a href={result.url}>{/* html L5: {{{title}}} */}{$unescaped(result.title)}</a>
                                    </strong>
                                    ({/* html L5: {{type}} */}{result.type})
                                    {/* html L6: <p>{{{content}}}</p> */}
                                    <p>{/* html L6: {{{content}}} */}{$unescaped(result.content)}</p>
                                </>
                            )}
                        />
                    </ul>
                    {/* html L9: {{> components/common/paginator pagination.content_results reload=true}} */}
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
