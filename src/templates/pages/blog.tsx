/**
 * Source: templates/pages/blog.html (35 lines). Per-element comments below quote the original lines (`html L<n>`).
 * Front matter of the original (lines 1-7):
 *   ---
 *   blog:
 *       posts:
 *           limit: 5
 *           pages: 3
 *           summary: 200
 *   ---
 */
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
            {/* html L8: {{#partial "head"}} */}
            <$StencilPartial
                name={$string('head')}
                $then={() => (
                    <>
                        {/* html L9: {{#if pagination.blog.previous}} */}
                        <$If
                            query={[ctx.pagination.blog.previous]}
                            $then={() => /* html L10: <link rel="prev" href="{{{pagination.blog.previous}}}"> */ <link rel="prev" href={$unescaped(ctx.pagination.blog.previous)}/>}
                        />
                        {/* html L12: {{#if pagination.blog.next}} */}
                        <$If
                            query={[ctx.pagination.blog.next]}
                            $then={() => /* html L13: <link rel="next" href="{{{pagination.blog.next}}}"> */ <link rel="next" href={$unescaped(ctx.pagination.blog.next)}/>}
                        />
                    </>
                )}
            />
            {/* html L17: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L19: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>

                        {/* html L21: <main class="page"> */}
                        <main className="page">
                            {/* html L22: {{#unless theme_settings.hide_blog_page_heading }} */}
                            <$Unless
                                query={[ctx.theme_settings.hide_blog_page_heading]}
                                $then={() => /* html L23: <h1 class="page-heading">{{ blog.name }}</h1> */ <h1 className="page-heading">{/* html L23: {{ blog.name }} */}{ctx.blog.name}</h1>}
                            />

                            {/* html L26: {{#each blog.posts}} */}
                            <$Each
                                list={ctx.blog.posts}
                                $then={(post) => /* html L27: {{> components/blog/post post=this theme_settings=../theme_settings}} */ <$Partial name="components/blog/post" hash={{post: post, theme_settings: ctx.theme_settings}}/>}
                            />

                            {/* html L30: {{> components/common/paginator pagination.blog}} */}
                            <$Partial name="components/common/paginator" context={ctx.pagination.blog}/>
                        </main>
                    </>
                )}
            />
            {/* html L34: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
