import {$If, $if, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import type {ExtendedFormField} from '@/context-account';

export default $dynamic('number', () => {
    const field = $this<ExtendedFormField>();
    return (
        <div className="form-field" id={field.id} data-validation={field.validation}>
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
                type="number"
                className="form-input"
                data-label={field.label}
                data-input=""
                data-rule="lowerThan"
                min={field.limitfrom}
                max={field.limitto}
                title={$lang($string('forms.range'), {limitFrom: field.limitfrom, limitTo: field.limitto})}
                value={field.value}
                id={`${field.id}_input`}
                name={field.name}
                aria-required={field.required}
                aria-labelledby={field.id}
                aria-live="polite"
                $$={$if(field.private_id).then(() => [$$raw('data-field-type="'), field.private_id, $$raw('"')])}
            />
        </div>
    );
});
