/**
 * Source: templates/pages/account/orders/completed.html (20 lines). Per-element comments below quote the original lines (`html L<n>`).
 * Front matter of the original (lines 1-5):
 *   ---
 *   customer:
 *   orders:
 *   limit: 3
 *   ---
 */
import {$Partial, $parseHandlebarsDangerously, $string} from '@mainlanddev/bigcommerce-react';
import {$page, type ThemePageAccountOrders} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ThemePageAccountOrders>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* Escape hatch: the original front-matter has `customer:` / `orders:` as null keys and a top-level `limit: 3`, which AnyFrontMatter rejects. */}
            {$parseHandlebarsDangerously('---\ncustomer:\norders:\nlimit: 3\n---\n')}
            {/* html L6: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    /* html L7: <div class="account"> */
                    <div className="account">
                        {/* html L8: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        {/* html L9: <h2 class="account-heading title">{{lang 'account.orders.heading' }}</h2> */}
                        <h2 className="account-heading title">
                            {/* html L9: {{lang 'account.orders.heading' }} */}
                            <$Lang translationKey={$string('account.orders.heading')}/>
                        </h2>
                        {/* html L10: {{> components/account/navigation account_page='orders'}} */}
                        <$Partial name="components/account/navigation" hash={{account_page: $string('orders')}}/>
                        {/* html L11: <div class="account-row orders-row"> */}
                        <div className="account-row orders-row">
                            {/* html L12: <section class="orders"> */}
                            <section className="orders">
                                {/* html L13: {{> components/account/orders-list orders=customer.orders}} */}
                                <$Partial name="components/account/orders-list" hash={{orders: ctx.customer.orders}}/>
                                {/* html L14: {{> components/common/small-paginator pagination.orders}} */}
                                <$Partial name="components/common/small-paginator" context={ctx.pagination.orders}/>
                            </section>
                        </div>
                    </div>
                )}
            />
            {/* html L19: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
