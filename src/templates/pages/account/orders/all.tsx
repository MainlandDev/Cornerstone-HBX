import AccountNavigation from "../../../components/account/navigation.tsx";
import AccountOrdersList from "../../../components/account/orders-list.tsx";
import Breadcrumbs from "../../../components/common/breadcrumbs.tsx";
import SmallPaginator from "../../../components/common/small-paginator.tsx";
import AlertAlertInfo from "../../../components/common/alert/alert-info.tsx";
import {$frontmatter, $If, $Lang, $lang, $number, $Page, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export const frontmatter = $frontmatter.other({customer: {orders: {limit: 10}}});

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h1 className="page-heading">
                        <$Lang keyName={$string("account.orders.heading")} />
                    </h1>
                    <AccountNavigation account_page={$string("orders")} />

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
                                            <AccountOrdersList orders={$pointer("customer.orders")} />
                                            <SmallPaginator $positionalHash={$pointer("pagination.orders")} />
                                        </>
                                    )}
                                    $else={() => <AlertAlertInfo $positionalHash={$lang($string("account.orders.none"))} />}
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
