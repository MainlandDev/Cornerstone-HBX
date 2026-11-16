import Breadcrumbs from "../../../components/common/breadcrumbs.tsx";
import SmallPaginator from "../../../components/common/small-paginator.tsx";
import {$frontmatter, $Page, $partial, $pointer, $string, $Lang} from "@mainlanddev/hbx-bigcommerce";

export const frontmatter = $frontmatter.other({customer: {orders: {limit: 3}}});

export default () => (
    <$Page
        blocks={{
            page: () => (
                <div className="account">
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h2 className="account-heading title">
                        <$Lang keyName={$string("account.orders.heading")} />
                    </h2>
                    {$partial("components/account/navigation", {account_page: $string("orders")})}
                    <div className="account-row orders-row">
                        <section className="orders">
                            {$partial("components/account/orders-list", {orders: $pointer("customer.orders")})}
                            <SmallPaginator $positionalHash={$pointer("pagination.orders")} />
                        </section>
                    </div>
                </div>
            ),
        }}
        layout="layout/base"
    />
);
