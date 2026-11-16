import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import {$If, $Lang, $Page, $partial, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <$If
                    test={$pointer("settings.show_wishlist")}
                    $then={() => (
                        <div className="account account--fixedLarge">
                            <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                            <h2 className="page-heading">
                                <$Lang keyName={$string("account.wishlists.heading")} />
                            </h2>
                            {$partial("components/account/navigation", {account_page: $string("wishlists")})}
                            {$partial("components/account/wishlist-list")}
                        </div>
                    )}
                />
            ),
        }}
        layout="layout/base"
    />
);
