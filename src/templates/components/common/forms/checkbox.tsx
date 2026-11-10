/**
 * Source: templates/components/common/forms/checkbox.html (25 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $if, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import type {ExtendedFormField} from '@/context-account';

export default $dynamic('checkbox', () => {
    const field = $this<ExtendedFormField>();
    return (
        /* html L1: <div class="form-field" id="{{id}}" data-validation="{{validation}}" {{#if private_id}}data-type="{{private_id}}"{{/if}}> */
        <div
            className="form-field"
            id={field.id}
            data-validation={field.validation}
            $$={$if(field.private_id).then(() => [$$raw('data-type="'), field.private_id, $$raw('"')])}
        >
            {/* html L2: <label class="form-label" for="{{id}}">{{label}} */}
            <label className="form-label" htmlFor={field.id}>
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
            {/* html L7: {{#if checkboxes}} */}
            <$If
                query={[field.checkboxes]}
                $then={() => (
                    /* html L8: {{#each checkboxes}} */
                    <$Each
                        list={field.checkboxes}
                        $then={(checkbox) => (
                            <>
                                {/* html L9-20:
                                   <input type="checkbox"
                                          value="{{value}}"
                                          name="{{name}}"
                                          id="{{name}}"
                                          data-input
                                          data-label="{{label}}"
                                          class="form-checkbox"
                                          aria-labelledby="{{id}}"
                                          aria-live="polite"
                                          {{#if checked}}checked{{/if}}
                                          {{#if private_id}}data-field-type="{{private_id}}"{{/if}}
                                   >
                                */}
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
                                {/* html L21: <label class="form-label {{class}}" for="{{name}}">{{label}}</label> */}
                                <label className={`form-label ${checkbox.class}`} htmlFor={checkbox.name}>
                                    {/* html L21: {{label}} */}
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
