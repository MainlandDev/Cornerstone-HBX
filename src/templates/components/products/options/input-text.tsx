/**
 * Source: templates/components/products/options/input-text.html (10 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Partial, $if, $this} from '@mainlanddev/bigcommerce-react';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('input-text', () => {
    const option = $this<ProductOptionHint>();
    return (
        /* html L1: <div class="form-field" data-product-attribute="input-text"> */
        <div className="form-field" data-product-attribute="input-text">
            {/* html L2: <label class="form-label form-label--alternate form-label--inlineSmall" for="attribute_text_{{id}}"> */}
            <label className="form-label form-label--alternate form-label--inlineSmall" htmlFor={`attribute_text_${option.id}`}>
                {/* html L3: {{ this.display_name }}: */}
                {option.display_name}:

                {/* html L5: {{> components/common/requireness-msg}} */}
                <$Partial name="components/common/requireness-msg"/>
            </label>

            {/* html L8: <input class="form-input form-input--small" type="text" id="attribute_text_{{id}}" name="attribute[{{this.id}}]" value="{{this.prefill}}" {{#if required}}required{{/if}} {{#if max_length}}maxlength="{{max_length}}"{{/if}}> */}
            <input
                className="form-input form-input--small"
                type="text"
                id={`attribute_text_${option.id}`}
                name={`attribute[${option.id}]`}
                value={option.prefill}
                required={$$when(option.required)}
                $$={$if(option.max_length).then(() => [$$raw('maxlength="'), option.max_length, $$raw('"')])}
            />
        </div>
    );
});
