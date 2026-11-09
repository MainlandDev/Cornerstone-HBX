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
            <$Inject keyName={$string('recaptchaTitle')} value={$lang($string('forgot_password.recaptcha_title'))}/>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <div className="account account--fixedSmall">
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <h2 className="page-heading">
                            <$Lang translationKey={$string('reset_password.heading')}/>
                        </h2>
                        <p>
                            <$Lang translationKey={$string('reset_password.intro')}/>
                        </p>
                        {$parseHandlebarsDangerously(
                            `{{#if forms.forgot_password.error}}{{> components/common/alert/alert-error forms.forgot_password.error}}{{/if}}`,
                        )}
                        <form action={ctx.urls.auth.send_password_email} className="form forgot-password-form" method="post">
                            <$Inject keyName={$string('useValidEmail')} value={$lang($string('forms.validate.common.email_address'))}/>
                            <div className="form-prefixPostfix form-prefixPostfix--centeredColumn wrap">
                                <label className="form-label" htmlFor="email">
                                    <$Lang translationKey={$string('common.email_address')}/>
                                </label>
                                <input className="form-input" name="email" id="email" type="email" $$={$parseHandlebarsDangerously('formnovalidate')}/>
                                {$parseHandlebarsDangerously('{{{ forms.forgot_password.recaptcha.markup}}}')}
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
            <$Partial name="layout/base"/>
        </>
    ),
});
