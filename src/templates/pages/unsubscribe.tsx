import {$lang, $partial, $pointer, $Lang, $StencilPartial, $string, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$StencilPartial
            name={$string("page")}
            $then={() => (
                <section className="page">
                    <div className="page-content page-content--centered">
                        <h1 className="page-heading">
                            <$Lang keyName={$string("newsletter.unsubscribed_heading")} />
                        </h1>
                        {place(
                            $partial(
                                "components/common/alert/alert-success",
                                $lang($string("newsletter.unsubscribed_message"), {store_name: $pointer<string>("settings.store_name")}),
                            ),
                        )}
                    </div>
                </section>
            )}
        />
        {place($partial("layout/base"))}
    </>
);
