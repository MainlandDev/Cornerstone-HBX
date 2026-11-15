import {$Each, $If, $Lang, $partial, $pointer, $StencilPartial, $string, place} from "@mainlanddev/hbx-bigcommerce";

interface SitemapSection {
    label: string;
}

interface SitemapLink {
    url: string;
    label: string;
}

export default () => (
    <>
        <$StencilPartial
            name={$string("page")}
            $then={() => (
                <>
                    <h1>
                        <$Lang keyName={$string("sitemap.page_title")} />
                    </h1>
                    <ul>
                        <$Each
                            list={$pointer<SitemapSection[]>("sitemap")}
                            $then={(section) => (
                                <li>
                                    <h2>{section.label}</h2>
                                    <ul>
                                        <$Each
                                            list={$pointer<SitemapLink[]>("body")}
                                            $then={(link) => (
                                                <li>
                                                    <a href={link.url}>{link.label}</a>
                                                    <$If
                                                        test={$pointer("children")}
                                                        $then={() => (
                                                            <ul>
                                                                <$Each
                                                                    list={$pointer<unknown[]>("children")}
                                                                    $then={() => place($partial("components/sitemap/links"))}
                                                                />
                                                            </ul>
                                                        )}
                                                    />
                                                </li>
                                            )}
                                        />
                                        <$If
                                            test={$pointer("show_all_link")}
                                            $then={() => (
                                                <li>
                                                    <a href={$pointer("subsection_url")}>
                                                        <$Lang keyName={$string("sitemap.show_all_link")} />
                                                    </a>
                                                </li>
                                            )}
                                        />
                                    </ul>
                                </li>
                            )}
                        />
                    </ul>
                </>
            )}
        />
        {place($partial("layout/base"))}
    </>
);
