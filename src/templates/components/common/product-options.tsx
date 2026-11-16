import {$If, $Lang, $pointer, $sanitize, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$If
        test={$pointer("value")}
        operator={$string("==")}
        rvalue={$string("Yes")}
        $then={() => (
            <>
                <$Lang keyName={$string("common.yes")} />
                {" "}
            </>
        )}
        $elseThen={[
            {
                test: $pointer("value"),
                operator: $string("=="),
                rvalue: $string("No"),
                $then: () => (
                    <>
                        {" "}
                        <$Lang keyName={$string("common.no")} />
                    </>
                ),
            },
        ]}
        $else={() => $unescaped($sanitize($pointer("value")))}
    />
);
