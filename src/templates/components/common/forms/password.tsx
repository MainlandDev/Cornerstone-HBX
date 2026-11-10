/**
 * Source: templates/components/common/forms/password.html (20 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $if, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import type {ExtendedFormField} from '@/context-account';

export default $dynamic('password', () => {
    const field = $this<ExtendedFormField>();
    return (
        /* html L1: <div class="form-field" id="{{id}}" data-validation="{{validation}}" {{#if private_id}}data-type="{{private_id}}"{{/if}}> */
        <div
            className="form-field"
            id={field.id}
            data-validation={field.validation}
            $$={$if(field.private_id).then(() => [$$raw('data-type="'), field.private_id, $$raw('"')])}
        >
            {/* html L2: <label class="form-label" for="{{id}}_input">{{label}} */}
            <label className="form-label" htmlFor={`${field.id}_input`}>
                {/* html L2: {{label}} */}
                {field.label}
                {/* html L3: {{#if required}} */}
                <$If
                    query={[field.required]}
                    $then={() => (
                        /* html L4: <small>{{lang 'common.required' }}</small> */
                        <small>
                            {/* html L4: {{lang 'common.required' }} */}
                            <$Lang translationKey={$string('common.required')}/>
                        </small>
                    )}
                />
            </label>
            {/* html L7-18:
               <input type="password"
                      class="form-input"
                      id="{{id}}_input"
                      data-label="{{label}}"
                      name="{{name}}"
                      value="{{value}}"
                      autocomplete="off"
                      aria-required="{{required}}"
                      aria-labelledby="{{id}}"
                      aria-live="polite"
                      {{#if private_id}}data-field-type="{{private_id}}"{{/if}}
               >
            */}
            <input
                type="password"
                className="form-input"
                id={`${field.id}_input`}
                data-label={field.label}
                name={field.name}
                value={field.value}
                autoComplete="off"
                aria-required={field.required}
                aria-labelledby={field.id}
                aria-live="polite"
                $$={$if(field.private_id).then(() => [$$raw('data-field-type="'), field.private_id, $$raw('"')])}
            />
        </div>
    );
});
