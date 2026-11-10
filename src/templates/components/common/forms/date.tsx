/**
 * Source: templates/components/common/forms/date.html (53 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $if, $Partial, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import type {ExtendedFormField} from '@/context-account';

export default $dynamic('date', () => {
    const field = $this<ExtendedFormField>();
    return (
        /* html L1: <div class="form-field" id="{{id}}" data-validation="{{validation}}" {{#if private_id}}data-type="{{private_id}}"{{/if}}> */
        <div
            className="form-field"
            id={field.id}
            data-validation={field.validation}
            $$={$if(field.private_id).then(() => [$$raw('data-type="'), field.private_id, $$raw('"')])}
        >
            {/* html L2: <label class="form-label" for="{{id}}"> */}
            <label className="form-label" htmlFor={field.id}>
                {/* html L3: {{label}} */}
                {field.label}
                {/* html L4: {{#if required}} */}
                <$If
                    query={[field.required]}
                    $then={() => (
                        /* html L5: <small>{{lang 'common.required' }}</small> */
                        <small>
                            {/* html L5: {{lang 'common.required' }} */}
                            <$Lang translationKey={$string('common.required')}/>
                        </small>
                    )}
                />
            </label>
            {/* html L8: <div class="form-row form-row--third"> */}
            <div className="form-row form-row--third">
                {/* html L9: <div class="form-field"> */}
                <div className="form-field">
                    {/* html L10-19:
                       <select class="form-select"
                               name="{{month.name}}"
                               id="{{id}}_month"
                               data-label="month"
                               data-input
                               aria-required="{{required}}"
                               aria-labelledby="{{id}}"
                               aria-live="polite"
                               {{#if private_id}}data-field-type="{{private_id}}"{{/if}}
                       >
                    */}
                    <select
                        className="form-select"
                        name={field.month.name}
                        id={`${field.id}_month`}
                        data-label="month"
                        data-input=""
                        aria-required={field.required}
                        aria-labelledby={field.id}
                        aria-live="polite"
                        $$={$if(field.private_id).then(() => [$$raw('data-field-type="'), field.private_id, $$raw('"')])}
                    >
                        {/* html L20: {{> components/common/forms/date-options month isRequired=required}} */}
                        <$Partial name="components/common/forms/date-options" context={field.month} hash={{isRequired: field.required}}/>
                    </select>
                </div>
                {/* html L23: <div class="form-field"> */}
                <div className="form-field">
                    {/* html L24-33:
                       <select class="form-select"
                               name="{{day.name}}"
                               id="{{id}}_day"
                               data-label="day"
                               data-input
                               aria-required="{{required}}"
                               aria-labelledby="{{id}}"
                               aria-live="polite"
                               {{#if private_id}}data-field-type="{{private_id}}"{{/if}}
                       >
                    */}
                    <select
                        className="form-select"
                        name={field.day.name}
                        id={`${field.id}_day`}
                        data-label="day"
                        data-input=""
                        aria-required={field.required}
                        aria-labelledby={field.id}
                        aria-live="polite"
                        $$={$if(field.private_id).then(() => [$$raw('data-field-type="'), field.private_id, $$raw('"')])}
                    >
                        {/* html L34: {{> components/common/forms/date-options day isRequired=required}} */}
                        <$Partial name="components/common/forms/date-options" context={field.day} hash={{isRequired: field.required}}/>
                    </select>
                </div>
                {/* html L37: <div class="form-field"> */}
                <div className="form-field">
                    {/* html L38-47:
                       <select class="form-select"
                               name="{{year.name}}"
                               id="{{id}}_year"
                               data-label="year"
                               data-input
                               aria-required="{{required}}"
                               aria-labelledby="{{id}}"
                               aria-live="polite"
                               {{#if private_id}}data-field-type="{{private_id}}"{{/if}}
                       >
                    */}
                    <select
                        className="form-select"
                        name={field.year.name}
                        id={`${field.id}_year`}
                        data-label="year"
                        data-input=""
                        aria-required={field.required}
                        aria-labelledby={field.id}
                        aria-live="polite"
                        $$={$if(field.private_id).then(() => [$$raw('data-field-type="'), field.private_id, $$raw('"')])}
                    >
                        {/* html L48: {{> components/common/forms/date-options year isRequired=required}} */}
                        <$Partial name="components/common/forms/date-options" context={field.year} hash={{isRequired: field.required}}/>
                    </select>
                </div>
            </div>
        </div>
    );
});
