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
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <$If
                            query={[ctx.forms.address.address_id]}
                            $then={() => (
                                <h2 className="page-heading">
                                    <$Lang translationKey={$string('forms.address.edit.heading')}/>
                                </h2>
                            )}
                            $else={() => (
                                <h2 className="page-heading">
                                    <$Lang translationKey={$string('forms.address.add.heading')}/>
                                </h2>
                            )}
                        />

                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('addresses'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />

                        <div className="account account--fixed">
                            <$If
                                query={[ctx.forms.address.error]}
                                $then={() => <$Partial name="components/common/alert/alert-error" context={ctx.forms.address.error}/>}
                            />

                            <div className="account-body">
                                <section className="account-content">
                                    <form action={ctx.forms.address.action} data-address-form="" className="form" method="post">
                                        <$If
                                            query={[ctx.forms.address.address_id]}
                                            $then={() => (
                                                <input type="hidden" name="shipid" value={ctx.forms.address.address_id}/>
                                            )}
                                        />
                                        <fieldset className="form-fieldset">
                                            <div className="form-row form-row--half">
                                                <$Each
                                                    list={ctx.forms.address.shipping_fields}
                                                    $then={() => $_dynamicComponent($string('components/common/forms'))}
                                                />
                                            </div>
                                        </fieldset>
                                        <div className="form-actions">
                                            <input
                                                type="submit"
                                                className="button button--primary"
                                                value={$lang($string('forms.address.submit_value'))}
                                            />
                                            <a href={ctx.urls.account.addresses} className="button">
                                                <$Lang translationKey={$string('common.cancel')}/>
                                            </a>
                                            <$Inject keyName={$string('required')} value={$lang($string('common.required'))}/>
                                            <$Inject keyName={$string('state_error')} value={$lang($string('errors.state_error'))}/>
                                        </div>
                                    </form>
                                </section>
                            </div>
                        </div>
                    </>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
