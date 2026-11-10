/**
 * Source: templates/components/common/forms/selectortext.html (42 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $if, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import type {ExtendedFormField} from '@/context-account';

// Partial, not `$dynamic`: `selectortext` is not an allowed dynamic type. Called with the field as context.
export default $asPartial(() => {
    const field = $this<ExtendedFormField>();
    return (
        /* html L1: <div class="form-field" id="{{id}}" data-validation="{{validation}}" {{#if private_id}}data-type="{{private_id}}"{{/if}}> */
        <div
            className="form-field"
            id={field.id}
            data-validation={field.validation}
            $$={$if(field.private_id).then(() => [$$raw('data-type="'), field.private_id, $$raw('"')])}
        >
            {/* html L2: <noscript> */}
            <noscript>
                {/* html L3: <label class="form-label" for="{{id}}_input">{{label}} */}
                <label className="form-label" htmlFor={`${field.id}_input`}>
                    {/* html L3: {{label}} */}
                    {field.label}
                    {/* html L4: {{#if required}}<small>{{lang 'common.required' }}</small>{{/if}} */}
                    <$If
                        query={[field.required]}
                        $then={() => (
                            /* html L4: <small> */
                            <small>
                                {/* html L4: {{lang 'common.required' }} */}
                                <$Lang translationKey={$string('common.required')}/>
                            </small>
                        )}
                    />
                </label>
                {/* html L6-16:
                   <input type="text"
                          id="{{id}}_input"
                          name="{{name}}"
                          value="{{value}}"
                          class="form-input"
                          aria-required="{{required}}"
                          aria-labelledby="{{id}}"
                          aria-live="polite"
                          data-label="{{label}}"
                          data-input
                   />
                */}
                <input
                    type="text"
                    id={`${field.id}_input`}
                    name={field.name}
                    value={field.value}
                    className="form-input"
                    aria-required={field.required}
                    aria-labelledby={field.id}
                    aria-live="polite"
                    data-label={field.label}
                    data-input=""
                />
            </noscript>

            {/* html L19: <label class="form-label" for="{{id}}_select">{{label}} */}
            <label className="form-label" htmlFor={`${field.id}_select`}>
                {/* html L19: {{label}} */}
                {field.label}
                {/* html L20: {{#if required}} */}
                <$If
                    query={[field.required]}
                    $then={() => (
                        /* html L21: <small>{{lang 'common.required'}}</small> */
                        <small>
                            {/* html L21: {{lang 'common.required'}} */}
                            <$Lang translationKey={$string('common.required')}/>
                        </small>
                    )}
                />
            </label>
            {/* html L24-33:
               <select name="{{name}}"
                       class="form-select"
                       aria-required="{{required}}"
                       aria-labelledby="{{id}}"
                       aria-live="polite"
                       id="{{id}}_select"
                       data-label="{{label}}"
                       data-input
                       {{#if private_id}}data-field-type="{{private_id}}"{{/if}}
               >
            */}
            <select
                name={field.name}
                className="form-select"
                aria-required={field.required}
                aria-labelledby={field.id}
                aria-live="polite"
                id={`${field.id}_select`}
                data-label={field.label}
                data-input=""
                $$={$if(field.private_id).then(() => [$$raw('data-field-type="'), field.private_id, $$raw('"')])}
            >
                {/* html L34: {{#if options}} */}
                <$If
                    query={[field.options]}
                    $then={() => (
                        <>
                            {/* html L35: <option value="">{{chooseprefix}}</option> */}
                            <option value="">{/* html L35: {{chooseprefix}} */}{field.chooseprefix}</option>
                            {/* html L36: {{#each options}} */}
                            <$Each
                                list={field.options}
                                $then={(option) => (
                                    /* html L37: <option {{#if selected}} selected {{/if}}value="{{value}}">{{label}}</option> */
                                    <option selected={$$when($if(option.selected))} value={option.value}>
                                        {/* html L37: {{label}} */}
                                        {option.label}
                                    </option>
                                )}
                            />
                        </>
                    )}
                />
            </select>
        </div>
    );
});
