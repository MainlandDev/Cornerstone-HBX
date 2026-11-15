import {$Lang, $partial, $pointer, $StencilPartial, $string, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$StencilPartial
            name={$string("page")}
            $then={() => (
                <>
                    {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                    <h2 className="page-heading">
                        <$Lang keyName={$string("account.payment_methods.heading")} />
                    </h2>
                    {place($partial("components/account/navigation", {account_page: $string("payment_methods")}))}

                    <div className="account account--fixedLarge">
                        <div className="account-body">{place($partial("components/account/payment-methods-list"))}</div>
                    </div>
                </>
            )}
        />
        {place($partial("layout/base"))}
    </>
);
