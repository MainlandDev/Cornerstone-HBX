import {$Partial, $unless, $this} from '@mainlanddev/bigcommerce-react';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('input-numbers', () => {
    const option = $this<ProductOptionHint>();
    return (
        <div className="form-field" data-product-attribute="input-number">
            <label className="form-label form-label--alternate form-label--inlineSmall" htmlFor={`attribute_number_${option.id}`}>
                {option.display_name}:

                <$Partial name="components/common/requireness-msg"/>
            </label>

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
