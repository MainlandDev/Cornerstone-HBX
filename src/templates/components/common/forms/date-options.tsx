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
        <$Unless
            query={[self.value]}
            $then={() => (
                <>
                    <option value="">---</option>
                    <$Each list={self.items} $then={(item) => <option value={item.value}>{item.label}</option>}/>
                </>
            )}
            $else={() => (
                <>
                    <$Unless query={[self.isRequired]} $then={() => <option value="">---</option>}/>
                    <$Each
                        list={self.items}
                        $then={(item) => (
                            <option selected={$$when($if(self.value, '==', item.value))} value={item.value}>
                                {item.label}
                            </option>
                        )}
                    />
                </>
            )}
        />
    );
});
