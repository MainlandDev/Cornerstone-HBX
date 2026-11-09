import {$Each, $If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page, type ThemePageSitemap} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $page<ThemePageSitemap>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <h1>
                            <$Lang translationKey={$string('sitemap.page_title')}/>
                        </h1>

                        <ul>
                            <$Each
                                list={ctx.sitemap}
                                $then={(section) => (
                                    <li>
                                        <h2>{section.label}</h2>
                                        <ul>
                                            <$Each
                                                list={section.body}
                                                $then={(entry) => (
                                                    <li>
                                                        <a href={entry.url}>{entry.label}</a>
                                                        <$If
                                                            query={[entry.children]}
                                                            $then={() => (
                                                                <ul>
                                                                    <$Each list={entry.children} $then={() => <$Partial name="components/sitemap/links"/>}/>
                                                                </ul>
                                                            )}
                                                        />
                                                    </li>
                                                )}
                                            />
                                            <$If
                                                query={[section.show_all_link]}
                                                $then={() => (
                                                    <li>
                                                        <a href={section.subsection_url}>
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
            <$Partial name="layout/base"/>
        </>
    ),
});
