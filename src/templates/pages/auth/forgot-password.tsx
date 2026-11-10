/**
 * Source: templates/pages/auth/forgot-password.html (22 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Partial, $parseHandlebarsDangerously, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import type {ThemePageAuthForgotPassword} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

// Escape hatch: the library types `forms.forgot_password` as an empty list, so the `error` block and the recaptcha `markup` are raw Handlebars.
export default $page<ThemePageAuthForgotPassword>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{inject 'recaptchaTitle' (lang 'forgot_password.recaptcha_title')}} */}
            <$Inject keyName={$string('recaptchaTitle')} value={$lang($string('forgot_password.recaptcha_title'))}/>
            {/* html L2: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    /* html L3: <div class="account account--fixedSmall"> */
                    <div className="account account--fixedSmall">
                        {/* html L4: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        {/* html L5: <h2 class="page-heading">{{lang 'reset_password.heading' }}</h2> */}
                        <h2 className="page-heading">
                            {/* html L5: {{lang 'reset_password.heading' }} */}
                            <$Lang translationKey={$string('reset_password.heading')}/>
                        </h2>
                        {/* html L6: <p>{{lang 'reset_password.intro' }}</p> */}
                        <p>
                            {/* html L6: {{lang 'reset_password.intro' }} */}
                            <$Lang translationKey={$string('reset_password.intro')}/>
                        </p>
                        {$parseHandlebarsDangerously(
                            `{{#if forms.forgot_password.error}}{{> components/common/alert/alert-error forms.forgot_password.error}}{{/if}}`,
                        )}
                        {/* html L10: <form action="{{urls.auth.send_password_email}}" class="form forgot-password-form" method="post"> */}
                        <form action={ctx.urls.auth.send_password_email} className="form forgot-password-form" method="post">
                            {/* html L11: {{inject 'useValidEmail' (lang 'forms.validate.common.email_address')}} */}
                            <$Inject keyName={$string('useValidEmail')} value={$lang($string('forms.validate.common.email_address'))}/>
                            {/* html L12: <div class="form-prefixPostfix form-prefixPostfix--centeredColumn wrap"> */}
                            <div className="form-prefixPostfix form-prefixPostfix--centeredColumn wrap">
                                {/* html L13: <label class="form-label" for="email">{{lang 'common.email_address'}}</label> */}
                                <label className="form-label" htmlFor="email">
                                    {/* html L13: {{lang 'common.email_address'}} */}
                                    <$Lang translationKey={$string('common.email_address')}/>
                                </label>
                                {/* html L14: <input class="form-input" name="email" id="email" type="email" formnovalidate> */}
                                <input className="form-input" name="email" id="email" type="email" $$={$parseHandlebarsDangerously('formnovalidate')}/>
                                {/* html L15: {{{ forms.forgot_password.recaptcha.markup}}} */}
                                {$parseHandlebarsDangerously('{{{ forms.forgot_password.recaptcha.markup}}}')}
                                {/* html L16: <input type="submit" class="button button--primary form-prefixPostfix-button--postfix" value="{{lang 'reset_password.heading' }}"> */}
                                <input
                                    type="submit"
                                    className="button button--primary form-prefixPostfix-button--postfix"
                                    value={$lang($string('reset_password.heading'))}
                                />
                            </div>
                        </form>
                    </div>
                )}
            />
            {/* html L21: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
