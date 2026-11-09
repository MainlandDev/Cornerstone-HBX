import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page, type ThemePageAccountAddresses} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ThemePageAccountAddresses>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <h2 className="page-heading">
                            <$Lang translationKey={$string('account.addresses.heading')}/>
                        </h2>
                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('addresses'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />

                        <div className="account account--fixedLarge">
                            <div className="account-body">
                                <$If
                                    query={[ctx.customer.error]}
                                    $then={() => <$Partial name="components/common/alert/alert-error" context={ctx.customer.error}/>}
                                />
                                <$If
                                    query={[ctx.customer.success]}
                                    $then={() => <$Partial name="components/common/alert/alert-success" context={ctx.customer.success}/>}
                                />
                                <section className="account-content">
                                    <$Partial name="components/account/address-list" hash={{customer: ctx.customer, urls: ctx.urls}}/>
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
