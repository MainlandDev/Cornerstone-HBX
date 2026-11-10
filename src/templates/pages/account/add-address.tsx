/**
 * Source: templates/pages/account/add-address.html (45 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$_dynamicComponent, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import type {ExtendedThemePageAddAddress} from '@/context-pagesAccount';

export default $page<ExtendedThemePageAddAddress>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L3: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        {/* html L5: {{#if forms.address.address_id}} */}
                        <$If
                            query={[ctx.forms.address.address_id]}
                            $then={() => (
                                /* html L6: <h2 class="page-heading">{{lang 'forms.address.edit.heading'}}</h2> */
                                <h2 className="page-heading">
                                    {/* html L6: {{lang 'forms.address.edit.heading'}} */}
                                    <$Lang translationKey={$string('forms.address.edit.heading')}/>
                                </h2>
                            )}
                            $else={() => (
                                /* html L7: {{else}}
                                                                      html L8: <h2 class="page-heading">{{lang 'forms.address.add.heading'}}</h2>
                                */
                                <h2 className="page-heading">
                                    {/* html L8: {{lang 'forms.address.add.heading'}} */}
                                    <$Lang translationKey={$string('forms.address.add.heading')}/>
                                </h2>
                            )}
                        />

                        {/* html L11: {{> components/account/navigation account_page='addresses'}} */}
                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('addresses'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />

                        {/* html L13: <div class="account account--fixed"> */}
                        <div className="account account--fixed">
                            {/* html L15: {{#if forms.address.error}} */}
                            <$If
                                query={[ctx.forms.address.error]}
                                $then={() => /* html L16: {{> components/common/alert/alert-error forms.address.error}} */ <$Partial name="components/common/alert/alert-error" context={ctx.forms.address.error}/>}
                            />

                            {/* html L19: <div class="account-body"> */}
                            <div className="account-body">
                                {/* html L20: <section class="account-content"> */}
                                <section className="account-content">
                                    {/* html L21: <form action="{{forms.address.action}}" data-address-form class="form" method="post"> */}
                                    <form action={ctx.forms.address.action} data-address-form="" className="form" method="post">
                                        {/* html L22: {{#if forms.address.address_id }} */}
                                        <$If
                                            query={[ctx.forms.address.address_id]}
                                            $then={() => (
                                                /* html L23: <input type="hidden" name="shipid" value="{{forms.address.address_id}}"> */
                                                <input type="hidden" name="shipid" value={ctx.forms.address.address_id}/>
                                            )}
                                        />
                                        {/* html L25: <fieldset class="form-fieldset"> */}
                                        <fieldset className="form-fieldset">
                                            {/* html L26: <div class="form-row form-row--half"> */}
                                            <div className="form-row form-row--half">
                                                {/* html L27: {{#each forms.address.shipping_fields }} */}
                                                <$Each
                                                    list={ctx.forms.address.shipping_fields}
                                                    $then={() => $_dynamicComponent($string('components/common/forms'))}
                                                />
                                            </div>
                                        </fieldset>
                                        {/* html L32: <div class="form-actions"> */}
                                        <div className="form-actions">
                                            {/* html L33: <input type="submit" class="button button--primary" value="{{lang 'forms.address.submit_value'}}"> */}
                                            <input
                                                type="submit"
                                                className="button button--primary"
                                                value={$lang($string('forms.address.submit_value'))}
                                            />
                                            {/* html L34: <a href="{{urls.account.addresses}}" class="button">{{lang 'common.cancel'}}</a> */}
                                            <a href={ctx.urls.account.addresses} className="button">
                                                {/* html L34: {{lang 'common.cancel'}} */}
                                                <$Lang translationKey={$string('common.cancel')}/>
                                            </a>
                                            {/* html L35: {{inject 'required' (lang 'common.required')}} */}
                                            <$Inject keyName={$string('required')} value={$lang($string('common.required'))}/>
                                            {/* html L36: {{inject 'state_error' (lang 'errors.state_error')}} */}
                                            <$Inject keyName={$string('state_error')} value={$lang($string('errors.state_error'))}/>
                                        </div>
                                    </form>
                                </section>
                            </div>
                        </div>
                    </>
                )}
            />
            {/* html L44: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
