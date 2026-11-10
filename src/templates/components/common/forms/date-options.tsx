/**
 * Source: templates/components/common/forms/date-options.html (14 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $if, $this, $Unless, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$when} from '@mainlanddev/bigcommerce-react/internal';

type DateOptionsContext = {
    value: HandlebarsInlineValueToken<string>;
    items: Array<{value: HandlebarsInlineValueToken<string>; label: HandlebarsInlineValueToken<string>}>;
    isRequired: HandlebarsInlineValueToken<boolean>;
};

// Partial, not `$dynamic`: `date-options` is not an allowed dynamic type. Called with the month/day/year object as context.
export default $asPartial(() => {
    const self = $this<DateOptionsContext>();
    return (
        /* html L1: {{#unless this.value}} */
        <$Unless
            query={[self.value]}
            $then={() => (
                <>
                    {/* html L2: <option value="">---</option> */}
                    <option value="">---</option>
                    {/* html L3: {{#each this.items}} */}
                    <$Each list={self.items} $then={(item) => /* html L4: <option value="{{value}}">{{label}}</option> */ <option value={item.value}>{/* html L4: {{label}} */}{item.label}</option>}/>
                </>
            )}
            $else={() => (
                <>
                    {/* html L6: {{else}}
                                              html L7: {{#unless this.isRequired}}
                    */}
                    <$Unless query={[self.isRequired]} $then={() => /* html L8: <option value="">---</option> */ <option value="">---</option>}/>
                    {/* html L10: {{#each this.items}} */}
                    <$Each
                        list={self.items}
                        $then={(item) => (
                            /* html L11: <option {{#if ../this.value '==' value}} selected {{/if}}value="{{value}}">{{label}}</option> */
                            <option selected={$$when($if(self.value, '==', item.value))} value={item.value}>
                                {/* html L11: {{label}} */}
                                {item.label}
                            </option>
                        )}
                    />
                </>
            )}
        />
    );
});
