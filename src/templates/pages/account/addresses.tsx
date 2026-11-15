import {$If, $Lang, $partial, $pointer, $StencilPartial, $string, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$StencilPartial
            name={$string("page")}
            $then={() => (
                <>
                    {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                    <h2 className="page-heading">
                        <$Lang keyName={$string("account.addresses.heading")} />
                    </h2>
                    {place($partial("components/account/navigation", {account_page: $string("addresses")}))}

                    <div className="account account--fixedLarge">
                        <div className="account-body">
                            <$If
                                test={$pointer("customer.error")}
                                $then={() => place($partial("components/common/alert/alert-error", $pointer("customer.error")))}
                            />
                            <$If
                                test={$pointer("customer.success")}
                                $then={() => place($partial("components/common/alert/alert-success", $pointer("customer.success")))}
                            />
                            <section className="account-content">{place($partial("components/account/address-list"))}</section>
                        </div>
                    </div>
                </>
            )}
        />
        {place($partial("layout/base"))}
    </>
);
