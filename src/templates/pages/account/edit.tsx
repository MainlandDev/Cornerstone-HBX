/**
 * Source: templates/pages/account/edit.html (17 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import type {ExtendedThemePageAccountEdit} from '@/context-pagesAccount';

export default $page<ExtendedThemePageAccountEdit>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{inject 'passwordRequirements' settings.password_requirements}} */}
            <$Inject keyName={$string('passwordRequirements')} value={ctx.settings.password_requirements}/>
            {/* html L2: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    /* html L3: <div class="account account--fixed"> */
                    <div className="account account--fixed">
                        {/* html L4: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        {/* html L5: <h2 class="page-heading">{{lang 'account.settings.heading' }}</h2> */}
                        <h2 className="page-heading">
                            {/* html L5: {{lang 'account.settings.heading' }} */}
                            <$Lang translationKey={$string('account.settings.heading')}/>
                        </h2>
                        {/* html L6: {{> components/account/navigation account_page='settings'}} */}
                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('settings'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />
                        {/* html L7: {{#if forms.edit_account.error}} */}
                        <$If
                            query={[ctx.forms.edit_account.error]}
                            $then={() => /* html L8: {{> components/common/alert/alert-error forms.edit_account.error}} */ <$Partial name="components/common/alert/alert-error" context={ctx.forms.edit_account.error}/>}
                        />
                        {/* html L10: {{#if forms.edit_account.success}} */}
                        <$If
                            query={[ctx.forms.edit_account.success]}
                            $then={() => /* html L11: {{> components/common/alert/alert-success forms.edit_account.success}} */ <$Partial name="components/common/alert/alert-success" context={ctx.forms.edit_account.success}/>}
                        />
                        {/* html L13: {{> components/account/edit-account}} */}
                        <$Partial name="components/account/edit-account" hash={{urls: ctx.urls, forms: ctx.forms}}/>
                    </div>
                )}
            />
            {/* html L16: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
