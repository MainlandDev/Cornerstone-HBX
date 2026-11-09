import {$Each, $If, $number, $parseHandlebarsDangerously, $string, $unless, $if, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$getImage} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {CartHint, GiftWrappingOption} from '@/context-cart';

// The `{{#for quantity this}}` block reads `$index` / `../$index`, which $For cannot emit correctly: that block is raw Handlebars (escape hatch).
export default $asPartial<{
    quantity: HandlebarsInlineValueToken<number>;
    product_name: CartHint['cart']['items'][number]['name'];
    item_id: CartHint['cart']['items'][number]['id'];
    urls: CartHint['urls'];
    gift_wrappings: Array<GiftWrappingOption>;
    selected_wrapping?: {message?: HandlebarsInlineValueToken<string>};
}>(({quantity, product_name, item_id, urls, gift_wrappings, selected_wrapping}) => (
    <>
        <div className="modal-header">
            <h2 className="modal-header-title">
                <$Lang translationKey={$string('cart.gift_wrapping.title')}/>
            </h2>
        </div>
        <div className="modal-body">
            <$If
                query={[quantity, '>', $number(1)]}
                $then={() => (
                    <p>
                        <$Lang translationKey={$string('cart.gift_wrapping.choose_how')}/>
                    </p>
                )}
            />

            <form className="form giftWrapping-form" action={urls.cart} method="post">
                <input type="hidden" name="action" value="save_giftwrapping"/>
                <input type="hidden" name="item_id" value={item_id}/>
                <fieldset className="form-fieldset">
                    <div className="form-field" $$={$if(quantity, '===', $number(1)).then(() => $$raw('style="display:none"'))}>
                        <input
                            type="radio"
                            className="form-radio"
                            name="giftwraptype"
                            id="girftWrapping-radio-same"
                            $$={$$raw('checked="checked"')}
                            value="same"
                        />
                        <label className="form-label" htmlFor="girftWrapping-radio-same">
                            <$Lang translationKey={$string('cart.gift_wrapping.option_same')}/>
                        </label>

                        <input type="radio" className="form-radio" name="giftwraptype" id="girftWrapping-radio-all" value="different"/>
                        <label className="form-label" htmlFor="girftWrapping-radio-all">
                            <$Lang translationKey={$string('cart.gift_wrapping.option_different')}/>
                        </label>
                    </div>

                    <div className="giftWrapping-single">
                        <div className="form-field">
                            <label className="form-label" htmlFor="giftWrapping-select-same">
                                <$Lang translationKey={$string('cart.gift_wrapping.item_single')} params={{name: product_name}}/>
                                <$Each
                                    list={gift_wrappings}
                                    $then={(gift_wrapping) => (
                                        <$If
                                            query={[gift_wrapping.preview_image]}
                                            $then={() => (
                                                <a
                                                    id={`giftWrapping-image-all-${gift_wrapping.id}`}
                                                    className="giftWrapping-image-all"
                                                    $$={$unless(gift_wrapping.selected).then(() => $$raw('style="display:none"'))}
                                                    target="_blank"
                                                    href={$getImage(gift_wrapping.preview_image)}
                                                >
                                                    <$Lang translationKey={$string('cart.gift_wrapping.preview')}/>
                                                </a>
                                            )}
                                        />
                                    )}
                                />
                            </label>
                            <select className="form-select giftWrapping-select" name="giftwrapping[all]" id="giftWrapping-select-same" data-index="all">
                                <option value="">
                                    <$Lang translationKey={$string('cart.gift_wrapping.choose_type')}/>
                                </option>
                                <$Each
                                    list={gift_wrappings}
                                    $then={(gift_wrapping) => (
                                        <option
                                            $$={$if(gift_wrapping.selected).then(() => $$raw('selected'))}
                                            value={gift_wrapping.id}
                                            data-allow-message={gift_wrapping.allow_message}
                                        >
                                            {gift_wrapping.name} - ({gift_wrapping.price.formatted})
                                        </option>
                                    )}
                                />
                            </select>
                        </div>

                        <div className="form-field" id="giftWrapping-message-all" $$={$unless(selected_wrapping).then(() => $$raw('style="display:none"'))}>
                            <label className="form-label" htmlFor="giftMessage">
                                <$Lang translationKey={$string('cart.gift_wrapping.gift_message')}/>
                            </label>
                            <textarea className="form-input" name="giftmessage[all]" id="giftMessage" rows={3} defaultValue={selected_wrapping.message}/>
                        </div>
                    </div>

                    <div className="giftWrapping-multiple">
                        {$parseHandlebarsDangerously(`                {{#for quantity this}}
                    <div class="form-field">
                        <label class="form-label" for="giftWrapping-select-{{$index}}">
                            {{lang 'cart.gift_wrapping.item_multiple' index=$index name=product_name}}
                            {{#each gift_wrappings}}
                                {{#if preview_image}}
                                    <a id="giftWrapping-image-{{../$index}}-{{id}}" class="giftWrapping-image-{{../$index}}" style="display:none" target="_blank" href="{{getImage preview_image}}">
                                        {{lang 'cart.gift_wrapping.preview'}}
                                    </a>
                                {{/if}}
                            {{/each}}
                        </label>
                        <select class="form-select giftWrapping-select" name="giftwrapping[{{$index}}]" id="giftWrapping-select-{{$index}}" data-index="{{$index}}">
                            <option value="">{{lang 'cart.gift_wrapping.choose_type'}}</option>
                            {{#each gift_wrappings}}
                                <option {{#if selected}}selected{{/if}} value="{{id}}" data-allow-message="{{allow_message}}">{{name}} - ({{price.formatted}})</option>
                            {{/each}}
                        </select>
                    </div>

                    <div class="form-field" id="giftWrapping-message-{{$index}}" style="display:none">
                        <label class="form-label" for="giftMessage">{{lang 'cart.gift_wrapping.gift_message'}}</label>
                        <textarea class="form-input" name="giftmessage[{{$index}}]" id="giftMessage" rows="3">{{selected_wrapping.message}}</textarea>
                    </div>
                {{/for}}`)}
                    </div>
                </fieldset>
                <div className="form-actions">
                    <button className="button button--primary" type="submit">
                        <$Lang translationKey={$string('common.form_submit')}/>
                    </button>
                </div>
            </form>
        </div>
    </>
));
