/**
 * Source: templates/pages/auth/account-created.html (11 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {AccountCreatedPageContext} from '@/context-pagesMisc';

export default $page<AccountCreatedPageContext>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    /* html L2: <main class="page"> */
                    <main className="page">
                        {/* html L3: <section class="page-content page-content--textCenter"> */}
                        <section className="page-content page-content--textCenter">
                            {/* html L4: <h1 class="page-heading">{{lang 'create_account.created.heading'}}</h1> */}
                            <h1 className="page-heading">
                                {/* html L4: {{lang 'create_account.created.heading'}} */}
                                <$Lang translationKey={$string('create_account.created.heading')}/>
                            </h1>
                            {/* html L5: <p>{{lang 'create_account.created.intro' store_name=settings.store_name email=customer.email}}</p> */}
                            <p>
                                {/* html L5: {{lang 'create_account.created.intro' store_name=settings.store_name email=customer.email}} */}
                                <$Lang
                                    translationKey={$string('create_account.created.intro')}
                                    params={{store_name: ctx.settings.store_name, email: ctx.customer.email}}
                                />
                            </p>
                            {/* html L6: <a class="button button--primary" href="{{create_account.continue_url}}">{{lang 'create_account.created.continue'}}</a> */}
                            <a className="button button--primary" href={ctx.create_account.continue_url}>
                                {/* html L6: {{lang 'create_account.created.continue'}} */}
                                <$Lang translationKey={$string('create_account.created.continue')}/>
                            </a>
                        </section>
                    </main>
                )}
            />
            {/* html L10: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
