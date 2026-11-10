/**
 * Source: templates/components/products/options/set-select.html (15 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $Partial, $if, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('set-select', () => {
    const option = $this<ProductOptionHint>();
    return (
        /* html L1: <div class="form-field" data-product-attribute="set-select"> */
        <div className="form-field" data-product-attribute="set-select">
            {/* html L2: <label class="form-label form-label--alternate form-label--inlineSmall" for="attribute_select_{{id}}"> */}
            <label className="form-label form-label--alternate form-label--inlineSmall" htmlFor={`attribute_select_${option.id}`}>
                {/* html L3: {{ this.display_name }}: */}
                {option.display_name}:

                {/* html L5: {{> components/common/requireness-msg}} */}
                <$Partial name="components/common/requireness-msg"/>
            </label>

            {/* html L8: <select class="form-select form-select--small" name="attribute[{{this.id}}]" id="attribute_select_{{id}}" {{#if required}}required{{/if}}> */}
            <select
                className="form-select form-select--small"
                name={`attribute[${option.id}]`}
                id={`attribute_select_${option.id}`}
                required={$$when(option.required)}
            >
                {/* html L9: <option value="">{{lang 'products.choose_options'}}</option> */}
                <option value="">{/* html L9: {{lang 'products.choose_options'}} */}{$lang($string('products.choose_options'))}</option>
                {/* html L10: {{#each this.values}} */}
                <$Each
                    list={option.values}
                    $then={(value) => (
                        /* html L11: <option data-product-attribute-value="{{id}}" value="{{id}}" {{#if selected}}selected data-default{{/if}}>{{label}}</option> */
                        <option data-product-attribute-value={value.id} value={value.id} $$={$if(value.selected).then(() => $$raw('selected data-default'))}>
                            {/* html L11: {{label}} */}
                            {value.label}
                        </option>
                    )}
                />
            </select>
        </div>
    );
});
