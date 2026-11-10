/**
 * Source: templates/pages/errors/403.html (19 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import type {SearchErrorPageContext} from '@/context-pagesMisc';

export default $page<SearchErrorPageContext>({
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
                            {/* html L6: <section class="page-content page-content--centered"> */}
                            <section className="page-content page-content--centered">
                                {/* html L7: <h1 class="page-heading">{{lang 'forbidden.page_heading'}}</h1> */}
                                <h1 className="page-heading">
                                    {/* html L7: {{lang 'forbidden.page_heading'}} */}
                                    <$Lang translationKey={$string('forbidden.page_heading')}/>
                                </h1>
                                {/* html L8: <p class="u-textAlignCenter"> */}
                                <p className="u-textAlignCenter">
                                    {/* html L9: {{lang 'forbidden.if_you_were_signed_in'}} */}
                                    <$Lang translationKey={$string('forbidden.if_you_were_signed_in')}/>
                                    {/* html L10: <a href="{{urls.auth.login}}">{{lang 'forbidden.sign_in'}}</a> */}
                                    <a href={ctx.urls.auth.login}>
                                        {/* html L10: {{lang 'forbidden.sign_in'}} */}
                                        <$Lang translationKey={$string('forbidden.sign_in')}/>
                                    </a>
                                    {/* html L11: {{lang 'forbidden.to_continue'}} */}
                                    <$Lang translationKey={$string('forbidden.to_continue')}/>
                                </p>
                                {/* html L13: {{> components/common/search-box}} */}
                                <$Partial name="components/common/search-box" hash={{urls: ctx.urls, forms: ctx.forms}}/>
                            </section>
                        </main>
                    </>
                )}
            />
            {/* html L18: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
