import {$boolean, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page, type ThemePageBlogPost} from '@mainlanddev/bigcommerce-react/theme';
import {$StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ThemePageBlogPost>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>

                        <$Partial
                            name="components/blog/post"
                            hash={{post: ctx.blog.post, show_tags: $boolean(true), is_blog_post: $boolean(true), theme_settings: ctx.theme_settings}}
                        />
                    </>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
