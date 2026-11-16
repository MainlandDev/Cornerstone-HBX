import AccountNavigation from "../../components/account/navigation.tsx";
import AccountMessagesList from "../../components/account/messages-list.tsx";
import AccountMessagesForm from "../../components/account/messages-form.tsx";
import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import AlertAlertSuccess from "../../components/common/alert/alert-success.tsx";
import {$If, $Lang, $Page, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h1 className="page-heading">
                        <$Lang keyName={$string("account.messages.heading")} />
                    </h1>
                    <AccountNavigation account_page={$string("messages")} />

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
                                <AccountMessagesList messages={$pointer("customer.inbox.messages")} />
                                <AccountMessagesForm />
                            </section>
                        </div>
                    </main>
                </>
            ),
        }}
        layout="layout/base"
    />
);
