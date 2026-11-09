import {$Each, $Partial, $Unless, $if, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('set-rectangle', () => {
    const option = $this<ProductOptionHint>();
    return (
        <div className="form-field" data-product-attribute="set-rectangle" role="radiogroup" aria-labelledby="rectangle-group-label">
            <label className="form-label form-label--alternate form-label--inlineSmall" id="rectangle-group-label">
                {option.display_name}:
                <span data-option-value=""></span>

                <$Partial name="components/common/requireness-msg"/>
            </label>

            <$Unless
                query={[option.required]}
                $then={() => (
                    <>
                        <input
                            className="form-radio"
                            type="radio"
                            id={`attribute_rectangle__${option.id}_none`}
                            name={`attribute[${option.id}]`}
                            value=""
                            $$={[$$raw('checked="'), $if(option.defaultValue, '==', $string('')).then(() => $$raw('checked')), $$raw('"')]}
                        />
                        <label className="form-option" htmlFor={`attribute_rectangle__${option.id}_none`}>
                            <span className="form-option-variant">{$lang($string('products.none'))}</span>
                        </label>
                    </>
                )}
            />

            <$Each
                list={option.values}
                $then={(value) => (
                    <div className="form-option-wrapper">
                        <input
                            className="form-radio"
                            type="radio"
                            id={`attribute_rectangle__${option.id}_${value.id}`}
                            name={`attribute[${option.id}]`}
                            value={value.id}
                            $$={$if(value.selected).then(() => $$raw('checked data-default'))}
                            required={$$when(option.required)}
                        />
                        <label className="form-option" htmlFor={`attribute_rectangle__${option.id}_${value.id}`} data-product-attribute-value={value.id}>
                            <span className="form-option-variant">{value.label}</span>
                        </label>
                    </div>
                )}
            />
        </div>
    );
});
