import {$Each, $If, $if, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import type {ExtendedFormField} from '@/context-account';

export default $dynamic('checkbox', () => {
    const field = $this<ExtendedFormField>();
    return (
        <div
            className="form-field"
            id={field.id}
            data-validation={field.validation}
            $$={$if(field.private_id).then(() => [$$raw('data-type="'), field.private_id, $$raw('"')])}
        >
            <label className="form-label" htmlFor={field.id}>
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
                query={[field.checkboxes]}
                $then={() => (
                    <$Each
                        list={field.checkboxes}
                        $then={(checkbox) => (
                            <>
                                <input
                                    type="checkbox"
                                    value={checkbox.value}
                                    name={checkbox.name}
                                    id={checkbox.name}
                                    data-input=""
                                    data-label={checkbox.label}
                                    className="form-checkbox"
                                    aria-labelledby={checkbox.id}
                                    aria-live="polite"
                                    checked={$$when($if(checkbox.checked))}
                                    $$={$if(checkbox.private_id).then(() => [$$raw('data-field-type="'), checkbox.private_id, $$raw('"')])}
                                />
                                <label className={`form-label ${checkbox.class}`} htmlFor={checkbox.name}>
                                    {checkbox.label}
                                </label>
                            </>
                        )}
                    />
                )}
            />
        </div>
    );
});
