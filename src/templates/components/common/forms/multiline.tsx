import {$If, $if, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import type {ExtendedFormField} from '@/context-account';

export default $dynamic('multiline', () => {
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
            {/* A token child of <textarea> renders as [object Object] and a token `rows` is dropped: defaultValue + raw `rows` attribute */}
            <textarea
                name={field.name}
                id={`${field.id}_input`}
                data-label={field.label}
                aria-required={field.required}
                aria-labelledby={field.id}
                aria-live="polite"
                data-input=""
                className="form-input"
                defaultValue={field.value}
                $$={[
                    $$raw('rows="'),
                    field.rows,
                    $$raw('" '),
                    $if(field.private_id).then(() => [$$raw('data-field-type="'), field.private_id, $$raw('"')]),
                ]}
            />
        </div>
    );
});
