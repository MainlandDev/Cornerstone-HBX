import {$boolean, $partial, $pointer, $StencilPartial, $string, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$StencilPartial
            name={$string("page")}
            $then={() => (
                <>
                    {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                    {place(
                        $partial("components/blog/post", {
                            post: $pointer("blog.post"),
                            show_tags: $boolean(true),
                            is_blog_post: $boolean(true),
                        }),
                    )}
                </>
            )}
        />
        {place($partial("layout/base"))}
    </>
);
