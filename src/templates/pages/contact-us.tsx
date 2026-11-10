/**
 * Source: templates/pages/contact-us.html (35 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L3: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>

                        {/* html L5: <main class="page"> */}
                        <main className="page">
                            {/* html L6: {{#unless theme_settings.hide_contact_us_page_heading }} */}
                            <$Unless
                                query={[ctx.theme_settings.hide_contact_us_page_heading]}
                                $then={() => /* html L7: <h1 class="page-heading">{{page.title}}</h1> */ <h1 className="page-heading">{/* html L7: {{page.title}} */}{ctx.page.title}</h1>}
                            />

                            {/* html L10: {{#if page.sub_pages}} */}
                            <$If
                                query={[ctx.page.sub_pages]}
                                $then={() => (
                                    /* html L11: <nav class="navBar navBar--sub"> */
                                    <nav className="navBar navBar--sub">
                                        {/* html L12: <ul class="navBar-section account-navigation"> */}
                                        <ul className="navBar-section account-navigation">
                                            {/* html L13: {{#each page.sub_pages}} */}
                                            <$Each
                                                list={ctx.page.sub_pages}
                                                $then={(subPage) => (
                                                    /* html L14: <li class="navBar-item"><a class="navBar-action" href="{{url}}">{{title}}</a></li> */
                                                    <li className="navBar-item">
                                                        {/* html L14: <a class="navBar-action" href="{{url}}"> */}
                                                        <a className="navBar-action" href={subPage.url}>
                                                            {/* html L14: {{title}} */}
                                                            {subPage.title}
                                                        </a>
                                                    </li>
                                                )}
                                            />
                                        </ul>
                                    </nav>
                                )}
                            />

                            {/* html L20: <div id="contact-us-page" class="page-content page-content--centered"> */}
                            <div id="contact-us-page" className="page-content page-content--centered">
                                {/* html L21: {{#if forms.contact.success}} */}
                                <$If
                                    query={[ctx.forms.contact.success]}
                                    $then={() => (
                                        /* html L22: <div id="contact-us-success">{{{lang 'forms.contact_us.successful' shopPath=urls.home}}}</div> */
                                        <div id="contact-us-success">
                                            {/* html L22: {{{lang 'forms.contact_us.successful' shopPath=urls.home}}} */}
                                            {$_lang($string('forms.contact_us.successful'), {shopPath: ctx.urls.home})}
                                        </div>
                                    )}
                                    $else={() => (
                                        <>
                                            {/* html L23: {{else}}
                                                                                              html L24: <p>{{{page.content}}}</p>
                                            */}
                                            <p>{/* html L24: {{{page.content}}} */}{$unescaped(ctx.page.content)}</p>
                                            {/* html L25: {{> components/page/contact-us-form}} */}
                                            <$Partial name="components/page/contact-us-form" hash={{forms: ctx.forms, customer: ctx.customer, urls: ctx.urls}}/>
                                        </>
                                    )}
                                />
                            </div>
                        </main>
                    </>
                )}
            />
            {/* html L34: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
