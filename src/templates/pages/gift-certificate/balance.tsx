import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import {$If, $Lang, $lang, $Page, $partial, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h1 className="page-heading">
                        <$Lang keyName={$string("gift_certificate.heading")} />
                    </h1>
                    {$partial("components/gift-certificate/navigation", {gift_page: $string("balance")})}

                    <main className="account account--fixed">
                        <h3>
                            <$Lang keyName={$string("gift_certificate.balance.heading")} />
                        </h3>
                        <p>
                            <strong>
                                <$Lang keyName={$string("gift_certificate.balance.intro")} />
                            </strong>
                        </p>

                        <$If
                            test={$pointer("gift_certificate")}
                            $then={() => (
                                <$If
                                    test={$pointer("gift_certificate.error")}
                                    $then={() => <AlertAlertError $positionalHash={$pointer("gift_certificate.error")} />}
                                    $else={() => (
                                        <>
                                            <h1>{$pointer("gift_certificate.balance.formatted")}</h1>
                                            <h3>{$pointer("gift_certificate.code")}</h3>
                                        </>
                                    )}
                                />
                            )}
                        />

                        <form className="form form--oneField" id="gift-certificate-balance" method="get">
                            <input type="hidden" name="action" value="balance" />
                            <div className="form-field">
                                <label className="form-label" htmlFor="giftcertificatecode">
                                    <$Lang keyName={$string("forms.gift_certificate.balance.code")} />
                                </label>
                                <div className="form-prefixPostfix wrap">
                                    <input className="form-input" id="giftcertificatecode" name="giftcertificatecode" />{" "}
                                    <input
                                        type="submit"
                                        className="button button--primary form-prefixPostfix-button--postfix"
                                        value={$lang($string("forms.gift_certificate.balance.submit_value"))}
                                    />
                                </div>
                            </div>
                        </form>
                    </main>
                </>
            ),
        }}
        layout="layout/base"
    />
);
