/**
 * Source: templates/components/products/options/input-numbers.html (10 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Partial, $unless, $this} from '@mainlanddev/bigcommerce-react';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('input-numbers', () => {
    const option = $this<ProductOptionHint>();
    return (
        /* html L1: <div class="form-field" data-product-attribute="input-number"> */
        <div className="form-field" data-product-attribute="input-number">
            {/* html L2: <label class="form-label form-label--alternate form-label--inlineSmall" for="attribute_number_{{id}}"> */}
            <label className="form-label form-label--alternate form-label--inlineSmall" htmlFor={`attribute_number_${option.id}`}>
                {/* html L3: {{ this.display_name }}: */}
                {option.display_name}:

                {/* html L5: {{> components/common/requireness-msg}} */}
                <$Partial name="components/common/requireness-msg"/>
            </label>

            {/* html L8: <input class="form-input" type="number" id="attribute_number_{{id}}" {{#unless this.integer_only}}step="any"{{/unless}} name="attribute[{{this.id}}]" value="{{this.prefill}}" {{#if required}}required{{/if}}> */}
            <input
                className="form-input"
                type="number"
                id={`attribute_number_${option.id}`}
                $$={$unless(option.integer_only).then(() => $$raw('step="any"'))}
                name={`attribute[${option.id}]`}
                value={option.prefill}
                required={$$when(option.required)}
            />
        </div>
    );
});
