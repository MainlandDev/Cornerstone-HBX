import {$If, $Lang, $Nl2br, $partial, $pointer, $StencilPartial, $string, place} from "@mainlanddev/hbx-bigcommerce";

// LIBRARY GAP: `return` is not in the library context types, so `return.instructions` (return-saved.html) is read with a
// plain `$pointer<string>` and no local shape.
export default () => (
    <>
        <$StencilPartial
            name={$string("page")}
            $then={() => (
                <div className="account">
                    {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                    <h2 className="page-heading">
                        <$Lang keyName={$string("account.returns.heading")} />
                    </h2>
                    {place($partial("components/account/navigation", {account_page: $string("returns")}))}
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
            )}
        />
        {place($partial("layout/base"))}
    </>
);
