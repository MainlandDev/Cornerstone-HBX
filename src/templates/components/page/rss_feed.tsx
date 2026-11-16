"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <>
        <p>
            <$Lang keyName={$string("page.rss.intro")} />
        </p>

        <$If
            test={$pointer("urls.rss.blog")}
            $then={() => (
                <>
                    <h2>
                        <$Lang keyName={$string("page.rss.blog.heading")} />
                    </h2>
                    <p>
                        <$Lang keyName={$string("page.rss.blog.intro")} limit={$pointer("settings.rss_item_limit")} store={$pointer("settings.store_name")} />
                    </p>
                    <ul>
                        <li>
                            <a href={$pointer("urls.rss.blog")}>
                                <$Lang keyName={$string("page.rss.blog.rss")} limit={$pointer("settings.rss_item_limit")} />
                            </a>
                        </li>
                        <li>
                            <a href={$pointer("urls.rss.blog_atom")}>
                                <$Lang keyName={$string("page.rss.blog.rss_atom")} limit={$pointer("settings.rss_item_limit")} />
                            </a>
                        </li>
                    </ul>
                </>
            )}
        />
        <$If
            test={$pointer("urls.rss.products.new")}
            $then={() => (
                <>
                    <h2>
                        <$Lang keyName={$string("page.rss.products.new.heading")} />
                    </h2>
                    <p>
                        <$Lang
                            keyName={$string("page.rss.products.new.intro")}
                            limit={$pointer("settings.rss_item_limit")}
                            store={$pointer("settings.store_name")}
                        />
                    </p>
                    <ul>
                        <li>
                            <a href={$pointer("urls.rss.products.new")}>
                                <$Lang keyName={$string("page.rss.products.new.rss")} limit={$pointer("settings.rss_item_limit")} />
                            </a>
                        </li>
                        <li>
                            <a href={$pointer("urls.rss.products.new_atom")}>
                                <$Lang keyName={$string("page.rss.products.new.rss_atom")} limit={$pointer("settings.rss_item_limit")} />
                            </a>
                        </li>
                    </ul>
                </>
            )}
        />
        <$If
            test={$pointer("urls.rss.products.popular")}
            $then={() => (
                <>
                    <h2>
                        <$Lang keyName={$string("page.rss.products.popular.heading")} />
                    </h2>
                    <p>
                        <$Lang
                            keyName={$string("page.rss.products.popular.intro")}
                            limit={$pointer("settings.rss_item_limit")}
                            store={$pointer("settings.store_name")}
                        />
                    </p>
                    <ul>
                        <li>
                            <a href={$pointer("urls.rss.products.popular")}>
                                <$Lang keyName={$string("page.rss.products.popular.rss")} limit={$pointer("settings.rss_item_limit")} />
                            </a>
                        </li>
                        <li>
                            <a href={$pointer("urls.rss.products.popular_atom")}>
                                <$Lang keyName={$string("page.rss.products.popular.rss_atom")} limit={$pointer("settings.rss_item_limit")} />
                            </a>
                        </li>
                    </ul>
                </>
            )}
        />
        <$If
            test={$pointer("urls.rss.products.featured")}
            $then={() => (
                <>
                    <h2>
                        <$Lang keyName={$string("page.rss.products.featured.heading")} />
                    </h2>
                    <p>
                        <$Lang
                            keyName={$string("page.rss.products.featured.intro")}
                            limit={$pointer("settings.rss_item_limit")}
                            store={$pointer("settings.store_name")}
                        />
                    </p>
                    <ul>
                        <li>
                            <a href={$pointer("urls.rss.products.featured")}>
                                <$Lang keyName={$string("page.rss.products.featured.rss")} limit={$pointer("settings.rss_item_limit")} />
                            </a>
                        </li>
                        <li>
                            <a href={$pointer("urls.rss.products.featured_atom")}>
                                <$Lang keyName={$string("page.rss.products.featured.rss_atom")} limit={$pointer("settings.rss_item_limit")} />
                            </a>
                        </li>
                    </ul>
                </>
            )}
        />
        <$If
            test={$pointer("urls.rss.products.search")}
            $then={() => (
                <>
                    <h2>
                        <$Lang keyName={$string("page.rss.search.heading")} />
                    </h2>
                    <p>
                        <$Lang keyName={$string("page.rss.search.intro1")} />
                    </p>
                    <p>
                        <$Lang keyName={$string("page.rss.search.intro2")} store={$pointer("settings.store_name")} />
                    </p>
                </>
            )}
        />
    </>
);
