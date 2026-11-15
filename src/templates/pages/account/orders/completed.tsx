import {$frontmatter, $partial, $pointer, $StencilPartial, $string, $Lang, place} from "@mainlanddev/hbx-bigcommerce";

export const frontmatter = $frontmatter.other({customer: {orders: {limit: 3}}});

export default () => (
    <>
        <$StencilPartial
            name={$string("page")}
            $then={() => (
                <div className="account">
                    {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                    <h2 className="account-heading title">
                        <$Lang keyName={$string("account.orders.heading")} />
                    </h2>
                    {place($partial("components/account/navigation", {account_page: $string("orders")}))}
                    <div className="account-row orders-row">
                        <section className="orders">
                            {place($partial("components/account/orders-list", {orders: $pointer("customer.orders")}))}
                            {place($partial("components/common/small-paginator", $pointer("pagination.orders")))}
                        </section>
                    </div>
                </div>
            )}
        />
        {place($partial("layout/base"))}
    </>
);
