import {$If, $if, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$Inject, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {ExtendedThemePageAddWishlist} from '@/context-account';

type Hint = ThemeContextHint<ExtendedThemePageAddWishlist>;

export default $asPartial<{ forms: Hint['forms']; urls: Hint['urls'] }>(({forms, urls}) => (
    <>
        <$Inject keyName={$string('enterWishlistNameError')} value={$lang($string('account.wishlists.enter_wishlist_name_error'))}/>

        <div className="wishlist-add">
            <header className="wishlist-header">
                <$If
                    query={[forms.wishlist.id]}
                    $then={() => (
                        <h1>
                            <$Lang translationKey={$string('account.wishlists.edit')}/>
                        </h1>
                    )}
                    $else={() => (
                        <>
                            <h1>
                                <$Lang translationKey={$string('account.wishlists.new')}/>
                            </h1>
                            <p>
                                <$Lang translationKey={$string('account.wishlists.tag_line')}/>
                            </p>
                        </>
                    )}
                />
                <$If
                    query={[forms.wishlist.errors]}
                    $then={() => <$Partial name="components/common/alert/alert-error" context={forms.wishlist.errors}/>}
                />
            </header>
            <form
                action={$if(forms.wishlist.id)
                    .then(() => urls.account.wishlists.edit)
                    .else(() => [urls.account.wishlists.add, $$raw('&product_id='), forms.wishlist.product_id])}
                className="form wishlist-form"
                method="post"
            >
                <input type="hidden" name="submit"/>

                <div className="form-field">
                    <label className="form-label" htmlFor="wishlistname">
                        <$Lang translationKey={$string('forms.wishlist.name')}/>
                        <small>
                            <$Lang translationKey={$string('common.required')}/>
                        </small>
                    </label>
                    <input className="form-input" name="wishlistname" id="wishlistname" value={forms.wishlist.name}/>
                </div>
                <div className="form-field">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        name="publicwishlist"
                        id="publicwishlist"
                        checked={$$when($if(forms.wishlist.is_public))}
                    />
                    <label className="form-label" htmlFor="publicwishlist">
                        <$Lang translationKey={$string('forms.wishlist.public')}/>
                    </label>
                </div>
                <div className="form-actions">
                    <$If
                        query={[forms.wishlist.id]}
                        $then={() => (
                            <>
                                <input type="submit" className="button button--primary" value={$lang($string('account.wishlists.save'))}/>
                                <input type="hidden" name="wishlistid" value={forms.wishlist.id}/>
                            </>
                        )}
                        $else={() => (
                            <input type="submit" className="button button--primary" value={$lang($string('account.wishlists.create'))}/>
                        )}
                    />
                </div>
            </form>
        </div>
    </>
));
