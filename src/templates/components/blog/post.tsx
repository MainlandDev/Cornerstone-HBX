import {$Each, $If, $Partial, $parseHandlebarsDangerously, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {BlogPostHint, BlogThemeSettingsHint} from '@/context-hard';

// The heading level is a conditional tag name (`<h{{#if is_blog_post}}1{{else}}2{{/if}}>`), which JSX cannot express:
// only the opening and closing tags are raw Handlebars (escape hatch, logged in DEVIATIONS.md).
export default $asPartial<{
    post: BlogPostHint;
    theme_settings: BlogThemeSettingsHint;
    /** Read by the raw heading tags below (ambient), declared so callers pass it by name. */
    is_blog_post?: HandlebarsInlineValueToken<boolean>;
    show_tags?: HandlebarsInlineValueToken<boolean>;
    url?: HandlebarsInlineValueToken<string>;
}>(({post, theme_settings, show_tags, url}) => (
    <article className="blog">
        <div className="blog-post-figure">
            <$If
                query={[post.thumbnail]}
                $then={() => (
                    <figure className="blog-thumbnail">
                        <a href={post.url}>
                            <$Partial
                                name="components/common/responsive-img"
                                hash={{
                                    image: post.thumbnail,
                                    fallback_size: theme_settings.blog_size,
                                    lazyload: theme_settings.lazyload_mode,
                                }}
                            />
                        </a>
                    </figure>
                )}
            />
        </div>

        <div className="blog-post-body">
            <header className="blog-header">
                {$parseHandlebarsDangerously('<h{{#if is_blog_post}}1{{else}}2{{/if}} class="blog-title">')}
                <a href={post.url}>{post.title}</a>
                {$parseHandlebarsDangerously('</h{{#if is_blog_post}}1{{else}}2{{/if}}>')}
                <p className="blog-date">
                    <$If
                        query={[post.author]}
                        $then={() => (
                            <>
                                <$Lang translationKey={$string('blog.posted_by')} params={{name: post.author}}/> on{' '}
                            </>
                        )}
                    />
                    {post.date_published}
                </p>
            </header>

            <div className="blog-post">
                <$If
                    query={[post.body]}
                    $then={() => $unescaped(post.body)}
                    $else={() => (
                        <>
                            {$unescaped(post.summary)}
                            <$If
                                query={[post.show_read_more]}
                                $then={() => (
                                    <>
                                        {$$raw('&hellip;')}{' '}
                                        <a
                                            href={url}
                                            aria-label={`${post.title} ${$lang($string('blog.read_more'))}`}
                                        >
                                            <$Lang translationKey={$string('blog.read_more')}/>
                                        </a>
                                    </>
                                )}
                            />
                        </>
                    )}
                />
            </div>

            <$If
                query={[show_tags]}
                $then={() => (
                    <$If
                        query={[post.tags]}
                        $then={() => (
                            <ul className="tags">
                                <$Each
                                    list={post.tags}
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

            <$Partial name="components/common/share" hash={{url: post.url}}/>
        </div>
    </article>
));
