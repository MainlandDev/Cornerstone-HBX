import {$Each, $If, $if, $string, $this, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import type {ExtendedFormField} from '@/context-account';

export default $dynamic('select', () => {
    const field = $this<ExtendedFormField>();
    return (
        <div
            className="form-field"
            id={field.id}
            data-validation={field.validation}
            $$={$if(field.private_id).then(() => [$$raw('data-type="'), field.private_id, $$raw('"')])}
        >
            <label className="form-label" htmlFor={`${field.id}_select`}>
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
            <select
                className={`${field.class} form-select`}
                id={`${field.id}_select`}
                data-label={field.label}
                data-input=""
                aria-required={field.required}
                aria-labelledby={field.id}
                aria-live="polite"
                name={field.name}
                $$={$if(field.private_id).then(() => [$$raw('data-field-type="'), field.private_id, $$raw('"')])}
            >
                <$If
                    query={[field.options]}
                    $then={() => (
                        <>
                            <option value="">{field.chooseprefix}</option>
                            <$Each
                                list={field.options}
                                $then={(option) => (
                                    <option selected={$$when($if(option.selected))} value={option.value}>
                                        {$unescaped(option.label)}
                                    </option>
                                )}
                            />
                        </>
                    )}
                />
            </select>
        </div>
    );
});
