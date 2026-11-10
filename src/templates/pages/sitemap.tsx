/**
 * Source: templates/pages/sitemap.html (32 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page, type ThemePageSitemap} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $page<ThemePageSitemap>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L2: <h1>{{lang 'sitemap.page_title'}}</h1> */}
                        <h1>
                            {/* html L2: {{lang 'sitemap.page_title'}} */}
                            <$Lang translationKey={$string('sitemap.page_title')}/>
                        </h1>

                        {/* html L4: <ul> */}
                        <ul>
                            {/* html L5: {{#each sitemap}} */}
                            <$Each
                                list={ctx.sitemap}
                                $then={(section) => (
                                    /* html L6: <li> */
                                    <li>
                                        {/* html L7: <h2>{{label}}</h2> */}
                                        <h2>{/* html L7: {{label}} */}{section.label}</h2>
                                        {/* html L8: <ul> */}
                                        <ul>
                                            {/* html L9: {{#each body}} */}
                                            <$Each
                                                list={section.body}
                                                $then={(entry) => (
                                                    /* html L10: <li> */
                                                    <li>
                                                        {/* html L11: <a href="{{url}}">{{label}}</a> */}
                                                        <a href={entry.url}>{/* html L11: {{label}} */}{entry.label}</a>
                                                        {/* html L12: {{#if children}} */}
                                                        <$If
                                                            query={[entry.children]}
                                                            $then={() => (
                                                                /* html L13: <ul> */
                                                                <ul>
                                                                    {/* html L14: {{#each children}} */}
                                                                    <$Each list={entry.children} $then={() => /* html L15: {{> components/sitemap/links}} */ <$Partial name="components/sitemap/links"/>}/>
                                                                </ul>
                                                            )}
                                                        />
                                                    </li>
                                                )}
                                            />
                                            {/* html L21: {{#if show_all_link}} */}
                                            <$If
                                                query={[section.show_all_link]}
                                                $then={() => (
                                                    /* html L22: <li> */
                                                    <li>
                                                        {/* html L23: <a href="{{subsection_url}}">{{lang 'sitemap.show_all_link'}}</a> */}
                                                        <a href={section.subsection_url}>
                                                            {/* html L23: {{lang 'sitemap.show_all_link'}} */}
                                                            <$Lang translationKey={$string('sitemap.show_all_link')}/>
                                                        </a>
                                                    </li>
                                                )}
                                            />
                                        </ul>
                                    </li>
                                )}
                            />
                        </ul>
                    </>
                )}
            />
            {/* html L31: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
