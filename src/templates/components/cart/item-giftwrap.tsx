"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <$If
        test={$pointer("show_gift_wrapping")}
        $then={() => (
            <dl className="cart-item-options cart-item-options--giftWrapping">
                <dt className="cart-item-option-title">
                    <$Lang keyName={$string("cart.gift_wrapping.title")} />:
                </dt>
                <$If
                    test={$pointer("gift_wrapping")}
                    $then={() => (
                        <>
                            <dd className="cart-item-option-description">
                                {$pointer("gift_wrapping.name")}: {$pointer("gift_wrapping.price.formatted")}{" "}
                                <span className="cart-item-option-actions">
                                    (
                                    <a href="" data-item-giftwrap={$pointer("id")}>
                                        <$Lang keyName={$string("cart.gift_wrapping.change")} />
                                    </a>{" "}
                                    or{" "}
                                    <a className="cart-item-option-remove" href={$pointer("gift_wrapping.remove_url")}>
                                        <$Lang keyName={$string("cart.gift_wrapping.remove")} />
                                    </a>
                                    )
                                </span>
                            </dd>
                            <$If
                                test={$pointer("gift_wrapping.message")}
                                $then={() => (
                                    <>
                                        <dt className="cart-item-option-title">
                                            <$Lang keyName={$string("cart.gift_wrapping.gift_message")} />:
                                        </dt>
                                        <dd className="cart-item-option-description">{$pointer("gift_wrapping.message")}</dd>
                                    </>
                                )}
                            />
                        </>
                    )}
                    $else={() => (
                        <dd className="cart-item-option-description">
                            <a href="" data-item-giftwrap={$pointer("id")}>
                                <$Lang keyName={$string("cart.gift_wrapping.add")} />
                            </a>
                        </dd>
                    )}
                />
            </dl>
        )}
    />
);
