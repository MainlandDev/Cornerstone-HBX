import {$If, $Lang, $Page, $partial, $pointer, $string, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                    <h1 className="page-heading">
                        <$Lang keyName={$string("account.messages.heading")} />
                    </h1>
                    {place($partial("components/account/navigation", {account_page: $string("messages")}))}

                    <main className="account account--fixed">
                        <div className="account-body">
                            <section className="account-content">
                                <$If
                                    test={$pointer("forms.inbox.error")}
                                    $then={() => place($partial("components/common/alert/alert-error", $pointer("forms.inbox.error")))}
                                />
                                <$If
                                    test={$pointer("forms.inbox.success")}
                                    $then={() => place($partial("components/common/alert/alert-success", $pointer("forms.inbox.success")))}
                                />
                                {place($partial("components/account/messages-list", {messages: $pointer("customer.inbox.messages")}))}
                                {place($partial("components/account/messages-form"))}
                            </section>
                        </div>
                    </main>
                </>
            ),
        }}
        layout="layout/base"
    />
);
