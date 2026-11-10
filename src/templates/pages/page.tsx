/**
 * Source: templates/pages/page.html (45 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $string, $unescaped, $Unless} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Replace, $StencilPartial, $_Region} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {ExtendedThemePageHtmlPage} from '@/context-pagesA';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ExtendedThemePageHtmlPage>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L3: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>

                        {/* html L5: <main class="page"> */}
                        <main className="page">
                            {/* html L6: {{#unless theme_settings.hide_page_heading }} */}
                            <$Unless
                                query={[ctx.theme_settings.hide_page_heading]}
                                $then={() => /* html L7: <h1 class="page-heading">{{ page.title }}</h1> */ <h1 className="page-heading">{/* html L7: {{ page.title }} */}{ctx.page.title}</h1>}
                            />

                            {/* html L10: {{#if page.sub_pages}} */}
                            <$If
                                query={[ctx.page.sub_pages]}
                                $then={() => (
                                    /* html L11: <nav class="navBar navBar--sub"> */
                                    <nav className="navBar navBar--sub">
                                        {/* html L12: <ul class="navBar-section account-navigation"> */}
                                        <ul className="navBar-section account-navigation">
                                            {/* html L13: {{#each page.sub_pages}} */}
                                            <$Each
                                                list={ctx.page.sub_pages}
                                                $then={(subPage) => (
                                                    /* html L14: <li class="navBar-item"><a class="navBar-action" href="{{url}}">{{title}}</a></li> */
                                                    <li className="navBar-item">
                                                        {/* html L14: <a class="navBar-action" href="{{url}}"> */}
                                                        <a className="navBar-action" href={subPage.url}>
                                                            {/* html L14: {{title}} */}
                                                            {subPage.title}
                                                        </a>
                                                    </li>
                                                )}
                                            />
                                        </ul>
                                    </nav>
                                )}
                            />

                            {/* html L20: {{{region name="page_builder_content"}}} */}
                            <$_Region name={$string('page_builder_content')}/>

                            {/* html L22: <div class="page-content page-content--centered"> */}
                            <div className="page-content page-content--centered">
                                {/* html L23: {{#replace '%%Syndicate%%' page.content}} */}
                                <$Replace
                                    needle={$string('%%Syndicate%%')}
                                    haystack={ctx.page.content}
                                    $then={() => /* html L24: {{> components/page/rss_feed}} */ <$Partial name="components/page/rss_feed" hash={{urls: ctx.urls, settings: ctx.settings}}/>}
                                    $else={() => /* html L25: {{else}}
                                                                                                        html L26: <p>{{{page.content}}}</p>
                                                 */ <p>{/* html L26: {{{page.content}}} */}{$unescaped(ctx.page.content)}</p>}
                                />
                            </div>

                            {/* html L30: {{#if page.feed}} */}
                            <$If
                                query={[ctx.page.feed]}
                                $then={() => (
                                    /* html L31: <ul> */
                                    <ul>
                                        {/* html L32: {{#each page.feed}} */}
                                        <$Each
                                            list={ctx.page.feed}
                                            $then={(item) => (
                                                /* html L33: <li> */
                                                <li>
                                                    {/* html L34: <h6><a href="{{url}}" target="_blank">{{title}}</a></h6> */}
                                                    <h6>
                                                        {/* html L34: <a href="{{url}}" target="_blank"> */}
                                                        <a href={item.url} target="_blank">
                                                            {/* html L34: {{title}} */}
                                                            {item.title}
                                                        </a>
                                                    </h6>
                                                    {/* html L35: <p>{{content}}</p> */}
                                                    <p>{/* html L35: {{content}} */}{item.content}</p>
                                                </li>
                                            )}
                                        />
                                    </ul>
                                )}
                            />
                        </main>
                    </>
                )}
            />
            {/* html L44: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
