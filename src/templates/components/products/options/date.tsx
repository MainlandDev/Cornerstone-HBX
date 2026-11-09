import {$If, $Partial, $if, $number, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$concat, $for, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('date', () => {
    const option = $this<ProductOptionHint>();
    return (
        <div className="form-field" data-product-attribute="date">
            <label
                className="form-label form-label--alternate form-label--inlineSmall"
                $$={$if(option.style).then(() => [$$raw('style="'), option.style, $$raw('" ')])}
            >
                {option.display_name}:

                <$Partial name="components/common/requireness-msg"/>
            </label>
            <select className="form-select form-select--date" name={`attribute[${option.id}][year]`} required={$$when(option.required)}>
                <option value="">{$lang($string('common.year'))}</option>
                {$for(option.earliest_year, option.latest_year).then((ctx) => [
                    $$raw('<option value="'),
                    ctx.$index,
                    $$raw('" '),
                    $if(option.selected_date.year, '==', ctx.$index).then(() => $$raw('selected="selected"')),
                    $$raw('>'),
                    ctx.$index,
                    $$raw('</option>'),
                ])}
                <$If
                    query={[option.earliest_year, '==', option.latest_year]}
                    $then={() => (
                        <option value={option.earliest_year} $$={$$raw('selected="selected"')}>
                            {option.earliest_year}
                        </option>
                    )}
                />
            </select>
            <select className="form-select form-select--date" name={`attribute[${option.id}][month]`} required={$$when(option.required)}>
                <option value="">{$lang($string('common.month'))}</option>
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
            <select className="form-select form-select--date" name={`attribute[${option.id}][day]`} required={$$when(option.required)}>
                <option value="">{$lang($string('common.day'))}</option>
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
