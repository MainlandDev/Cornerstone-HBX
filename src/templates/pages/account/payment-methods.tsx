import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import {$Lang, $Page, $partial, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h2 className="page-heading">
                        <$Lang keyName={$string("account.payment_methods.heading")} />
                    </h2>
                    {$partial("components/account/navigation", {account_page: $string("payment_methods")})}

                    <div className="account account--fixedLarge">
                        <div className="account-body">{$partial("components/account/payment-methods-list")}</div>
                    </div>
                </>
            ),
        }}
        layout="layout/base"
    />
);
