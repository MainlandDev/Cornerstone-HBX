import {$lang, $Lang, $partial, $StencilPartial, $string, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$StencilPartial
            name={$string("page")}
            $then={() => (
                <section className="page">
                    <div className="page-content page-content--centered">
                        <h1 className="page-heading">
                            <$Lang keyName={$string("unavailable.hibernation_title")} />
                        </h1>
                        {place($partial("components/common/alert/alert-error", $lang($string("unavailable.hibernation_message"))))}
                    </div>
                </section>
            )}
        />
        {place($partial("layout/base"))}
    </>
);
