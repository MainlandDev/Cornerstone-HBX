import {$$themeSettings, $Each, $If, $lang, $partial, $pointer, $StencilPartial, $string, $unescaped, $Unless, place} from "@mainlanddev/hbx-bigcommerce";

interface SubPage {
    url: string;
    title: string;
}

export default () => {
    const settings = $$themeSettings();
    return (
        <>
            <$StencilPartial
                name={$string("page")}
                $then={() => (
                    <>
                        {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}

                        <main className="page">
                            <$Unless
                                test={settings.hide_contact_us_page_heading}
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
                            <div id="contact-us-page" className="page-content page-content--centered">
                                <$If
                                    test={$pointer("forms.contact.success")}
                                    $then={() => (
                                        <div id="contact-us-success">
                                            {$unescaped($lang($string("forms.contact_us.successful"), {shopPath: $pointer<string>("urls.home")}))}
                                        </div>
                                    )}
                                    $else={() => (
                                        <>
                                            <p>{$unescaped($pointer("page.content"))}</p>
                                            {place($partial("components/page/contact-us-form"))}
                                        </>
                                    )}
                                />
                            </div>
                        </main>
                    </>
                )}
            />

            {place($partial("layout/base"))}
        </>
    );
};
