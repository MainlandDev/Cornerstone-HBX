import {$If, $Inject, $Lang, $Page, $partial, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$Inject keyName={$string("passwordRequirements")} value={$pointer("settings.password_requirements")} />
        <$Page
            blocks={{
                page: () => (
                    <div className="account account--fixed">
                        {$partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")})}
                        <h2 className="page-heading">
                            <$Lang keyName={$string("account.settings.heading")} />
                        </h2>
                        {$partial("components/account/navigation", {account_page: $string("settings")})}
                        <$If
                            test={$pointer("forms.edit_account.error")}
                            $then={() => $partial("components/common/alert/alert-error", $pointer("forms.edit_account.error"))}
                        />
                        <$If
                            test={$pointer("forms.edit_account.success")}
                            $then={() => $partial("components/common/alert/alert-success", $pointer("forms.edit_account.success"))}
                        />
                        {$partial("components/account/edit-account")}
                    </div>
                ),
            }}
            layout="layout/base"
        />
    </>
);
