import {$Partial, $if, $this} from '@mainlanddev/bigcommerce-react';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('input-text', () => {
    const option = $this<ProductOptionHint>();
    return (
        <div className="form-field" data-product-attribute="input-text">
            <label className="form-label form-label--alternate form-label--inlineSmall" htmlFor={`attribute_text_${option.id}`}>
                {option.display_name}:

                <$Partial name="components/common/requireness-msg"/>
            </label>

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
