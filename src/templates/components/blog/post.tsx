/**
 * Source: templates/components/blog/post.html (52 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
    /* html L1: <article class="blog"> */
    <article className="blog">
        {/* html L2: <div class="blog-post-figure"> */}
        <div className="blog-post-figure">
            {/* html L3: {{#if post.thumbnail}} */}
            <$If
                query={[post.thumbnail]}
                $then={() => (
                    /* html L4: <figure class="blog-thumbnail"> */
                    <figure className="blog-thumbnail">
                        {/* html L5: <a href="{{post.url}}"> */}
                        <a href={post.url}>
                            {/* html L6-10:
                               {{> components/common/responsive-img
                                   image=post.thumbnail
                                   fallback_size=theme_settings.blog_size
                                   lazyload=theme_settings.lazyload_mode
                               }}
                            */}
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

        {/* html L16: <div class="blog-post-body"> */}
        <div className="blog-post-body">
            {/* html L17: <header class="blog-header"> */}
            <header className="blog-header">
                {$parseHandlebarsDangerously('<h{{#if is_blog_post}}1{{else}}2{{/if}} class="blog-title">')}
                {/* html L19: <a href="{{post.url}}">{{post.title}}</a> */}
                <a href={post.url}>{/* html L19: {{post.title}} */}{post.title}</a>
                {$parseHandlebarsDangerously('</h{{#if is_blog_post}}1{{else}}2{{/if}}>')}
                {/* html L21: <p class="blog-date">{{#if post.author}}{{lang 'blog.posted_by' name=post.author}} on {{/if}}{{post.date_published}}</p> */}
                <p className="blog-date">
                    {/* html L21: {{#if post.author}} */}
                    <$If
                        query={[post.author]}
                        $then={() => (
                            <>
                                {/* html L21: {{lang 'blog.posted_by' name=post.author}} */}
                                <$Lang translationKey={$string('blog.posted_by')} params={{name: post.author}}/> on{' '}
                            </>
                        )}
                    />
                    {/* html L21: {{post.date_published}} */}
                    {post.date_published}
                </p>
            </header>

            {/* html L24: <div class="blog-post"> */}
            <div className="blog-post">
                {/* html L25: {{#if post.body}} */}
                <$If
                    query={[post.body]}
                    $then={() => $unescaped(post.body)}
                    $else={() => (
                        <>
                            {/* html L27: {{else}}
                                                              html L28: {{{post.summary}}}
                            */}
                            {$unescaped(post.summary)}
                            {/* html L29: {{#if post.show_read_more}} */}
                            <$If
                                query={[post.show_read_more]}
                                $then={() => (
                                    <>
                                        {$$raw('&hellip;')}{' '}
                                        {/* html L30: &hellip; <a href="{{url}}" aria-label="{{post.title}} {{lang 'blog.read_more'}}">{{lang 'blog.read_more'}}</a> */}
                                        <a
                                            href={url}
                                            aria-label={`${post.title} ${$lang($string('blog.read_more'))}`}
                                        >
                                            {/* html L30: {{lang 'blog.read_more'}} */}
                                            <$Lang translationKey={$string('blog.read_more')}/>
                                        </a>
                                    </>
                                )}
                            />
                        </>
                    )}
                />
            </div>

            {/* html L36: {{#if show_tags}} */}
            <$If
                query={[show_tags]}
                $then={() => (
                    /* html L37: {{#if post.tags}} */
                    <$If
                        query={[post.tags]}
                        $then={() => (
                            /* html L38: <ul class="tags"> */
                            <ul className="tags">
                                {/* html L39: {{#each post.tags}} */}
                                <$Each
                                    list={post.tags}
                                    $then={(tag) => (
                                        /* html L40: <li class="tag"> */
                                        <li className="tag">
                                            {/* html L41: <a href="{{url}}">#{{name}}</a> */}
                                            <a href={tag.url}>#{/* html L41: {{name}} */}{tag.name}</a>
                                        </li>
                                    )}
                                />
                            </ul>
                        )}
                    />
                )}
            />

            {/* html L48: {{>components/common/share url=post.url}} */}
            <$Partial name="components/common/share" hash={{url: post.url}}/>
        </div>
    </article>
));
