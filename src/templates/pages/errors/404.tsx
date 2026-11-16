import {$Lang, $Page, $partial, $pointer, $string, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}

                    <main className="page">
                        <section className="page-content page-content--centered">
                            <h1 className="page-heading">
                                <$Lang keyName={$string("page_not_found.page_heading")} />
                            </h1>
                            <p className="u-textAlignCenter">
                                <$Lang keyName={$string("page_not_found.message")} />
                            </p>

                            {place($partial("components/common/search-box"))}
                        </section>
                    </main>
                </>
            ),
        }}
        layout="layout/base"
    />
);
