/**
 * Source: templates/components/cart/modals/gift-wrapping-form.html (83 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
        {/* html L1: <div class="modal-header"> */}
        <div className="modal-header">
            {/* html L2: <h2 class="modal-header-title">{{lang 'cart.gift_wrapping.title'}}</h2> */}
            <h2 className="modal-header-title">
                {/* html L2: {{lang 'cart.gift_wrapping.title'}} */}
                <$Lang translationKey={$string('cart.gift_wrapping.title')}/>
            </h2>
        </div>
        {/* html L4: <div class="modal-body"> */}
        <div className="modal-body">
            {/* html L6: {{#if quantity '>' 1}} */}
            <$If
                query={[quantity, '>', $number(1)]}
                $then={() => (
                    /* html L7: <p>{{lang 'cart.gift_wrapping.choose_how'}}</p> */
                    <p>
                        {/* html L7: {{lang 'cart.gift_wrapping.choose_how'}} */}
                        <$Lang translationKey={$string('cart.gift_wrapping.choose_how')}/>
                    </p>
                )}
            />

            {/* html L10: <form class="form giftWrapping-form" action="{{urls.cart}}" method="post"> */}
            <form className="form giftWrapping-form" action={urls.cart} method="post">
                {/* html L11: <input type="hidden" name="action" value="save_giftwrapping"> */}
                <input type="hidden" name="action" value="save_giftwrapping"/>
                {/* html L12: <input type="hidden" name="item_id" value="{{item_id}}"> */}
                <input type="hidden" name="item_id" value={item_id}/>
                {/* html L13: <fieldset class="form-fieldset"> */}
                <fieldset className="form-fieldset">
                    {/* html L15: <div class="form-field" {{#if quantity '===' 1}}style="display:none"{{/if}}> */}
                    <div className="form-field" $$={$if(quantity, '===', $number(1)).then(() => $$raw('style="display:none"'))}>
                        {/* html L16: <input type="radio" class="form-radio" name="giftwraptype" id="girftWrapping-radio-same" checked="checked" value="same"> */}
                        <input
                            type="radio"
                            className="form-radio"
                            name="giftwraptype"
                            id="girftWrapping-radio-same"
                            $$={$$raw('checked="checked"')}
                            value="same"
                        />
                        {/* html L17: <label class="form-label" for="girftWrapping-radio-same">{{lang 'cart.gift_wrapping.option_same'}}</label> */}
                        <label className="form-label" htmlFor="girftWrapping-radio-same">
                            {/* html L17: {{lang 'cart.gift_wrapping.option_same'}} */}
                            <$Lang translationKey={$string('cart.gift_wrapping.option_same')}/>
                        </label>

                        {/* html L19: <input type="radio" class="form-radio" name="giftwraptype" id="girftWrapping-radio-all" value="different"> */}
                        <input type="radio" className="form-radio" name="giftwraptype" id="girftWrapping-radio-all" value="different"/>
                        {/* html L20: <label class="form-label" for="girftWrapping-radio-all">{{lang 'cart.gift_wrapping.option_different'}}</label> */}
                        <label className="form-label" htmlFor="girftWrapping-radio-all">
                            {/* html L20: {{lang 'cart.gift_wrapping.option_different'}} */}
                            <$Lang translationKey={$string('cart.gift_wrapping.option_different')}/>
                        </label>
                    </div>

                    {/* html L23: <div class="giftWrapping-single"> */}
                    <div className="giftWrapping-single">
                        {/* html L24: <div class="form-field"> */}
                        <div className="form-field">
                            {/* html L25: <label class="form-label" for="giftWrapping-select-same"> */}
                            <label className="form-label" htmlFor="giftWrapping-select-same">
                                {/* html L26: {{lang 'cart.gift_wrapping.item_single' name=product_name}} */}
                                <$Lang translationKey={$string('cart.gift_wrapping.item_single')} params={{name: product_name}}/>
                                {/* html L27: {{#each gift_wrappings}} */}
                                <$Each
                                    list={gift_wrappings}
                                    $then={(gift_wrapping) => (
                                        /* html L28: {{#if preview_image}} */
                                        <$If
                                            query={[gift_wrapping.preview_image]}
                                            $then={() => (
                                                /* html L29: <a id="giftWrapping-image-all-{{id}}" class="giftWrapping-image-all" {{#unless selected}}style="display:none"{{/unless}} target="_blank" href="{{getImage preview_image}}"> */
                                                <a
                                                    id={`giftWrapping-image-all-${gift_wrapping.id}`}
                                                    className="giftWrapping-image-all"
                                                    $$={$unless(gift_wrapping.selected).then(() => $$raw('style="display:none"'))}
                                                    target="_blank"
                                                    href={$getImage(gift_wrapping.preview_image)}
                                                >
                                                    {/* html L30: {{lang 'cart.gift_wrapping.preview'}} */}
                                                    <$Lang translationKey={$string('cart.gift_wrapping.preview')}/>
                                                </a>
                                            )}
                                        />
                                    )}
                                />
                            </label>
                            {/* html L35: <select class="form-select giftWrapping-select" name="giftwrapping[all]" id="giftWrapping-select-same" data-index="all"> */}
                            <select className="form-select giftWrapping-select" name="giftwrapping[all]" id="giftWrapping-select-same" data-index="all">
                                {/* html L36: <option value="">{{lang 'cart.gift_wrapping.choose_type'}}</option> */}
                                <option value="">
                                    {/* html L36: {{lang 'cart.gift_wrapping.choose_type'}} */}
                                    <$Lang translationKey={$string('cart.gift_wrapping.choose_type')}/>
                                </option>
                                {/* html L37: {{#each gift_wrappings}} */}
                                <$Each
                                    list={gift_wrappings}
                                    $then={(gift_wrapping) => (
                                        /* html L38: <option {{#if selected}}selected{{/if}} value="{{id}}" data-allow-message="{{allow_message}}">{{name}} - ({{price.formatted}})</option> */
                                        <option
                                            $$={$if(gift_wrapping.selected).then(() => $$raw('selected'))}
                                            value={gift_wrapping.id}
                                            data-allow-message={gift_wrapping.allow_message}
                                        >
                                            {/* html L38: {{name}} */}
                                            {gift_wrapping.name} - ({/* html L38: {{price.formatted}} */}{gift_wrapping.price.formatted})
                                        </option>
                                    )}
                                />
                            </select>
                        </div>

                        {/* html L43: <div class="form-field" id="giftWrapping-message-all" {{#unless selected_wrapping}}style="display:none"{{/unless}}> */}
                        <div className="form-field" id="giftWrapping-message-all" $$={$unless(selected_wrapping).then(() => $$raw('style="display:none"'))}>
                            {/* html L44: <label class="form-label" for="giftMessage">{{lang 'cart.gift_wrapping.gift_message'}}</label> */}
                            <label className="form-label" htmlFor="giftMessage">
                                {/* html L44: {{lang 'cart.gift_wrapping.gift_message'}} */}
                                <$Lang translationKey={$string('cart.gift_wrapping.gift_message')}/>
                            </label>
                            {/* html L45: <textarea class="form-input" name="giftmessage[all]" id="giftMessage" rows="3">{{selected_wrapping.message}}</textarea> */}
                            <textarea className="form-input" name="giftmessage[all]" id="giftMessage" rows={3} defaultValue={selected_wrapping.message}/>
                        </div>
                    </div>

                    {/* html L49: <div class="giftWrapping-multiple"> */}
                    <div className="giftWrapping-multiple">
                        {/* html L53: {{lang 'cart.gift_wrapping.item_multiple' index=$index name=product_name}} */}
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
                {/* html L78: <div class="form-actions"> */}
                <div className="form-actions">
                    {/* html L79: <button class="button button--primary" type="submit">{{lang 'common.form_submit'}}</button> */}
                    <button className="button button--primary" type="submit">
                        {/* html L79: {{lang 'common.form_submit'}} */}
                        <$Lang translationKey={$string('common.form_submit')}/>
                    </button>
                </div>
            </form>
        </div>
    </>
));
