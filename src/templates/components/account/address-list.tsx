import {$Each, $If, $Partial, $string, $Unless} from '@mainlanddev/bigcommerce-react';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$asPartial, type ThemeContextHint, type ThemePageAccountAddresses} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';

type Hint = ThemeContextHint<ThemePageAccountAddresses>;

export default $asPartial<{ customer: Hint['customer']; urls: Hint['urls'] }>(({customer, urls}) => (
    <>
        <$Unless
            query={[customer.addresses]}
            $then={() => <$Partial name="components/common/alert/alert-info" context={$lang($string('account.addresses.no_addresses'))}/>}
        />

        <ul className="addressList">
            <$Each
                list={customer.addresses}
                $then={(address) => (
                    <li className="address">
                        <div className="panel panel--address">
                            <div className="panel-body">
                                <h5 className="address-title">
                                    {address.first_name} {address.last_name}
                                </h5>
                                <ul className="address-details address-details--postal">
                                    <li>{address.company}</li>
                                    <li>{address.address1}</li>
                                    <li>{address.address2}</li>
                                    <li>
                                        {address.city}
                                        <$If query={[address.state]} $then={() => <>, {address.state}</>}/> {address.zip}
                                    </li>
                                    <li>{address.country}</li>
                                </ul>
                                <$If
                                    query={[address.phone]}
                                    $then={() => (
                                        <dl className="address-details">
                                            <dt className="address-label">
                                                <$Lang translationKey={$string('account.addresses.phone')}/>
                                            </dt>
                                            <dd className="address-description">{address.phone}</dd>
                                        </dl>
                                    )}
                                />
                                <form action={address.delete_url} method="post" data-delete-address={$lang($string('forms.address.confirm_delete'))}>
                                    <div className="form-actions">
                                        <a className="button button--primary button--small" href={address.edit_url}>
                                            <$Lang translationKey={$string('common.edit')}/>
                                        </a>
                                        <button type="submit" className="button secondary button--small">
                                            <$Lang translationKey={$string('common.delete')}/>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </li>
                )}
            />
            <li className="address">
                <a className="panel panel--address panel--newAddress" href={urls.account.add_address}>
                    <span className="panel-body">
                        <span className="address-addNew">
                            <span className="address-symbol">{$$raw('&plus;')}</span>
                            <h5 className="address-title">
                                <$Lang translationKey={$string('account.addresses.new_address')}/>
                            </h5>
                        </span>
                    </span>
                </a>
            </li>
        </ul>
    </>
));
