/**
 * Source: templates/components/common/forms/radio.html (27 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $if, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import type {ExtendedFormField} from '@/context-account';

export default $dynamic('radio', () => {
    const field = $this<ExtendedFormField>();
    return (
        /* html L1: <div class="form-field" id="{{id}}" data-validation="{{validation}}"> */
        <div className="form-field" id={field.id} data-validation={field.validation}>
            {/* html L2: <label class="form-label">{{label}} */}
            <label className="form-label">
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
            {/* html L7: {{#if radios}} */}
            <$If
                query={[field.radios]}
                $then={() => (
                    /* html L8: {{#each radios}} */
                    <$Each
                        list={field.radios}
                        $then={(radio, loop) => (
                            <>
                                {/* html L9-22:
                                   <input
                                       type="radio"
                                       class="form-radio"
                                       name="{{../name}}"
                                       id="{{../name}}_{{@index}}"
                                       value="{{value}}"
                                       data-label="{{label}}"
                                       data-input
                                       aria-required="{{required}}"
                                       aria-labelledby="{{id}}"
                                       aria-live="polite"
                                       {{#if checked}}checked{{/if}}
                                       {{#if private_id}}data-field-type="{{private_id}}"{{/if}}
                                   >
                                */}
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name={field.name}
                                    id={`${field.name}_${loop['@index']}`}
                                    value={radio.value}
                                    data-label={radio.label}
                                    data-input=""
                                    aria-required={radio.required}
                                    aria-labelledby={radio.id}
                                    aria-live="polite"
                                    checked={$$when($if(radio.checked))}
                                    $$={$if(radio.private_id).then(() => [$$raw('data-field-type="'), radio.private_id, $$raw('"')])}
                                />
                                {/* html L23: <label class="form-label" for="{{../name}}_{{@index}}">{{label}}</label> */}
                                <label className="form-label" htmlFor={`${field.name}_${loop['@index']}`}>
                                    {/* html L23: {{label}} */}
                                    {radio.label}
                                </label>
                            </>
                        )}
                    />
                )}
            />
        </div>
    );
});
