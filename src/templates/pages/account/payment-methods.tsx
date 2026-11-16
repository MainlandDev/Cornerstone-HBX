import AccountNavigation from "../../components/account/navigation.tsx";
import AccountPaymentMethodsList from "../../components/account/payment-methods-list.tsx";
import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import {$Lang, $Page, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h2 className="page-heading">
                        <$Lang keyName={$string("account.payment_methods.heading")} />
                    </h2>
                    <AccountNavigation account_page={$string("payment_methods")} />

                    <div className="account account--fixedLarge">
                        <div className="account-body"><AccountPaymentMethodsList /></div>
                    </div>
                </>
            ),
        }}
        layout="layout/base"
    />
);
