"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$getImage, $If, $Each, $For, $Lang, $number, $pointer, $raw, $string, $this, $Unless} from "@mainlanddev/hbx-bigcommerce";

interface GiftWrapping {
    id: string;
    name: string;
    selected: boolean;
    allow_message: boolean;
    preview_image: unknown;
    price: {formatted: string};
}

export default (_props: PartialProps) => (
    <>
        <div className="modal-header">
            <h2 className="modal-header-title">
                <$Lang keyName={$string("cart.gift_wrapping.title")} />
            </h2>
        </div>
        <div className="modal-body">
            <$If
                test={$pointer("quantity")}
                operator={$string(">")}
                rvalue={$number(1)}
                $then={() => (
                    <>
                        <p>
                            <$Lang keyName={$string("cart.gift_wrapping.choose_how")} />
                        </p>
                    </>
                )}
            />

            <form className="form giftWrapping-form" action={$pointer("urls.cart")} method="post">
                <input type="hidden" name="action" value="save_giftwrapping" />
                <input type="hidden" name="item_id" value={$pointer("item_id")} />
                <fieldset className="form-fieldset">
                    <div dangerouslyInlineAttributes={{attributes: `class="form-field" ${$If({test: $pointer("quantity"), operator: $string("==="), rvalue: $number(1), $then: () => $raw('style="display:none"')})}`}}>
                        <input
                            type="radio"
                            dangerouslyInlineAttributes={{
                                attributes: `class="form-radio" name="giftwraptype" id="girftWrapping-radio-same" checked="checked" value="same"`,
                            }}
                        />{" "}
                        <label className="form-label" htmlFor="girftWrapping-radio-same">
                            <$Lang keyName={$string("cart.gift_wrapping.option_same")} />
                        </label>

                        <input
                            type="radio"
                            className="form-radio"
                            name="giftwraptype"
                            id="girftWrapping-radio-all"
                            value="different"
                        />{" "}
                        <label className="form-label" htmlFor="girftWrapping-radio-all">
                            <$Lang keyName={$string("cart.gift_wrapping.option_different")} />
                        </label>
                    </div>

                    <div className="giftWrapping-single">
                        <div className="form-field">
                            <label className="form-label" htmlFor="giftWrapping-select-same">
                                <$Lang keyName={$string("cart.gift_wrapping.item_single")} name={$pointer("product_name")} />
                                <$Each
                                    list={$pointer<GiftWrapping[]>("gift_wrappings")}
                                    $then={(wrapping) => (
                                        <$If
                                            test={wrapping.preview_image}
                                            $then={() => (
                                                <a
                                                    dangerouslyInlineAttributes={{
                                                        attributes: `id="giftWrapping-image-all-${wrapping.id}" class="giftWrapping-image-all" ${$Unless({test: wrapping.selected, $then: () => $raw('style="display:none"')})} target="_blank" href="${$getImage($pointer("preview_image"))}"`,
                                                    }}
                                                >
                                                    <$Lang keyName={$string("cart.gift_wrapping.preview")} />
                                                </a>
                                            )}
                                        />
                                    )}
                                />
                            </label>
                            <select className="form-select giftWrapping-select" name="giftwrapping[all]" id="giftWrapping-select-same" data-index="all">
                                <option value="">
                                    <$Lang keyName={$string("cart.gift_wrapping.choose_type")} />
                                </option>
                                <$Each
                                    list={$pointer<GiftWrapping[]>("gift_wrappings")}
                                    $then={(wrapping) => (
                                        <option
                                            dangerouslyInlineAttributes={{
                                                attributes: `${$If({test: wrapping.selected, $then: () => "selected "})}value="${wrapping.id}" data-allow-message="${wrapping.allow_message}"`,
                                            }}
                                        >
                                            {wrapping.name} - ({wrapping.price.formatted})
                                        </option>
                                    )}
                                />
                            </select>
                        </div>

                        <div
                            dangerouslyInlineAttributes={{
                                attributes: `class="form-field" id="giftWrapping-message-all" ${$Unless({test: $pointer("selected_wrapping"), $then: () => $raw('style="display:none"')})}`,
                            }}
                        >
                            <label className="form-label" htmlFor="giftMessage">
                                <$Lang keyName={$string("cart.gift_wrapping.gift_message")} />
                            </label>
                            <textarea
                                className="form-input"
                                name="giftmessage[all]"
                                id="giftMessage"
                                rows="3"
                                value={$pointer("selected_wrapping.message")}
                            />
                        </div>
                    </div>

                    <div className="giftWrapping-multiple">
                        <$For
                            to={$pointer<number>("quantity")}
                            context={$this<object>()}
                            $then={(ctx) => (
                                <>
                                    <div className="form-field">
                                        <label className="form-label" htmlFor={`giftWrapping-select-${ctx.$index}`}>
                                            <$Lang
                                                keyName={$string("cart.gift_wrapping.item_multiple")}
                                                index={ctx.$index}
                                                name={$pointer("product_name")}
                                            />
                                            <$Each
                                                list={$pointer<GiftWrapping[]>("gift_wrappings")}
                                                $then={(wrapping) => (
                                                    <$If
                                                        test={wrapping.preview_image}
                                                        $then={() => (
                                                            <a
                                                                id={`giftWrapping-image-${$pointer<number>("../$index")}-${wrapping.id}`}
                                                                className={`giftWrapping-image-${$pointer<number>("../$index")}`}
                                                                style={{display: "none"}}
                                                                target="_blank"
                                                                href={$getImage($pointer("preview_image"))}
                                                            >
                                                                <$Lang keyName={$string("cart.gift_wrapping.preview")} />
                                                            </a>
                                                        )}
                                                    />
                                                )}
                                            />
                                        </label>
                                        <select
                                            className="form-select giftWrapping-select"
                                            name={`giftwrapping[${ctx.$index}]`}
                                            id={`giftWrapping-select-${ctx.$index}`}
                                            data-index={ctx.$index}
                                        >
                                            <option value="">
                                                <$Lang keyName={$string("cart.gift_wrapping.choose_type")} />
                                            </option>
                                            <$Each
                                                list={$pointer<GiftWrapping[]>("gift_wrappings")}
                                                $then={(wrapping) => (
                                                    <option
                                                        dangerouslyInlineAttributes={{
                                                            attributes: `${$If({test: wrapping.selected, $then: () => "selected "})}value="${wrapping.id}" data-allow-message="${wrapping.allow_message}"`,
                                                        }}
                                                    >
                                                        {wrapping.name} - ({wrapping.price.formatted})
                                                    </option>
                                                )}
                                            />
                                        </select>
                                    </div>

                                    <div className="form-field" id={`giftWrapping-message-${ctx.$index}`} style={{display: "none"}}>
                                        <label className="form-label" htmlFor="giftMessage">
                                            <$Lang keyName={$string("cart.gift_wrapping.gift_message")} />
                                        </label>
                                        <textarea
                                            className="form-input"
                                            name={`giftmessage[${ctx.$index}]`}
                                            id="giftMessage"
                                            rows="3"
                                            value={$pointer("selected_wrapping.message")}
                                        />
                                    </div>
                                </>
                            )}
                        />
                    </div>
                </fieldset>
                <div className="form-actions">
                    <button className="button button--primary" type="submit">
                        <$Lang keyName={$string("common.form_submit")} />
                    </button>
                </div>
            </form>
        </div>
    </>
);
