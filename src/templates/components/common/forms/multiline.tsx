/**
 * Source: templates/components/common/forms/multiline.html (19 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $parseHandlebarsDangerously, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {ExtendedFormField} from '@/context-account';

export default $dynamic('multiline', () => {
    const field = $this<ExtendedFormField>();
    return (
        /* html L1: <div class="form-field" id="{{id}}" data-validation="{{validation}}"> */
        <div className="form-field" id={field.id} data-validation={field.validation}>
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
            {/* A token child of <textarea> renders as [object Object] and a token `rows` is dropped: defaultValue + raw `rows` attribute */}
            {/* html L7-17:
               <textarea name="{{name}}"
                         id="{{id}}_input"
                         data-label="{{label}}"
                         rows="{{rows}}"
                         aria-required="{{required}}"
                         aria-labelledby="{{id}}"
                         aria-live="polite"
                         data-input
                         class="form-input"
                         {{#if private_id}}data-field-type="{{private_id}}"{{/if}}
               >{{value}}</textarea>
            */}
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
                $$={$parseHandlebarsDangerously(`rows="{{rows}}" {{#if private_id}}data-field-type="{{private_id}}"{{/if}}`)}
            />
        </div>
    );
});
