import {$Each, $Partial, $Unless, $if, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('set-radio', () => {
    const option = $this<ProductOptionHint>();
    return (
        <div className="form-field" data-product-attribute="set-radio" role="radiogroup" aria-labelledby={`radio-group-label-${option.id}`}>
            <label className="form-label form-label--alternate form-label--inlineSmall" id={`radio-group-label-${option.id}`}>
                {option.display_name}:

                <$Partial name="components/common/requireness-msg"/>
            </label>

            <$Unless
                query={[option.required]}
                $then={() => (
                    <>
                        <input
                            className="form-radio"
                            type="radio"
                            id={`attribute_radio_${option.id}_none`}
                            name={`attribute[${option.id}]`}
                            value=""
                            $$={[$$raw('checked="'), $if(option.defaultValue, '==', $string('')).then(() => $$raw('checked')), $$raw('"')]}
                        />
                        <label className="form-label" htmlFor={`attribute_radio_${option.id}_none`}>{$lang($string('products.none'))}</label>
                    </>
                )}
            />

            <$Each
                list={option.values}
                $then={(value) => (
                    <>
                        <input
                            className="form-radio"
                            type="radio"
                            id={`attribute_radio_${option.id}_${value.id}`}
                            name={`attribute[${option.id}]`}
                            value={value.id}
                            $$={$if(value.selected).then(() => $$raw('checked data-default'))}
                            required={$$when(option.required)}
                        />
                        <label data-product-attribute-value={value.id} className="form-label" htmlFor={`attribute_radio_${option.id}_${value.id}`}>
                            {value.label}
                        </label>
                    </>
                )}
            />
        </div>
    );
});
