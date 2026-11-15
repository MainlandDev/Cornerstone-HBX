import {$If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
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
