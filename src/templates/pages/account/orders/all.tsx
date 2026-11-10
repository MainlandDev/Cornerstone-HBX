/**
 * Source: templates/pages/account/orders/all.html (35 lines). Per-element comments below quote the original lines (`html L<n>`).
 * Front matter of the original (lines 1-5):
 *   ---
 *   customer:
 *       orders:
 *           limit: 10
 *   ---
 */
import {$If, $Partial, $number, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$page, type ThemePageAccountOrders} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ThemePageAccountOrders>({
    frontmatter: {
        customer: {
            orders: {
                limit: 10,
            },
        },
    },
    content: (ctx) => (
        <>
            {/* html L7: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L9: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        {/* html L10: <h1 class="page-heading">{{lang 'account.orders.heading' }}</h1> */}
                        <h1 className="page-heading">
                            {/* html L10: {{lang 'account.orders.heading' }} */}
                            <$Lang translationKey={$string('account.orders.heading')}/>
                        </h1>
                        {/* html L11: {{> components/account/navigation account_page='orders'}} */}
                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('orders'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />

                        {/* html L13: <main class="account account--fixed"> */}
                        <main className="account account--fixed">
                            {/* html L14: <div class="account-head"> */}
                            <div className="account-head">
                                {/* html L15: {{#if customer.store_credit.value '>' 0}} */}
                                <$If
                                    query={[ctx.customer.store_credit.value, '>', $number(0)]}
                                    $then={() => (
                                        /* html L16: <div class="alertBox alertBox--storeCredit"> */
                                        <div className="alertBox alertBox--storeCredit">
                                            {/* html L17: {{{lang 'common.store_credit' store_credit=customer.store_credit.formatted}}} */}
                                            {$unescaped(
                                                $lang($string('common.store_credit'), {store_credit: ctx.customer.store_credit.formatted}),
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                            {/* html L21: <div class="account-body"> */}
                            <div className="account-body">
                                {/* html L22: <section class="account-content"> */}
                                <section className="account-content">
                                    {/* html L23: {{#if customer.orders.length}} */}
                                    <$If
                                        query={[ctx.customer.orders.length]}
                                        $then={() => (
                                            <>
                                                {/* html L24: {{> components/account/orders-list orders=customer.orders}} */}
                                                <$Partial name="components/account/orders-list" hash={{orders: ctx.customer.orders}}/>
                                                {/* html L25: {{> components/common/small-paginator pagination.orders}} */}
                                                <$Partial name="components/common/small-paginator" context={ctx.pagination.orders}/>
                                            </>
                                        )}
                                        $else={() => (
                                            /* html L26: {{else}}
                                                                                              html L27: {{> components/common/alert/alert-info (lang 'account.orders.none')}}
                                            */
                                            <$Partial
                                                name="components/common/alert/alert-info"
                                                context={$lang($string('account.orders.none'))}
                                            />
                                        )}
                                    />
                                </section>
                            </div>
                        </main>
                    </>
                )}
            />
            {/* html L34: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
