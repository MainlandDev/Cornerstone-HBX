import {$Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page, type ThemePageAccountPaymentMethods} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ThemePageAccountPaymentMethods>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <h2 className="page-heading">
                            <$Lang translationKey={$string('account.payment_methods.heading')}/>
                        </h2>
                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('payment_methods'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />

                        <div className="account account--fixedLarge">
                            <div className="account-body">
                                <$Partial
                                    name="components/account/payment-methods-list"
                                    hash={{customer: ctx.customer, theme_settings: ctx.theme_settings}}
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
