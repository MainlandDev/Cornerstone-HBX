import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import {$lang, $Lang, $Page, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <section className="page">
                    <div className="page-content page-content--centered">
                        <h1 className="page-heading">
                            <$Lang keyName={$string("unavailable.hibernation_title")} />
                        </h1>
                        <AlertAlertError $positionalHash={$lang($string("unavailable.hibernation_message"))} />
                    </div>
                </section>
            ),
        }}
        layout="layout/base"
    />
);
