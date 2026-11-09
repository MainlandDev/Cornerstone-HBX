import {$Each, $If, $Partial, $string, $Unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageAccountWishlists} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';

type Hint = ThemeContextHint<ThemePageAccountWishlists>;

export default $asPartial<{ customer: Hint['customer']; urls: Hint['urls'] }>(({customer, urls}) => (
    <>
        <table className="table table--line wishlists-table">
            <thead className="table-thead">
                <tr>
                    <th>
                        <$Lang translationKey={$string('account.wishlists.name')}/>
                    </th>
                    <th>
                        <$Lang translationKey={$string('account.wishlists.num_items')}/>
                    </th>
                    <th>
                        <$Lang translationKey={$string('account.wishlists.shared')}/>
                    </th>
                    <th>
                        <$Lang translationKey={$string('account.wishlists.action')}/>
                    </th>
                </tr>
            </thead>
            <tbody className="table-tbody">
                <$Each
                    list={customer.wishlists}
                    $then={(wishlist) => (
                        <tr>
                            <td>
                                <a href={wishlist.view_url}>{wishlist.name}</a>
                            </td>
                            <td>{wishlist.num_items}</td>
                            <td>
                                <$If
                                    query={[wishlist.is_public]}
                                    $then={() => <$Lang translationKey={$string('common.yes')}/>}
                                    $else={() => <$Lang translationKey={$string('common.no')}/>}
                                />
                            </td>
                            <td className="table-actions">
                                <form method="post" action={wishlist.delete_url} className="form">
                                    <fieldset className="form-fieldset">
                                        <$If
                                            query={[wishlist.is_public]}
                                            $then={() => (
                                                <a href={wishlist.share_url} className="button button--primary button--small" role="button">
                                                    <$Lang translationKey={$string('common.share')}/>
                                                </a>
                                            )}
                                        />
                                        <a href={wishlist.edit_url} className="button button--small" data-wishlist="">
                                            <$Lang translationKey={$string('common.edit')}/>
                                        </a>
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
        <form method="post" action={urls.account.wishlists.delete} className="form">
            <$Unless
                query={[customer.wishlists]}
                $then={() => (
                    <p className="form-actions">
                        <$Partial name="components/common/alert/alert-info" context={$lang($string('account.wishlists.you_have_none'))}/>
                    </p>
                )}
            />
            <div className="form-actions">
                <a href={urls.account.wishlists.add} className="button button--primary" role="button" data-wishlist="">
                    <$Lang translationKey={$string('account.wishlists.new')}/>
                </a>
                <$Inject keyName={$string('wishlistDelete')} value={$lang($string('account.wishlists.delete_alert'))}/>
                <$If
                    query={[customer.wishlists]}
                    $then={() => (
                        <>
                            <$Each
                                list={customer.wishlists}
                                $then={(wishlist) => <input type="hidden" value={wishlist.id} name="deletewishlist[]"/>}
                            />
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
