import {$Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {AccountCreatedPageContext} from '@/context-pagesMisc';

export default $page<AccountCreatedPageContext>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <main className="page">
                        <section className="page-content page-content--textCenter">
                            <h1 className="page-heading">
                                <$Lang translationKey={$string('create_account.created.heading')}/>
                            </h1>
                            <p>
                                <$Lang
                                    translationKey={$string('create_account.created.intro')}
                                    params={{store_name: ctx.settings.store_name, email: ctx.customer.email}}
                                />
                            </p>
                            <a className="button button--primary" href={ctx.create_account.continue_url}>
                                <$Lang translationKey={$string('create_account.created.continue')}/>
                            </a>
                        </section>
                    </main>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
