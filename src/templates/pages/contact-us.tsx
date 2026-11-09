import {$Each, $If, $Partial, $string, $unescaped, $Unless} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$_lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {ExtendedThemePageContactForm} from '@/context-pagesA';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ExtendedThemePageContactForm>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>

                        <main className="page">
                            <$Unless
                                query={[ctx.theme_settings.hide_contact_us_page_heading]}
                                $then={() => <h1 className="page-heading">{ctx.page.title}</h1>}
                            />

                            <$If
                                query={[ctx.page.sub_pages]}
                                $then={() => (
                                    <nav className="navBar navBar--sub">
                                        <ul className="navBar-section account-navigation">
                                            <$Each
                                                list={ctx.page.sub_pages}
                                                $then={(subPage) => (
                                                    <li className="navBar-item">
                                                        <a className="navBar-action" href={subPage.url}>
                                                            {subPage.title}
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
                                    query={[ctx.forms.contact.success]}
                                    $then={() => (
                                        <div id="contact-us-success">
                                            {$_lang($string('forms.contact_us.successful'), {shopPath: ctx.urls.home})}
                                        </div>
                                    )}
                                    $else={() => (
                                        <>
                                            <p>{$unescaped(ctx.page.content)}</p>
                                            <$Partial name="components/page/contact-us-form" hash={{forms: ctx.forms, customer: ctx.customer, urls: ctx.urls}}/>
                                        </>
                                    )}
                                />
                            </div>
                        </main>
                    </>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
