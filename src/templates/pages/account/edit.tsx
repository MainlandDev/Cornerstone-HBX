import AccountNavigation from "../../components/account/navigation.tsx";
import AccountEditAccount from "../../components/account/edit-account.tsx";
import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import AlertAlertSuccess from "../../components/common/alert/alert-success.tsx";
import {$If, $Inject, $Lang, $Page, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$Inject keyName={$string("passwordRequirements")} value={$pointer("settings.password_requirements")} />
        <$Page
            blocks={{
                page: () => (
                    <div className="account account--fixed">
                        <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                        <h2 className="page-heading">
                            <$Lang keyName={$string("account.settings.heading")} />
                        </h2>
                        <AccountNavigation account_page={$string("settings")} />
                        <$If
                            test={$pointer("forms.edit_account.error")}
                            $then={() => <AlertAlertError $positionalHash={$pointer("forms.edit_account.error")} />}
                        />
                        <$If
                            test={$pointer("forms.edit_account.success")}
                            $then={() => <AlertAlertSuccess $positionalHash={$pointer("forms.edit_account.success")} />}
                        />
                        <AccountEditAccount />
                    </div>
                ),
            }}
            layout="layout/base"
        />
    </>
);
