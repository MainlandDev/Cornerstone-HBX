import {$Partial, $parseHandlebarsDangerously, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import type {ExtendedThemeContext} from '@/context';
import {$layout, $theme} from '@mainlanddev/bigcommerce-react/theme';
import {$StencilBlock} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {
    $cdn,
    $getFontsCollection,
    $inject,
    $jsContext,
    $lang,
    $langJson,
    $_langJson,
    $nonce,
    $_resourceHints,
    $_stylesheet,
} from '@mainlanddev/bigcommerce-react/bigcommerce';

export default $layout({
    content: () => {
        const ctx = $theme<ExtendedThemeContext>();
        const nonce = $nonce();

        return (
            <html className="no-js" lang={ctx.locale_name}>
                <head>
                    {/* React hoists <title>/<meta> and cannot render a token as title text: raw escape hatch (DEVIATIONS: hoisting) */}
                    {$parseHandlebarsDangerously('<title>{{ head.title }}</title>')}
                    {$_resourceHints()}
                    {$unescaped(ctx.head.meta_tags)}
                    {$unescaped(ctx.head.config)}
                    <$StencilBlock name={$string('head')} $then={() => ' '}/>

                    <link href={$unescaped(ctx.head.favicon)} rel="shortcut icon"/>
                    {$parseHandlebarsDangerously('<meta name="viewport" content="width=device-width, initial-scale=1">')}

                    <script nonce={nonce}>
                        {/* Change document class from no-js to js so we can detect this in css */}
                        {$$raw("document.documentElement.className = document.documentElement.className.replace('no-js', 'js');")}
                    </script>

                    <$Partial name="components/common/polyfill-script"/>
                    <script nonce={nonce}>
                        {[
                            $$raw('window.consentManagerTranslations = `'),
                            $_langJson($string('consent_manager')),
                            $$raw('`;'),
                        ]}
                    </script>

                    {/* Load Lazysizes script ASAP so images will appear */}
                    <script nonce={nonce}>
                        {/* Only load visible elements until the onload event fires, after which preload nearby elements. */}
                        {$$raw('window.lazySizesConfig = window.lazySizesConfig || {}; window.lazySizesConfig.loadMode = 1;')}
                    </script>
                    <script
                        nonce={nonce}
                        async
                        src={$cdn($string('assets/dist/theme-bundle.head_async.js'), {
                            resourceHint: $string('preload'),
                            as: $string('script'),
                        })}
                    ></script>

                    {$getFontsCollection({"font-display": $string("block")})}

                    <script
                        nonce={nonce}
                        async
                        src={$cdn($string('assets/dist/theme-bundle.font.js'), {
                            resourceHint: $string('preload'),
                            as: $string('script'),
                        })}
                    ></script>

                    {$_stylesheet($string('/assets/css/theme.css'))}

                    {$unescaped(ctx.head.scripts)}

                    {$inject($string('zoomSize'), ctx.theme_settings.zoom_size)}
                    {$inject($string('productSize'), ctx.theme_settings.product_size)}
                    {$inject($string('genericError'), $lang($string('common.generic_error')))}
                    {$inject($string('urls'), ctx.urls)}
                    {$inject($string('secureBaseUrl'), ctx.settings.secure_base_url)}
                    {$inject($string('cartId'), ctx.cart_id)}
                    {$inject($string('template'), ctx.template)}
                    {$inject($string('validationDictionaryJSON'), $langJson($string('validation_messages')))}
                    {$inject($string('validationFallbackDictionaryJSON'), $langJson($string('validation_fallback_messages')))}
                    {$inject($string('validationDefaultDictionaryJSON'), $langJson($string('validation_default_messages')))}
                    {$inject($string('carouselArrowAndDotAriaLabel'), $lang($string('carousel.arrow_and_dot_aria_label')))}
                    {$inject($string('carouselActiveDotAriaLabel'), $lang($string('carousel.active_dot_aria_label')))}
                    {$inject($string('carouselContentAnnounceMessage'), $lang($string('carousel.content_announce_message')))}
                    {$inject($string('giftWrappingRemoveMessage'), $lang($string('cart.gift_wrapping.remove_confirm')))}
                </head>
                <body>
                    <svg data-src={$cdn($string('img/icon-sprite.svg'))} className="icons-svg-sprite"></svg>

                    <$Partial name="components/common/header"/>
                    <$Partial name="components/common/body"/>
                    <$Partial name="components/common/footer"/>

                    <script nonce={nonce}>
                        {[
                            $$raw('window.__webpack_public_path__ = "'),
                            $cdn($string('assets/dist/')),
                            $$raw('";'),
                        ]}
                    </script>
                    <script nonce={nonce}>
                        {/* Exported in app.js */}
                        {[
                            $$raw('function onThemeBundleMain() { window.stencilBootstrap("'),
                            ctx.page_type,
                            $$raw('", '),
                            $jsContext(),
                            $$raw(
                                ').load(); ' +
                                'function browserSupportsFormData() { return typeof FormData !== \'undefined\' && !!FormData.prototype.keys; } ' +
                                'function loadFormDataPolyfillScript(src) { ' +
                                'var formDataPolyfillScript = document.createElement(\'script\'); ' +
                                'formDataPolyfillScript.src = src; ' +
                                'formDataPolyfillScript.onerror = function () { console.error(\'Failed to load formData polyfill script \' + src); }; ' +
                                'document.body.appendChild(formDataPolyfillScript); } ' +
                                'if (!browserSupportsFormData()) { loadFormDataPolyfillScript(\'',
                            ),
                            $cdn($string('assets/dist/theme-bundle.polyfill_form_data.js')),
                            $$raw('\'); } }'),
                        ]}
                    </script>
                    <script
                        id="theme-bundle-main"
                        nonce={nonce}
                        async
                        defer
                        src={$cdn($string('assets/dist/theme-bundle.main.js'), {
                            resourceHint: $string('preload'),
                            as: $string('script'),
                        })}
                    ></script>
                    <script nonce={nonce}>
                        {$$raw(
                            "const scriptElement = document.getElementById('theme-bundle-main'); " +
                            'if (scriptElement) { ' +
                            "if (typeof window.stencilBootstrap === 'function') { onThemeBundleMain(); } " +
                            "else { scriptElement.addEventListener('load', onThemeBundleMain, { once: true }); } " +
                            '} else { console.error(\'Could not find script element with id "theme-bundle-main"\'); }',
                        )}
                    </script>

                    {$unescaped(ctx.footer.scripts)}
                </body>
            </html>
        );
    },
});
