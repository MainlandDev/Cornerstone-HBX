/**
 * Source: templates/components/products/options/product-list.html (76 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $Unless, $if, $string, $this, $unless} from '@mainlanddev/bigcommerce-react';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('product-list', () => {
    const option = $this<ProductOptionHint>();
    return (
        /* html L1: <div class="form-field" data-product-attribute="product-list" role="radiogroup" aria-labelledby="product-list-label"> */
        <div className="form-field" data-product-attribute="product-list" role="radiogroup" aria-labelledby="product-list-label">
            {/* html L2: <label class="form-label form-label--alternate form-label--inlineSmall" id="product-list-label"> */}
            <label className="form-label form-label--alternate form-label--inlineSmall" id="product-list-label">
                {/* html L3: {{display_name}}: */}
                {option.display_name}:
                {/* html L4: <span data-option-value></span> */}
                <span data-option-value=""></span>

                {/* html L6: {{> components/common/requireness-msg}} */}
                <$Partial name="components/common/requireness-msg"/>
            </label>

            {/* html L9: {{#if values.0.image}} */}
            <$If
                query={[option.values[0].image]}
                $then={() => (
                    /* html L10: <ul class="productOptions-list"> */
                    <ul className="productOptions-list">
                        {/* html L11: {{#unless required}} */}
                        <$Unless
                            query={[option.required]}
                            $then={() => (
                                /* html L12: <li class="productOptions-list-item"> */
                                <li className="productOptions-list-item">
                                    {/* html L13-18:
                                       <input class="form-radio"
                                              type="radio"
                                              name="attribute[{{id}}]"
                                              value=""
                                              id="attribute_productlist_{{id}}_none"
                                              {{#unless defaultValue}}checked{{/unless}}>
                                    */}
                                    <input
                                        className="form-radio"
                                        type="radio"
                                        name={`attribute[${option.id}]`}
                                        value=""
                                        id={`attribute_productlist_${option.id}_none`}
                                        $$={$unless(option.defaultValue).then(() => $$raw("checked"))}
                                    />
                                    {/* html L19: <label class="form-label" for="attribute_productlist_{{id}}_none">{{lang 'products.none'}}</label> */}
                                    <label className="form-label" htmlFor={`attribute_productlist_${option.id}_none`}>
                                        {/* html L19: {{lang 'products.none'}} */}
                                        {$lang($string('products.none'))}
                                    </label>
                                </li>
                            )}
                        />
                        {/* html L22: {{#each values}} */}
                        <$Each
                            list={option.values}
                            $then={(value) => (
                                /* html L23: <li class="productOptions-list-item" data-product-attribute-value="{{id}}"> */
                                <li className="productOptions-list-item" data-product-attribute-value={value.id}>
                                    {/* html L24: {{#if image}} */}
                                    <$If
                                        query={[value.image]}
                                        $then={() => (
                                            /* html L25: <figure class="productOptions-list-item-figure"> */
                                            <figure className="productOptions-list-item-figure">
                                                {/* html L26-30:
                                                   {{> components/common/responsive-img
                                                       image=image
                                                       class="productOptions-list-item-image"
                                                       lazyload='lazyload+lqip'
                                                   }}
                                                */}
                                                <$Partial
                                                    name="components/common/responsive-img"
                                                    hash={{image: value.image, class: $string('productOptions-list-item-image'), lazyload: $string('lazyload+lqip')}}
                                                />
                                            </figure>
                                        )}
                                    />
                                    {/* html L33: <div class="productOptions-list-item-content"> */}
                                    <div className="productOptions-list-item-content">
                                        {/* html L34-44:
                                           <input
                                               class="form-radio"
                                               type="radio"
                                               name="attribute[{{../id}}]"
                                               value="{{id}}"
                                               id="attribute_productlist_{{../id}}_{{id}}"
                                               {{#if selected}}
                                                   checked
                                                   data-default
                                               {{/if}}
                                               {{#if ../required}}required{{/if}}>
                                        */}
                                        <input
                                            className="form-radio"
                                            type="radio"
                                            name={`attribute[${option.id}]`}
                                            value={value.id}
                                            id={`attribute_productlist_${option.id}_${value.id}`}
                                            $$={$if(value.selected).then(() => $$raw('checked data-default'))}
                                            required={$$when(option.required)}
                                        />
                                        {/* html L45: <label data-product-attribute-value="{{id}}" class="form-label" for="attribute_productlist_{{../id}}_{{id}}">{{label}}</label> */}
                                        <label
                                            data-product-attribute-value={value.id}
                                            className="form-label"
                                            htmlFor={`attribute_productlist_${option.id}_${value.id}`}
                                        >
                                            {/* html L45: {{label}} */}
                                            {value.label}
                                        </label>
                                    </div>
                                </li>
                            )}
                        />
                    </ul>
                )}
                $else={() => (
                    <>
                        {/* html L50: {{else}}
                                                      html L51: {{#unless required}}
                        */}
                        <$Unless
                            query={[option.required]}
                            $then={() => (
                                <>
                                    {/* html L52-57:
                                       <input class="form-radio"
                                              type="radio"
                                              name="attribute[{{id}}]"
                                              value="0"
                                              id="attribute_productlist_0_{{id}}"
                                              {{#unless defaultValue}}checked{{/unless}}>
                                    */}
                                    <input
                                        className="form-radio"
                                        type="radio"
                                        name={`attribute[${option.id}]`}
                                        value="0"
                                        id={`attribute_productlist_0_${option.id}`}
                                        $$={$unless(option.defaultValue).then(() => $$raw("checked"))}
                                    />
                                    {/* html L58: <label class="form-label" for="attribute_productlist_0_{{id}}">{{lang 'products.none'}}</label> */}
                                    <label className="form-label" htmlFor={`attribute_productlist_0_${option.id}`}>
                                        {/* html L58: {{lang 'products.none'}} */}
                                        {$lang($string('products.none'))}
                                    </label>
                                </>
                            )}
                        />
                        {/* html L60: {{#each values}} */}
                        <$Each
                            list={option.values}
                            $then={(value) => (
                                <>
                                    {/* html L61-71:
                                       <input
                                           class="form-radio"
                                           type="radio"
                                           name="attribute[{{../id}}]"
                                           value="{{id}}"
                                           id="attribute_productlist_{{../id}}_{{id}}"
                                           {{#if selected}}
                                               checked
                                               data-default
                                           {{/if}}
                                           {{#if ../required}}required{{/if}}>
                                    */}
                                    <input
                                        className="form-radio"
                                        type="radio"
                                        name={`attribute[${option.id}]`}
                                        value={value.id}
                                        id={`attribute_productlist_${option.id}_${value.id}`}
                                        $$={$if(value.selected).then(() => $$raw('checked data-default'))}
                                        required={$$when(option.required)}
                                    />
                                    {/* html L72: <label data-product-attribute-value="{{id}}" class="form-label" for="attribute_productlist_{{../id}}_{{id}}">{{label}}</label> */}
                                    <label data-product-attribute-value={value.id} className="form-label" htmlFor={`attribute_productlist_${option.id}_${value.id}`}>
                                        {/* html L72: {{label}} */}
                                        {value.label}
                                    </label>
                                </>
                            )}
                        />
                    </>
                )}
            />
        </div>
    );
});
