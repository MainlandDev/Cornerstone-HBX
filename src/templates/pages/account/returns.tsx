import {$If, $Lang, $lang, $partial, $pointer, $StencilPartial, $string, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$StencilPartial
            name={$string("page")}
            $then={() => (
                <>
                    {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                    <h1 className="page-heading">
                        <$Lang keyName={$string("account.returns.heading")} />
                    </h1>
                    {place($partial("components/account/navigation", {account_page: $string("returns")}))}

                    <main className="account account--fixed">
                        <div className="account-body">
                            <section className="account-content">
                                <$If
                                    test={$pointer("customer.returns")}
                                    $then={() => place($partial("components/account/returns-list", {returns: $pointer("customer.returns")}))}
                                    $else={() => place($partial("components/common/alert/alert-info", $lang($string("account.returns.none"))))}
                                />
                            </section>
                        </div>
                    </main>
                </>
            )}
        />
        {place($partial("layout/base"))}
    </>
);
