/**
 * Source: templates/components/page/rss_feed.html (68 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageHtmlPage} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {RssUrlsExtension} from '@/context-misc';

type Hint = ThemeContextHint<ThemePageHtmlPage>;

export default $asPartial<{urls: Hint['urls'] & RssUrlsExtension; settings: Hint['settings']}>(({urls, settings}) => (
    <>
        {/* html L1: <p>{{lang 'page.rss.intro'}}</p> */}
        <p>
            {/* html L1: {{lang 'page.rss.intro'}} */}
            <$Lang translationKey={$string('page.rss.intro')}/>
        </p>

        {/* html L3: {{#if urls.rss.blog}} */}
        <$If
            query={[urls.rss.blog]}
            $then={() => (
                <>
                    {/* html L4: <h2>{{lang 'page.rss.blog.heading'}}</h2> */}
                    <h2>
                        {/* html L4: {{lang 'page.rss.blog.heading'}} */}
                        <$Lang translationKey={$string('page.rss.blog.heading')}/>
                    </h2>
                    {/* html L5: <p> */}
                    <p>
                        {/* html L6: {{lang 'page.rss.blog.intro' limit=settings.rss_item_limit store=settings.store_name}} */}
                        <$Lang
                            translationKey={$string('page.rss.blog.intro')}
                            params={{limit: settings.rss_item_limit, store: settings.store_name}}
                        />
                    </p>
                    {/* html L8: <ul> */}
                    <ul>
                        {/* html L9: <li> */}
                        <li>
                            {/* html L10: <a href="{{urls.rss.blog}}">{{lang 'page.rss.blog.rss' limit=settings.rss_item_limit}}</a> */}
                            <a href={urls.rss.blog}>
                                {/* html L10: {{lang 'page.rss.blog.rss' limit=settings.rss_item_limit}} */}
                                <$Lang translationKey={$string('page.rss.blog.rss')} params={{limit: settings.rss_item_limit}}/>
                            </a>
                        </li>
                        {/* html L12: <li> */}
                        <li>
                            {/* html L13: <a href="{{urls.rss.blog_atom}}">{{lang 'page.rss.blog.rss_atom' limit=settings.rss_item_limit}}</a> */}
                            <a href={urls.rss.blog_atom}>
                                {/* html L13: {{lang 'page.rss.blog.rss_atom' limit=settings.rss_item_limit}} */}
                                <$Lang translationKey={$string('page.rss.blog.rss_atom')} params={{limit: settings.rss_item_limit}}/>
                            </a>
                        </li>
                    </ul>
                </>
            )}
        />
        {/* html L17: {{#if urls.rss.products.new}} */}
        <$If
            query={[urls.rss.products.new]}
            $then={() => (
                <>
                    {/* html L18: <h2>{{lang 'page.rss.products.new.heading'}}</h2> */}
                    <h2>
                        {/* html L18: {{lang 'page.rss.products.new.heading'}} */}
                        <$Lang translationKey={$string('page.rss.products.new.heading')}/>
                    </h2>
                    {/* html L19: <p> */}
                    <p>
                        {/* html L20: {{lang 'page.rss.products.new.intro' limit=settings.rss_item_limit store=settings.store_name}} */}
                        <$Lang
                            translationKey={$string('page.rss.products.new.intro')}
                            params={{limit: settings.rss_item_limit, store: settings.store_name}}
                        />
                    </p>
                    {/* html L22: <ul> */}
                    <ul>
                        {/* html L23: <li> */}
                        <li>
                            {/* html L24: <a href="{{urls.rss.products.new}}">{{lang 'page.rss.products.new.rss' limit=settings.rss_item_limit}}</a> */}
                            <a href={urls.rss.products.new}>
                                {/* html L24: {{lang 'page.rss.products.new.rss' limit=settings.rss_item_limit}} */}
                                <$Lang translationKey={$string('page.rss.products.new.rss')} params={{limit: settings.rss_item_limit}}/>
                            </a>
                        </li>
                        {/* html L26: <li> */}
                        <li>
                            {/* html L27: <a href="{{urls.rss.products.new_atom}}">{{lang 'page.rss.products.new.rss_atom' limit=settings.rss_item_limit}}</a> */}
                            <a href={urls.rss.products.new_atom}>
                                {/* html L27: {{lang 'page.rss.products.new.rss_atom' limit=settings.rss_item_limit}} */}
                                <$Lang translationKey={$string('page.rss.products.new.rss_atom')} params={{limit: settings.rss_item_limit}}/>
                            </a>
                        </li>
                    </ul>
                </>
            )}
        />
        {/* html L31: {{#if urls.rss.products.popular}} */}
        <$If
            query={[urls.rss.products.popular]}
            $then={() => (
                <>
                    {/* html L32: <h2>{{lang 'page.rss.products.popular.heading'}}</h2> */}
                    <h2>
                        {/* html L32: {{lang 'page.rss.products.popular.heading'}} */}
                        <$Lang translationKey={$string('page.rss.products.popular.heading')}/>
                    </h2>
                    {/* html L33: <p> */}
                    <p>
                        {/* html L34: {{lang 'page.rss.products.popular.intro' limit=settings.rss_item_limit store=settings.store_name}} */}
                        <$Lang
                            translationKey={$string('page.rss.products.popular.intro')}
                            params={{limit: settings.rss_item_limit, store: settings.store_name}}
                        />
                    </p>
                    {/* html L36: <ul> */}
                    <ul>
                        {/* html L37: <li> */}
                        <li>
                            {/* html L38: <a href="{{urls.rss.products.popular}}">{{lang 'page.rss.products.popular.rss' limit=settings.rss_item_limit}}</a> */}
                            <a href={urls.rss.products.popular}>
                                {/* html L38: {{lang 'page.rss.products.popular.rss' limit=settings.rss_item_limit}} */}
                                <$Lang
                                    translationKey={$string('page.rss.products.popular.rss')}
                                    params={{limit: settings.rss_item_limit}}
                                />
                            </a>
                        </li>
                        {/* html L40: <li> */}
                        <li>
                            {/* html L41: <a href="{{urls.rss.products.popular_atom}}">{{lang 'page.rss.products.popular.rss_atom' limit=settings.rss_item_limit}}</a> */}
                            <a href={urls.rss.products.popular_atom}>
                                {/* html L41: {{lang 'page.rss.products.popular.rss_atom' limit=settings.rss_item_limit}} */}
                                <$Lang
                                    translationKey={$string('page.rss.products.popular.rss_atom')}
                                    params={{limit: settings.rss_item_limit}}
                                />
                            </a>
                        </li>
                    </ul>
                </>
            )}
        />
        {/* html L45: {{#if urls.rss.products.featured}} */}
        <$If
            query={[urls.rss.products.featured]}
            $then={() => (
                <>
                    {/* html L46: <h2>{{lang 'page.rss.products.featured.heading'}}</h2> */}
                    <h2>
                        {/* html L46: {{lang 'page.rss.products.featured.heading'}} */}
                        <$Lang translationKey={$string('page.rss.products.featured.heading')}/>
                    </h2>
                    {/* html L47: <p> */}
                    <p>
                        {/* html L48: {{lang 'page.rss.products.featured.intro' limit=settings.rss_item_limit store=settings.store_name}} */}
                        <$Lang
                            translationKey={$string('page.rss.products.featured.intro')}
                            params={{limit: settings.rss_item_limit, store: settings.store_name}}
                        />
                    </p>
                    {/* html L50: <ul> */}
                    <ul>
                        {/* html L51: <li> */}
                        <li>
                            {/* html L52: <a href="{{urls.rss.products.featured}}">{{lang 'page.rss.products.featured.rss' limit=settings.rss_item_limit}}</a> */}
                            <a href={urls.rss.products.featured}>
                                {/* html L52: {{lang 'page.rss.products.featured.rss' limit=settings.rss_item_limit}} */}
                                <$Lang
                                    translationKey={$string('page.rss.products.featured.rss')}
                                    params={{limit: settings.rss_item_limit}}
                                />
                            </a>
                        </li>
                        {/* html L54: <li> */}
                        <li>
                            {/* html L55: <a href="{{urls.rss.products.featured_atom}}">{{lang 'page.rss.products.featured.rss_atom' limit=settings.rss_item_limit}}</a> */}
                            <a href={urls.rss.products.featured_atom}>
                                {/* html L55: {{lang 'page.rss.products.featured.rss_atom' limit=settings.rss_item_limit}} */}
                                <$Lang
                                    translationKey={$string('page.rss.products.featured.rss_atom')}
                                    params={{limit: settings.rss_item_limit}}
                                />
                            </a>
                        </li>
                    </ul>
                </>
            )}
        />
        {/* html L59: {{#if urls.rss.products.search}} */}
        <$If
            query={[urls.rss.products.search]}
            $then={() => (
                <>
                    {/* html L60: <h2>{{lang 'page.rss.search.heading'}}</h2> */}
                    <h2>
                        {/* html L60: {{lang 'page.rss.search.heading'}} */}
                        <$Lang translationKey={$string('page.rss.search.heading')}/>
                    </h2>
                    {/* html L61: <p> */}
                    <p>
                        {/* html L62: {{lang 'page.rss.search.intro1'}} */}
                        <$Lang translationKey={$string('page.rss.search.intro1')}/>
                    </p>
                    {/* html L64: <p> */}
                    <p>
                        {/* html L65: {{lang 'page.rss.search.intro2' store=settings.store_name}} */}
                        <$Lang translationKey={$string('page.rss.search.intro2')} params={{store: settings.store_name}}/>
                    </p>
                </>
            )}
        />
    </>
));
