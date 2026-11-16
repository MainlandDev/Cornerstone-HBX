"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $sanitize, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
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
