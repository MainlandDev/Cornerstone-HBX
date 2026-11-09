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
            <$Inject keyName={$string('passwordRequirements')} value={ctx.settings.password_requirements}/>
            <$Inject keyName={$string('recaptchaTitle')} value={$lang($string('create_account.recaptcha_title'))}/>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <h1 className="page-heading">
                            <$Lang translationKey={$string('create_account.heading')}/>
                        </h1>

                        <div className="account account--fixed">
                            <div className="account-body">
                                <$If
                                    query={[ctx.forms.create_account.error]}
                                    $then={() => <$Partial name="components/common/alert/alert-error" context={ctx.forms.create_account.error}/>}
                                />
                                <$If
                                    query={[ctx.settings.account_creation_enabled]}
                                    $then={() => (
                                        <form action={ctx.urls.auth.save_new_account} data-create-account-form="" method="post" className="form">
                                            <div className="form-row form-row--half">
                                                <$Each
                                                    list={ctx.forms.create_account.account_fields}
                                                    $then={() => $_dynamicComponent($string('components/common/forms'))}
                                                />
                                                <$Each
                                                    list={ctx.forms.create_account.address_fields}
                                                    $then={() => $_dynamicComponent($string('components/common/forms'))}
                                                />
                                                <$Inject keyName={$string('required')} value={$lang($string('common.required'))}/>
                                                <$Inject keyName={$string('state_error')} value={$lang($string('errors.state_error'))}/>
                                            </div>
                                            {$unescaped(ctx.forms.create_account.recaptcha.markup)}
                                            <div className="form-actions">
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
            <$Partial name="layout/base"/>
        </>
    ),
});
