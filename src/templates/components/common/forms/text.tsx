/**
 * Source: templates/components/common/forms/text.html (20 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $if, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import type {ExtendedFormField} from '@/context-account';

export default $dynamic('text', () => {
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
                {/* html L3: {{#if required}}<small>{{lang 'common.required' }}</small>{{/if}} */}
                <$If
                    query={[field.required]}
                    $then={() => (
                        /* html L3: <small> */
                        <small>
                            {/* html L3: {{lang 'common.required' }} */}
                            <$Lang translationKey={$string('common.required')}/>
                        </small>
                    )}
                />
            </label>
            {/* html L5-18:
               <input type="text"
                      name="{{name}}"
                      id="{{id}}_input"
                      class="form-input"
                      data-label="{{label}}"
                      data-input
                      aria-required="{{required}}"
                      aria-labelledby="{{id}}"
                      aria-live="polite"
                      {{#if value}} value="{{value}}"{{/if}}
                      {{#if maxlength}}maxlength="{{maxlength}}"{{/if}}
                      {{#if placeholder}} placeholder="{{placeholder}}"{{/if}}
                      {{#if private_id}}data-field-type="{{private_id}}"{{/if}}
               >
            */}
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
