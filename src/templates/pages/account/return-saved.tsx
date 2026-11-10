/**
 * Source: templates/pages/account/return-saved.html (18 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    /* html L2: <div class="account"> */
                    <div className="account">
                        {/* html L3: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        {/* html L4: <h2 class="page-heading">{{lang 'account.returns.heading'}}</h2> */}
                        <h2 className="page-heading">
                            {/* html L4: {{lang 'account.returns.heading'}} */}
                            <$Lang translationKey={$string('account.returns.heading')}/>
                        </h2>
                        {/* html L5: {{> components/account/navigation account_page='returns'}} */}
                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('returns'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />
                        {/* html L6: <div class="account-row"> */}
                        <div className="account-row">
                            {/* html L7: <p> */}
                            <p>
                                {/* html L8: {{lang 'account.returns.successful'}} */}
                                <$Lang translationKey={$string('account.returns.successful')}/>
                            </p>
                            {/* html L10: {{#if return.instructions}} */}
                            <$If
                                query={[ctx.return.instructions]}
                                $then={() => (
                                    <>
                                        {/* html L11: <h3>{{lang 'account.returns.instructions'}}</h3> */}
                                        <h3>
                                            {/* html L11: {{lang 'account.returns.instructions'}} */}
                                            <$Lang translationKey={$string('account.returns.instructions')}/>
                                        </h3>
                                        {/* html L12: <p>{{nl2br return.instructions}}</p> */}
                                        <p>{/* html L12: {{nl2br return.instructions}} */}{$nl2br(ctx.return.instructions)}</p>
                                    </>
                                )}
                            />
                        </div>
                    </div>
                )}
            />
            {/* html L17: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
