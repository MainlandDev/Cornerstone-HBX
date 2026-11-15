import {$Each, $If, $Inject, $Lang, $lang, $partial, $pointer, $string, $Unless, place} from "@mainlanddev/hbx-bigcommerce";

interface Wishlist {
    id: string;
    name: string;
    num_items: number;
    is_public: boolean;
    view_url: string;
    delete_url: string;
    share_url: string;
    edit_url: string;
}

export default () => (
    <>
        <table className="table table--line wishlists-table">
            <thead className="table-thead">
                <tr>
                    <th>
                        <$Lang keyName={$string("account.wishlists.name")} />
                    </th>
                    <th>
                        <$Lang keyName={$string("account.wishlists.num_items")} />
                    </th>
                    <th>
                        <$Lang keyName={$string("account.wishlists.shared")} />
                    </th>
                    <th>
                        <$Lang keyName={$string("account.wishlists.action")} />
                    </th>
                </tr>
            </thead>
            <tbody className="table-tbody">
                <$Each
                    list={$pointer<Wishlist[]>("customer.wishlists")}
                    $then={(wishlist) => (
                        <tr>
                            <td>
                                <a href={wishlist.view_url}>{wishlist.name}</a>
                            </td>
                            <td>{wishlist.num_items}</td>
                            <td>
                                <$If
                                    test={wishlist.is_public}
                                    $then={() => <$Lang keyName={$string("common.yes")} />}
                                    $else={() => <$Lang keyName={$string("common.no")} />}
                                />
                            </td>
                            <td className="table-actions">
                                <form method="post" action={wishlist.delete_url} className="form">
                                    <fieldset className="form-fieldset">
                                        <$If
                                            test={wishlist.is_public}
                                            $then={() => (
                                                <a href={wishlist.share_url} className="button button--primary button--small" role="button">
                                                    <$Lang keyName={$string("common.share")} />
                                                </a>
                                            )}
                                        />{" "}
                                        <a href={wishlist.edit_url} className="button button--small" data-wishlist={""}>
                                            <$Lang keyName={$string("common.edit")} />
                                        </a>{" "}
                                        <input type="submit" value={$lang($string("common.delete"))} className="button button--small" data-wishlist-delete={""} />
                                    </fieldset>
                                </form>
                            </td>
                        </tr>
                    )}
                />
            </tbody>
        </table>
        <form method="post" action={$pointer("urls.account.wishlists.delete")} className="form">
            <$Unless
                test={$pointer("customer.wishlists")}
                $then={() => (
                    <p className="form-actions">
                        {place($partial("components/common/alert/alert-info", $lang($string("account.wishlists.you_have_none"))))}
                    </p>
                )}
            />
            <div className="form-actions">
                <a href={$pointer("urls.account.wishlists.add")} className="button button--primary" role="button" data-wishlist={""}>
                    <$Lang keyName={$string("account.wishlists.new")} />
                </a>{" "}
                <$Inject keyName={$string("wishlistDelete")} value={$lang($string("account.wishlists.delete_alert"))} />{" "}
                <$If
                    test={$pointer("customer.wishlists")}
                    $then={() => (
                        <>
                            <$Each
                                list={$pointer<Wishlist[]>("customer.wishlists")}
                                $then={(wishlist) => <input type="hidden" value={wishlist.id} name="deletewishlist[]" />}
                            />
                            <input type="submit" value={$lang($string("account.wishlists.delete_all"))} className="button" data-wishlist-delete={""} />
                        </>
                    )}
                />
            </div>
        </form>
    </>
);
