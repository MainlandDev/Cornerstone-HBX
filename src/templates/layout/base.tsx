/**
 * Source: templates/layout/base.html (101 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
            /* html L2: <html class="no-js" lang="{{ locale_name }}"> */
            <html className="no-js" lang={ctx.locale_name}>
                {/* html L3: <head> */}
                <head>
                    {/* React hoists <title>/<meta> and cannot render a token as title text: raw escape hatch (DEVIATIONS: hoisting) */}
                    {/* html L4: <title>{{ head.title }}</title> */}
                    {$parseHandlebarsDangerously('<title>{{ head.title }}</title>')}
                    {/* html L5: {{{ resourceHints }}} */}
                    {$_resourceHints()}
                    {/* html L6: {{{ head.meta_tags }}} */}
                    {$unescaped(ctx.head.meta_tags)}
                    {/* html L7: {{{ head.config }}} */}
                    {$unescaped(ctx.head.config)}
                    {/* html L8: {{#block "head"}} {{/block}} */}
                    <$StencilBlock name={$string('head')} $then={() => ' '}/>

                    {/* html L10: <link href="{{{ head.favicon }}}" rel="shortcut icon"> */}
                    <link href={$unescaped(ctx.head.favicon)} rel="shortcut icon"/>
                    {$parseHandlebarsDangerously('<meta name="viewport" content="width=device-width, initial-scale=1">')}

                    {/* html L13: <script nonce="{{nonce}}"> */}
                    <script nonce={nonce}>
                        {/* Change document class from no-js to js so we can detect this in css */}
                        {/* html L14-15:
                           {{!-- Change document class from no-js to js so we can detect this in css --}}
                           document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
                        */}
                        {$$raw("document.documentElement.className = document.documentElement.className.replace('no-js', 'js');")}
                    </script>

                    {/* html L18: {{> components/common/polyfill-script }} */}
                    <$Partial name="components/common/polyfill-script"/>
                    {/* html L19: <script nonce="{{nonce}}">window.consentManagerTranslations = `{{{langJson 'consent_manager'}}}`;</script> */}
                    <script nonce={nonce}>
                        {/* html L19: window.consentManagerTranslations = `{{{langJson 'consent_manager'}}}`; */}
                        {[
                            $$raw('window.consentManagerTranslations = `'),
                            $_langJson($string('consent_manager')),
                            $$raw('`;'),
                        ]}
                    </script>

                    {/* Load Lazysizes script ASAP so images will appear */}
                    {/* html L21: {{!-- Load Lazysizes script ASAP so images will appear --}}
                                              html L22: <script nonce="{{nonce}}">
                    */}
                    <script nonce={nonce}>
                        {/* Only load visible elements until the onload event fires, after which preload nearby elements. */}
                        {/* html L23-25:
                           {{!-- Only load visible elements until the onload event fires, after which preload nearby elements. --}}
                           window.lazySizesConfig = window.lazySizesConfig || {};
                           window.lazySizesConfig.loadMode = 1;
                        */}
                        {$$raw('window.lazySizesConfig = window.lazySizesConfig || {}; window.lazySizesConfig.loadMode = 1;')}
                    </script>
                    {/* html L27: <script nonce="{{nonce}}" async src="{{cdn 'assets/dist/theme-bundle.head_async.js' resourceHint='preload' as='script'}}"></script> */}
                    <script
                        nonce={nonce}
                        async
                        src={$cdn($string('assets/dist/theme-bundle.head_async.js'), {
                            resourceHint: $string('preload'),
                            as: $string('script'),
                        })}
                    ></script>

                    {/* html L29: {{getFontsCollection font-display='block'}} */}
                    {$getFontsCollection({"font-display": $string("block")})}

                    {/* html L31: <script nonce="{{nonce}}" async src="{{cdn 'assets/dist/theme-bundle.font.js' resourceHint='preload' as='script'}}"></script> */}
                    <script
                        nonce={nonce}
                        async
                        src={$cdn($string('assets/dist/theme-bundle.font.js'), {
                            resourceHint: $string('preload'),
                            as: $string('script'),
                        })}
                    ></script>

                    {/* html L33: {{{stylesheet '/assets/css/theme.css'}}} */}
                    {$_stylesheet($string('/assets/css/theme.css'))}

                    {/* html L35: {{{head.scripts}}} */}
                    {$unescaped(ctx.head.scripts)}

                    {/* html L37: {{~inject 'zoomSize' theme_settings.zoom_size}} */}
                    {$inject($string('zoomSize'), ctx.theme_settings.zoom_size)}
                    {/* html L38: {{~inject 'productSize' theme_settings.product_size}} */}
                    {$inject($string('productSize'), ctx.theme_settings.product_size)}
                    {/* html L39: {{~inject 'genericError' (lang 'common.generic_error')}} */}
                    {$inject($string('genericError'), $lang($string('common.generic_error')))}
                    {/* html L40: {{~inject 'urls' urls}} */}
                    {$inject($string('urls'), ctx.urls)}
                    {/* html L41: {{~inject 'secureBaseUrl' settings.secure_base_url}} */}
                    {$inject($string('secureBaseUrl'), ctx.settings.secure_base_url)}
                    {/* html L42: {{~inject 'cartId' cart_id}} */}
                    {$inject($string('cartId'), ctx.cart_id)}
                    {/* html L43: {{~inject 'template' template}} */}
                    {$inject($string('template'), ctx.template)}
                    {/* html L44: {{~inject 'validationDictionaryJSON' (langJson 'validation_messages')}} */}
                    {$inject($string('validationDictionaryJSON'), $langJson($string('validation_messages')))}
                    {/* html L45: {{~inject 'validationFallbackDictionaryJSON' (langJson 'validation_fallback_messages')}} */}
                    {$inject($string('validationFallbackDictionaryJSON'), $langJson($string('validation_fallback_messages')))}
                    {/* html L46: {{~inject 'validationDefaultDictionaryJSON' (langJson 'validation_default_messages')}} */}
                    {$inject($string('validationDefaultDictionaryJSON'), $langJson($string('validation_default_messages')))}
                    {/* html L47: {{~inject 'carouselArrowAndDotAriaLabel' (lang 'carousel.arrow_and_dot_aria_label')}} */}
                    {$inject($string('carouselArrowAndDotAriaLabel'), $lang($string('carousel.arrow_and_dot_aria_label')))}
                    {/* html L48: {{~inject 'carouselActiveDotAriaLabel' (lang 'carousel.active_dot_aria_label')}} */}
                    {$inject($string('carouselActiveDotAriaLabel'), $lang($string('carousel.active_dot_aria_label')))}
                    {/* html L49: {{~inject 'carouselContentAnnounceMessage' (lang 'carousel.content_announce_message')}} */}
                    {$inject($string('carouselContentAnnounceMessage'), $lang($string('carousel.content_announce_message')))}
                    {/* html L50: {{~inject 'giftWrappingRemoveMessage' (lang 'cart.gift_wrapping.remove_confirm')}} */}
                    {$inject($string('giftWrappingRemoveMessage'), $lang($string('cart.gift_wrapping.remove_confirm')))}
                </head>
                {/* html L52: <body> */}
                <body>
                    {/* html L53: <svg data-src="{{cdn 'img/icon-sprite.svg'}}" class="icons-svg-sprite"></svg> */}
                    <svg data-src={$cdn($string('img/icon-sprite.svg'))} className="icons-svg-sprite"></svg>

                    {/* html L55: {{> components/common/header }} */}
                    <$Partial name="components/common/header"/>
                    {/* html L56: {{> components/common/body }} */}
                    <$Partial name="components/common/body"/>
                    {/* html L57: {{> components/common/footer }} */}
                    <$Partial name="components/common/footer"/>

                    {/* html L59: <script nonce="{{nonce}}">window.__webpack_public_path__ = "{{cdn 'assets/dist/'}}";</script> */}
                    <script nonce={nonce}>
                        {/* html L59: window.__webpack_public_path__ = "{{cdn 'assets/dist/'}}"; */}
                        {[
                            $$raw('window.__webpack_public_path__ = "'),
                            $cdn($string('assets/dist/')),
                            $$raw('";'),
                        ]}
                    </script>
                    {/* html L60: <script nonce="{{nonce}}"> */}
                    <script nonce={nonce}>
                        {/* Exported in app.js */}
                        {/* html L61-81:
                           {{!-- Exported in app.js --}}
                           function onThemeBundleMain() {
                               window.stencilBootstrap("{{page_type}}", {{jsContext}}).load();
                           
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
                                   loadFormDataPolyfillScript('{{cdn 'assets/dist/theme-bundle.polyfill_form_data.js'}}');
                               }
                           }
                        */}
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
                    {/* html L83: <script id="theme-bundle-main" nonce="{{nonce}}" async defer src="{{cdn 'assets/dist/theme-bundle.main.js' resourceHint='preload' as='script'}}"></script> */}
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
                    {/* html L84: <script nonce="{{nonce}}"> */}
                    <script nonce={nonce}>
                        {/* html L85-95:
                           const scriptElement = document.getElementById('theme-bundle-main');
                           
                           if (scriptElement) {
                               if (typeof window.stencilBootstrap === 'function') {
                                   onThemeBundleMain();
                               } else {
                                   scriptElement.addEventListener('load', onThemeBundleMain, { once: true });
                               }
                           } else {
                               console.error('Could not find script element with id "theme-bundle-main"');
                           }
                        */}
                        {$$raw(
                            "const scriptElement = document.getElementById('theme-bundle-main'); " +
                            'if (scriptElement) { ' +
                            "if (typeof window.stencilBootstrap === 'function') { onThemeBundleMain(); } " +
                            "else { scriptElement.addEventListener('load', onThemeBundleMain, { once: true }); } " +
                            '} else { console.error(\'Could not find script element with id "theme-bundle-main"\'); }',
                        )}
                    </script>

                    {/* html L98: {{{footer.scripts}}} */}
                    {$unescaped(ctx.footer.scripts)}
                </body>
            </html>
        );
    },
});
