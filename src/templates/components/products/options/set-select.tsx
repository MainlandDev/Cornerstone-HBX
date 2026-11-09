import {$Each, $Partial, $if, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('set-select', () => {
    const option = $this<ProductOptionHint>();
    return (
        <div className="form-field" data-product-attribute="set-select">
            <label className="form-label form-label--alternate form-label--inlineSmall" htmlFor={`attribute_select_${option.id}`}>
                {option.display_name}:

                <$Partial name="components/common/requireness-msg"/>
            </label>

            <select
                className="form-select form-select--small"
                name={`attribute[${option.id}]`}
                id={`attribute_select_${option.id}`}
                required={$$when(option.required)}
            >
                <option value="">{$lang($string('products.choose_options'))}</option>
                <$Each
                    list={option.values}
                    $then={(value) => (
                        <option data-product-attribute-value={value.id} value={value.id} $$={$if(value.selected).then(() => $$raw('selected data-default'))}>
                            {value.label}
                        </option>
                    )}
                />
            </select>
        </div>
    );
});
