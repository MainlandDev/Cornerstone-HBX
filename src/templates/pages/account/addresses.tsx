/**
 * Source: templates/pages/account/addresses.html (21 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page, type ThemePageAccountAddresses} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ThemePageAccountAddresses>({
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
                        {/* html L3: <h2 class="page-heading">{{lang 'account.addresses.heading' }}</h2> */}
                        <h2 className="page-heading">
                            {/* html L3: {{lang 'account.addresses.heading' }} */}
                            <$Lang translationKey={$string('account.addresses.heading')}/>
                        </h2>
                        {/* html L4: {{> components/account/navigation account_page='addresses'}} */}
                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('addresses'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />

                        {/* html L6: <div class="account account--fixedLarge"> */}
                        <div className="account account--fixedLarge">
                            {/* html L7: <div class="account-body"> */}
                            <div className="account-body">
                                {/* html L8: {{#if customer.error}} */}
                                <$If
                                    query={[ctx.customer.error]}
                                    $then={() => /* html L9: {{>components/common/alert/alert-error customer.error}} */ <$Partial name="components/common/alert/alert-error" context={ctx.customer.error}/>}
                                />
                                {/* html L11: {{#if customer.success}} */}
                                <$If
                                    query={[ctx.customer.success]}
                                    $then={() => /* html L12: {{>components/common/alert/alert-success customer.success}} */ <$Partial name="components/common/alert/alert-success" context={ctx.customer.success}/>}
                                />
                                {/* html L14: <section class="account-content"> */}
                                <section className="account-content">
                                    {/* html L15: {{> components/account/address-list }} */}
                                    <$Partial name="components/account/address-list" hash={{customer: ctx.customer, urls: ctx.urls}}/>
                                </section>
                            </div>
                        </div>
                    </>
                )}
            />
            {/* html L20: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
