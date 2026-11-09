import {$Partial, $if, $this} from '@mainlanddev/bigcommerce-react';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('textarea', () => {
    const option = $this<ProductOptionHint>();
    return (
        <div className="form-field" data-product-attribute="textarea">
            <label className="form-label form-label--alternate form-label--inlineSmall" htmlFor={`attribute_textarea_${option.id}`}>
                {option.display_name}:

                <$Partial name="components/common/requireness-msg"/>
            </label>

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
