import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import AlertAlertSuccess from "../../components/common/alert/alert-success.tsx";
import {$If, $Lang, $Page, $partial, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h2 className="page-heading">
                        <$Lang keyName={$string("account.addresses.heading")} />
                    </h2>
                    {$partial("components/account/navigation", {account_page: $string("addresses")})}

                    <div className="account account--fixedLarge">
                        <div className="account-body">
                            <$If
                                test={$pointer("customer.error")}
                                $then={() => <AlertAlertError $positionalHash={$pointer("customer.error")} />}
                            />
                            <$If
                                test={$pointer("customer.success")}
                                $then={() => <AlertAlertSuccess $positionalHash={$pointer("customer.success")} />}
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
