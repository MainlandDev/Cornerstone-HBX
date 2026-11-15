import {$Each, $Unless, $pointer, $raw} from "@mainlanddev/hbx-bigcommerce";

interface DateOption {
    value: string;
    label: string;
}

export default () => (
    <$Unless
        test={$pointer("value")}
        $then={() => (
            <>
                <option value="">---</option>
                <$Each
                    list={$pointer<DateOption[]>("items")}
                    $then={(item) => (
                        <option value={item.value}>{item.label}</option>
                    )}
                />
            </>
        )}
        $else={() => (
            <>
                <$Unless test={$pointer("isRequired")} $then={() => <option value="">---</option>} />
                <$Each
                    list={$pointer<DateOption[]>("items")}
                    $then={(item) => (
                        <option
                            dangerouslyInlineAttributes={{attributes: `${$raw("{{#if ../this.value '==' value}}selected {{/if}}")}`}}
                            value={item.value}
                        >
                            {item.label}
                        </option>
                    )}
                />
            </>
        )}
    />
);
