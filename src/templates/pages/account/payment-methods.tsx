/**
 * Source: templates/pages/account/payment-methods.html (13 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page, type ThemePageAccountPaymentMethods} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ThemePageAccountPaymentMethods>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L2: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        {/* html L3: <h2 class="page-heading">{{lang 'account.payment_methods.heading' }}</h2> */}
                        <h2 className="page-heading">
                            {/* html L3: {{lang 'account.payment_methods.heading' }} */}
                            <$Lang translationKey={$string('account.payment_methods.heading')}/>
                        </h2>
                        {/* html L4: {{> components/account/navigation account_page='payment_methods'}} */}
                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('payment_methods'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />

                        {/* html L6: <div class="account account--fixedLarge"> */}
                        <div className="account account--fixedLarge">
                            {/* html L7: <div class="account-body"> */}
                            <div className="account-body">
                                {/* html L8: {{> components/account/payment-methods-list }} */}
                                <$Partial
                                    name="components/account/payment-methods-list"
                                    hash={{customer: ctx.customer, theme_settings: ctx.theme_settings}}
                                />
                            </div>
                        </div>
                    </>
                )}
            />
            {/* html L12: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
