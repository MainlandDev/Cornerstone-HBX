import {$Each, $If, $Partial, $number, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$_Region, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$limit} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {BannersHint, Hint, PageHint} from '@/context-common';
import Navigation from '@/templates/components/common/navigation';
import NavigationMenu from '@/templates/components/common/navigation-menu';

export default $asPartial<
    PageHint & {
        banners: BannersHint;
        page_type: Hint['page_type'];
        theme_settings: Hint['theme_settings'];
        urls: Hint['urls'];
        customer: Hint['customer'];
        settings: Hint['settings'];
        language_selector: Hint['language_selector'];
        currency_selector: Hint['currency_selector'];
        semantic_search_enabled: Hint['semantic_search_enabled'];
        social_media: Hint['social_media'];
        categories: Hint['categories'];
        pages: Hint['pages'];
    }
>(({
    page,
    banners,
    page_type,
    theme_settings,
    urls,
    customer,
    settings,
    language_selector,
    currency_selector,
    semantic_search_enabled,
    social_media,
    categories,
    pages,
}) => (
    <>
        <a href="#main-content" className="skip-to-main-link">
            <$Lang translationKey={$string('header.skip_to_main')}/>
        </a>
        <$If
            query={[banners.top]}
            $then={() => (
                <div className="banners" data-banner-location="top">
                    <$Each
                        list={$limit(banners.top_metadata, $number(1))}
                        $then={(banner) => (
                            <div
                                className="banner"
                                data-event-type="promotion"
                                data-entity-id={banner.id}
                                data-name={banner['banner-name']}
                                data-position={banner.location}
                                data-banner-id={banner['banner-name']}
                            >
                                <div data-event-type="promotion-click">{$unescaped(banner.content)}</div>
                            </div>
                        )}
                    />
                </div>
            )}
        />
        <header className="header" role="banner">
            <a href="#" className="mobileMenu-toggle" data-mobile-menu-toggle="menu">
                <span className="mobileMenu-toggleIcon">Toggle menu</span>
            </a>
            <Navigation
                language_selector={language_selector}
                currency_selector={currency_selector}
                customer={customer}
                settings={settings}
                theme_settings={theme_settings}
                urls={urls}
                semantic_search_enabled={semantic_search_enabled}
                social_media={social_media}
            />

            <$If
                query={[page_type, '===', $string('default')]}
                $then={() => (
                    <h1 className={`header-logo header-logo--${theme_settings['logo-position']}`}>
                        <$Partial name="components/common/store-logo"/>
                    </h1>
                )}
                $else={() => (
                    <div className={`header-logo header-logo--${theme_settings['logo-position']}`}>
                        <$Partial name="components/common/store-logo"/>
                    </div>
                )}
            />
            <div className="navPages-container" id="menu" data-menu="">
                <NavigationMenu
                    page={page}
                    categories={categories}
                    pages={pages}
                    theme_settings={theme_settings}
                    language_selector={language_selector}
                    currency_selector={currency_selector}
                    customer={customer}
                    settings={settings}
                    urls={urls}
                    semantic_search_enabled={semantic_search_enabled}
                    social_media={social_media}
                />
            </div>
            <$_Region name={$string('header_navigation_bottom--global')}/>
        </header>
        <$_Region name={$string('header_bottom--global')}/>
        <$_Region name={$string('header_bottom')}/>
    </>
));
