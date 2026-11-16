import {$Each, $If, $Unless, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

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
                            dangerouslyInlineAttributes={{
                                attributes: `${$If({test: $pointer("../this.value"), operator: $string("=="), rvalue: $pointer("value"), $then: () => $raw("selected ")})}`,
                            }}
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
