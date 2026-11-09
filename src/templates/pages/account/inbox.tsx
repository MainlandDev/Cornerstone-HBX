import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import type {ExtendedThemePageInbox} from '@/context-pagesAccount';

export default $page<ExtendedThemePageInbox>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <h1 className="page-heading">
                            <$Lang translationKey={$string('account.messages.heading')}/>
                        </h1>
                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('messages'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />

                        <main className="account account--fixed">
                            <div className="account-body">
                                <section className="account-content">
                                    <$If
                                        query={[ctx.forms.inbox.error]}
                                        $then={() => <$Partial name="components/common/alert/alert-error" context={ctx.forms.inbox.error}/>}
                                    />
                                    <$If
                                        query={[ctx.forms.inbox.success]}
                                        $then={() => <$Partial name="components/common/alert/alert-success" context={ctx.forms.inbox.success}/>}
                                    />
                                    <$Partial
                                        name="components/account/messages-list"
                                        hash={{messages: ctx.customer.inbox.messages, settings: ctx.settings}}
                                    />
                                    <$Partial name="components/account/messages-form" hash={{customer: ctx.customer, urls: ctx.urls}}/>
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
