import {$boolean, $Page, $partial, $pointer} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    {$partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")})}
                    {$partial("components/blog/post", {
                            post: $pointer("blog.post"),
                            show_tags: $boolean(true),
                            is_blog_post: $boolean(true),
                        })}
                </>
            ),
        }}
        layout="layout/base"
    />
);
