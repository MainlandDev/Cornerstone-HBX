/**
 * Source: templates/pages/blog-post.html (9 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$boolean, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page, type ThemePageBlogPost} from '@mainlanddev/bigcommerce-react/theme';
import {$StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ThemePageBlogPost>({
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

                        {/* html L5: {{> components/blog/post post=blog.post show_tags=true is_blog_post=true}} */}
                        <$Partial
                            name="components/blog/post"
                            hash={{post: ctx.blog.post, show_tags: $boolean(true), is_blog_post: $boolean(true), theme_settings: ctx.theme_settings}}
                        />
                    </>
                )}
            />
            {/* html L8: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
