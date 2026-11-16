import PolyfillScript from "../components/common/polyfill-script.tsx";
import Header from "../components/common/header.tsx";
import Body from "../components/common/body.tsx";
import Footer from "../components/common/footer.tsx";
import {
    $$themeSettings,
    $cdn,
    $getFontsCollection,
    $jsContext,
    $langJson,
    $lang,
    $nonce,
    $pointer,
    $raw,
    $resourceHints,
    $StencilBlock,
    $string,
    $stylesheet,
    $unescaped,
    $Inject,
} from "@mainlanddev/hbx-bigcommerce";

export default () => {
    const settings = $$themeSettings();
    return (
        <>
            {$raw("<!DOCTYPE html>")}
            <html className="no-js" lang={$pointer("locale_name")}>
                <head>
                    <title>{$pointer("head.title")}</title>
                    {$unescaped($resourceHints())}
                    {" "}
                    {$unescaped($pointer("head.meta_tags"))}
                    {" "}
                    {$unescaped($pointer("head.config"))}
                    <$StencilBlock name={$string("head")} $then={() => " "} />

                    <link href={$unescaped($pointer("head.favicon"))} rel="shortcut icon" />
                    {$raw('<meta name="viewport" content="width=device-width, initial-scale=1">')}

                    <script
                        nonce={$nonce()}
                        dangerouslySetInnerHTML={{
                            __html: `document.documentElement.className = document.documentElement.className.replace('no-js', 'js');`,
                        }}
                    />

                    <PolyfillScript />
                    <script
                        nonce={$nonce()}
                        dangerouslySetInnerHTML={{
                            __html: `window.consentManagerTranslations = \`${$unescaped($langJson($string("consent_manager")))}\`;`,
                        }}
                    />

                    <script
                        nonce={$nonce()}
                        dangerouslySetInnerHTML={{
                            __html: `window.lazySizesConfig = window.lazySizesConfig || {};
            window.lazySizesConfig.loadMode = 1;`,
                        }}
                    />
                    <script nonce={$nonce()} async src={$cdn($string("assets/dist/theme-bundle.head_async.js"), {resourceHint: $string("preload"), as: $string("script")})} />

                    {$getFontsCollection({"font-display": $string("block")})}

                    <script nonce={$nonce()} async src={$cdn($string("assets/dist/theme-bundle.font.js"), {resourceHint: $string("preload"), as: $string("script")})} />

                    {$unescaped($stylesheet($string("/assets/css/theme.css")))}
                    {" "}
                    {$unescaped($pointer("head.scripts"))}

                    <$Inject keyName={$string("zoomSize")} value={settings.zoom_size} />
                    <$Inject keyName={$string("productSize")} value={settings.product_size} />
                    <$Inject keyName={$string("genericError")} value={$lang($string("common.generic_error"))} />
                    <$Inject keyName={$string("urls")} value={$pointer("urls")} />
                    <$Inject keyName={$string("secureBaseUrl")} value={$pointer("settings.secure_base_url")} />
                    <$Inject keyName={$string("cartId")} value={$pointer("cart_id")} />
                    <$Inject keyName={$string("template")} value={$pointer("template")} />
                    <$Inject keyName={$string("validationDictionaryJSON")} value={$langJson($string("validation_messages"))} />
                    <$Inject keyName={$string("validationFallbackDictionaryJSON")} value={$langJson($string("validation_fallback_messages"))} />
                    <$Inject keyName={$string("validationDefaultDictionaryJSON")} value={$langJson($string("validation_default_messages"))} />
                    <$Inject keyName={$string("carouselArrowAndDotAriaLabel")} value={$lang($string("carousel.arrow_and_dot_aria_label"))} />
                    <$Inject keyName={$string("carouselActiveDotAriaLabel")} value={$lang($string("carousel.active_dot_aria_label"))} />
                    <$Inject keyName={$string("carouselContentAnnounceMessage")} value={$lang($string("carousel.content_announce_message"))} />
                    <$Inject keyName={$string("giftWrappingRemoveMessage")} value={$lang($string("cart.gift_wrapping.remove_confirm"))} />
                </head>
                <body>
                    <svg data-src={$cdn($string("img/icon-sprite.svg"))} className="icons-svg-sprite"></svg>

                    <Header />
                    <Body />
                    <Footer />

                    <script
                        nonce={$nonce()}
                        dangerouslySetInnerHTML={{
                            __html: `window.__webpack_public_path__ = "${$cdn($string("assets/dist/"))}";`,
                        }}
                    />
                    <script
                        nonce={$nonce()}
                        dangerouslySetInnerHTML={{
                            __html: `function onThemeBundleMain() {
                window.stencilBootstrap("${$pointer("page_type")}", ${$jsContext()}).load();

                function browserSupportsFormData() {
                    return typeof FormData !== 'undefined'
                        && !!FormData.prototype.keys;
                }
                function loadFormDataPolyfillScript(src) {
                    var formDataPolyfillScript = document.createElement('script');
                    formDataPolyfillScript.src = src;
                    formDataPolyfillScript.onerror = function () {
                        console.error('Failed to load formData polyfill script ' + src);
                    };
                    document.body.appendChild(formDataPolyfillScript);
                }

                if (!browserSupportsFormData()) {
                    loadFormDataPolyfillScript('${$cdn($string("assets/dist/theme-bundle.polyfill_form_data.js"))}');
                }
            }`,
                        }}
                    />
                    <script
                        id="theme-bundle-main"
                        nonce={$nonce()}
                        async
                        defer
                        src={$cdn($string("assets/dist/theme-bundle.main.js"), {resourceHint: $string("preload"), as: $string("script")})}
                    />
                    <script
                        nonce={$nonce()}
                        dangerouslySetInnerHTML={{
                            __html: `const scriptElement = document.getElementById('theme-bundle-main');

            if (scriptElement) {
                if (typeof window.stencilBootstrap === 'function') {
                    onThemeBundleMain();
                } else {
                    scriptElement.addEventListener('load', onThemeBundleMain, { once: true });
                }
            } else {
                console.error('Could not find script element with id "theme-bundle-main"');
            }`,
                        }}
                    />

                    {$unescaped($pointer("footer.scripts"))}
                </body>
            </html>
        </>
    );
};
