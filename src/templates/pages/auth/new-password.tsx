/**
 * Source: templates/pages/auth/new-password.html (37 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
            {/* html L1: {{inject 'passwordRequirements' settings.password_requirements}} */}
            <$Inject keyName={$string('passwordRequirements')} value={ctx.settings.password_requirements}/>
            {/* html L2: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    /* html L3: <div class="account account--fixedSmall"> */
                    <div className="account account--fixedSmall">
                        {/* html L4: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        {/* html L5: <h2 class="page-heading">{{lang 'forms.new_password.heading' }}</h2> */}
                        <h2 className="page-heading">
                            {/* html L5: {{lang 'forms.new_password.heading' }} */}
                            <$Lang translationKey={$string('forms.new_password.heading')}/>
                        </h2>
                        {/* html L6: <p>{{forms.new_password.requirements}}</p> */}
                        <p>{/* html L6: {{forms.new_password.requirements}} */}{ctx.forms.new_password.requirements}</p>
                        {/* html L7: {{#if forms.new_password.error}} */}
                        <$If
                            query={[ctx.forms.new_password.error]}
                            $then={() => /* html L8: {{> components/common/alert/alert-error forms.new_password.error}} */ <$Partial name="components/common/alert/alert-error" context={ctx.forms.new_password.error}/>}
                        />
                        {/* html L10: <form action="{{forms.new_password.submit_url}}" class="form new-password-form" method="post"> */}
                        <form action={ctx.forms.new_password.submit_url} className="form new-password-form" method="post">
                            {/* html L11: <div class="form-row"> */}
                            <div className="form-row">
                                {/* html L12: <div class="form-field"> */}
                                <div className="form-field">
                                    {/* html L13: <label class="form-label" for="password"> */}
                                    <label className="form-label" htmlFor="password">
                                        {/* html L14: {{lang 'forms.new_password.password' }} */}
                                        <$Lang translationKey={$string('forms.new_password.password')}/>
                                        {/* html L15: <small>{{lang 'common.required' }}</small> */}
                                        <small>
                                            {/* html L15: {{lang 'common.required' }} */}
                                            <$Lang translationKey={$string('common.required')}/>
                                        </small>
                                    </label>
                                    {/* html L17: <input type="password" class="form-input" name="password" id="password" autocomplete="off"> */}
                                    <input type="password" className="form-input" name="password" id="password" autoComplete="off"/>
                                </div>
                                {/* html L19: <div class="form-field"> */}
                                <div className="form-field">
                                    {/* html L20: <label class="form-label" for="password_confirm"> */}
                                    <label className="form-label" htmlFor="password_confirm">
                                        {/* html L21: {{lang 'forms.new_password.password2' }} */}
                                        <$Lang translationKey={$string('forms.new_password.password2')}/>
                                        {/* html L22: <small>{{lang 'common.required' }}</small> */}
                                        <small>
                                            {/* html L22: {{lang 'common.required' }} */}
                                            <$Lang translationKey={$string('common.required')}/>
                                        </small>
                                    </label>
                                    {/* html L24: <input type="password" class="form-input" name="password_confirm" id="password_confirm" autocomplete="off"> */}
                                    <input
                                        type="password"
                                        className="form-input"
                                        name="password_confirm"
                                        id="password_confirm"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            {/* html L27: <div class="form-actions"> */}
                            <div className="form-actions">
                                {/* html L28-31:
                                   <input
                                       class="button button--primary"
                                       type="submit"
                                       value="{{lang 'forms.new_password.submit_value' }}">
                                */}
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
            {/* html L36: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
