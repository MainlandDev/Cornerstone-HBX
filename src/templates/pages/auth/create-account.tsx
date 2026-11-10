/**
 * Source: templates/pages/auth/create-account.html (34 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$_dynamicComponent, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import type {CreateAccountPageContext} from '@/context-pagesMisc';

export default $page<CreateAccountPageContext>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{inject 'passwordRequirements' settings.password_requirements}} */}
            <$Inject keyName={$string('passwordRequirements')} value={ctx.settings.password_requirements}/>
            {/* html L2: {{inject 'recaptchaTitle' (lang 'create_account.recaptcha_title')}} */}
            <$Inject keyName={$string('recaptchaTitle')} value={$lang($string('create_account.recaptcha_title'))}/>
            {/* html L3: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L4: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        {/* html L5: <h1 class="page-heading">{{lang 'create_account.heading' }}</h1> */}
                        <h1 className="page-heading">
                            {/* html L5: {{lang 'create_account.heading' }} */}
                            <$Lang translationKey={$string('create_account.heading')}/>
                        </h1>

                        {/* html L7: <div class="account account--fixed"> */}
                        <div className="account account--fixed">
                            {/* html L8: <div class="account-body"> */}
                            <div className="account-body">
                                {/* html L9: {{#if forms.create_account.error}} */}
                                <$If
                                    query={[ctx.forms.create_account.error]}
                                    $then={() => /* html L10: {{> components/common/alert/alert-error forms.create_account.error}} */ <$Partial name="components/common/alert/alert-error" context={ctx.forms.create_account.error}/>}
                                />
                                {/* html L12: {{#if settings.account_creation_enabled}} */}
                                <$If
                                    query={[ctx.settings.account_creation_enabled]}
                                    $then={() => (
                                        /* html L13: <form action="{{urls.auth.save_new_account}}" data-create-account-form method="post" class="form"> */
                                        <form action={ctx.urls.auth.save_new_account} data-create-account-form="" method="post" className="form">
                                            {/* html L14: <div class="form-row form-row--half"> */}
                                            <div className="form-row form-row--half">
                                                {/* html L15: {{#each forms.create_account.account_fields }} */}
                                                <$Each
                                                    list={ctx.forms.create_account.account_fields}
                                                    $then={() => $_dynamicComponent($string('components/common/forms'))}
                                                />
                                                {/* html L18: {{#each forms.create_account.address_fields }} */}
                                                <$Each
                                                    list={ctx.forms.create_account.address_fields}
                                                    $then={() => $_dynamicComponent($string('components/common/forms'))}
                                                />
                                                {/* html L21: {{inject 'required' (lang 'common.required')}} */}
                                                <$Inject keyName={$string('required')} value={$lang($string('common.required'))}/>
                                                {/* html L22: {{inject 'state_error' (lang 'errors.state_error')}} */}
                                                <$Inject keyName={$string('state_error')} value={$lang($string('errors.state_error'))}/>
                                            </div>
                                            {/* html L24: {{{ forms.create_account.recaptcha.markup}}} */}
                                            {$unescaped(ctx.forms.create_account.recaptcha.markup)}
                                            {/* html L25: <div class="form-actions"> */}
                                            <div className="form-actions">
                                                {/* html L26: <input type="submit" class="button button--primary" value="{{lang 'forms.create_account.submit_value' }}" /> */}
                                                <input
                                                    type="submit"
                                                    className="button button--primary"
                                                    value={$lang($string('forms.create_account.submit_value'))}
                                                />
                                            </div>
                                        </form>
                                    )}
                                />
                            </div>
                        </div>
                    </>
                )}
            />
            {/* html L33: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
