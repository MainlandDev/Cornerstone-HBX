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
                                <$Lang keyName={$string("forbidden.page_heading")} />
                            </h1>
                            <p className="u-textAlignCenter">
                                <$Lang keyName={$string("forbidden.if_you_were_signed_in")} />{" "}
                                <a href={$pointer("urls.auth.login")}>
                                    <$Lang keyName={$string("forbidden.sign_in")} />
                                </a>{" "}
                                <$Lang keyName={$string("forbidden.to_continue")} />
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
