import {$If, $Inject, $Lang, $partial, $pointer, $StencilPartial, $string, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$Inject keyName={$string("passwordRequirements")} value={$pointer("settings.password_requirements")} />
        <$StencilPartial
            name={$string("page")}
            $then={() => (
                <div className="account account--fixed">
                    {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                    <h2 className="page-heading">
                        <$Lang keyName={$string("account.settings.heading")} />
                    </h2>
                    {place($partial("components/account/navigation", {account_page: $string("settings")}))}
                    <$If
                        test={$pointer("forms.edit_account.error")}
                        $then={() => place($partial("components/common/alert/alert-error", $pointer("forms.edit_account.error")))}
                    />
                    <$If
                        test={$pointer("forms.edit_account.success")}
                        $then={() => place($partial("components/common/alert/alert-success", $pointer("forms.edit_account.success")))}
                    />
                    {place($partial("components/account/edit-account"))}
                </div>
            )}
        />
        {place($partial("layout/base"))}
    </>
);
