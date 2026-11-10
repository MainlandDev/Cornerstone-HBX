/**
 * Source: templates/components/products/options/textarea.html (10 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Partial, $if, $this} from '@mainlanddev/bigcommerce-react';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('textarea', () => {
    const option = $this<ProductOptionHint>();
    return (
        /* html L1: <div class="form-field" data-product-attribute="textarea"> */
        <div className="form-field" data-product-attribute="textarea">
            {/* html L2: <label class="form-label form-label--alternate form-label--inlineSmall" for="attribute_textarea_{{id}}"> */}
            <label className="form-label form-label--alternate form-label--inlineSmall" htmlFor={`attribute_textarea_${option.id}`}>
                {/* html L3: {{display_name}}: */}
                {option.display_name}:

                {/* html L5: {{> components/common/requireness-msg}} */}
                <$Partial name="components/common/requireness-msg"/>
            </label>

            {/* html L8: <textarea class="form-input" id="attribute_textarea_{{id}}" name="attribute[{{id}}]" {{#if required}}required{{/if}} {{#if max_length}}maxlength={{max_length}}{{/if}}>{{prefill}}</textarea> */}
            <textarea
                className="form-input"
                id={`attribute_textarea_${option.id}`}
                name={`attribute[${option.id}]`}
                required={$$when(option.required)}
                $$={$if(option.max_length).then(() => [$$raw('maxlength='), option.max_length])}
                defaultValue={option.prefill}
            ></textarea>
        </div>
    );
});
