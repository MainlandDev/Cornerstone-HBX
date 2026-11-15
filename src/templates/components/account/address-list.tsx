import {$Each, $If, $Lang, $lang, $partial, $pointer, $raw, $string, $Unless, place} from "@mainlanddev/hbx-bigcommerce";

interface Address {
    first_name: string;
    last_name: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    delete_url: string;
    edit_url: string;
}

export default () => (
    <>
        <$Unless
            test={$pointer("customer.addresses")}
            $then={() => place($partial("components/common/alert/alert-info", $lang($string("account.addresses.no_addresses"))))}
        />
        <ul className="addressList">
            <$Each
                list={$pointer<Address[]>("customer.addresses")}
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
                                        <$If
                                            test={address.state}
                                            $then={() => (
                                                <>
                                                    {", "}
                                                    {address.state}
                                                </>
                                            )}
                                        />{" "}
                                        {address.zip}
                                    </li>
                                    <li>{address.country}</li>
                                </ul>
                                <$If
                                    test={address.phone}
                                    $then={() => (
                                        <dl className="address-details">
                                            <dt className="address-label">
                                                <$Lang keyName={$string("account.addresses.phone")} />
                                            </dt>
                                            <dd className="address-description">{address.phone}</dd>
                                        </dl>
                                    )}
                                />
                                <form action={address.delete_url} method="post" data-delete-address={$lang($string("forms.address.confirm_delete"))}>
                                    <div className="form-actions">
                                        <a className="button button--primary button--small" href={address.edit_url}>
                                            <$Lang keyName={$string("common.edit")} />
                                        </a>{" "}
                                        <button type="submit" className="button secondary button--small">
                                            <$Lang keyName={$string("common.delete")} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </li>
                )}
            />
            <li className="address">
                <a className="panel panel--address panel--newAddress" href={$pointer("urls.account.add_address")}>
                    <span className="panel-body">
                        <span className="address-addNew">
                            <span className="address-symbol">{$raw("&plus;")}</span>
                            <h5 className="address-title">
                                <$Lang keyName={$string("account.addresses.new_address")} />
                            </h5>
                        </span>
                    </span>
                </a>
            </li>
        </ul>
    </>
);
