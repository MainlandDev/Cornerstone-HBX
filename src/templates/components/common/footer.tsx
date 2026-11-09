import {$Each, $If, $if, $number, $parseHandlebarsDangerously, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$And, $_Region, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$limit, $nl2br} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {BannersHint, Hint} from '@/context-common';
import SocialLinks from '@/templates/components/common/social-links';
import SubscriptionForm from '@/templates/components/common/subscription-form';
import PaymentIcons from '@/templates/components/common/payment-icons';

export default $asPartial<{
    banners: BannersHint;
    theme_settings: Hint['theme_settings'];
    settings: Hint['settings'];
    urls: Hint['urls'];
    customer: Hint['customer'];
    pages: Hint['pages'];
    categories: Hint['categories'];
    shop_by_brand: Hint['shop_by_brand'];
    social_media: Hint['social_media'];
}>(({banners, theme_settings, settings, urls, customer, pages, categories, shop_by_brand, social_media}) => (
    <>
        <$If
            query={[banners.bottom]}
            $then={() => (
                <div className="banners" data-banner-location="bottom">
                    <$Each
                        list={$limit(banners.bottom_metadata, $number(1))}
                        $then={(banner) => (
                            <div
                                className="banner"
                                data-event-type="promotion"
                                data-entity-id={banner.id}
                                data-name={banner['banner-name']}
                                data-position={banner.location}
                                $$={[$$raw('data-name="'), banner['banner-name'], $$raw('"')]}
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
                <$Lang translationKey={$string('footer.title')}/>
            </h2>
            <div className="container">
                <$If
                    query={[theme_settings.social_icon_placement_bottom, '!==', $string('bottom_none')]}
                    $then={() => (
                        <article
                            className={`footer-info-col footer-info-col--social footer-info-col--${$if(theme_settings.social_icon_placement_bottom, '===', $string('bottom_left')).then(() => $$raw('left')).else(() => $$raw('right'))}`}
                            data-section-type="footer-webPages"
                        >
                            <h3 className="footer-info-heading">
                                <$Lang translationKey={$string('social.connect')}/>
                            </h3>
                            <SocialLinks social_media={social_media}/>
                        </article>
                    )}
                />
                <section className="footer-info">
                    <article className="footer-info-col footer-info-col--small" data-section-type="footer-webPages">
                        <h3 className="footer-info-heading">
                            <$Lang translationKey={$string('footer.navigate')}/>
                        </h3>
                        <ul className="footer-info-list">
                            <$Each
                                list={pages}
                                $then={(page) => (
                                    <li>
                                        <a href={page.url}>{page.name}</a>
                                    </li>
                                )}
                            />
                            <li>
                                <a href={urls.sitemap}>
                                    <$Lang translationKey={$string('sitemap.page_title')}/>
                                </a>
                            </li>
                        </ul>
                    </article>

                    <article className="footer-info-col footer-info-col--small" data-section-type="footer-categories">
                        <h3 className="footer-info-heading">
                            <$Lang translationKey={$string('footer.categories')}/>
                        </h3>
                        <ul className="footer-info-list">
                            <$Each
                                list={categories}
                                $then={(category) => (
                                    <li>
                                        <a href={category.url}>{category.name}</a>
                                    </li>
                                )}
                            />
                        </ul>
                    </article>

                    <$And
                        a={theme_settings.shop_by_brand_show_footer}
                        b={shop_by_brand.length}
                        $then={() => (
                            <article className="footer-info-col footer-info-col--small" data-section-type="footer-brands">
                                <h3 className="footer-info-heading">
                                    <$Lang translationKey={$string('footer.brands')}/>
                                </h3>
                                <ul className="footer-info-list">
                                    <$Each
                                        list={shop_by_brand}
                                        $then={(brand) => (
                                            <li>
                                                <a href={brand.url}>{brand.name}</a>
                                            </li>
                                        )}
                                    />
                                    <li>
                                        <a href={urls.brands}>
                                            <$Lang translationKey={$string('common.view_all')}/>
                                        </a>
                                    </li>
                                </ul>
                            </article>
                        )}
                    />

                    <$If
                        query={[settings.address]}
                        $then={() => (
                            <article className="footer-info-col footer-info-col--small" data-section-type="storeInfo">
                                <h3 className="footer-info-heading">
                                    <$Lang translationKey={$string('footer.info')}/>
                                </h3>
                                <address>{$nl2br(settings.address)}</address>
                                <$If
                                    query={[settings.phone_number]}
                                    $then={() => (
                                        <strong>
                                            <$Lang translationKey={$string('footer.call_us')} params={{phone_number: settings.phone_number}}/>
                                        </strong>
                                    )}
                                />
                            </article>
                        )}
                    />

                    <article className="footer-info-col" data-section-type="newsletterSubscription">
                        <$If
                            query={[settings.show_newsletter_box]}
                            $then={() => <SubscriptionForm customer={customer} settings={settings} urls={urls}/>}
                        />
                        <PaymentIcons theme_settings={theme_settings}/>
                    </article>
                </section>
                <$If
                    query={[theme_settings.show_powered_by]}
                    $then={() => (
                        <div className="footer-copyright">
                            <p className="powered-by">
                                <$Lang translationKey={$string('footer.powered_by')}/>{' '}
                                <a href="https://www.bigcommerce.com?utm_source=merchant&amp;utm_medium=poweredbyBC" rel="nofollow">
                                    BigCommerce
                                </a>
                            </p>
                        </div>
                    )}
                />
                <$If
                    query={[theme_settings.show_copyright_footer]}
                    $then={() => (
                        <div className="footer-copyright">
                            <p className="powered-by">
                                {$$raw('&copy;')} {$parseHandlebarsDangerously('{{moment format="YYYY"}}')} {settings.store_name}{' '}
                            </p>
                        </div>
                    )}
                />
            </div>
            <$_Region name={$string('ssl_site_seal--global')}/>
        </footer>
    </>
));
