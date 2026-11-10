/**
 * Source: templates/components/account/add-wishlist.html (42 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $if, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$Inject, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {ExtendedThemePageAddWishlist} from '@/context-account';

type Hint = ThemeContextHint<ExtendedThemePageAddWishlist>;

export default $asPartial<{ forms: Hint['forms']; urls: Hint['urls'] }>(({forms, urls}) => (
    <>
        {/* html L1: {{inject 'enterWishlistNameError' (lang 'account.wishlists.enter_wishlist_name_error')}} */}
        <$Inject keyName={$string('enterWishlistNameError')} value={$lang($string('account.wishlists.enter_wishlist_name_error'))}/>

        {/* html L3: <div class="wishlist-add"> */}
        <div className="wishlist-add">
            {/* html L4: <header class="wishlist-header"> */}
            <header className="wishlist-header">
                {/* html L5: {{#if forms.wishlist.id}} */}
                <$If
                    query={[forms.wishlist.id]}
                    $then={() => (
                        /* html L6: <h1>{{lang 'account.wishlists.edit'}}</h1> */
                        <h1>
                            {/* html L6: {{lang 'account.wishlists.edit'}} */}
                            <$Lang translationKey={$string('account.wishlists.edit')}/>
                        </h1>
                    )}
                    $else={() => (
                        <>
                            {/* html L7: {{else}}
                                                              html L8: <h1>{{lang 'account.wishlists.new'}}</h1>
                            */}
                            <h1>
                                {/* html L8: {{lang 'account.wishlists.new'}} */}
                                <$Lang translationKey={$string('account.wishlists.new')}/>
                            </h1>
                            {/* html L9: <p>{{lang 'account.wishlists.tag_line'}}</p> */}
                            <p>
                                {/* html L9: {{lang 'account.wishlists.tag_line'}} */}
                                <$Lang translationKey={$string('account.wishlists.tag_line')}/>
                            </p>
                        </>
                    )}
                />
                {/* html L11: {{#if forms.wishlist.errors}} */}
                <$If
                    query={[forms.wishlist.errors]}
                    $then={() => /* html L12: {{> components/common/alert/alert-error forms.wishlist.errors}} */ <$Partial name="components/common/alert/alert-error" context={forms.wishlist.errors}/>}
                />
            </header>
            {/* html L15: <form action="{{#if forms.wishlist.id}}{{urls.account.wishlists.edit}}{{else}}{{urls.account.wishlists.add}}&product_id={{forms.wishlist.product_id}}{{/if}}" class="form wishlist-form" method="post"> */}
            <form
                action={$if(forms.wishlist.id)
                    .then(() => urls.account.wishlists.edit)
                    .else(() => [urls.account.wishlists.add, $$raw('&product_id='), forms.wishlist.product_id])}
                className="form wishlist-form"
                method="post"
            >
                {/* html L16: <input type="hidden" name="submit"> */}
                <input type="hidden" name="submit"/>

                {/* html L18: <div class="form-field"> */}
                <div className="form-field">
                    {/* html L19: <label class="form-label" for="wishlistname"> */}
                    <label className="form-label" htmlFor="wishlistname">
                        {/* html L20: {{lang 'forms.wishlist.name'}} */}
                        <$Lang translationKey={$string('forms.wishlist.name')}/>
                        {/* html L21: <small>{{lang 'common.required' }}</small> */}
                        <small>
                            {/* html L21: {{lang 'common.required' }} */}
                            <$Lang translationKey={$string('common.required')}/>
                        </small>
                    </label>
                    {/* html L23: <input class="form-input" name="wishlistname" id="wishlistname" value="{{forms.wishlist.name}}"> */}
                    <input className="form-input" name="wishlistname" id="wishlistname" value={forms.wishlist.name}/>
                </div>
                {/* html L25: <div class="form-field"> */}
                <div className="form-field">
                    {/* html L26: <input type="checkbox" class="form-checkbox" name="publicwishlist" id="publicwishlist" {{#if forms.wishlist.is_public}}checked{{/if}}> */}
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        name="publicwishlist"
                        id="publicwishlist"
                        checked={$$when($if(forms.wishlist.is_public))}
                    />
                    {/* html L27: <label class="form-label" for="publicwishlist">{{lang 'forms.wishlist.public' }}</label> */}
                    <label className="form-label" htmlFor="publicwishlist">
                        {/* html L27: {{lang 'forms.wishlist.public' }} */}
                        <$Lang translationKey={$string('forms.wishlist.public')}/>
                    </label>
                </div>
                {/* html L30: <div class="form-actions"> */}
                <div className="form-actions">
                    {/* html L31: {{#if forms.wishlist.id}} */}
                    <$If
                        query={[forms.wishlist.id]}
                        $then={() => (
                            <>
                                {/* html L32: <input type="submit" class="button button--primary" value="{{lang 'account.wishlists.save'}}"> */}
                                <input type="submit" className="button button--primary" value={$lang($string('account.wishlists.save'))}/>
                                {/* html L33: <input type="hidden" name="wishlistid" value="{{forms.wishlist.id}}"> */}
                                <input type="hidden" name="wishlistid" value={forms.wishlist.id}/>
                            </>
                        )}
                        $else={() => (
                            /* html L34: {{else}}
                                                              html L35-36:
                               <input type="submit" class="button button--primary"
                                      value="{{lang 'account.wishlists.create'}}">
                            */
                            <input type="submit" className="button button--primary" value={$lang($string('account.wishlists.create'))}/>
                        )}
                    />
                </div>
            </form>
        </div>
    </>
));
