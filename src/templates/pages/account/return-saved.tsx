import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import {$If, $Lang, $Nl2br, $Page, $partial, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

// LIBRARY GAP: `return` is not in the library context types, so `return.instructions` (return-saved.html) is read with a
// plain `$pointer<string>` and no local shape.
export default () => (
    <$Page
        blocks={{
            page: () => (
                <div className="account">
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h2 className="page-heading">
                        <$Lang keyName={$string("account.returns.heading")} />
                    </h2>
                    {$partial("components/account/navigation", {account_page: $string("returns")})}
                    <div className="account-row">
                        <p>
                            <$Lang keyName={$string("account.returns.successful")} />
                        </p>
                        <$If
                            test={$pointer("return.instructions")}
                            $then={() => (
                                <>
                                    <h3>
                                        <$Lang keyName={$string("account.returns.instructions")} />
                                    </h3>
                                    <p>
                                        <$Nl2br text={$pointer<string>("return.instructions")} />
                                    </p>
                                </>
                            )}
                        />
                    </div>
                </div>
            ),
        }}
        layout="layout/base"
    />
);
