import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import BlogPost from "../components/blog/post.tsx";
import Breadcrumbs from "../components/common/breadcrumbs.tsx";
import Paginator from "../components/common/paginator.tsx";
import {
    $Each,
    $frontmatter,
    $If,
    $Page,
    $pointer,
    $this,
    $Unless,
    $unescaped,
} from "@mainlanddev/hbx-bigcommerce";

export const frontmatter = $frontmatter.blog({blog: {posts: {limit: 5, pages: 3, summary: 200}}});

export default () => {
    const settings = $pointer<ThemeSettingsObject>("theme_settings");
    return (
        <$Page
            blocks={{
                head: () => (
                    <>
                        <$If
                            test={$pointer("pagination.blog.previous")}
                            $then={() => (
                                <link rel="prev" href={$unescaped($pointer<string>("pagination.blog.previous"))} />
                            )}
                        />
                        <$If
                            test={$pointer("pagination.blog.next")}
                            $then={() => (
                                <link rel="next" href={$unescaped($pointer<string>("pagination.blog.next"))} />
                            )}
                        />
                    </>
                ),
                page: () => (
                    <>
                        <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                        <main className="page">
                            <$Unless
                                test={settings.hide_blog_page_heading}
                                $then={() => <h1 className="page-heading">{$pointer("blog.name")}</h1>}
                            />
                            <$Each
                                list={$pointer<unknown[]>("blog.posts")}
                                $then={() =>
                                    <BlogPost post={$this()} theme_settings={$pointer("../theme_settings")} />
                                }
                            />
                            <Paginator $positionalHash={$pointer("pagination.blog")} />
                        </main>
                    </>
                ),
            }}
            layout="layout/base"
        />
    );
};
