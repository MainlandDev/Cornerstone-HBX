import AccountNavigation from "../../components/account/navigation.tsx";
import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import {$dynamicComponent, $Each, $If, $Inject, $Lang, $lang, $Page, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <$If
                        test={$pointer("forms.address.address_id")}
                        $then={() => (
                            <h2 className="page-heading">
                                <$Lang keyName={$string("forms.address.edit.heading")} />
                            </h2>
                        )}
                        $else={() => (
                            <h2 className="page-heading">
                                <$Lang keyName={$string("forms.address.add.heading")} />
                            </h2>
                        )}
                    />
                    <AccountNavigation account_page={$string("addresses")} />

                    <div className="account account--fixed">
                        <$If
                            test={$pointer("forms.address.error")}
                            $then={() => <AlertAlertError $positionalHash={$pointer("forms.address.error")} />}
                        />

                        <div className="account-body">
                            <section className="account-content">
                                <form action={$pointer("forms.address.action")} data-address-form={""} className="form" method="post">
                                    <$If
                                        test={$pointer("forms.address.address_id")}
                                        $then={() => (
                                            <input type="hidden" name="shipid" value={$pointer("forms.address.address_id")} />
                                        )}
                                    />
                                    <fieldset className="form-fieldset">
                                        <div className="form-row form-row--half">
                                            <$Each
                                                list={$pointer<unknown[]>("forms.address.shipping_fields")}
                                                $then={() => $unescaped($dynamicComponent($string("components/common/forms")))}
                                            />
                                        </div>
                                    </fieldset>
                                    <div className="form-actions">
                                        <input type="submit" className="button button--primary" value={$lang($string("forms.address.submit_value"))} />
                                        <a href={$pointer("urls.account.addresses")} className="button">
                                            <$Lang keyName={$string("common.cancel")} />
                                        </a>
                                        <$Inject keyName={$string("required")} value={$lang($string("common.required"))} />{" "}
                                        <$Inject keyName={$string("state_error")} value={$lang($string("errors.state_error"))} />
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </>
            ),
        }}
        layout="layout/base"
    />
);
