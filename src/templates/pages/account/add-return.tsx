import {$Each, $For, $If, $Lang, $lang, $number, $partial, $pointer, $sanitize, $string, $StencilPartial, $this, $unescaped, place} from "@mainlanddev/hbx-bigcommerce";

// The library's context types have no `forms.return` key yet; these shapes type the pointers used here.
interface ReturnOption {
    name: string;
    value: string;
}

interface ReturnProduct {
    id: number;
    name: string;
    price: {formatted: string};
    quantity: number;
    options: ReturnOption[];
}

export default () => (
    <>
        <$StencilPartial
            name={$string("page")}
            $then={() => (
                <>
                    {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                    <h1 className="page-heading">
                        <$Lang keyName={$string("account.returns.new_return")} />
                    </h1>
                    {place($partial("components/account/navigation", {account_page: $string("returns")}))}

                    <main className="account account--fixed account--addReturn">
                        <div className="account-body">
                            <section className="account-content">
                                <h3 className="account-heading">
                                    <$Lang keyName={$string("account.returns.from_order")} id={$pointer("forms.return.order_id")} />
                                </h3>

                                <$If
                                    test={$pointer("forms.return.order_products.length")}
                                    $then={() => (
                                        <form
                                            action={$pointer("urls.account.orders.save_new_return")}
                                            className="form"
                                            method="post"
                                            data-account-return-form-error={$lang($string("account.returns.error_no_qty"))}
                                            data-account-return-form={""}
                                        >
                                            <fieldset className="form-fieldset">
                                                <input type="hidden" name="order_id" value={$pointer("forms.return.order_id")} />
                                                <table className="table table--line">
                                                    <thead className="table-thead">
                                                        <tr>
                                                            <th className="return-itemName">
                                                                <$Lang keyName={$string("account.orders.return.order_item")} />
                                                            </th>
                                                            <th className="return-itemPrice">
                                                                <$Lang keyName={$string("account.orders.return.item_price")} />
                                                            </th>
                                                            <th className="return-itemQuantity">
                                                                <$Lang keyName={$string("account.orders.return.quantity")} />
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="table-tbody">
                                                        <$Each
                                                            list={$pointer<ReturnProduct[]>("forms.return.order_products")}
                                                            $then={(product) => (
                                                                <tr>
                                                                    <td className="return-itemName">
                                                                        <span className="return-itemTitle">{product.name}</span>
                                                                        <$If
                                                                            test={product.options}
                                                                            $then={() => (
                                                                                <dl className="definitionList">
                                                                                    <$Each
                                                                                        list={product.options}
                                                                                        $then={(option) => (
                                                                                            <>
                                                                                                <dt className="definitionList-label">{option.name}:</dt>
                                                                                                <dd className="definitionList-description">
                                                                                                    {$unescaped($sanitize(option.value))}
                                                                                                </dd>
                                                                                            </>
                                                                                        )}
                                                                                    />
                                                                                </dl>
                                                                            )}
                                                                        />
                                                                    </td>
                                                                    <td className="return-itemPrice">{product.price.formatted}</td>
                                                                    <td className="return-itemQuantity">
                                                                        <label className="form-label">
                                                                            <$Lang keyName={$string("account.orders.return.quantity")} />:
                                                                        </label>
                                                                        <select
                                                                            className="form-select form-select--small form-select--short"
                                                                            name={`return_qty[${product.id}]`}
                                                                        >
                                                                            <$For
                                                                                from={$number(0)}
                                                                                to={product.quantity}
                                                                                $then={(ctx) => (
                                                                                    <option value={ctx.$index}>{ctx.$index}</option>
                                                                                )}
                                                                            />
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        />
                                                    </tbody>
                                                </table>
                                            </fieldset>
                                            <div className="account--addReturn-row">
                                                <fieldset className="form-fieldset account--addReturn-column">
                                                    <div className="form-field">
                                                        <label htmlFor="return_reason" className="form-label">
                                                            <$Lang keyName={$string("account.orders.return.reason")} />{" "}
                                                            <small>
                                                                <$Lang keyName={$string("common.required")} />
                                                            </small>
                                                        </label>
                                                        <select name="return_reason" id="return_reason" className="form-select">
                                                            <$Each
                                                                list={$pointer<string[]>("forms.return.reasons")}
                                                                $then={() => (
                                                                    <option value={$this<string>()}>{$this<string>()}</option>
                                                                )}
                                                            />
                                                        </select>
                                                    </div>
                                                    <div className="form-field">
                                                        <label htmlFor="return_action" className="form-label">
                                                            <$Lang keyName={$string("account.orders.return.action")} />
                                                        </label>
                                                        <select name="return_action" id="return_action" className="form-select">
                                                            <$Each
                                                                list={$pointer<string[]>("forms.return.actions")}
                                                                $then={() => (
                                                                    <option value={$this<string>()}>{$this<string>()}</option>
                                                                )}
                                                            />
                                                        </select>
                                                    </div>
                                                </fieldset>
                                                <fieldset className="form-fieldset account--addReturn-column">
                                                    <div className="form-field">
                                                        <label htmlFor="return_comments" className="form-label">
                                                            <$Lang keyName={$string("account.orders.return.comments")} />
                                                        </label>
                                                        <textarea className="form-input" rows={8} name="return_comments" id="return_comments" />
                                                    </div>
                                                </fieldset>
                                            </div>
                                            <div className="form-actions">
                                                <input
                                                    className="button button--primary"
                                                    type="submit"
                                                    value={$lang($string("account.returns.submit_request"))}
                                                />
                                            </div>
                                        </form>
                                    )}
                                    $else={() => (
                                        <>
                                            <p>
                                                <$Lang keyName={$string("account.orders.return.already_returned")} />
                                            </p>
                                            <a href={$pointer("urls.account.orders.all")} className="button">
                                                <$Lang keyName={$string("account.orders.return.back_button")} />
                                            </a>
                                        </>
                                    )}
                                />
                            </section>
                        </div>
                    </main>
                </>
            )}
        />
        {place($partial("layout/base"))}
    </>
);
