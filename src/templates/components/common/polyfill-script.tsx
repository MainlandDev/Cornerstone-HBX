import {$string} from '@mainlanddev/bigcommerce-react';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$cdn, $nonce} from '@mainlanddev/bigcommerce-react/bigcommerce';

export default $asPartial(() => (
    <script nonce={$nonce()}>
        {/* Check for modern browser features, and load polyfills if browser does not appear to support features we need. */}
        {$$raw(
            'function browserSupportsAllFeatures() { ' +
                'return window.Promise ' +
                '&& window.fetch ' +
                '&& window.URL ' +
                '&& window.URLSearchParams ' +
                '&& window.WeakMap ' +
                '// object-fit support\n' +
                "&& ('objectFit' in document.documentElement.style); } " +
                'function loadScript(src) { ' +
                "var js = document.createElement('script'); " +
                'js.src = src; ' +
                'js.onerror = function () { ' +
                "console.error('Failed to load polyfill script ' + src); " +
                '}; ' +
                'document.head.appendChild(js); } ' +
                'if (!browserSupportsAllFeatures()) { loadScript(\'',
        )}
        {$cdn($string('assets/dist/theme-bundle.polyfills.js'))}
        {$$raw("'); }")}
    </script>
));
