/**
 * Source: templates/components/account/returns-list.html (70 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {ExtendedThemePageReturns} from '@/context-account';

type Hint = ThemeContextHint<ExtendedThemePageReturns>;

export default $asPartial<{ returns: Hint['returns']; theme_settings: Hint['theme_settings'] }>(({returns, theme_settings}) => (
    <>
        {/* html L1: <h3 class="account-heading">{{lang 'account.returns.heading' }}</h3> */}
        <h3 className="account-heading">
            {/* html L1: {{lang 'account.returns.heading' }} */}
            <$Lang translationKey={$string('account.returns.heading')}/>
        </h3>

        {/* html L3: <ul class="account-list"> */}
        <ul className="account-list">
            {/* html L4: {{#each returns}} */}
            <$Each
                list={returns}
                $then={(ret) => (
                    /* html L5: <li class="account-listItem"> */
                    <li className="account-listItem">
                        {/* html L6: <div class="account-product"> */}
                        <div className="account-product">
                            {/* html L7: <div class="account-product-figure"> */}
                            <div className="account-product-figure">
                                {/* html L8-12:
                                   {{> components/common/responsive-img
                                       image=product.image
                                       fallback_size=../theme_settings.productthumb_size
                                       lazyload=../theme_settings.lazyload_mode
                                   }}
                                */}
                                <$Partial
                                    name="components/common/responsive-img"
                                    hash={{
                                        image: ret.product.image,
                                        fallback_size: theme_settings.productthumb_size,
                                        lazyload: theme_settings.lazyload_mode,
                                    }}
                                />
                            </div>
                            {/* html L14: <div class="account-product-body"> */}
                            <div className="account-product-body">
                                {/* html L15: <div class="account-orderStatus"> */}
                                <div className="account-orderStatus">
                                    {/* html L16: {{#if status '===' 'ReturnStatusPending'}} */}
                                    <$If
                                        query={[ret.status, '===', $string('ReturnStatusPending')]}
                                        $then={() => (
                                            /* html L17: <h6 class="account-orderStatus-label">{{lang 'account.returns.status.pending'}}</h6> */
                                            <h6 className="account-orderStatus-label">
                                                {/* html L17: {{lang 'account.returns.status.pending'}} */}
                                                <$Lang translationKey={$string('account.returns.status.pending')}/>
                                            </h6>
                                        )}
                                        $elseThen={[
                                            {
                                                query: [ret.status, '===', $string('ReturnStatusReceived')],
                                                $then: () => (
                                                    /* html L18: {{else if status '===' 'ReturnStatusReceived'}}
                                                                                                              html L19: <h6 class="account-orderStatus-label">{{lang 'account.returns.status.received'}}</h6>
                                                    */
                                                    <h6 className="account-orderStatus-label">
                                                        {/* html L19: {{lang 'account.returns.status.received'}} */}
                                                        <$Lang translationKey={$string('account.returns.status.received')}/>
                                                    </h6>
                                                ),
                                            },
                                            {
                                                query: [ret.status, '===', $string('ReturnStatusAuthorized')],
                                                $then: () => (
                                                    /* html L20: {{else if status '===' 'ReturnStatusAuthorized'}}
                                                                                                              html L21: <h6 class="account-orderStatus-label">{{lang 'account.returns.status.authorized'}}</h6>
                                                    */
                                                    <h6 className="account-orderStatus-label">
                                                        {/* html L21: {{lang 'account.returns.status.authorized'}} */}
                                                        <$Lang translationKey={$string('account.returns.status.authorized')}/>
                                                    </h6>
                                                ),
                                            },
                                            {
                                                query: [ret.status, '===', $string('ReturnStatusRepaired')],
                                                $then: () => (
                                                    /* html L22: {{else if status '===' 'ReturnStatusRepaired'}}
                                                                                                              html L23: <h6 class="account-orderStatus-label">{{lang 'account.returns.status.repaired'}}</h6>
                                                    */
                                                    <h6 className="account-orderStatus-label">
                                                        {/* html L23: {{lang 'account.returns.status.repaired'}} */}
                                                        <$Lang translationKey={$string('account.returns.status.repaired')}/>
                                                    </h6>
                                                ),
                                            },
                                            {
                                                query: [ret.status, '===', $string('ReturnStatusRefunded')],
                                                $then: () => (
                                                    /* html L24: {{else if status '===' 'ReturnStatusRefunded'}}
                                                                                                              html L25: <h6 class="account-orderStatus-label">{{lang 'account.returns.status.refunded'}}</h6>
                                                    */
                                                    <h6 className="account-orderStatus-label">
                                                        {/* html L25: {{lang 'account.returns.status.refunded'}} */}
                                                        <$Lang translationKey={$string('account.returns.status.refunded')}/>
                                                    </h6>
                                                ),
                                            },
                                            {
                                                query: [ret.status, '===', $string('ReturnStatusRejected')],
                                                $then: () => (
                                                    /* html L26: {{else if status '===' 'ReturnStatusRejected'}}
                                                                                                              html L27: <h6 class="account-orderStatus-label">{{lang 'account.returns.status.rejected'}}</h6>
                                                    */
                                                    <h6 className="account-orderStatus-label">
                                                        {/* html L27: {{lang 'account.returns.status.rejected'}} */}
                                                        <$Lang translationKey={$string('account.returns.status.rejected')}/>
                                                    </h6>
                                                ),
                                            },
                                            {
                                                query: [ret.status, '===', $string('ReturnStatusCancelled')],
                                                $then: () => (
                                                    /* html L28: {{else if status '===' 'ReturnStatusCancelled'}}
                                                                                                              html L29: <h6 class="account-orderStatus-label">{{lang 'account.returns.status.cancelled'}}</h6>
                                                    */
                                                    <h6 className="account-orderStatus-label">
                                                        {/* html L29: {{lang 'account.returns.status.cancelled'}} */}
                                                        <$Lang translationKey={$string('account.returns.status.cancelled')}/>
                                                    </h6>
                                                ),
                                            },
                                        ]}
                                    />
                                </div>

                                {/* html L33: <h5 class="account-product-title">{{lang 'account.returns.list.return_number' id=id}}</h5> */}
                                <h5 className="account-product-title">
                                    {/* html L33: {{lang 'account.returns.list.return_number' id=id}} */}
                                    <$Lang translationKey={$string('account.returns.list.return_number')} params={{id: ret.id}}/>
                                </h5>
                                {/* html L34: <p class="account-product-description">{{lang 'account.returns.list.product_details' num_products=quantity}} <a href="{{product.url}}">{{product.name}}</a></p> */}
                                <p className="account-product-description">
                                    {/* html L34: {{lang 'account.returns.list.product_details' num_products=quantity}} */}
                                    <$Lang translationKey={$string('account.returns.list.product_details')} params={{num_products: ret.quantity}}/>{' '}
                                    {/* html L34: <a href="{{product.url}}"> */}
                                    <a href={ret.product.url}>{/* html L34: {{product.name}} */}{ret.product.name}</a>
                                </p>

                                {/* html L36: {{#if product.options}} */}
                                <$If
                                    query={[ret.product.options]}
                                    $then={() => (
                                        /* html L37: <dl class="definitionList"> */
                                        <dl className="definitionList">
                                            {/* html L38: {{#each product.options}} */}
                                            <$Each
                                                list={ret.product.options}
                                                $then={(option) => (
                                                    <>
                                                        {/* html L39: <dt class="definitionList-key">{{name}}:</dt> */}
                                                        <dt className="definitionList-key">{/* html L39: {{name}} */}{option.name}:</dt>
                                                        {/* html L40: <dd class="definitionList-value">{{> components/common/product-options}}</dd> */}
                                                        <dd className="definitionList-value">
                                                            {/* html L40: {{> components/common/product-options}} */}
                                                            <$Partial name="components/common/product-options"/>
                                                        </dd>
                                                    </>
                                                )}
                                            />
                                        </dl>
                                    )}
                                />

                                {/* html L45: <div class="account-product-details"> */}
                                <div className="account-product-details">
                                    {/* html L46: <div class="account-product-detail"> */}
                                    <div className="account-product-detail">
                                        {/* html L47: <h6 class="account-product-detail-heading">{{lang 'account.returns.date_requested' }}</h6> */}
                                        <h6 className="account-product-detail-heading">
                                            {/* html L47: {{lang 'account.returns.date_requested' }} */}
                                            <$Lang translationKey={$string('account.returns.date_requested')}/>
                                        </h6>
                                        {/* html L48: <span>{{date_requested}}</span> */}
                                        <span>{/* html L48: {{date_requested}} */}{ret.date_requested}</span>
                                    </div>
                                    {/* html L50: <div class="account-product-detail"> */}
                                    <div className="account-product-detail">
                                        {/* html L51: <h6 class="account-product-detail-heading">{{lang 'account.returns.action' }}</h6> */}
                                        <h6 className="account-product-detail-heading">
                                            {/* html L51: {{lang 'account.returns.action' }} */}
                                            <$Lang translationKey={$string('account.returns.action')}/>
                                        </h6>
                                        {/* html L52: <span>{{action}}</span> */}
                                        <span>{/* html L52: {{action}} */}{ret.action}</span>
                                    </div>
                                    {/* html L54: <div class="account-product-detail account-product-detail--large"> */}
                                    <div className="account-product-detail account-product-detail--large">
                                        {/* html L55: <h6 class="account-product-detail-heading">{{lang 'account.returns.reason' }}</h6> */}
                                        <h6 className="account-product-detail-heading">
                                            {/* html L55: {{lang 'account.returns.reason' }} */}
                                            <$Lang translationKey={$string('account.returns.reason')}/>
                                        </h6>
                                        {/* html L56: <span>{{reason}}</span> */}
                                        <span>{/* html L56: {{reason}} */}{ret.reason}</span>
                                    </div>
                                    {/* html L58: {{#if comments}} */}
                                    <$If
                                        query={[ret.comments]}
                                        $then={() => (
                                            /* html L59: <div class="account-product-detail account-product-detail--full"> */
                                            <div className="account-product-detail account-product-detail--full">
                                                {/* html L60: <h6 class="account-product-detail-heading">{{lang 'account.returns.comments' }}</h6> */}
                                                <h6 className="account-product-detail-heading">
                                                    {/* html L60: {{lang 'account.returns.comments' }} */}
                                                    <$Lang translationKey={$string('account.returns.comments')}/>
                                                </h6>
                                                {/* html L61: <span>{{comments}}</span> */}
                                                <span>{/* html L61: {{comments}} */}{ret.comments}</span>
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
