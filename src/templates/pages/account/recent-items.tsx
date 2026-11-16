import {$lang, $Lang, $Page, $partial, $pointer, $string, $Unless, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <div className="account">
                    {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                    <h2 className="page-heading">
                        <$Lang keyName={$string("account.recent_items.heading")} />
                    </h2>
                    {place($partial("components/account/navigation", {account_page: $string("recent_items")}))}

                    <$Unless
                        test={$pointer("customer.recently_viewed_products.items")}
                        $then={() => place($partial("components/common/alert/alert-info", $lang($string("account.recent_items.no_items"))))}
                    />

                    <div>
                        {place(
                            $partial("components/products/grid", {
                                products: $pointer("customer.recently_viewed_products.items"),
                                show_compare: $pointer("customer.recently_viewed_products.show_compare"),
                            }),
                        )}
                    </div>
                </div>
            ),
        }}
        layout="layout/base"
    />
);
