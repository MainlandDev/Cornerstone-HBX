import {$If, $Lang, $Page, $partial, $pointer, $string, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <$If
                    test={$pointer("settings.show_wishlist")}
                    $then={() => (
                        <div className="account account--fixedLarge">
                            {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                            <h2 className="page-heading">
                                <$Lang keyName={$string("account.wishlists.heading")} />
                            </h2>
                            {place($partial("components/account/navigation", {account_page: $string("wishlists")}))}
                            {place($partial("components/account/wishlist-list"))}
                        </div>
                    )}
                />
            ),
        }}
        layout="layout/base"
    />
);
