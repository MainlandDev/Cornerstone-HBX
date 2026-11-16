import {
    $$themeSettings,
    $Each,
    $frontmatter,
    $If,
    $Page,
    $partial,
    $pointer,
    $raw,
    $this,
    $Unless,
} from "@mainlanddev/hbx-bigcommerce";

export const frontmatter = $frontmatter.blog({blog: {posts: {limit: 5, pages: 3, summary: 200}}});

export default () => {
    const settings = $$themeSettings();
    return (
        <$Page
            blocks={{
                head: () => (
                    <>
                        <$If
                            test={$pointer("pagination.blog.previous")}
                            $then={() => (
                                <link rel="prev" dangerouslyInlineAttributes={{attributes: `href="${$raw("{{{pagination.blog.previous}}}")}"`}} />
                            )}
                        />
                        <$If
                            test={$pointer("pagination.blog.next")}
                            $then={() => (
                                <link rel="next" dangerouslyInlineAttributes={{attributes: `href="${$raw("{{{pagination.blog.next}}}")}"`}} />
                            )}
                        />
                    </>
                ),
                page: () => (
                    <>
                        {$partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")})}
                        <main className="page">
                            <$Unless
                                test={settings.hide_blog_page_heading}
                                $then={() => <h1 className="page-heading">{$pointer("blog.name")}</h1>}
                            />
                            <$Each
                                list={$pointer<unknown[]>("blog.posts")}
                                $then={() =>
                                    $partial("components/blog/post", {
                                            post: $this(),
                                            theme_settings: $pointer("../theme_settings"),
                                        })
                                }
                            />
                            {$partial("components/common/paginator", $pointer("pagination.blog"))}
                        </main>
                    </>
                ),
            }}
            layout="layout/base"
        />
    );
};
