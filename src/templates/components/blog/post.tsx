"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import ResponsiveImg from "../common/responsive-img.tsx";
import Share from "../common/share.tsx";
import {$Each, $If, $Lang, $lang, $pointer, $string, $unescaped, $raw} from "@mainlanddev/hbx-bigcommerce";

interface Tag {
    url: string;
    name: string;
}

export default (_props: PartialProps) => {
    const settings = $pointer<ThemeSettingsObject>("theme_settings");
    return (
        <article className="blog">
            <div className="blog-post-figure">
                <$If
                    test={$pointer("post.thumbnail")}
                    $then={() => (
                        <figure className="blog-thumbnail">
                            <a href={$pointer("post.url")}>
                                <ResponsiveImg image={$pointer("post.thumbnail")} fallback_size={settings.blog_size} lazyload={settings.lazyload_mode} />
                            </a>
                        </figure>
                    )}
                />
            </div>

            <div className="blog-post-body">
                <header className="blog-header">
                    <$If
                        test={$pointer("is_blog_post")}
                        $then={() => (
                            <h1 className="blog-title">
                                <a href={$pointer("post.url")}>{$pointer("post.title")}</a>
                            </h1>
                        )}
                        $else={() => (
                            <h2 className="blog-title">
                                <a href={$pointer("post.url")}>{$pointer("post.title")}</a>
                            </h2>
                        )}
                    />
                    <p className="blog-date">
                        <$If
                            test={$pointer("post.author")}
                            $then={() => (
                                <>
                                    <$Lang keyName={$string("blog.posted_by")} name={$pointer("post.author")} />
                                    {" on "}
                                </>
                            )}
                        />
                        {$pointer("post.date_published")}
                    </p>
                </header>

                <div className="blog-post">
                    <$If
                        test={$pointer("post.body")}
                        $then={() => <>{$unescaped($pointer("post.body"))}</>}
                        $else={() => (
                            <>
                                {$unescaped($pointer("post.summary"))}
                                <$If
                                    test={$pointer("post.show_read_more")}
                                    $then={() => (
                                        <>
                                            {$raw(" &hellip; ")}
                                            <a
                                                href={$pointer("url")}
                                                aria-label={`${$pointer("post.title")} ${$lang($string("blog.read_more"))}`}
                                            >
                                                <$Lang keyName={$string("blog.read_more")} />
                                            </a>
                                        </>
                                    )}
                                />
                            </>
                        )}
                    />
                </div>

                <$If
                    test={$pointer("show_tags")}
                    $then={() => (
                        <$If
                            test={$pointer("post.tags")}
                            $then={() => (
                                <ul className="tags">
                                    <$Each
                                        list={$pointer<Tag[]>("post.tags")}
                                        $then={(tag) => (
                                            <li className="tag">
                                                <a href={tag.url}>#{tag.name}</a>
                                            </li>
                                        )}
                                    />
                                </ul>
                            )}
                        />
                    )}
                />

                <Share url={$pointer("post.url")} />
            </div>
        </article>
    );
};
