import {$Each, $If, $if, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import type {ExtendedFormField} from '@/context-account';

// Partial, not `$dynamic`: `selectortext` is not an allowed dynamic type. Called with the field as context.
export default $asPartial(() => {
    const field = $this<ExtendedFormField>();
    return (
        <div
            className="form-field"
            id={field.id}
            data-validation={field.validation}
            $$={$if(field.private_id).then(() => [$$raw('data-type="'), field.private_id, $$raw('"')])}
        >
            <noscript>
                <label className="form-label" htmlFor={`${field.id}_input`}>
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
                <input
                    type="text"
                    id={`${field.id}_input`}
                    name={field.name}
                    value={field.value}
                    className="form-input"
                    aria-required={field.required}
                    aria-labelledby={field.id}
                    aria-live="polite"
                    data-label={field.label}
                    data-input=""
                />
            </noscript>

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
                name={field.name}
                className="form-select"
                aria-required={field.required}
                aria-labelledby={field.id}
                aria-live="polite"
                id={`${field.id}_select`}
                data-label={field.label}
                data-input=""
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
                                        {option.label}
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
