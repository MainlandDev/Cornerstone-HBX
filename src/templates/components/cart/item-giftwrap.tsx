/**
 * Source: templates/components/cart/item-giftwrap.html (28 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {CartHint, GiftWrapping} from '@/context-cart';

export default $asPartial<{
    show_gift_wrapping: CartHint['cart']['items'][number]['show_gift_wrapping'];
    id: CartHint['cart']['items'][number]['id'];
    gift_wrapping?: GiftWrapping;
}>(({show_gift_wrapping, id, gift_wrapping}) => (
    /* html L1: {{#if show_gift_wrapping}} */
    <$If
        query={[show_gift_wrapping]}
        $then={() => (
            /* html L2: <dl class="cart-item-options cart-item-options--giftWrapping"> */
            <dl className="cart-item-options cart-item-options--giftWrapping">
                {/* html L3: <dt class="cart-item-option-title"> */}
                <dt className="cart-item-option-title">
                    {/* html L4: {{lang 'cart.gift_wrapping.title'}}: */}
                    <$Lang translationKey={$string('cart.gift_wrapping.title')}/>:
                </dt>
                {/* html L6: {{#if gift_wrapping}} */}
                <$If
                    query={[gift_wrapping]}
                    $then={() => (
                        <>
                            {/* html L7: <dd class="cart-item-option-description"> */}
                            <dd className="cart-item-option-description">
                                {/* html L8: {{gift_wrapping.name}}: {{gift_wrapping.price.formatted}} */}
                                {gift_wrapping.name}: {/* html L8: {{gift_wrapping.price.formatted}} */}{gift_wrapping.price.formatted}
                                {/* html L9: <span class="cart-item-option-actions"> */}
                                <span className="cart-item-option-actions">
                                    ({/* html L10: (<a href="" data-item-giftwrap="{{id}}">{{lang 'cart.gift_wrapping.change'}}</a> or <a class="cart-item-option-remove" href="{{gift_wrapping.remove_url}}">{{lang 'cart.gift_wrapping.remove'}}</a>) */}<a href="" data-item-giftwrap={id}>
                                        {/* html L10: {{lang 'cart.gift_wrapping.change'}} */}
                                        <$Lang translationKey={$string('cart.gift_wrapping.change')}/>
                                    </a>{' '}
                                    or{' '}
                                    {/* html L10: <a class="cart-item-option-remove" href="{{gift_wrapping.remove_url}}"> */}
                                    <a className="cart-item-option-remove" href={gift_wrapping.remove_url}>
                                        {/* html L10: {{lang 'cart.gift_wrapping.remove'}} */}
                                        <$Lang translationKey={$string('cart.gift_wrapping.remove')}/>
                                    </a>)
                                </span>
                            </dd>
                            {/* html L13: {{#if gift_wrapping.message}} */}
                            <$If
                                query={[gift_wrapping.message]}
                                $then={() => (
                                    <>
                                        {/* html L14: <dt class="cart-item-option-title"> */}
                                        <dt className="cart-item-option-title">
                                            {/* html L15: {{lang 'cart.gift_wrapping.gift_message'}}: */}
                                            <$Lang translationKey={$string('cart.gift_wrapping.gift_message')}/>:
                                        </dt>
                                        {/* html L17: <dd class="cart-item-option-description"> */}
                                        <dd className="cart-item-option-description">{/* html L18: {{gift_wrapping.message}} */}{gift_wrapping.message}</dd>
                                    </>
                                )}
                            />
                        </>
                    )}
                    $else={() => (
                        /* html L21: {{else}}
                                                      html L22: <dd class="cart-item-option-description">
                        */
                        <dd className="cart-item-option-description">
                            {/* html L23: <a href="" data-item-giftwrap="{{id}}">{{lang 'cart.gift_wrapping.add'}}</a> */}
                            <a href="" data-item-giftwrap={id}>
                                {/* html L23: {{lang 'cart.gift_wrapping.add'}} */}
                                <$Lang translationKey={$string('cart.gift_wrapping.add')}/>
                            </a>
                        </dd>
                    )}
                />
            </dl>
        )}
    />
));
