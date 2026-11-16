"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <small>
        <$If
            test={$pointer("required")}
            $then={() => (
                <>
                    (<$Lang keyName={$string("common.required")} />)
                </>
            )}
            $else={() => <$Lang keyName={$string("common.optional")} />}
        />
    </small>
);
