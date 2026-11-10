/**
 * Source: templates/pages/account/returns.html (21 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import type {ExtendedThemePageAccountReturns} from '@/context-pagesAccount';

export default $page<ExtendedThemePageAccountReturns>({
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
                        {/* html L4: <h1 class="page-heading">{{lang 'account.returns.heading' }}</h1> */}
                        <h1 className="page-heading">
                            {/* html L4: {{lang 'account.returns.heading' }} */}
                            <$Lang translationKey={$string('account.returns.heading')}/>
                        </h1>
                        {/* html L5: {{> components/account/navigation account_page='returns'}} */}
                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('returns'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />

                        {/* html L7: <main class="account account--fixed"> */}
                        <main className="account account--fixed">
                            {/* html L8: <div class="account-body"> */}
                            <div className="account-body">
                                {/* html L9: <section class="account-content"> */}
                                <section className="account-content">
                                    {/* html L10: {{#if customer.returns}} */}
                                    <$If
                                        query={[ctx.customer.returns]}
                                        $then={() => (
                                            /* html L11: {{> components/account/returns-list returns=customer.returns}} */
                                            <$Partial
                                                name="components/account/returns-list"
                                                hash={{returns: ctx.customer.returns, theme_settings: ctx.theme_settings}}
                                            />
                                        )}
                                        $else={() => (
                                            /* html L12: {{else}}
                                                                                              html L13: {{> components/common/alert/alert-info (lang 'account.returns.none')}}
                                            */
                                            <$Partial
                                                name="components/common/alert/alert-info"
                                                context={$lang($string('account.returns.none'))}
                                            />
                                        )}
                                    />
                                </section>
                            </div>
                        </main>
                    </>
                )}
            />
            {/* html L20: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
