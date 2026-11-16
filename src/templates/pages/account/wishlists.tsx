import AccountNavigation from "../../components/account/navigation.tsx";
import AccountWishlistList from "../../components/account/wishlist-list.tsx";
import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import {$If, $Lang, $Page, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

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
                            <AccountNavigation account_page={$string("wishlists")} />
                            <AccountWishlistList />
                        </div>
                    )}
                />
            ),
        }}
        layout="layout/base"
    />
);
