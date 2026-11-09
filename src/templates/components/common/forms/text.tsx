import {$If, $if, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import type {ExtendedFormField} from '@/context-account';

export default $dynamic('text', () => {
    const field = $this<ExtendedFormField>();
    return (
        <div
            className="form-field"
            id={field.id}
            data-validation={field.validation}
            $$={$if(field.private_id).then(() => [$$raw('data-type="'), field.private_id, $$raw('"')])}
        >
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
                name={field.name}
                id={`${field.id}_input`}
                className="form-input"
                data-label={field.label}
                data-input=""
                aria-required={field.required}
                aria-labelledby={field.id}
                aria-live="polite"
                $$={[
                    $if(field.value).then(() => [$$raw('value="'), field.value, $$raw('"')]),
                    $if(field.maxlength).then(() => [$$raw('maxlength="'), field.maxlength, $$raw('"')]),
                    $if(field.placeholder).then(() => [$$raw('placeholder="'), field.placeholder, $$raw('"')]),
                    $if(field.private_id).then(() => [$$raw('data-field-type="'), field.private_id, $$raw('"')]),
                ]}
            />
        </div>
    );
});
