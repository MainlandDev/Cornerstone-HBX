/**
 * Source: templates/components/common/header.html (35 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
        {/* html L1: <a href="#main-content" class="skip-to-main-link">{{lang 'header.skip_to_main'}}</a> */}
        <a href="#main-content" className="skip-to-main-link">
            {/* html L1: {{lang 'header.skip_to_main'}} */}
            <$Lang translationKey={$string('header.skip_to_main')}/>
        </a>
        {/* html L2: {{#if banners.top}} */}
        <$If
            query={[banners.top]}
            $then={() => (
                /* html L3: <div class="banners" data-banner-location="top"> */
                <div className="banners" data-banner-location="top">
                    {/* html L4: {{#each (limit banners.top_metadata 1)}} */}
                    <$Each
                        list={$limit(banners.top_metadata, $number(1))}
                        $then={(banner) => (
                            /* html L5: <div class="banner" data-event-type="promotion" data-entity-id="{{this.id}}" data-name="{{this.banner-name}}" data-position="{{this.location}}" data-banner-id="{{this.banner-name}}"> */
                            <div
                                className="banner"
                                data-event-type="promotion"
                                data-entity-id={banner.id}
                                data-name={banner['banner-name']}
                                data-position={banner.location}
                                data-banner-id={banner['banner-name']}
                            >
                                {/* html L6: <div data-event-type="promotion-click"> */}
                                <div data-event-type="promotion-click">{/* html L7: {{{this.content}}} */}{$unescaped(banner.content)}</div>
                            </div>
                        )}
                    />
                </div>
            )}
        />
        {/* html L13: <header class="header" role="banner"> */}
        <header className="header" role="banner">
            {/* html L14: <a href="#" class="mobileMenu-toggle" data-mobile-menu-toggle="menu"> */}
            <a href="#" className="mobileMenu-toggle" data-mobile-menu-toggle="menu">
                {/* html L15: <span class="mobileMenu-toggleIcon">Toggle menu</span> */}
                <span className="mobileMenu-toggleIcon">Toggle menu</span>
            </a>
            {/* html L17: {{> components/common/navigation}} */}
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

            {/* html L19: {{#if page_type '===' 'default'}} */}
            <$If
                query={[page_type, '===', $string('default')]}
                $then={() => (
                    /* html L20: <h1 class="header-logo header-logo--{{theme_settings.logo-position}}"> */
                    <h1 className={`header-logo header-logo--${theme_settings['logo-position']}`}>
                        {/* html L21: {{> components/common/store-logo}} */}
                        <$Partial name="components/common/store-logo"/>
                    </h1>
                )}
                $else={() => (
                    /* html L23: {{else}}
                                              html L24: <div class="header-logo header-logo--{{theme_settings.logo-position}}">
                    */
                    <div className={`header-logo header-logo--${theme_settings['logo-position']}`}>
                        {/* html L25: {{> components/common/store-logo}} */}
                        <$Partial name="components/common/store-logo"/>
                    </div>
                )}
            />
            {/* html L28: <div class="navPages-container" id="menu" data-menu> */}
            <div className="navPages-container" id="menu" data-menu="">
                {/* html L29: {{> components/common/navigation-menu}} */}
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
            {/* html L31: {{{region name="header_navigation_bottom--global"}}} */}
            <$_Region name={$string('header_navigation_bottom--global')}/>
        </header>
        {/* html L33: {{{region name="header_bottom--global"}}} */}
        <$_Region name={$string('header_bottom--global')}/>
        {/* html L34: {{{region name="header_bottom"}}} */}
        <$_Region name={$string('header_bottom')}/>
    </>
));
