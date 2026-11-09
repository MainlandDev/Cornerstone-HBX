import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import type {NewPasswordPageContext} from '@/context-pagesMisc';

export default $page<NewPasswordPageContext>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$Inject keyName={$string('passwordRequirements')} value={ctx.settings.password_requirements}/>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <div className="account account--fixedSmall">
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <h2 className="page-heading">
                            <$Lang translationKey={$string('forms.new_password.heading')}/>
                        </h2>
                        <p>{ctx.forms.new_password.requirements}</p>
                        <$If
                            query={[ctx.forms.new_password.error]}
                            $then={() => <$Partial name="components/common/alert/alert-error" context={ctx.forms.new_password.error}/>}
                        />
                        <form action={ctx.forms.new_password.submit_url} className="form new-password-form" method="post">
                            <div className="form-row">
                                <div className="form-field">
                                    <label className="form-label" htmlFor="password">
                                        <$Lang translationKey={$string('forms.new_password.password')}/>
                                        <small>
                                            <$Lang translationKey={$string('common.required')}/>
                                        </small>
                                    </label>
                                    <input type="password" className="form-input" name="password" id="password" autoComplete="off"/>
                                </div>
                                <div className="form-field">
                                    <label className="form-label" htmlFor="password_confirm">
                                        <$Lang translationKey={$string('forms.new_password.password2')}/>
                                        <small>
                                            <$Lang translationKey={$string('common.required')}/>
                                        </small>
                                    </label>
                                    <input
                                        type="password"
                                        className="form-input"
                                        name="password_confirm"
                                        id="password_confirm"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="form-actions">
                                <input
                                    className="button button--primary"
                                    type="submit"
                                    value={$lang($string('forms.new_password.submit_value'))}
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
