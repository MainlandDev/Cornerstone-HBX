import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import AlertAlertInfo from "../../components/common/alert/alert-info.tsx";
import {$If, $Lang, $lang, $number, $Page, $partial, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <div className="account" data-pagination-wishlist={""}>
                    <$If
                        test={$pointer("wishlist.is_editable")}
                        $then={() => <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />}
                    />
                    <h2 className="page-heading">
                        <$Lang keyName={$string("account.wishlists.view_heading")} name={$pointer("wishlist.name")} />
                    </h2>
                    <$If
                        test={$pointer("wishlist.is_editable")}
                        $then={() => $partial("components/account/navigation", {account_page: $string("wishlists")})}
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
                        $then={() => $partial("components/account/wishlist-item-list", {show_remove: $pointer("wishlist.is_editable")})}
                        $else={() => <AlertAlertInfo $positionalHash={$lang($string("account.wishlists.empty_wishlist"))} />}
                    />
                </div>
            ),
        }}
        layout="layout/base"
    />
);
