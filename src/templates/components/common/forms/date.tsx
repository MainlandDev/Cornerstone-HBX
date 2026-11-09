import {$If, $if, $Partial, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import type {ExtendedFormField} from '@/context-account';

export default $dynamic('date', () => {
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
            <div className="form-row form-row--third">
                <div className="form-field">
                    <select
                        className="form-select"
                        name={field.month.name}
                        id={`${field.id}_month`}
                        data-label="month"
                        data-input=""
                        aria-required={field.required}
                        aria-labelledby={field.id}
                        aria-live="polite"
                        $$={$if(field.private_id).then(() => [$$raw('data-field-type="'), field.private_id, $$raw('"')])}
                    >
                        <$Partial name="components/common/forms/date-options" context={field.month} hash={{isRequired: field.required}}/>
                    </select>
                </div>
                <div className="form-field">
                    <select
                        className="form-select"
                        name={field.day.name}
                        id={`${field.id}_day`}
                        data-label="day"
                        data-input=""
                        aria-required={field.required}
                        aria-labelledby={field.id}
                        aria-live="polite"
                        $$={$if(field.private_id).then(() => [$$raw('data-field-type="'), field.private_id, $$raw('"')])}
                    >
                        <$Partial name="components/common/forms/date-options" context={field.day} hash={{isRequired: field.required}}/>
                    </select>
                </div>
                <div className="form-field">
                    <select
                        className="form-select"
                        name={field.year.name}
                        id={`${field.id}_year`}
                        data-label="year"
                        data-input=""
                        aria-required={field.required}
                        aria-labelledby={field.id}
                        aria-live="polite"
                        $$={$if(field.private_id).then(() => [$$raw('data-field-type="'), field.private_id, $$raw('"')])}
                    >
                        <$Partial name="components/common/forms/date-options" context={field.year} hash={{isRequired: field.required}}/>
                    </select>
                </div>
            </div>
        </div>
    );
});
