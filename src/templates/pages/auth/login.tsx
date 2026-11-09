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
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <div className="login">
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <h1 className="page-heading">
                            <$Lang translationKey={$string('login.heading')}/>
                        </h1>
                        <$If
                            query={[ctx.forms.login.error]}
                            $then={() => <$Partial name="components/common/alert/alert-error" context={ctx.forms.login.error}/>}
                        />
                        <$If
                            query={[ctx.forms.login.success]}
                            $then={() => <$Partial name="components/common/alert/alert-success" context={ctx.forms.login.success}/>}
                        />
                        <div className="login-row">
                            <form className="login-form form" action={ctx.urls.auth.check_login} method="post">
                                <$Inject keyName={$string('useValidEmail')} value={$lang($string('forms.validate.common.email_address'))}/>
                                <$Inject keyName={$string('enterPass')} value={$lang($string('forms.validate.common.password'))}/>
                                <div className="form-field">
                                    <label className="form-label" htmlFor="login_email">
                                        <$Lang translationKey={$string('login.field_email')}/>
                                    </label>
                                    <input className="form-input" name="login_email" id="login_email" type="email"/>
                                </div>
                                <div className="form-field">
                                    <label className="form-label" htmlFor="login_pass">
                                        <$Lang translationKey={$string('login.field_password')}/>
                                    </label>
                                    <input className="form-input" id="login_pass" type="password" name="login_pass" autoComplete="off"/>
                                </div>
                                <div className="form-actions">
                                    <input type="submit" className="button button--primary" value={$lang($string('login.submit_value'))}/>
                                    <a className="forgot-password" href={ctx.urls.auth.forgot_password}>
                                        <$Lang translationKey={$string('login.forgot_password')}/>
                                    </a>
                                </div>
                            </form>
                            <$If
                                query={[ctx.settings.account_creation_enabled]}
                                $then={() => (
                                    <div className="new-customer">
                                        <div className="panel">
                                            <div className="panel-header">
                                                <h2 className="panel-title">
                                                    <$Lang translationKey={$string('login.new_customer.heading')}/>
                                                </h2>
                                            </div>
                                            <div className="panel-body">
                                                <p className="new-customer-intro">
                                                    <$Lang translationKey={$string('login.new_customer.intro')}/>
                                                </p>
                                                <ul className="new-customer-fact-list">
                                                    <li className="new-customer-fact">
                                                        <$Lang translationKey={$string('login.new_customer.fact1')}/>
                                                    </li>
                                                    <li className="new-customer-fact">
                                                        <$Lang translationKey={$string('login.new_customer.fact2')}/>
                                                    </li>
                                                    <li className="new-customer-fact">
                                                        <$Lang translationKey={$string('login.new_customer.fact3')}/>
                                                    </li>
                                                    <li className="new-customer-fact">
                                                        <$Lang translationKey={$string('login.new_customer.fact4')}/>
                                                    </li>
                                                    <li className="new-customer-fact">
                                                        <$Lang translationKey={$string('login.new_customer.fact5')}/>
                                                    </li>
                                                </ul>
                                                <a href={ctx.urls.auth.create_account}>
                                                    <button className="button button--primary">
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
            <$Partial name="layout/base"/>
        </>
    ),
});
