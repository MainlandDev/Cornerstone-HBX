import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import type {ExtendedThemePageAccountEdit} from '@/context-pagesAccount';

export default $page<ExtendedThemePageAccountEdit>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$Inject keyName={$string('passwordRequirements')} value={ctx.settings.password_requirements}/>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <div className="account account--fixed">
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <h2 className="page-heading">
                            <$Lang translationKey={$string('account.settings.heading')}/>
                        </h2>
                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('settings'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />
                        <$If
                            query={[ctx.forms.edit_account.error]}
                            $then={() => <$Partial name="components/common/alert/alert-error" context={ctx.forms.edit_account.error}/>}
                        />
                        <$If
                            query={[ctx.forms.edit_account.success]}
                            $then={() => <$Partial name="components/common/alert/alert-success" context={ctx.forms.edit_account.success}/>}
                        />
                        <$Partial name="components/account/edit-account" hash={{urls: ctx.urls, forms: ctx.forms}}/>
                    </div>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
