import {$Lang, $Page, $pointer, $stylesheet, $string, $unescaped, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            head: () => place($unescaped($stylesheet($string("assets/css/maintenance.css")))),
            page: () => (
                <main>
                    <header>
                        <h1>
                            <$Lang keyName={$string("maintenance.down")} />
                        </h1>
                    </header>
                    <section>
                        <p>{$unescaped($pointer("settings.maintenance.message"))}</p>
                    </section>
                    <section></section>
                    <footer>
                        <small></small>
                    </footer>
                </main>
            ),
        }}
        layout="layout/empty"
    />
);
