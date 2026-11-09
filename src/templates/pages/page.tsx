import {$Each, $If, $Partial, $string, $unescaped, $Unless} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Replace, $StencilPartial, $_Region} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {ExtendedThemePageHtmlPage} from '@/context-pagesA';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ExtendedThemePageHtmlPage>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>

                        <main className="page">
                            <$Unless
                                query={[ctx.theme_settings.hide_page_heading]}
                                $then={() => <h1 className="page-heading">{ctx.page.title}</h1>}
                            />

                            <$If
                                query={[ctx.page.sub_pages]}
                                $then={() => (
                                    <nav className="navBar navBar--sub">
                                        <ul className="navBar-section account-navigation">
                                            <$Each
                                                list={ctx.page.sub_pages}
                                                $then={(subPage) => (
                                                    <li className="navBar-item">
                                                        <a className="navBar-action" href={subPage.url}>
                                                            {subPage.title}
                                                        </a>
                                                    </li>
                                                )}
                                            />
                                        </ul>
                                    </nav>
                                )}
                            />

                            <$_Region name={$string('page_builder_content')}/>

                            <div className="page-content page-content--centered">
                                <$Replace
                                    needle={$string('%%Syndicate%%')}
                                    haystack={ctx.page.content}
                                    $then={() => <$Partial name="components/page/rss_feed" hash={{urls: ctx.urls, settings: ctx.settings}}/>}
                                    $else={() => <p>{$unescaped(ctx.page.content)}</p>}
                                />
                            </div>

                            <$If
                                query={[ctx.page.feed]}
                                $then={() => (
                                    <ul>
                                        <$Each
                                            list={ctx.page.feed}
                                            $then={(item) => (
                                                <li>
                                                    <h6>
                                                        <a href={item.url} target="_blank">
                                                            {item.title}
                                                        </a>
                                                    </h6>
                                                    <p>{item.content}</p>
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
            <$Partial name="layout/base"/>
        </>
    ),
});
