/**
 * Source: templates/pages/errors/404.html (18 lines). Per-element comments below quote the original lines (`html L<n>`).
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
                                {/* html L7: <h1 class="page-heading">{{lang 'page_not_found.page_heading'}}</h1> */}
                                <h1 className="page-heading">
                                    {/* html L7: {{lang 'page_not_found.page_heading'}} */}
                                    <$Lang translationKey={$string('page_not_found.page_heading')}/>
                                </h1>
                                {/* html L8: <p class="u-textAlignCenter"> */}
                                <p className="u-textAlignCenter">
                                    {/* html L9: {{lang 'page_not_found.message'}} */}
                                    <$Lang translationKey={$string('page_not_found.message')}/>
                                </p>

                                {/* html L12: {{> components/common/search-box}} */}
                                <$Partial name="components/common/search-box" hash={{urls: ctx.urls, forms: ctx.forms}}/>
                            </section>
                        </main>
                    </>
                )}
            />
            {/* html L17: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
