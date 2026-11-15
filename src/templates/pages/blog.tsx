import {
    $$themeSettings,
    $Each,
    $frontmatter,
    $If,
    $partial,
    $pointer,
    $raw,
    $StencilPartial,
    $string,
    $this,
    $Unless,
    place,
} from "@mainlanddev/hbx-bigcommerce";

export const frontmatter = $frontmatter.blog({blog: {posts: {limit: 5, pages: 3, summary: 200}}});

export default () => {
    const settings = $$themeSettings();
    return (
        <>
            <$StencilPartial
                name={$string("head")}
                $then={() => (
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
                )}
            />
            <$StencilPartial
                name={$string("page")}
                $then={() => (
                    <>
                        {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                        <main className="page">
                            <$Unless
                                test={settings.hide_blog_page_heading}
                                $then={() => <h1 className="page-heading">{$pointer("blog.name")}</h1>}
                            />
                            <$Each
                                list={$pointer<unknown[]>("blog.posts")}
                                $then={() =>
                                    place(
                                        $partial("components/blog/post", {
                                            post: $this(),
                                            theme_settings: $pointer("../theme_settings"),
                                        }),
                                    )
                                }
                            />
                            {place($partial("components/common/paginator", $pointer("pagination.blog")))}
                        </main>
                    </>
                )}
            />
            {place($partial("layout/base"))}
        </>
    );
};
