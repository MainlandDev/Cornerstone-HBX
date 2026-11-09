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
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <div className="account">
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <h2 className="account-heading title">
                            <$Lang translationKey={$string('account.orders.heading')}/>
                        </h2>
                        <$Partial name="components/account/navigation" hash={{account_page: $string('orders')}}/>
                        <div className="account-row orders-row">
                            <section className="orders">
                                <$Partial name="components/account/orders-list" hash={{orders: ctx.customer.orders}}/>
                                <$Partial name="components/common/small-paginator" context={ctx.pagination.orders}/>
                            </section>
                        </div>
                    </div>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
