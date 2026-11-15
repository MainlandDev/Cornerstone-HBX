import {$If, $Lang, $partial, $pointer, $StencilPartial, $string, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$StencilPartial
            name={$string("page")}
            $then={() => (
                <div className="account">
                    <$If
                        test={$pointer("settings.show_wishlist")}
                        $then={() => (
                            <>
                                {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                                <h2 className="page-heading">
                                    <$If
                                        test={$pointer("forms.wishlist.id")}
                                        $then={() => <$Lang keyName={$string("account.wishlists.edit")} />}
                                        $else={() => (
                                            <$If
                                                test={$pointer("forms.wishlist.action")}
                                                $then={() => <$Lang keyName={$string("account.wishlists.new")} />}
                                                $else={() => <$Lang keyName={$string("account.wishlists.heading")} />}
                                            />
                                        )}
                                    />
                                </h2>
                                {place($partial("components/account/navigation", {account_page: $string("wishlists")}))}
                                {place($partial("components/account/add-wishlist"))}
                            </>
                        )}
                    />
                </div>
            )}
        />
        {place($partial("layout/base"))}
    </>
);
