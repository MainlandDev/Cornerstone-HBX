/**
 * Source: templates/components/common/forms/number.html (22 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $if, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import type {ExtendedFormField} from '@/context-account';

export default $dynamic('number', () => {
    const field = $this<ExtendedFormField>();
    return (
        /* html L1: <div class="form-field" id="{{id}}" data-validation="{{validation}}"> */
        <div className="form-field" id={field.id} data-validation={field.validation}>
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
            {/* html L5-20:
               <input type="number"
                      class="form-input"
                      data-label="{{label}}"
                      data-input
                      data-rule="lowerThan"
                      min="{{limitfrom}}"
                      max="{{limitto}}"
                      title="{{lang 'forms.range' limitFrom=limitfrom limitTo=limitto}}"
                      value="{{value}}"
                      id="{{id}}_input"
                      name="{{name}}"
                      aria-required="{{required}}"
                      aria-labelledby="{{id}}"
                      aria-live="polite"
                      {{#if private_id}}data-field-type="{{private_id}}"{{/if}}
               >
            */}
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
