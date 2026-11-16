"use server";
import Navigation from "./navigation.tsx";
import StoreLogo from "./store-logo.tsx";
import NavigationMenu from "./navigation-menu.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $limit, $number, $pointer, $region, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

interface Banner {
    id: string;
    location: string;
    content: string;
    "banner-name": string;
}

/** `{{{region name="…"}}}` */
const region = (name: string) => $unescaped($region({name: $string(name)}));

export default (_props: PartialProps) => {
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
                <Navigation />

                <$If
                    test={$pointer("page_type")}
                    operator={$string("===")}
                    rvalue={$string("default")}
                    $then={() => (
                        <h1 className={`header-logo header-logo--${$pointer("theme_settings.logo-position")}`}>
                            <StoreLogo />
                        </h1>
                    )}
                    $else={() => (
                        <div className={`header-logo header-logo--${$pointer("theme_settings.logo-position")}`}>
                            <StoreLogo />
                        </div>
                    )}
                />
                <div className="navPages-container" id="menu" data-menu={""}>
                    <NavigationMenu />
                </div>
                {region("header_navigation_bottom--global")}
            </header>
            {region("header_bottom--global")}
            {" "}
            {region("header_bottom")}
        </>
    );
};
