import {$Lang, $StencilPartial, $string, place, $partial} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$StencilPartial
            name={$string("page")}
            $then={() => (
                <main className="page">
                    <section className="page-content page-content--centered">
                        <h1 className="page-heading">
                            <$Lang keyName={$string("server_error.page_heading")} />
                        </h1>
                        <p className="u-textAlignCenter">
                            <$Lang keyName={$string("server_error.message")} />
                        </p>
                    </section>
                </main>
            )}
        />
        {place($partial("layout/base"))}
    </>
);
