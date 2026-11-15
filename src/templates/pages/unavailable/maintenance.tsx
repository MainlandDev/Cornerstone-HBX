import {$Lang, $partial, $pointer, $stylesheet, $StencilPartial, $string, $unescaped, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$StencilPartial
            name={$string("head")}
            $then={() => place($unescaped($stylesheet($string("assets/css/maintenance.css"))))}
        />
        <$StencilPartial
            name={$string("page")}
            $then={() => (
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
            )}
        />
        {place($partial("layout/empty"))}
    </>
);
