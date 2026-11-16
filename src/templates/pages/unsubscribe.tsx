import AlertAlertSuccess from "../components/common/alert/alert-success.tsx";
import {$lang, $Page, $pointer, $Lang, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <section className="page">
                    <div className="page-content page-content--centered">
                        <h1 className="page-heading">
                            <$Lang keyName={$string("newsletter.unsubscribed_heading")} />
                        </h1>
                        <AlertAlertSuccess $positionalHash={$lang($string("newsletter.unsubscribed_message"), {store_name: $pointer<string>("settings.store_name")})} />
                    </div>
                </section>
            ),
        }}
        layout="layout/base"
    />
);
