/**
 * Source: templates/components/common/forms/select.html (24 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $if, $string, $this, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import type {ExtendedFormField} from '@/context-account';

export default $dynamic('select', () => {
    const field = $this<ExtendedFormField>();
    return (
        /* html L1-2:
           <div class="form-field" id="{{id}}" data-validation="{{validation}}" {{#if private_id}} data-type="{{private_id}}"
               {{/if}}>
        */
        <div
            className="form-field"
            id={field.id}
            data-validation={field.validation}
            $$={$if(field.private_id).then(() => [$$raw('data-type="'), field.private_id, $$raw('"')])}
        >
            {/* html L3: <label class="form-label" for="{{id}}_select">{{label}} */}
            <label className="form-label" htmlFor={`${field.id}_select`}>
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
            {/* html L6-15:
               <select class="{{class}} form-select"
                       id="{{id}}_select"
                       data-label="{{label}}"
                       data-input
                       aria-required="{{required}}"
                       aria-labelledby="{{id}}"
                       aria-live="polite"
                       name="{{name}}"
                       {{#if private_id}} data-field-type="{{private_id}}" {{/if}}
               >
            */}
            <select
                className={`${field.class} form-select`}
                id={`${field.id}_select`}
                data-label={field.label}
                data-input=""
                aria-required={field.required}
                aria-labelledby={field.id}
                aria-live="polite"
                name={field.name}
                $$={$if(field.private_id).then(() => [$$raw('data-field-type="'), field.private_id, $$raw('"')])}
            >
                {/* html L16: {{#if options}} */}
                <$If
                    query={[field.options]}
                    $then={() => (
                        <>
                            {/* html L17: <option value="">{{chooseprefix}}</option> */}
                            <option value="">{/* html L17: {{chooseprefix}} */}{field.chooseprefix}</option>
                            {/* html L18: {{#each options}} */}
                            <$Each
                                list={field.options}
                                $then={(option) => (
                                    /* html L19: <option {{#if selected}} selected {{/if}} value="{{value}}">{{{label}}}</option> */
                                    <option selected={$$when($if(option.selected))} value={option.value}>
                                        {/* html L19: {{{label}}} */}
                                        {$unescaped(option.label)}
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
