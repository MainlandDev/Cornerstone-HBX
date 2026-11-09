import {$Partial, $if, $this} from '@mainlanddev/bigcommerce-react';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('input-checkbox', () => {
    const option = $this<ProductOptionHint>();
    return (
        <div className="form-field" data-product-attribute="input-checkbox">
            <label className="form-label form-label--alternate form-label--inlineSmall">
                {option.display_name}:

                <$Partial name="components/common/requireness-msg"/>
            </label>
            <input type="hidden" name={`attribute[${option.id}]`} value={option.noValue}/>
            <div className="form-option-wrapper">
                <input
                    className="form-checkbox"
                    type="checkbox"
                    name={`attribute[${option.id}]`}
                    id={`attribute-check-${option.id}`}
                    value={option.value}
                    $$={$if(option.checked).then(() => $$raw('checked data-default'))}
                    required={$$when(option.required)}
                />

                <label className={`form-label ${option.class}`} htmlFor={`attribute-check-${option.id}`}>{option.label}</label>
            </div>
        </div>
    );
});
