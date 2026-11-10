/**
 * Source: templates/components/account/wishlist-list.html (54 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $string, $Unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageAccountWishlists} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';

type Hint = ThemeContextHint<ThemePageAccountWishlists>;

export default $asPartial<{ customer: Hint['customer']; urls: Hint['urls'] }>(({customer, urls}) => (
    <>
        {/* html L1: <table class="table table--line wishlists-table"> */}
        <table className="table table--line wishlists-table">
            {/* html L2: <thead class="table-thead"> */}
            <thead className="table-thead">
                {/* html L3: <tr> */}
                <tr>
                    {/* html L4: <th>{{lang 'account.wishlists.name'}}</th> */}
                    <th>
                        {/* html L4: {{lang 'account.wishlists.name'}} */}
                        <$Lang translationKey={$string('account.wishlists.name')}/>
                    </th>
                    {/* html L5: <th>{{lang 'account.wishlists.num_items'}}</th> */}
                    <th>
                        {/* html L5: {{lang 'account.wishlists.num_items'}} */}
                        <$Lang translationKey={$string('account.wishlists.num_items')}/>
                    </th>
                    {/* html L6: <th>{{lang 'account.wishlists.shared'}}</th> */}
                    <th>
                        {/* html L6: {{lang 'account.wishlists.shared'}} */}
                        <$Lang translationKey={$string('account.wishlists.shared')}/>
                    </th>
                    {/* html L7: <th>{{lang 'account.wishlists.action'}}</th> */}
                    <th>
                        {/* html L7: {{lang 'account.wishlists.action'}} */}
                        <$Lang translationKey={$string('account.wishlists.action')}/>
                    </th>
                </tr>
            </thead>
            {/* html L10: <tbody class="table-tbody"> */}
            <tbody className="table-tbody">
                {/* html L11: {{#each customer.wishlists}} */}
                <$Each
                    list={customer.wishlists}
                    $then={(wishlist) => (
                        /* html L12: <tr> */
                        <tr>
                            {/* html L13: <td><a href="{{view_url}}">{{name}}</a></td> */}
                            <td>
                                {/* html L13: <a href="{{view_url}}"> */}
                                <a href={wishlist.view_url}>{/* html L13: {{name}} */}{wishlist.name}</a>
                            </td>
                            {/* html L14: <td>{{num_items}}</td> */}
                            <td>{/* html L14: {{num_items}} */}{wishlist.num_items}</td>
                            {/* html L15: <td> */}
                            <td>
                                {/* html L16: {{#if is_public }} */}
                                <$If
                                    query={[wishlist.is_public]}
                                    $then={() => /* html L17: {{lang 'common.yes'}} */ <$Lang translationKey={$string('common.yes')}/>}
                                    $else={() => /* html L18: {{else}}
                                                                                                        html L19: {{lang 'common.no'}}
                                                 */ <$Lang translationKey={$string('common.no')}/>}
                                />
                            </td>
                            {/* html L22: <td class="table-actions"> */}
                            <td className="table-actions">
                                {/* html L23: <form method="post" action="{{delete_url}}" class="form"> */}
                                <form method="post" action={wishlist.delete_url} className="form">
                                    {/* html L24: <fieldset class="form-fieldset"> */}
                                    <fieldset className="form-fieldset">
                                        {/* html L25: {{#if is_public}} */}
                                        <$If
                                            query={[wishlist.is_public]}
                                            $then={() => (
                                                /* html L26-27:
                                                    <a href="{{share_url}}" class="button button--primary button--small"
                                                   role="button">{{lang 'common.share'}}</a>
                                                */
                                                <a href={wishlist.share_url} className="button button--primary button--small" role="button">
                                                    {/* html L27: {{lang 'common.share'}} */}
                                                    <$Lang translationKey={$string('common.share')}/>
                                                </a>
                                            )}
                                        />
                                        {/* html L29: <a href="{{edit_url}}" class="button button--small" data-wishlist>{{lang 'common.edit'}}</a> */}
                                        <a href={wishlist.edit_url} className="button button--small" data-wishlist="">
                                            {/* html L29: {{lang 'common.edit'}} */}
                                            <$Lang translationKey={$string('common.edit')}/>
                                        </a>
                                        {/* html L30: <input type="submit" value="{{lang 'common.delete'}}" class="button button--small" data-wishlist-delete> */}
                                        <input
                                            type="submit"
                                            value={$lang($string('common.delete'))}
                                            className="button button--small"
                                            data-wishlist-delete=""
                                        />
                                    </fieldset>
                                </form>
                            </td>
                        </tr>
                    )}
                />
            </tbody>
        </table>
        {/* html L38: <form method="post" action="{{this.urls.account.wishlists.delete}}" class="form"> */}
        <form method="post" action={urls.account.wishlists.delete} className="form">
            {/* html L39: {{#unless customer.wishlists}} */}
            <$Unless
                query={[customer.wishlists]}
                $then={() => (
                    /* html L40: <p class="form-actions">{{> components/common/alert/alert-info (lang 'account.wishlists.you_have_none')}}</p> */
                    <p className="form-actions">
                        {/* html L40: {{> components/common/alert/alert-info (lang 'account.wishlists.you_have_none')}} */}
                        <$Partial name="components/common/alert/alert-info" context={$lang($string('account.wishlists.you_have_none'))}/>
                    </p>
                )}
            />
            {/* html L43: <div class="form-actions"> */}
            <div className="form-actions">
                {/* html L44: <a href="{{this.urls.account.wishlists.add}}" class="button button--primary" role="button" data-wishlist>{{lang 'account.wishlists.new'}}</a> */}
                <a href={urls.account.wishlists.add} className="button button--primary" role="button" data-wishlist="">
                    {/* html L44: {{lang 'account.wishlists.new'}} */}
                    <$Lang translationKey={$string('account.wishlists.new')}/>
                </a>
                {/* html L45: {{inject 'wishlistDelete' (lang 'account.wishlists.delete_alert')}} */}
                <$Inject keyName={$string('wishlistDelete')} value={$lang($string('account.wishlists.delete_alert'))}/>
                {/* html L46: {{#if customer.wishlists}} */}
                <$If
                    query={[customer.wishlists]}
                    $then={() => (
                        <>
                            {/* html L47: {{#each customer.wishlists}} */}
                            <$Each
                                list={customer.wishlists}
                                $then={(wishlist) => /* html L48: <input type="hidden" value="{{this.id}}" name="deletewishlist[]"> */ <input type="hidden" value={wishlist.id} name="deletewishlist[]"/>}
                            />
                            {/* html L50: <input type="submit" value="{{lang 'account.wishlists.delete_all'}}" class="button" data-wishlist-delete> */}
                            <input
                                type="submit"
                                value={$lang($string('account.wishlists.delete_all'))}
                                className="button"
                                data-wishlist-delete=""
                            />
                        </>
                    )}
                />
            </div>
        </form>
    </>
));
