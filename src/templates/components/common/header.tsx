import {$Each, $If, $Lang, $limit, $number, $partial, $pointer, $raw, $region, $string, $unescaped, place} from "@mainlanddev/hbx-bigcommerce";

interface Banner {
    id: string;
    location: string;
    content: string;
    "banner-name": string;
}

/** `{{{region name="…"}}}` */
const region = (name: string) => place($unescaped($region({name: $string(name)})));

export default () => {
    return (
        <>
            <a href="#main-content" className="skip-to-main-link">
                <$Lang keyName={$string("header.skip_to_main")} />
            </a>
            <$If
                test={$pointer("banners.top")}
                $then={() => (
                    <div className="banners" data-banner-location="top">
                        <$Each
                            list={$limit($pointer<Banner[]>("banners.top_metadata"), $number(1))}
                            $then={(banner) => (
                                <div
                                    className="banner"
                                    dangerouslyInlineAttributes={{
                                        attributes: `data-event-type="promotion" data-entity-id="${banner.id}" data-name="${banner["banner-name"]}" data-position="${banner.location}" data-banner-id="${banner["banner-name"]}"`,
                                    }}
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
                {place($partial("components/common/navigation"))}

                {$raw("{{#if page_type '===' 'default'}}")}
                <h1 className={`header-logo header-logo--${$pointer("theme_settings.logo-position")}`}>
                    {place($partial("components/common/store-logo"))}
                </h1>
                {$raw("{{else}}")}
                <div className={`header-logo header-logo--${$pointer("theme_settings.logo-position")}`}>
                    {place($partial("components/common/store-logo"))}
                </div>
                {$raw("{{/if}}")}
                <div className="navPages-container" id="menu" data-menu={""}>
                    {place($partial("components/common/navigation-menu"))}
                </div>
                {region("header_navigation_bottom--global")}
            </header>
            {region("header_bottom--global")}
            {" "}
            {region("header_bottom")}
        </>
    );
};
