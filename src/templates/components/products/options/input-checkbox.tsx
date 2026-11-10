/**
 * Source: templates/components/products/options/input-checkbox.html (24 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Partial, $if, $this} from '@mainlanddev/bigcommerce-react';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('input-checkbox', () => {
    const option = $this<ProductOptionHint>();
    return (
        /* html L1: <div class="form-field" data-product-attribute="input-checkbox"> */
        <div className="form-field" data-product-attribute="input-checkbox">
            {/* html L2: <label class="form-label form-label--alternate form-label--inlineSmall"> */}
            <label className="form-label form-label--alternate form-label--inlineSmall">
                {/* html L3: {{display_name}}: */}
                {option.display_name}:

                {/* html L5: {{> components/common/requireness-msg}} */}
                <$Partial name="components/common/requireness-msg"/>
            </label>
            {/* html L7: <input type="hidden" name="attribute[{{id}}]" value="{{noValue}}" /> */}
            <input type="hidden" name={`attribute[${option.id}]`} value={option.noValue}/>
            {/* html L8: <div class="form-option-wrapper"> */}
            <div className="form-option-wrapper">
                {/* html L9-19:
                   <input
                       class="form-checkbox"
                       type="checkbox"
                       name="attribute[{{id}}]"
                       id="attribute-check-{{id}}"
                       value="{{value}}"
                       {{#if checked}}
                           checked
                           data-default
                       {{/if}}
                       {{#if required}}required{{/if}}>
                */}
                <input
                    className="form-checkbox"
                    type="checkbox"
                    name={`attribute[${option.id}]`}
                    id={`attribute-check-${option.id}`}
                    value={option.value}
                    $$={$if(option.checked).then(() => $$raw('checked data-default'))}
                    required={$$when(option.required)}
                />

                {/* html L21: <label class="form-label {{class}}" for="attribute-check-{{id}}">{{label}}</label> */}
                <label className={`form-label ${option.class}`} htmlFor={`attribute-check-${option.id}`}>{/* html L21: {{label}} */}{option.label}</label>
            </div>
        </div>
    );
});
