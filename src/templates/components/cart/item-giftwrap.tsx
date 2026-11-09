import {$If, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {CartHint, GiftWrapping} from '@/context-cart';

export default $asPartial<{
    show_gift_wrapping: CartHint['cart']['items'][number]['show_gift_wrapping'];
    id: CartHint['cart']['items'][number]['id'];
    gift_wrapping?: GiftWrapping;
}>(({show_gift_wrapping, id, gift_wrapping}) => (
    <$If
        query={[show_gift_wrapping]}
        $then={() => (
            <dl className="cart-item-options cart-item-options--giftWrapping">
                <dt className="cart-item-option-title">
                    <$Lang translationKey={$string('cart.gift_wrapping.title')}/>:
                </dt>
                <$If
                    query={[gift_wrapping]}
                    $then={() => (
                        <>
                            <dd className="cart-item-option-description">
                                {gift_wrapping.name}: {gift_wrapping.price.formatted}
                                <span className="cart-item-option-actions">
                                    (<a href="" data-item-giftwrap={id}>
                                        <$Lang translationKey={$string('cart.gift_wrapping.change')}/>
                                    </a>{' '}
                                    or{' '}
                                    <a className="cart-item-option-remove" href={gift_wrapping.remove_url}>
                                        <$Lang translationKey={$string('cart.gift_wrapping.remove')}/>
                                    </a>)
                                </span>
                            </dd>
                            <$If
                                query={[gift_wrapping.message]}
                                $then={() => (
                                    <>
                                        <dt className="cart-item-option-title">
                                            <$Lang translationKey={$string('cart.gift_wrapping.gift_message')}/>:
                                        </dt>
                                        <dd className="cart-item-option-description">{gift_wrapping.message}</dd>
                                    </>
                                )}
                            />
                        </>
                    )}
                    $else={() => (
                        <dd className="cart-item-option-description">
                            <a href="" data-item-giftwrap={id}>
                                <$Lang translationKey={$string('cart.gift_wrapping.add')}/>
                            </a>
                        </dd>
                    )}
                />
            </dl>
        )}
    />
));
