/**
 * Source: templates/pages/account/inbox.html (24 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import type {ExtendedThemePageInbox} from '@/context-pagesAccount';

export default $page<ExtendedThemePageInbox>({
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
                        {/* html L4: <h1 class="page-heading">{{lang 'account.messages.heading' }}</h1> */}
                        <h1 className="page-heading">
                            {/* html L4: {{lang 'account.messages.heading' }} */}
                            <$Lang translationKey={$string('account.messages.heading')}/>
                        </h1>
                        {/* html L5: {{> components/account/navigation account_page='messages'}} */}
                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('messages'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />

                        {/* html L7: <main class="account account--fixed"> */}
                        <main className="account account--fixed">
                            {/* html L8: <div class="account-body"> */}
                            <div className="account-body">
                                {/* html L9: <section class="account-content"> */}
                                <section className="account-content">
                                    {/* html L10: {{#if forms.inbox.error}} */}
                                    <$If
                                        query={[ctx.forms.inbox.error]}
                                        $then={() => /* html L11: {{> components/common/alert/alert-error forms.inbox.error}} */ <$Partial name="components/common/alert/alert-error" context={ctx.forms.inbox.error}/>}
                                    />
                                    {/* html L13: {{#if forms.inbox.success}} */}
                                    <$If
                                        query={[ctx.forms.inbox.success]}
                                        $then={() => /* html L14: {{> components/common/alert/alert-success forms.inbox.success}} */ <$Partial name="components/common/alert/alert-success" context={ctx.forms.inbox.success}/>}
                                    />
                                    {/* html L16: {{> components/account/messages-list messages=customer.inbox.messages}} */}
                                    <$Partial
                                        name="components/account/messages-list"
                                        hash={{messages: ctx.customer.inbox.messages, settings: ctx.settings}}
                                    />
                                    {/* html L17: {{> components/account/messages-form}} */}
                                    <$Partial name="components/account/messages-form" hash={{customer: ctx.customer, urls: ctx.urls}}/>
                                </section>
                            </div>
                        </main>
                    </>
                )}
            />
            {/* html L23: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
