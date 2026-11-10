/**
 * Source: templates/components/products/options/date.html (35 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $if, $number, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$concat, $for, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('date', () => {
    const option = $this<ProductOptionHint>();
    return (
        /* html L1: <div class="form-field" data-product-attribute="date"> */
        <div className="form-field" data-product-attribute="date">
            {/* html L2: <label class="form-label form-label--alternate form-label--inlineSmall" {{#if style}}style="{{style}}" {{/if}}> */}
            <label
                className="form-label form-label--alternate form-label--inlineSmall"
                $$={$if(option.style).then(() => [$$raw('style="'), option.style, $$raw('" ')])}
            >
                {/* html L3: {{this.display_name}}: */}
                {option.display_name}:

                {/* html L5: {{> components/common/requireness-msg}} */}
                <$Partial name="components/common/requireness-msg"/>
            </label>
            {/* html L7: <select class="form-select form-select--date" name="attribute[{{this.id}}][year]" {{#if required}}required{{/if}}> */}
            <select className="form-select form-select--date" name={`attribute[${option.id}][year]`} required={$$when(option.required)}>
                {/* html L8: <option value="">{{lang 'common.year'}}</option> */}
                <option value="">{/* html L8: {{lang 'common.year'}} */}{$lang($string('common.year'))}</option>
                {/* html L11: {{$index}} */}
                {$for(option.earliest_year, option.latest_year).then((ctx) => [
                    $$raw('<option value="'),
                    ctx.$index,
                    $$raw('" '),
                    $if(option.selected_date.year, '==', ctx.$index).then(() => $$raw('selected="selected"')),
                    $$raw('>'),
                    ctx.$index,
                    $$raw('</option>'),
                ])}
                {/* html L14: {{#if earliest_year '==' latest_year}} */}
                <$If
                    query={[option.earliest_year, '==', option.latest_year]}
                    $then={() => (
                        /* html L15: <option value="{{earliest_year}}" selected="selected">{{earliest_year}}</option> */
                        <option value={option.earliest_year} $$={$$raw('selected="selected"')}>
                            {/* html L15: {{earliest_year}} */}
                            {option.earliest_year}
                        </option>
                    )}
                />
            </select>
            {/* html L18: <select class="form-select form-select--date" name="attribute[{{this.id}}][month]" {{#if required}}required{{/if}}> */}
            <select className="form-select form-select--date" name={`attribute[${option.id}][month]`} required={$$when(option.required)}>
                {/* html L19: <option value="">{{lang 'common.month'}}</option> */}
                <option value="">{/* html L19: {{lang 'common.month'}} */}{$lang($string('common.month'))}</option>
                {/* html L22: {{lang (concat 'common.short_months.' $index)}} */}
                {$for($number(1), $number(12)).then((ctx) => [
                    $$raw('<option value="'),
                    ctx.$index,
                    $$raw('" '),
                    $if(option.selected_date.month, '==', ctx.$index).then(() => $$raw('selected="selected"')),
                    $$raw('>'),
                    $lang($concat($string('common.short_months.'), ctx.$index)),
                    $$raw('</option>'),
                ])}
            </select>
            {/* html L26: <select class="form-select form-select--date" name="attribute[{{this.id}}][day]" {{#if required}}required{{/if}}> */}
            <select className="form-select form-select--date" name={`attribute[${option.id}][day]`} required={$$when(option.required)}>
                {/* html L27: <option value="">{{lang 'common.day'}}</option> */}
                <option value="">{/* html L27: {{lang 'common.day'}} */}{$lang($string('common.day'))}</option>
                {/* html L30: {{$index}} */}
                {$for($number(1), $number(31)).then((ctx) => [
                    $$raw('<option value="'),
                    ctx.$index,
                    $$raw('" '),
                    $if(option.selected_date.day, '==', ctx.$index).then(() => $$raw('selected="selected"')),
                    $$raw('>'),
                    ctx.$index,
                    $$raw('</option>'),
                ])}
            </select>
        </div>
    );
});
