import {$frontmatter, $If, $Lang, $lang, $number, $Page, $partial, $pointer, $string, $unescaped, place} from "@mainlanddev/hbx-bigcommerce";

export const frontmatter = $frontmatter.other({customer: {orders: {limit: 10}}});

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                    <h1 className="page-heading">
                        <$Lang keyName={$string("account.orders.heading")} />
                    </h1>
                    {place($partial("components/account/navigation", {account_page: $string("orders")}))}

                    <main className="account account--fixed">
                        <div className="account-head">
                            <$If
                                test={$pointer("customer.store_credit.value")}
                                operator={$string(">")}
                                rvalue={$number(0)}
                                $then={() => (
                                    <>
                                        <div className="alertBox alertBox--storeCredit">
                                            {$unescaped(
                                                $lang($string("common.store_credit"), {store_credit: $pointer("customer.store_credit.formatted")}),
                                            )}
                                        </div>
                                    </>
                                )}
                            />
                        </div>
                        <div className="account-body">
                            <section className="account-content">
                                <$If
                                    test={$pointer("customer.orders.length")}
                                    $then={() => (
                                        <>
                                            {place($partial("components/account/orders-list", {orders: $pointer("customer.orders")}))}
                                            {place($partial("components/common/small-paginator", $pointer("pagination.orders")))}
                                        </>
                                    )}
                                    $else={() => place($partial("components/common/alert/alert-info", $lang($string("account.orders.none"))))}
                                />
                            </section>
                        </div>
                    </main>
                </>
            ),
        }}
        layout="layout/base"
    />
);
