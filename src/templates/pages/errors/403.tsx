import {$Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import type {SearchErrorPageContext} from '@/context-pagesMisc';

export default $page<SearchErrorPageContext>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>

                        <main className="page">
                            <section className="page-content page-content--centered">
                                <h1 className="page-heading">
                                    <$Lang translationKey={$string('forbidden.page_heading')}/>
                                </h1>
                                <p className="u-textAlignCenter">
                                    <$Lang translationKey={$string('forbidden.if_you_were_signed_in')}/>
                                    <a href={ctx.urls.auth.login}>
                                        <$Lang translationKey={$string('forbidden.sign_in')}/>
                                    </a>
                                    <$Lang translationKey={$string('forbidden.to_continue')}/>
                                </p>
                                <$Partial name="components/common/search-box" hash={{urls: ctx.urls, forms: ctx.forms}}/>
                            </section>
                        </main>
                    </>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
