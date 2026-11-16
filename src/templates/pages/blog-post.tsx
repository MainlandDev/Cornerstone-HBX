import {$boolean, $Page, $partial, $pointer, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
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
            ),
        }}
        layout="layout/base"
    />
);
