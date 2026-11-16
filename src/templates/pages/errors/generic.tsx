import {$Lang, $Page, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
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
            ),
        }}
        layout="layout/base"
    />
);
