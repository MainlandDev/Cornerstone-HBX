import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import PageRssFeed from "../components/page/rss_feed.tsx";
import Breadcrumbs from "../components/common/breadcrumbs.tsx";
import {
    $Each,
    $If,
    $Page,
    $pointer,
    $Replace,
    $region,
    $string,
    $unescaped,
    $Unless,
} from "@mainlanddev/hbx-bigcommerce";

interface SubPage {
    url: string;
    title: string;
}

interface FeedItem {
    url: string;
    title: string;
    content: string;
}

/** `{{{region name="…"}}}` */
const region = (name: string) => $unescaped($region({name: $string(name)}));

export default () => {
    const settings = $pointer<ThemeSettingsObject>("theme_settings");
    return (
        <$Page
            blocks={{
                page: () => (
                    <>
                        <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />

                        <main className="page">
                            <$Unless
                                test={settings.hide_page_heading}
                                $then={() => <h1 className="page-heading">{$pointer("page.title")}</h1>}
                            />
                            <$If
                                test={$pointer("page.sub_pages")}
                                $then={() => (
                                    <nav className="navBar navBar--sub">
                                        <ul className="navBar-section account-navigation">
                                            <$Each
                                                list={$pointer<SubPage[]>("page.sub_pages")}
                                                $then={(sub) => (
                                                    <li className="navBar-item">
                                                        <a className="navBar-action" href={sub.url}>
                                                            {sub.title}
                                                        </a>
                                                    </li>
                                                )}
                                            />
                                        </ul>
                                    </nav>
                                )}
                            />

                            {region("page_builder_content")}

                            <div className="page-content page-content--centered">
                                <$Replace
                                    needle={$string("%%Syndicate%%")}
                                    haystack={$pointer<string>("page.content")}
                                    $then={() => <PageRssFeed />}
                                    $else={() => (
                                        <p>{$unescaped($pointer("page.content"))}</p>
                                    )}
                                />
                            </div>

                            <$If
                                test={$pointer("page.feed")}
                                $then={() => (
                                    <ul>
                                        <$Each
                                            list={$pointer<FeedItem[]>("page.feed")}
                                            $then={(item) => (
                                                <li>
                                                    <h6>
                                                        <a href={item.url} target="_blank">
                                                            {" "}{item.title}{" "}
                                                        </a>
                                                    </h6>
                                                    <p>{item.content}</p>
                                                </li>
                                            )}
                                        />
                                    </ul>
                                )}
                            />
                        </main>
                    </>
                ),
            }}
            layout="layout/base"
        />
    );
};
