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
                    <h1 className="page-heading">
                        <$Lang keyName={$string("account.messages.heading")} />
                    </h1>
                    {$partial("components/account/navigation", {account_page: $string("messages")})}

                    <main className="account account--fixed">
                        <div className="account-body">
                            <section className="account-content">
                                <$If
                                    test={$pointer("forms.inbox.error")}
                                    $then={() => <AlertAlertError $positionalHash={$pointer("forms.inbox.error")} />}
                                />
                                <$If
                                    test={$pointer("forms.inbox.success")}
                                    $then={() => <AlertAlertSuccess $positionalHash={$pointer("forms.inbox.success")} />}
                                />
                                {$partial("components/account/messages-list", {messages: $pointer("customer.inbox.messages")})}
                                {$partial("components/account/messages-form")}
                            </section>
                        </div>
                    </main>
                </>
            ),
        }}
        layout="layout/base"
    />
);
