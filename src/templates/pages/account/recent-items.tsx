import AccountNavigation from "../../components/account/navigation.tsx";
import ProductsGrid from "../../components/products/grid.tsx";
import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import AlertAlertInfo from "../../components/common/alert/alert-info.tsx";
import {$lang, $Lang, $Page, $pointer, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <div className="account">
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h2 className="page-heading">
                        <$Lang keyName={$string("account.recent_items.heading")} />
                    </h2>
                    <AccountNavigation account_page={$string("recent_items")} />

                    <$Unless
                        test={$pointer("customer.recently_viewed_products.items")}
                        $then={() => <AlertAlertInfo $positionalHash={$lang($string("account.recent_items.no_items"))} />}
                    />

                    <div>
                        <ProductsGrid products={$pointer("customer.recently_viewed_products.items")} show_compare={$pointer("customer.recently_viewed_products.show_compare")} />
                    </div>
                </div>
            ),
        }}
        layout="layout/base"
    />
);
