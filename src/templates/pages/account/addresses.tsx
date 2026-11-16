import {$If, $Lang, $Page, $partial, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    {$partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")})}
                    <h2 className="page-heading">
                        <$Lang keyName={$string("account.addresses.heading")} />
                    </h2>
                    {$partial("components/account/navigation", {account_page: $string("addresses")})}

                    <div className="account account--fixedLarge">
                        <div className="account-body">
                            <$If
                                test={$pointer("customer.error")}
                                $then={() => $partial("components/common/alert/alert-error", $pointer("customer.error"))}
                            />
                            <$If
                                test={$pointer("customer.success")}
                                $then={() => $partial("components/common/alert/alert-success", $pointer("customer.success"))}
                            />
                            <section className="account-content">{$partial("components/account/address-list")}</section>
                        </div>
                    </div>
                </>
            ),
        }}
        layout="layout/base"
    />
);
