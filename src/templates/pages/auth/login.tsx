/**
 * Source: templates/pages/auth/login.html (52 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import type {ThemePageAuthLogin} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ThemePageAuthLogin>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    /* html L2: <div class="login"> */
                    <div className="login">
                        {/* html L3: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        {/* html L4: <h1 class="page-heading">{{lang 'login.heading' }}</h1> */}
                        <h1 className="page-heading">
                            {/* html L4: {{lang 'login.heading' }} */}
                            <$Lang translationKey={$string('login.heading')}/>
                        </h1>
                        {/* html L5: {{#if forms.login.error}} */}
                        <$If
                            query={[ctx.forms.login.error]}
                            $then={() => /* html L6: {{> components/common/alert/alert-error forms.login.error}} */ <$Partial name="components/common/alert/alert-error" context={ctx.forms.login.error}/>}
                        />
                        {/* html L8: {{#if forms.login.success}} */}
                        <$If
                            query={[ctx.forms.login.success]}
                            $then={() => /* html L9: {{> components/common/alert/alert-success forms.login.success}} */ <$Partial name="components/common/alert/alert-success" context={ctx.forms.login.success}/>}
                        />
                        {/* html L11: <div class="login-row"> */}
                        <div className="login-row">
                            {/* html L12: <form class="login-form form" action="{{urls.auth.check_login}}" method="post"> */}
                            <form className="login-form form" action={ctx.urls.auth.check_login} method="post">
                                {/* html L13: {{inject 'useValidEmail' (lang 'forms.validate.common.email_address')}} */}
                                <$Inject keyName={$string('useValidEmail')} value={$lang($string('forms.validate.common.email_address'))}/>
                                {/* html L14: {{inject 'enterPass' (lang 'forms.validate.common.password')}} */}
                                <$Inject keyName={$string('enterPass')} value={$lang($string('forms.validate.common.password'))}/>
                                {/* html L15: <div class="form-field"> */}
                                <div className="form-field">
                                    {/* html L16: <label class="form-label" for="login_email">{{lang 'login.field_email'}}</label> */}
                                    <label className="form-label" htmlFor="login_email">
                                        {/* html L16: {{lang 'login.field_email'}} */}
                                        <$Lang translationKey={$string('login.field_email')}/>
                                    </label>
                                    {/* html L17: <input class="form-input" name="login_email" id="login_email" type="email"> */}
                                    <input className="form-input" name="login_email" id="login_email" type="email"/>
                                </div>
                                {/* html L19: <div class="form-field"> */}
                                <div className="form-field">
                                    {/* html L20: <label class="form-label" for="login_pass">{{lang 'login.field_password'}}</label> */}
                                    <label className="form-label" htmlFor="login_pass">
                                        {/* html L20: {{lang 'login.field_password'}} */}
                                        <$Lang translationKey={$string('login.field_password')}/>
                                    </label>
                                    {/* html L21: <input class="form-input" id="login_pass" type="password" name="login_pass" autocomplete="off"> */}
                                    <input className="form-input" id="login_pass" type="password" name="login_pass" autoComplete="off"/>
                                </div>
                                {/* html L23: <div class="form-actions"> */}
                                <div className="form-actions">
                                    {/* html L24: <input type="submit" class="button button--primary" value="{{lang 'login.submit_value' }}"> */}
                                    <input type="submit" className="button button--primary" value={$lang($string('login.submit_value'))}/>
                                    {/* html L25: <a class="forgot-password" href="{{urls.auth.forgot_password}}">{{lang 'login.forgot_password' }}</a> */}
                                    <a className="forgot-password" href={ctx.urls.auth.forgot_password}>
                                        {/* html L25: {{lang 'login.forgot_password' }} */}
                                        <$Lang translationKey={$string('login.forgot_password')}/>
                                    </a>
                                </div>
                            </form>
                            {/* html L28: {{#if settings.account_creation_enabled}} */}
                            <$If
                                query={[ctx.settings.account_creation_enabled]}
                                $then={() => (
                                    /* html L29: <div class="new-customer"> */
                                    <div className="new-customer">
                                        {/* html L30: <div class="panel"> */}
                                        <div className="panel">
                                            {/* html L31: <div class="panel-header"> */}
                                            <div className="panel-header">
                                                {/* html L32: <h2 class="panel-title">{{lang 'login.new_customer.heading' }}</h2> */}
                                                <h2 className="panel-title">
                                                    {/* html L32: {{lang 'login.new_customer.heading' }} */}
                                                    <$Lang translationKey={$string('login.new_customer.heading')}/>
                                                </h2>
                                            </div>
                                            {/* html L34: <div class="panel-body"> */}
                                            <div className="panel-body">
                                                {/* html L35: <p class="new-customer-intro">{{lang 'login.new_customer.intro' }}</p> */}
                                                <p className="new-customer-intro">
                                                    {/* html L35: {{lang 'login.new_customer.intro' }} */}
                                                    <$Lang translationKey={$string('login.new_customer.intro')}/>
                                                </p>
                                                {/* html L36: <ul class="new-customer-fact-list"> */}
                                                <ul className="new-customer-fact-list">
                                                    {/* html L37: <li class="new-customer-fact">{{lang 'login.new_customer.fact1' }}</li> */}
                                                    <li className="new-customer-fact">
                                                        {/* html L37: {{lang 'login.new_customer.fact1' }} */}
                                                        <$Lang translationKey={$string('login.new_customer.fact1')}/>
                                                    </li>
                                                    {/* html L38: <li class="new-customer-fact">{{lang 'login.new_customer.fact2' }}</li> */}
                                                    <li className="new-customer-fact">
                                                        {/* html L38: {{lang 'login.new_customer.fact2' }} */}
                                                        <$Lang translationKey={$string('login.new_customer.fact2')}/>
                                                    </li>
                                                    {/* html L39: <li class="new-customer-fact">{{lang 'login.new_customer.fact3' }}</li> */}
                                                    <li className="new-customer-fact">
                                                        {/* html L39: {{lang 'login.new_customer.fact3' }} */}
                                                        <$Lang translationKey={$string('login.new_customer.fact3')}/>
                                                    </li>
                                                    {/* html L40: <li class="new-customer-fact">{{lang 'login.new_customer.fact4' }}</li> */}
                                                    <li className="new-customer-fact">
                                                        {/* html L40: {{lang 'login.new_customer.fact4' }} */}
                                                        <$Lang translationKey={$string('login.new_customer.fact4')}/>
                                                    </li>
                                                    {/* html L41: <li class="new-customer-fact">{{lang 'login.new_customer.fact5' }}</li> */}
                                                    <li className="new-customer-fact">
                                                        {/* html L41: {{lang 'login.new_customer.fact5' }} */}
                                                        <$Lang translationKey={$string('login.new_customer.fact5')}/>
                                                    </li>
                                                </ul>
                                                {/* html L43: <a href="{{urls.auth.create_account}}"><button class="button button--primary">{{lang 'login.new_customer.create_account' }}</button></a> */}
                                                <a href={ctx.urls.auth.create_account}>
                                                    {/* html L43: <button class="button button--primary"> */}
                                                    <button className="button button--primary">
                                                        {/* html L43: {{lang 'login.new_customer.create_account' }} */}
                                                        <$Lang translationKey={$string('login.new_customer.create_account')}/>
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                )}
            />
            {/* html L51: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
