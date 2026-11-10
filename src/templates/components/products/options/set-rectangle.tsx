/**
 * Source: templates/components/products/options/set-rectangle.html (43 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $Partial, $Unless, $if, $parseHandlebarsDangerously, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('set-rectangle', () => {
    const option = $this<ProductOptionHint>();
    return (
        /* html L1: <div class="form-field" data-product-attribute="set-rectangle" role="radiogroup" aria-labelledby="rectangle-group-label"> */
        <div className="form-field" data-product-attribute="set-rectangle" role="radiogroup" aria-labelledby="rectangle-group-label">
            {/* html L2: <label class="form-label form-label--alternate form-label--inlineSmall" id="rectangle-group-label"> */}
            <label className="form-label form-label--alternate form-label--inlineSmall" id="rectangle-group-label">
                {/* html L3: {{this.display_name}}: */}
                {option.display_name}:
                {/* html L4: <span data-option-value></span> */}
                <span data-option-value=""></span>

                {/* html L6: {{> components/common/requireness-msg}} */}
                <$Partial name="components/common/requireness-msg"/>
            </label>

            {/* html L9: {{#unless required}} */}
            <$Unless
                query={[option.required]}
                $then={() => (
                    <>
                        {/* html L10-17:
                           <input
                               class="form-radio"
                               type="radio"
                               id="attribute_rectangle__{{id}}_none"
                               name="attribute[{{id}}]"
                               value=""
                               checked="{{#if defaultValue '==' ''}}checked{{/if}}"
                           >
                        */}
                        <input
                            className="form-radio"
                            type="radio"
                            id={`attribute_rectangle__${option.id}_none`}
                            name={`attribute[${option.id}]`}
                            value=""
                            $$={$parseHandlebarsDangerously(`checked="{{#if defaultValue '==' ''}}checked{{/if}}"`)}
                        />
                        {/* html L18: <label class="form-option" for="attribute_rectangle__{{id}}_none"> */}
                        <label className="form-option" htmlFor={`attribute_rectangle__${option.id}_none`}>
                            {/* html L19: <span class="form-option-variant">{{lang 'products.none'}}</span> */}
                            <span className="form-option-variant">{/* html L19: {{lang 'products.none'}} */}{$lang($string('products.none'))}</span>
                        </label>
                    </>
                )}
            />

            {/* html L23: {{#each this.values}} */}
            <$Each
                list={option.values}
                $then={(value) => (
                    /* html L24: <div class="form-option-wrapper"> */
                    <div className="form-option-wrapper">
                        {/* html L25-36:
                           <input
                               class="form-radio"
                               type="radio"
                               id="attribute_rectangle__{{../id}}_{{id}}"
                               name="attribute[{{../id}}]"
                               value="{{id}}"
                               {{#if selected}}
                                   checked
                                   data-default
                               {{/if}}
                               {{#if ../required}}required{{/if}}
                           >
                        */}
                        <input
                            className="form-radio"
                            type="radio"
                            id={`attribute_rectangle__${option.id}_${value.id}`}
                            name={`attribute[${option.id}]`}
                            value={value.id}
                            $$={$if(value.selected).then(() => $$raw('checked data-default'))}
                            required={$$when(option.required)}
                        />
                        {/* html L37: <label class="form-option" for="attribute_rectangle__{{../id}}_{{id}}" data-product-attribute-value="{{id}}"> */}
                        <label className="form-option" htmlFor={`attribute_rectangle__${option.id}_${value.id}`} data-product-attribute-value={value.id}>
                            {/* html L38: <span class="form-option-variant">{{this.label}}</span> */}
                            <span className="form-option-variant">{/* html L38: {{this.label}} */}{value.label}</span>
                        </label>
                    </div>
                )}
            />
        </div>
    );
});
