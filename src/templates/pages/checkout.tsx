import {
    $getFontsCollection,
    $If,
    $langJson,
    $Lang,
    $partial,
    $pointer,
    $stylesheet,
    $StencilPartial,
    $string,
    $unescaped,
    place,
} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$StencilPartial
            name={$string("head")}
            $then={() => (
                <>
                    {$unescaped($pointer("checkout.checkout_head"))}{" "}
                    {place($unescaped($stylesheet($string("/assets/css/optimized-checkout.css"))))}{" "}
                    {$getFontsCollection()}

                    <script
                        type="text/javascript"
                        nonce={$pointer("nonce")}
                        dangerouslySetInnerHTML={{
                            __html: `
    window.language = ${$unescaped($langJson($string("optimized_checkout")))};
`,
                        }}
                    />

                    {$unescaped($pointer("head.scripts"))}
                </>
            )}
        />
        <$StencilPartial
            name={$string("page")}
            $then={() => (
                <>
                    <header className="checkoutHeader optimizedCheckout-header">
                        <div className="checkoutHeader-content">
                            <h1 className="is-srOnly">
                                <$Lang keyName={$string("checkout.title")} />
                            </h1>
                            <h2 className="checkoutHeader-heading">
                                <a className="checkoutHeader-link" href={$pointer("urls.home")}>
                                    <$If
                                        test={$pointer("checkout.header_image")}
                                        $then={() => (
                                            <img
                                                alt={$pointer("settings.store_logo.title")}
                                                className="checkoutHeader-logo"
                                                id="logoImage"
                                                src={$pointer("checkout.header_image")}
                                            />
                                        )}
                                        $else={() => (
                                            <span className="header-logo-text">{$pointer("settings.store_logo.title")}</span>
                                        )}
                                    />
                                </a>
                            </h2>
                        </div>
                    </header>

                    {$unescaped($pointer("checkout.checkout_content"))}{" "}

                    {$unescaped($pointer("footer.scripts"))}
                </>
            )}
        />
        {place($partial("layout/empty"))}
    </>
);
