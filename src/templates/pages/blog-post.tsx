import BlogPost from "../components/blog/post.tsx";
import Breadcrumbs from "../components/common/breadcrumbs.tsx";
import {$boolean, $Page, $pointer} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <BlogPost post={$pointer("blog.post")} show_tags={$boolean(true)} is_blog_post={$boolean(true)} />
                </>
            ),
        }}
        layout="layout/base"
    />
);
