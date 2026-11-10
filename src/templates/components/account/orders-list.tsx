/**
 * Source: templates/components/account/orders-list.html (55 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageAccountOrders} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$cdn} from '@mainlanddev/bigcommerce-react/bigcommerce';

type Hint = ThemeContextHint<ThemePageAccountOrders>;

export default $asPartial<{
    orders: Hint['customer']['orders'];
    settings: Hint['settings'];
    theme_settings: Hint['theme_settings'];
}>(({orders, settings, theme_settings}) => (
    <>
        {/* html L1: <h3 class="account-heading">{{lang 'account.orders.heading' }}</h3> */}
        <h3 className="account-heading">
            {/* html L1: {{lang 'account.orders.heading' }} */}
            <$Lang translationKey={$string('account.orders.heading')}/>
        </h3>

        {/* html L3: <ul class="account-list"> */}
        <ul className="account-list">
            {/* html L4: {{#each orders}} */}
            <$Each
                list={orders}
                $then={(order) => (
                    /* html L5: <li class="account-listItem"> */
                    <li className="account-listItem">
                        {/* html L6: <div class="account-product"> */}
                        <div className="account-product">
                            {/* html L7: <div class="account-product-figure"> */}
                            <div className="account-product-figure">
                                {/* html L8: {{#if items.0.type '===' 'giftcertificate'}} */}
                                <$If
                                    query={[order.items[0].type, '===', $string('giftcertificate')]}
                                    $then={() => (
                                        /* html L9-12:
                                           <img
                                               alt="GiftCertificate"
                                               title="GiftCertificate"
                                               src="{{cdn ../theme_settings.default_image_gift_certificate}}">
                                        */
                                        <img alt="GiftCertificate" title="GiftCertificate" src={$cdn(theme_settings.default_image_gift_certificate)}/>
                                    )}
                                    $else={() => (
                                        /* html L13: {{else}}
                                                                                      html L14-20:
                                           {{> components/common/responsive-img
                                               image=image
                                               class="account-product-image"
                                               fallback_size=../theme_settings.productthumb_size
                                               lazyload=../theme_settings.lazyload_mode
                                               default_image=../theme_settings.default_image_product
                                           }}
                                        */
                                        <$Partial
                                            name="components/common/responsive-img"
                                            hash={{
                                                image: order.image,
                                                class: $string('account-product-image'),
                                                fallback_size: theme_settings.productthumb_size,
                                                lazyload: theme_settings.lazyload_mode,
                                                default_image: theme_settings.default_image_product,
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            {/* html L23: <div class="account-product-body"> */}
                            <div className="account-product-body">
                                {/* html L24: <div class="account-orderStatus"> */}
                                <div className="account-orderStatus">
                                    {/* html L25: <h6 class="account-orderStatus-label">{{this.status}}</h6> */}
                                    <h6 className="account-orderStatus-label">{/* html L25: {{this.status}} */}{order.status}</h6>
                                    {/* html L26: {{#if ../settings.returns_enabled}} */}
                                    <$If
                                        query={[settings.returns_enabled]}
                                        $then={() => (
                                            /* html L27: {{#if this.return_url}} */
                                            <$If
                                                query={[order.return_url]}
                                                $then={() => (
                                                    /* html L28: <a class="account-orderStatus-action" href="{{this.return_url}}"> */
                                                    <a className="account-orderStatus-action" href={order.return_url}>
                                                        {/* html L29: {{lang 'account.orders.return_items' }} */}
                                                        <$Lang translationKey={$string('account.orders.return_items')}/>
                                                    </a>
                                                )}
                                            />
                                        )}
                                    />
                                </div>

                                {/* html L35: <h5 class="account-product-title"> */}
                                <h5 className="account-product-title">
                                    {/* html L36: <a href="{{this.details_url}}">{{lang 'account.orders.list.order_number' number=this.id}}</a> */}
                                    <a href={order.details_url}>
                                        {/* html L36: {{lang 'account.orders.list.order_number' number=this.id}} */}
                                        <$Lang translationKey={$string('account.orders.list.order_number')} params={{number: order.id}}/>
                                    </a>
                                </h5>
                                {/* html L38: <p class="account-product-description">{{lang 'account.orders.list.product_details' num_products=this.total_quantity cost=this.total.formatted}}</p> */}
                                <p className="account-product-description">
                                    {/* html L38: {{lang 'account.orders.list.product_details' num_products=this.total_quantity cost=this.total.formatted}} */}
                                    <$Lang
                                        translationKey={$string('account.orders.list.product_details')}
                                        params={{num_products: order.total_quantity, cost: order.total.formatted}}
                                    />
                                </p>

                                {/* html L40: <div class="account-product-details"> */}
                                <div className="account-product-details">
                                    {/* html L41: <div class="account-product-detail"> */}
                                    <div className="account-product-detail">
                                        {/* html L42: <h6 class="account-product-detail-heading">{{lang 'account.orders.order_placed' }}</h6> */}
                                        <h6 className="account-product-detail-heading">
                                            {/* html L42: {{lang 'account.orders.order_placed' }} */}
                                            <$Lang translationKey={$string('account.orders.order_placed')}/>
                                        </h6>
                                        {/* html L43: <span>{{this.date}}</span> */}
                                        <span>{/* html L43: {{this.date}} */}{order.date}</span>
                                    </div>
                                    {/* html L45: <div class="account-product-detail"> */}
                                    <div className="account-product-detail">
                                        {/* html L46: <h6 class="account-product-detail-heading">{{lang 'account.orders.last_update' }}</h6> */}
                                        <h6 className="account-product-detail-heading">
                                            {/* html L46: {{lang 'account.orders.last_update' }} */}
                                            <$Lang translationKey={$string('account.orders.last_update')}/>
                                        </h6>
                                        {/* html L47: <span>{{this.last_update_date}}</span> */}
                                        <span>{/* html L47: {{this.last_update_date}} */}{order.last_update_date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                )}
            />
        </ul>
    </>
));
