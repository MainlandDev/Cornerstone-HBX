import {$If, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageHtmlPage} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {RssUrlsExtension} from '@/context-misc';

type Hint = ThemeContextHint<ThemePageHtmlPage>;

export default $asPartial<{urls: Hint['urls'] & RssUrlsExtension; settings: Hint['settings']}>(({urls, settings}) => (
    <>
        <p>
            <$Lang translationKey={$string('page.rss.intro')}/>
        </p>

        <$If
            query={[urls.rss.blog]}
            $then={() => (
                <>
                    <h2>
                        <$Lang translationKey={$string('page.rss.blog.heading')}/>
                    </h2>
                    <p>
                        <$Lang
                            translationKey={$string('page.rss.blog.intro')}
                            params={{limit: settings.rss_item_limit, store: settings.store_name}}
                        />
                    </p>
                    <ul>
                        <li>
                            <a href={urls.rss.blog}>
                                <$Lang translationKey={$string('page.rss.blog.rss')} params={{limit: settings.rss_item_limit}}/>
                            </a>
                        </li>
                        <li>
                            <a href={urls.rss.blog_atom}>
                                <$Lang translationKey={$string('page.rss.blog.rss_atom')} params={{limit: settings.rss_item_limit}}/>
                            </a>
                        </li>
                    </ul>
                </>
            )}
        />
        <$If
            query={[urls.rss.products.new]}
            $then={() => (
                <>
                    <h2>
                        <$Lang translationKey={$string('page.rss.products.new.heading')}/>
                    </h2>
                    <p>
                        <$Lang
                            translationKey={$string('page.rss.products.new.intro')}
                            params={{limit: settings.rss_item_limit, store: settings.store_name}}
                        />
                    </p>
                    <ul>
                        <li>
                            <a href={urls.rss.products.new}>
                                <$Lang translationKey={$string('page.rss.products.new.rss')} params={{limit: settings.rss_item_limit}}/>
                            </a>
                        </li>
                        <li>
                            <a href={urls.rss.products.new_atom}>
                                <$Lang translationKey={$string('page.rss.products.new.rss_atom')} params={{limit: settings.rss_item_limit}}/>
                            </a>
                        </li>
                    </ul>
                </>
            )}
        />
        <$If
            query={[urls.rss.products.popular]}
            $then={() => (
                <>
                    <h2>
                        <$Lang translationKey={$string('page.rss.products.popular.heading')}/>
                    </h2>
                    <p>
                        <$Lang
                            translationKey={$string('page.rss.products.popular.intro')}
                            params={{limit: settings.rss_item_limit, store: settings.store_name}}
                        />
                    </p>
                    <ul>
                        <li>
                            <a href={urls.rss.products.popular}>
                                <$Lang
                                    translationKey={$string('page.rss.products.popular.rss')}
                                    params={{limit: settings.rss_item_limit}}
                                />
                            </a>
                        </li>
                        <li>
                            <a href={urls.rss.products.popular_atom}>
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
        <$If
            query={[urls.rss.products.featured]}
            $then={() => (
                <>
                    <h2>
                        <$Lang translationKey={$string('page.rss.products.featured.heading')}/>
                    </h2>
                    <p>
                        <$Lang
                            translationKey={$string('page.rss.products.featured.intro')}
                            params={{limit: settings.rss_item_limit, store: settings.store_name}}
                        />
                    </p>
                    <ul>
                        <li>
                            <a href={urls.rss.products.featured}>
                                <$Lang
                                    translationKey={$string('page.rss.products.featured.rss')}
                                    params={{limit: settings.rss_item_limit}}
                                />
                            </a>
                        </li>
                        <li>
                            <a href={urls.rss.products.featured_atom}>
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
        <$If
            query={[urls.rss.products.search]}
            $then={() => (
                <>
                    <h2>
                        <$Lang translationKey={$string('page.rss.search.heading')}/>
                    </h2>
                    <p>
                        <$Lang translationKey={$string('page.rss.search.intro1')}/>
                    </p>
                    <p>
                        <$Lang translationKey={$string('page.rss.search.intro2')} params={{store: settings.store_name}}/>
                    </p>
                </>
            )}
        />
    </>
));
