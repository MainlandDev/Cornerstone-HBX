import {$Each, $If, $if, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import type {ExtendedFormField} from '@/context-account';

export default $dynamic('radio', () => {
    const field = $this<ExtendedFormField>();
    return (
        <div className="form-field" id={field.id} data-validation={field.validation}>
            <label className="form-label">
                {field.label}
                <$If
                    query={[field.required]}
                    $then={() => (
                        <small>
                            <$Lang translationKey={$string('common.required')}/>
                        </small>
                    )}
                />
            </label>
            <$If
                query={[field.radios]}
                $then={() => (
                    <$Each
                        list={field.radios}
                        $then={(radio, loop) => (
                            <>
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name={field.name}
                                    id={`${field.name}_${loop['@index']}`}
                                    value={radio.value}
                                    data-label={radio.label}
                                    data-input=""
                                    aria-required={radio.required}
                                    aria-labelledby={radio.id}
                                    aria-live="polite"
                                    checked={$$when($if(radio.checked))}
                                    $$={$if(radio.private_id).then(() => [$$raw('data-field-type="'), radio.private_id, $$raw('"')])}
                                />
                                <label className="form-label" htmlFor={`${field.name}_${loop['@index']}`}>
                                    {radio.label}
                                </label>
                            </>
                        )}
                    />
                )}
            />
        </div>
    );
});
