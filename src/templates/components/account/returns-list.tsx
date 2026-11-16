import {$Each, $If, $Lang, $partial, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

interface ReturnOption {
    name: string;
}

interface Return {
    id: string;
    status: string;
    quantity: number;
    date_requested: string;
    action: string;
    reason: string;
    comments: string;
    product: {
        image: unknown;
        url: string;
        name: string;
        options: ReturnOption[];
    };
}

export default () => (
    <>
        <h3 className="account-heading">
            <$Lang keyName={$string("account.returns.heading")} />
        </h3>

        <ul className="account-list">
            <$Each
                list={$pointer<Return[]>("returns")}
                $then={(ret) => (
                    <li className="account-listItem">
                        <div className="account-product">
                            <div className="account-product-figure">
                                {$partial("components/common/responsive-img", {
                                        image: ret.product.image,
                                        fallback_size: $pointer("../theme_settings.productthumb_size"),
                                        lazyload: $pointer("../theme_settings.lazyload_mode"),
                                    })}
                            </div>
                            <div className="account-product-body">
                                <div className="account-orderStatus">
                                    <$If
                                        test={$pointer("status")}
                                        operator={$string("===")}
                                        rvalue={$string("ReturnStatusPending")}
                                        $then={() => (
                                            <h6 className="account-orderStatus-label">
                                                <$Lang keyName={$string("account.returns.status.pending")} />
                                            </h6>
                                        )}
                                        $elseThen={[
                                            {
                                                test: $pointer("status"),
                                                operator: $string("==="),
                                                rvalue: $string("ReturnStatusReceived"),
                                                $then: () => (
                                                    <h6 className="account-orderStatus-label">
                                                        <$Lang keyName={$string("account.returns.status.received")} />
                                                    </h6>
                                                ),
                                            },
                                            {
                                                test: $pointer("status"),
                                                operator: $string("==="),
                                                rvalue: $string("ReturnStatusAuthorized"),
                                                $then: () => (
                                                    <h6 className="account-orderStatus-label">
                                                        <$Lang keyName={$string("account.returns.status.authorized")} />
                                                    </h6>
                                                ),
                                            },
                                            {
                                                test: $pointer("status"),
                                                operator: $string("==="),
                                                rvalue: $string("ReturnStatusRepaired"),
                                                $then: () => (
                                                    <h6 className="account-orderStatus-label">
                                                        <$Lang keyName={$string("account.returns.status.repaired")} />
                                                    </h6>
                                                ),
                                            },
                                            {
                                                test: $pointer("status"),
                                                operator: $string("==="),
                                                rvalue: $string("ReturnStatusRefunded"),
                                                $then: () => (
                                                    <h6 className="account-orderStatus-label">
                                                        <$Lang keyName={$string("account.returns.status.refunded")} />
                                                    </h6>
                                                ),
                                            },
                                            {
                                                test: $pointer("status"),
                                                operator: $string("==="),
                                                rvalue: $string("ReturnStatusRejected"),
                                                $then: () => (
                                                    <h6 className="account-orderStatus-label">
                                                        <$Lang keyName={$string("account.returns.status.rejected")} />
                                                    </h6>
                                                ),
                                            },
                                            {
                                                test: $pointer("status"),
                                                operator: $string("==="),
                                                rvalue: $string("ReturnStatusCancelled"),
                                                $then: () => (
                                                    <h6 className="account-orderStatus-label">
                                                        <$Lang keyName={$string("account.returns.status.cancelled")} />
                                                    </h6>
                                                ),
                                            },
                                        ]}
                                    />
                                </div>

                                <h5 className="account-product-title">
                                    <$Lang keyName={$string("account.returns.list.return_number")} id={ret.id} />
                                </h5>
                                <p className="account-product-description">
                                    <$Lang keyName={$string("account.returns.list.product_details")} num_products={ret.quantity} />{" "}
                                    <a href={ret.product.url}>{ret.product.name}</a>
                                </p>

                                <$If
                                    test={ret.product.options}
                                    $then={() => (
                                        <dl className="definitionList">
                                            <$Each
                                                list={ret.product.options}
                                                $then={(option) => (
                                                    <>
                                                        <dt className="definitionList-key">{option.name}:</dt>
                                                        <dd className="definitionList-value">{$partial("components/common/product-options")}</dd>
                                                    </>
                                                )}
                                            />
                                        </dl>
                                    )}
                                />

                                <div className="account-product-details">
                                    <div className="account-product-detail">
                                        <h6 className="account-product-detail-heading">
                                            <$Lang keyName={$string("account.returns.date_requested")} />
                                        </h6>
                                        <span>{ret.date_requested}</span>
                                    </div>
                                    <div className="account-product-detail">
                                        <h6 className="account-product-detail-heading">
                                            <$Lang keyName={$string("account.returns.action")} />
                                        </h6>
                                        <span>{ret.action}</span>
                                    </div>
                                    <div className="account-product-detail account-product-detail--large">
                                        <h6 className="account-product-detail-heading">
                                            <$Lang keyName={$string("account.returns.reason")} />
                                        </h6>
                                        <span>{ret.reason}</span>
                                    </div>
                                    <$If
                                        test={ret.comments}
                                        $then={() => (
                                            <div className="account-product-detail account-product-detail--full">
                                                <h6 className="account-product-detail-heading">
                                                    <$Lang keyName={$string("account.returns.comments")} />
                                                </h6>
                                                <span>{ret.comments}</span>
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </li>
                )}
            />
        </ul>
    </>
);
