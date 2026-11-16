import {$If, $Lang, $lang, $Page, $partial, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    {$partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")})}
                    <h1 className="page-heading">
                        <$Lang keyName={$string("account.returns.heading")} />
                    </h1>
                    {$partial("components/account/navigation", {account_page: $string("returns")})}

                    <main className="account account--fixed">
                        <div className="account-body">
                            <section className="account-content">
                                <$If
                                    test={$pointer("customer.returns")}
                                    $then={() => $partial("components/account/returns-list", {returns: $pointer("customer.returns")})}
                                    $else={() => $partial("components/common/alert/alert-info", $lang($string("account.returns.none")))}
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
