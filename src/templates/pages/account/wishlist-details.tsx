import {$If, $Lang, $lang, $number, $Page, $partial, $pointer, $string, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <div className="account" data-pagination-wishlist={""}>
                    <$If
                        test={$pointer("wishlist.is_editable")}
                        $then={() => place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                    />
                    <h2 className="page-heading">
                        <$Lang keyName={$string("account.wishlists.view_heading")} name={$pointer("wishlist.name")} />
                    </h2>
                    <$If
                        test={$pointer("wishlist.is_editable")}
                        $then={() => place($partial("components/account/navigation", {account_page: $string("wishlists")}))}
                    />

                    <$If
                        test={$pointer("wishlist.is_editable")}
                        $then={() => (
                            <>
                                <$If
                                    test={$pointer("wishlist.is_public")}
                                    operator={$string(">")}
                                    rvalue={$number(0)}
                                    $then={() => (
                                        <>
                                            <div className="panel share-wishlist">
                                                <div className="panel-body">
                                                    <h5>
                                                        <$Lang keyName={$string("account.wishlists.share_intro")} />
                                                    </h5>
                                                    <input className="form-input" value={`${$pointer("settings.base_url")}${$pointer("wishlist.share_url")}`} readOnly={true} />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                />
                            </>
                        )}
                    />

                    <$If
                        test={$pointer("wishlist.items")}
                        $then={() => place($partial("components/account/wishlist-item-list", {show_remove: $pointer("wishlist.is_editable")}))}
                        $else={() => place($partial("components/common/alert/alert-info", $lang($string("account.wishlists.empty_wishlist"))))}
                    />
                </div>
            ),
        }}
        layout="layout/base"
    />
);
