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
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <h1 className="page-heading">
                            <$Lang translationKey={$string('account.orders.heading')}/>
                        </h1>
                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('orders'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />

                        <main className="account account--fixed">
                            <div className="account-head">
                                <$If
                                    query={[ctx.customer.store_credit.value, '>', $number(0)]}
                                    $then={() => (
                                        <div className="alertBox alertBox--storeCredit">
                                            {$unescaped(
                                                $lang($string('common.store_credit'), {store_credit: ctx.customer.store_credit.formatted}),
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="account-body">
                                <section className="account-content">
                                    <$If
                                        query={[ctx.customer.orders.length]}
                                        $then={() => (
                                            <>
                                                <$Partial name="components/account/orders-list" hash={{orders: ctx.customer.orders}}/>
                                                <$Partial name="components/common/small-paginator" context={ctx.pagination.orders}/>
                                            </>
                                        )}
                                        $else={() => (
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
            <$Partial name="layout/base"/>
        </>
    ),
});
