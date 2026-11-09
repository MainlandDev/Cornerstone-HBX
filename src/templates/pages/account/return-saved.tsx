import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$nl2br} from '@mainlanddev/bigcommerce-react/bigcommerce';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import type {ExtendedThemePageReturnSaved} from '@/context-pagesAccount';

export default $page<ExtendedThemePageReturnSaved>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <div className="account">
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <h2 className="page-heading">
                            <$Lang translationKey={$string('account.returns.heading')}/>
                        </h2>
                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('returns'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />
                        <div className="account-row">
                            <p>
                                <$Lang translationKey={$string('account.returns.successful')}/>
                            </p>
                            <$If
                                query={[ctx.return.instructions]}
                                $then={() => (
                                    <>
                                        <h3>
                                            <$Lang translationKey={$string('account.returns.instructions')}/>
                                        </h3>
                                        <p>{$nl2br(ctx.return.instructions)}</p>
                                    </>
                                )}
                            />
                        </div>
                    </div>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
