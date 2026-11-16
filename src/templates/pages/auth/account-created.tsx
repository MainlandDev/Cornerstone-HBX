import {$lang, $Lang, $Page, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <main className="page">
                    <section className="page-content page-content--textCenter">
                        <h1 className="page-heading">
                            <$Lang keyName={$string("create_account.created.heading")} />
                        </h1>
                        <p>
                            {$lang($string("create_account.created.intro"), {
                                store_name: $pointer("settings.store_name"),
                                email: $pointer("customer.email"),
                            })}
                        </p>
                        <a className="button button--primary" href={$pointer("create_account.continue_url")}>
                            <$Lang keyName={$string("create_account.created.continue")} />
                        </a>
                    </section>
                </main>
            ),
        }}
        layout="layout/base"
    />
);
