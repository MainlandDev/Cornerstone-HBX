import {$If, $Inject, $lang, $Lang, $partial, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$Inject keyName={$string("enterWishlistNameError")} value={$lang($string("account.wishlists.enter_wishlist_name_error"))} />
        <div className="wishlist-add">
            <header className="wishlist-header">
                <$If
                    test={$pointer("forms.wishlist.id")}
                    $then={() => (
                        <h1>
                            <$Lang keyName={$string("account.wishlists.edit")} />
                        </h1>
                    )}
                    $else={() => (
                        <>
                            <h1>
                                <$Lang keyName={$string("account.wishlists.new")} />
                            </h1>
                            <p>
                                <$Lang keyName={$string("account.wishlists.tag_line")} />
                            </p>
                        </>
                    )}
                />
                <$If
                    test={$pointer("forms.wishlist.errors")}
                    $then={() => $partial("components/common/alert/alert-error", $pointer("forms.wishlist.errors"))}
                />
            </header>
            <form
                className="form wishlist-form"
                method="post"
                dangerouslyInlineAttributes={{
                    attributes: `action="${$If({
                        test: $pointer("forms.wishlist.id"),
                        $then: () => $pointer("urls.account.wishlists.edit"),
                        $else: () => `${$pointer("urls.account.wishlists.add")}${$raw("&product_id=")}${$pointer("forms.wishlist.product_id")}`,
                    })}"`,
                }}
            >
                <input type="hidden" name="submit" />

                <div className="form-field">
                    <label className="form-label" htmlFor="wishlistname">
                        <$Lang keyName={$string("forms.wishlist.name")} />{" "}
                        <small>
                            <$Lang keyName={$string("common.required")} />
                        </small>
                    </label>
                    <input className="form-input" name="wishlistname" id="wishlistname" value={$pointer("forms.wishlist.name")} />
                </div>
                <div className="form-field">
                    <input
                        type="checkbox"
                        dangerouslyInlineAttributes={{
                            attributes: `class="form-checkbox" name="publicwishlist" id="publicwishlist" ${$If({test: $pointer("forms.wishlist.is_public"), $then: () => "checked"})}`,
                        }}
                    />{" "}
                    <label className="form-label" htmlFor="publicwishlist">
                        <$Lang keyName={$string("forms.wishlist.public")} />
                    </label>
                </div>
                <div className="form-actions">
                    <$If
                        test={$pointer("forms.wishlist.id")}
                        $then={() => (
                            <>
                                <input type="submit" className="button button--primary" value={$lang($string("account.wishlists.save"))} />{" "}
                                <input type="hidden" name="wishlistid" value={$pointer("forms.wishlist.id")} />
                            </>
                        )}
                        $else={() => (
                            <input type="submit" className="button button--primary" value={$lang($string("account.wishlists.create"))} />
                        )}
                    />
                </div>
            </form>
        </div>
    </>
);
