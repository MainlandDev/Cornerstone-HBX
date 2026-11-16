import {
    $$themeSettings,
    $And,
    $Each,
    $If,
    $Lang,
    $limit,
    $Nl2br,
    $number,
    $partial,
    $pointer,
    $raw,
    $region,
    $string,
    $unescaped,
    place,
} from "@mainlanddev/hbx-bigcommerce";

interface Banner {
    id: string;
    location: string;
    content: string;
    "banner-name": string;
}

interface Link {
    url: string;
    name: string;
}

/** `{{{region name="…"}}}` */
const region = (name: string) => place($unescaped($region({name: $string(name)})));

export default () => {
    const theme = $$themeSettings();
    return (
        <>
            <$If
                test={$pointer("banners.bottom")}
                $then={() => (
                    <div className="banners" data-banner-location="bottom">
                        <$Each
                            list={$limit($pointer<Banner[]>("banners.bottom_metadata"), $number(1))}
                            $then={(banner) => (
                                <div
                                    className="banner"
                                    dangerouslyInlineAttributes={{
                                        attributes: `data-event-type="promotion" data-entity-id="${banner.id}" data-name="${banner["banner-name"]}" data-position="${banner.location}" data-name="${banner["banner-name"]}"`,
                                    }}
                                >
                                    <div data-event-type="promotion-click">{$unescaped(banner.content)}</div>
                                </div>
                            )}
                        />
                    </div>
                )}
            />
            <footer className="footer" role="contentinfo">
                <h2 className="footer-title-sr-only">
                    <$Lang keyName={$string("footer.title")} />
                </h2>
                <div className="container">
                    <$If
                        test={$pointer("theme_settings.social_icon_placement_bottom")}
                        operator={$string("!==")}
                        rvalue={$string("bottom_none")}
                        $then={() => (
                            <article
                                className={`footer-info-col footer-info-col--social footer-info-col--${$If({test: $pointer("theme_settings.social_icon_placement_bottom"), operator: $string("==="), rvalue: $string("bottom_left"), $then: () => "left", $else: () => "right"})}`}
                                data-section-type="footer-webPages"
                            >
                                <h3 className="footer-info-heading">
                                    <$Lang keyName={$string("social.connect")} />
                                </h3>
                                {place($partial("components/common/social-links"))}
                            </article>
                        )}
                    />

                    <section className="footer-info">
                        <article className="footer-info-col footer-info-col--small" data-section-type="footer-webPages">
                            <h3 className="footer-info-heading">
                                <$Lang keyName={$string("footer.navigate")} />
                            </h3>
                            <ul className="footer-info-list">
                                <$Each
                                    list={$pointer<Link[]>("pages")}
                                    $then={(page) => (
                                        <li>
                                            <a href={page.url}>{page.name}</a>
                                        </li>
                                    )}
                                />
                                <li>
                                    <a href={$pointer("urls.sitemap")}>
                                        <$Lang keyName={$string("sitemap.page_title")} />
                                    </a>
                                </li>
                            </ul>
                        </article>

                        <article className="footer-info-col footer-info-col--small" data-section-type="footer-categories">
                            <h3 className="footer-info-heading">
                                <$Lang keyName={$string("footer.categories")} />
                            </h3>
                            <ul className="footer-info-list">
                                <$Each
                                    list={$pointer<Link[]>("categories")}
                                    $then={(category) => (
                                        <li>
                                            <a href={category.url}>{category.name}</a>
                                        </li>
                                    )}
                                />
                            </ul>
                        </article>

                        <$And
                            a={theme.shop_by_brand_show_footer}
                            b={$pointer("shop_by_brand.length")}
                            $then={() => (
                                <article className="footer-info-col footer-info-col--small" data-section-type="footer-brands">
                                    <h3 className="footer-info-heading">
                                        <$Lang keyName={$string("footer.brands")} />
                                    </h3>
                                    <ul className="footer-info-list">
                                        <$Each
                                            list={$pointer<Link[]>("shop_by_brand")}
                                            $then={(brand) => (
                                                <li>
                                                    <a href={brand.url}>{brand.name}</a>
                                                </li>
                                            )}
                                        />
                                        <li>
                                            <a href={$pointer("urls.brands")}>
                                                <$Lang keyName={$string("common.view_all")} />
                                            </a>
                                        </li>
                                    </ul>
                                </article>
                            )}
                        />

                        <$If
                            test={$pointer("settings.address")}
                            $then={() => (
                                <article className="footer-info-col footer-info-col--small" data-section-type="storeInfo">
                                    <h3 className="footer-info-heading">
                                        <$Lang keyName={$string("footer.info")} />
                                    </h3>
                                    <address>
                                        <$Nl2br text={$pointer("settings.address")} />
                                    </address>
                                    <$If
                                        test={$pointer("settings.phone_number")}
                                        $then={() => (
                                            <strong>
                                                <$Lang keyName={$string("footer.call_us")} phone_number={$pointer("settings.phone_number")} />
                                            </strong>
                                        )}
                                    />
                                </article>
                            )}
                        />

                        <article className="footer-info-col" data-section-type="newsletterSubscription">
                            <$If
                                test={$pointer("settings.show_newsletter_box")}
                                $then={() => place($partial("components/common/subscription-form"))}
                            />
                            {place($partial("components/common/payment-icons"))}
                        </article>
                    </section>
                    <$If
                        test={theme.show_powered_by}
                        $then={() => (
                            <div className="footer-copyright">
                                <p className="powered-by">
                                    <$Lang keyName={$string("footer.powered_by")} />{" "}
                                    <a href="https://www.bigcommerce.com?utm_source=merchant&amp;utm_medium=poweredbyBC" rel="nofollow">
                                        BigCommerce
                                    </a>
                                </p>
                            </div>
                        )}
                    />
                    <$If
                        test={theme.show_copyright_footer}
                        $then={() => (
                            <div className="footer-copyright">
                                <p className="powered-by">
                                    {$raw("&copy; ")}
                                    {$raw('{{moment format="YYYY"}}')} {$pointer("settings.store_name")}{" "}
                                </p>
                            </div>
                        )}
                    />
                </div>
                {region("ssl_site_seal--global")}
            </footer>
        </>
    );
};
