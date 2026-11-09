import {$Each, $If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {ExtendedThemePageReturns} from '@/context-account';

type Hint = ThemeContextHint<ExtendedThemePageReturns>;

export default $asPartial<{ returns: Hint['returns']; theme_settings: Hint['theme_settings'] }>(({returns, theme_settings}) => (
    <>
        <h3 className="account-heading">
            <$Lang translationKey={$string('account.returns.heading')}/>
        </h3>

        <ul className="account-list">
            <$Each
                list={returns}
                $then={(ret) => (
                    <li className="account-listItem">
                        <div className="account-product">
                            <div className="account-product-figure">
                                <$Partial
                                    name="components/common/responsive-img"
                                    hash={{
                                        image: ret.product.image,
                                        fallback_size: theme_settings.productthumb_size,
                                        lazyload: theme_settings.lazyload_mode,
                                    }}
                                />
                            </div>
                            <div className="account-product-body">
                                <div className="account-orderStatus">
                                    <$If
                                        query={[ret.status, '===', $string('ReturnStatusPending')]}
                                        $then={() => (
                                            <h6 className="account-orderStatus-label">
                                                <$Lang translationKey={$string('account.returns.status.pending')}/>
                                            </h6>
                                        )}
                                        $elseThen={[
                                            {
                                                query: [ret.status, '===', $string('ReturnStatusReceived')],
                                                $then: () => (
                                                    <h6 className="account-orderStatus-label">
                                                        <$Lang translationKey={$string('account.returns.status.received')}/>
                                                    </h6>
                                                ),
                                            },
                                            {
                                                query: [ret.status, '===', $string('ReturnStatusAuthorized')],
                                                $then: () => (
                                                    <h6 className="account-orderStatus-label">
                                                        <$Lang translationKey={$string('account.returns.status.authorized')}/>
                                                    </h6>
                                                ),
                                            },
                                            {
                                                query: [ret.status, '===', $string('ReturnStatusRepaired')],
                                                $then: () => (
                                                    <h6 className="account-orderStatus-label">
                                                        <$Lang translationKey={$string('account.returns.status.repaired')}/>
                                                    </h6>
                                                ),
                                            },
                                            {
                                                query: [ret.status, '===', $string('ReturnStatusRefunded')],
                                                $then: () => (
                                                    <h6 className="account-orderStatus-label">
                                                        <$Lang translationKey={$string('account.returns.status.refunded')}/>
                                                    </h6>
                                                ),
                                            },
                                            {
                                                query: [ret.status, '===', $string('ReturnStatusRejected')],
                                                $then: () => (
                                                    <h6 className="account-orderStatus-label">
                                                        <$Lang translationKey={$string('account.returns.status.rejected')}/>
                                                    </h6>
                                                ),
                                            },
                                            {
                                                query: [ret.status, '===', $string('ReturnStatusCancelled')],
                                                $then: () => (
                                                    <h6 className="account-orderStatus-label">
                                                        <$Lang translationKey={$string('account.returns.status.cancelled')}/>
                                                    </h6>
                                                ),
                                            },
                                        ]}
                                    />
                                </div>

                                <h5 className="account-product-title">
                                    <$Lang translationKey={$string('account.returns.list.return_number')} params={{id: ret.id}}/>
                                </h5>
                                <p className="account-product-description">
                                    <$Lang translationKey={$string('account.returns.list.product_details')} params={{num_products: ret.quantity}}/>{' '}
                                    <a href={ret.product.url}>{ret.product.name}</a>
                                </p>

                                <$If
                                    query={[ret.product.options]}
                                    $then={() => (
                                        <dl className="definitionList">
                                            <$Each
                                                list={ret.product.options}
                                                $then={(option) => (
                                                    <>
                                                        <dt className="definitionList-key">{option.name}:</dt>
                                                        <dd className="definitionList-value">
                                                            <$Partial name="components/common/product-options"/>
                                                        </dd>
                                                    </>
                                                )}
                                            />
                                        </dl>
                                    )}
                                />

                                <div className="account-product-details">
                                    <div className="account-product-detail">
                                        <h6 className="account-product-detail-heading">
                                            <$Lang translationKey={$string('account.returns.date_requested')}/>
                                        </h6>
                                        <span>{ret.date_requested}</span>
                                    </div>
                                    <div className="account-product-detail">
                                        <h6 className="account-product-detail-heading">
                                            <$Lang translationKey={$string('account.returns.action')}/>
                                        </h6>
                                        <span>{ret.action}</span>
                                    </div>
                                    <div className="account-product-detail account-product-detail--large">
                                        <h6 className="account-product-detail-heading">
                                            <$Lang translationKey={$string('account.returns.reason')}/>
                                        </h6>
                                        <span>{ret.reason}</span>
                                    </div>
                                    <$If
                                        query={[ret.comments]}
                                        $then={() => (
                                            <div className="account-product-detail account-product-detail--full">
                                                <h6 className="account-product-detail-heading">
                                                    <$Lang translationKey={$string('account.returns.comments')}/>
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
));
