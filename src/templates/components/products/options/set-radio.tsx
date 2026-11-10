/**
 * Source: templates/components/products/options/set-radio.html (35 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $Partial, $Unless, $if, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('set-radio', () => {
    const option = $this<ProductOptionHint>();
    return (
        /* html L1: <div class="form-field" data-product-attribute="set-radio" role="radiogroup" aria-labelledby="radio-group-label-{{id}}"> */
        <div className="form-field" data-product-attribute="set-radio" role="radiogroup" aria-labelledby={`radio-group-label-${option.id}`}>
            {/* html L2: <label class="form-label form-label--alternate form-label--inlineSmall" id="radio-group-label-{{id}}"> */}
            <label className="form-label form-label--alternate form-label--inlineSmall" id={`radio-group-label-${option.id}`}>
                {/* html L3: {{ this.display_name }}: */}
                {option.display_name}:

                {/* html L5: {{> components/common/requireness-msg}} */}
                <$Partial name="components/common/requireness-msg"/>
            </label>

            {/* html L8: {{#unless required}} */}
            <$Unless
                query={[option.required]}
                $then={() => (
                    <>
                        {/* html L9-16:
                           <input
                               class="form-radio"
                               type="radio"
                               id="attribute_radio_{{id}}_none"
                               name="attribute[{{id}}]"
                               value=""
                               checked="{{#if defaultValue '==' ''}}checked{{/if}}"
                           >
                        */}
                        <input
                            className="form-radio"
                            type="radio"
                            id={`attribute_radio_${option.id}_none`}
                            name={`attribute[${option.id}]`}
                            value=""
                            $$={[$$raw('checked="'), $if(option.defaultValue, '==', $string('')).then(() => $$raw('checked')), $$raw('"')]}
                        />
                        {/* html L17: <label class="form-label" for="attribute_radio_{{id}}_none">{{lang 'products.none'}}</label> */}
                        <label className="form-label" htmlFor={`attribute_radio_${option.id}_none`}>{/* html L17: {{lang 'products.none'}} */}{$lang($string('products.none'))}</label>
                    </>
                )}
            />

            {/* html L20: {{#each this.values}} */}
            <$Each
                list={option.values}
                $then={(value) => (
                    <>
                        {/* html L21-31:
                           <input
                               class="form-radio"
                               type="radio"
                               id="attribute_radio_{{../id}}_{{id}}"
                               name="attribute[{{../id}}]"
                               value="{{id}}"
                               {{#if selected}}
                                   checked
                                   data-default
                               {{/if}}
                               {{#if ../required}}required{{/if}}>
                        */}
                        <input
                            className="form-radio"
                            type="radio"
                            id={`attribute_radio_${option.id}_${value.id}`}
                            name={`attribute[${option.id}]`}
                            value={value.id}
                            $$={$if(value.selected).then(() => $$raw('checked data-default'))}
                            required={$$when(option.required)}
                        />
                        {/* html L32: <label data-product-attribute-value="{{id}}" class="form-label" for="attribute_radio_{{../id}}_{{id}}">{{this.label}}</label> */}
                        <label data-product-attribute-value={value.id} className="form-label" htmlFor={`attribute_radio_${option.id}_${value.id}`}>
                            {/* html L32: {{this.label}} */}
                            {value.label}
                        </label>
                    </>
                )}
            />
        </div>
    );
});
