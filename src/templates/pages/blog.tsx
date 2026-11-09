import {$Each, $If, $Partial, $string, $unescaped, $Unless} from '@mainlanddev/bigcommerce-react';
import {$page, type ThemePageBlog} from '@mainlanddev/bigcommerce-react/theme';
import {$StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ThemePageBlog>({
    frontmatter: {
        blog: {
            posts: {
                limit: 5,
                pages: 3,
                summary: 200,
            },
        },
    },
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('head')}
                $then={() => (
                    <>
                        <$If
                            query={[ctx.pagination.blog.previous]}
                            $then={() => <link rel="prev" href={$unescaped(ctx.pagination.blog.previous)}/>}
                        />
                        <$If
                            query={[ctx.pagination.blog.next]}
                            $then={() => <link rel="next" href={$unescaped(ctx.pagination.blog.next)}/>}
                        />
                    </>
                )}
            />
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>

                        <main className="page">
                            <$Unless
                                query={[ctx.theme_settings.hide_blog_page_heading]}
                                $then={() => <h1 className="page-heading">{ctx.blog.name}</h1>}
                            />

                            <$Each
                                list={ctx.blog.posts}
                                $then={(post) => <$Partial name="components/blog/post" hash={{post: post, theme_settings: ctx.theme_settings}}/>}
                            />

                            <$Partial name="components/common/paginator" context={ctx.pagination.blog}/>
                        </main>
                    </>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
