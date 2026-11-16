"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$cdn, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

/** Kept as raw Handlebars: a `{{` inside `dangerouslySetInnerHTML` would be escaped, so the comment is printed through `$raw`. */
const comment = `{{!--
        Check for modern browser features, and load polyfills if browser does not appear to support features
        we need.

            Polyfill approach is all or nothing - please import needed polyfills in /assets/js/polyfills.js

        Inspired by https://philipwalton.com/articles/loading-polyfills-only-when-needed/
            --}}`;

export default (_props: PartialProps) => (
    <script
        nonce={$pointer("nonce")}
        dangerouslySetInnerHTML={{
            __html: `
    ${$raw(comment)}
    function browserSupportsAllFeatures() {
        return window.Promise
            && window.fetch
            && window.URL
            && window.URLSearchParams
            && window.WeakMap
            // object-fit support
            && ('objectFit' in document.documentElement.style);
    }

    function loadScript(src) {
        var js = document.createElement('script');
        js.src = src;
        js.onerror = function () {
            console.error('Failed to load polyfill script ' + src);
        };
        document.head.appendChild(js);
    }

    if (!browserSupportsAllFeatures()) {
        loadScript('${$cdn($string("assets/dist/theme-bundle.polyfills.js"))}');
    }
`,
        }}
    />
);
