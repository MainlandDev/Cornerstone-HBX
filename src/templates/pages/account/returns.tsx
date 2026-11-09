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
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <h1 className="page-heading">
                            <$Lang translationKey={$string('account.returns.heading')}/>
                        </h1>
                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('returns'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />

                        <main className="account account--fixed">
                            <div className="account-body">
                                <section className="account-content">
                                    <$If
                                        query={[ctx.customer.returns]}
                                        $then={() => (
                                            <$Partial
                                                name="components/account/returns-list"
                                                hash={{returns: ctx.customer.returns, theme_settings: ctx.theme_settings}}
                                            />
                                        )}
                                        $else={() => (
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
            <$Partial name="layout/base"/>
        </>
    ),
});
