/**
 * Source: templates/components/account/address-list.html (45 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $string, $Unless} from '@mainlanddev/bigcommerce-react';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$asPartial, type ThemeContextHint, type ThemePageAccountAddresses} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';

type Hint = ThemeContextHint<ThemePageAccountAddresses>;

export default $asPartial<{ customer: Hint['customer']; urls: Hint['urls'] }>(({customer, urls}) => (
    <>
        {/* html L1: {{#unless customer.addresses}} */}
        <$Unless
            query={[customer.addresses]}
            $then={() => /* html L2: {{> components/common/alert/alert-info (lang 'account.addresses.no_addresses')}} */ <$Partial name="components/common/alert/alert-info" context={$lang($string('account.addresses.no_addresses'))}/>}
        />

        {/* html L5: <ul class="addressList"> */}
        <ul className="addressList">
            {/* html L6: {{#each customer.addresses}} */}
            <$Each
                list={customer.addresses}
                $then={(address) => (
                    /* html L7: <li class="address"> */
                    <li className="address">
                        {/* html L8: <div class="panel panel--address"> */}
                        <div className="panel panel--address">
                            {/* html L9: <div class="panel-body"> */}
                            <div className="panel-body">
                                {/* html L10: <h5 class="address-title">{{first_name}} {{last_name}}</h5> */}
                                <h5 className="address-title">
                                    {/* html L10: {{first_name}} */}
                                    {address.first_name} {/* html L10: {{last_name}} */}{address.last_name}
                                </h5>
                                {/* html L11: <ul class="address-details address-details--postal"> */}
                                <ul className="address-details address-details--postal">
                                    {/* html L12: <li>{{company}}</li> */}
                                    <li>{/* html L12: {{company}} */}{address.company}</li>
                                    {/* html L13: <li>{{address1}}</li> */}
                                    <li>{/* html L13: {{address1}} */}{address.address1}</li>
                                    {/* html L14: <li>{{address2}}</li> */}
                                    <li>{/* html L14: {{address2}} */}{address.address2}</li>
                                    {/* html L15: <li>{{city}}{{#if state}}, {{state}}{{/if}} {{zip}}</li> */}
                                    <li>
                                        {/* html L15: {{city}} */}
                                        {address.city}
                                        {/* html L15: {{#if state}} */}
                                        <$If query={[address.state]} $then={() => <>, {/* html L15: {{state}} */}{address.state}</>}/> {/* html L15: {{zip}} */}{address.zip}
                                    </li>
                                    {/* html L16: <li>{{country}}</li> */}
                                    <li>{/* html L16: {{country}} */}{address.country}</li>
                                </ul>
                                {/* html L18: {{#if phone}} */}
                                <$If
                                    query={[address.phone]}
                                    $then={() => (
                                        /* html L19: <dl class="address-details"> */
                                        <dl className="address-details">
                                            {/* html L20: <dt class="address-label">{{lang 'account.addresses.phone' }}</dt> */}
                                            <dt className="address-label">
                                                {/* html L20: {{lang 'account.addresses.phone' }} */}
                                                <$Lang translationKey={$string('account.addresses.phone')}/>
                                            </dt>
                                            {/* html L21: <dd class="address-description">{{phone}}</dd> */}
                                            <dd className="address-description">{/* html L21: {{phone}} */}{address.phone}</dd>
                                        </dl>
                                    )}
                                />
                                {/* html L24: <form action="{{delete_url}}" method="post" data-delete-address="{{lang 'forms.address.confirm_delete'}}"> */}
                                <form action={address.delete_url} method="post" data-delete-address={$lang($string('forms.address.confirm_delete'))}>
                                    {/* html L25: <div class="form-actions"> */}
                                    <div className="form-actions">
                                        {/* html L26: <a class="button button--primary button--small" href="{{edit_url}}">{{lang 'common.edit' }}</a> */}
                                        <a className="button button--primary button--small" href={address.edit_url}>
                                            {/* html L26: {{lang 'common.edit' }} */}
                                            <$Lang translationKey={$string('common.edit')}/>
                                        </a>
                                        {/* html L27: <button type="submit" class="button secondary button--small">{{lang 'common.delete' }}</button> */}
                                        <button type="submit" className="button secondary button--small">
                                            {/* html L27: {{lang 'common.delete' }} */}
                                            <$Lang translationKey={$string('common.delete')}/>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </li>
                )}
            />
            {/* html L34: <li class="address"> */}
            <li className="address">
                {/* html L35: <a class="panel panel--address panel--newAddress" href="{{urls.account.add_address}}"> */}
                <a className="panel panel--address panel--newAddress" href={urls.account.add_address}>
                    {/* html L36: <span class="panel-body"> */}
                    <span className="panel-body">
                        {/* html L37: <span class="address-addNew"> */}
                        <span className="address-addNew">
                            {/* html L38: <span class="address-symbol">&plus;</span> */}
                            <span className="address-symbol">{$$raw('&plus;')}</span>
                            {/* html L39: <h5 class="address-title">{{lang 'account.addresses.new_address' }}</h5> */}
                            <h5 className="address-title">
                                {/* html L39: {{lang 'account.addresses.new_address' }} */}
                                <$Lang translationKey={$string('account.addresses.new_address')}/>
                            </h5>
                        </span>
                    </span>
                </a>
            </li>
        </ul>
    </>
));
