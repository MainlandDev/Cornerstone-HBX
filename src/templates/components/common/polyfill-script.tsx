/**
 * Source: templates/components/common/polyfill-script.html (33 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$string} from '@mainlanddev/bigcommerce-react';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$cdn, $nonce} from '@mainlanddev/bigcommerce-react/bigcommerce';

export default $asPartial(() => (
    /* html L1: <script nonce="{{nonce}}"> */
    <script nonce={$nonce()}>
        {/* Check for modern browser features, and load polyfills if browser does not appear to support features we need. */}
        {/* html L2-31:
           {{!--
               Check for modern browser features, and load polyfills if browser does not appear to support features
               we need.
           
                   Polyfill approach is all or nothing - please import needed polyfills in /assets/js/polyfills.js
           
               Inspired by https://philipwalton.com/articles/loading-polyfills-only-when-needed/
                   --}}
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
               loadScript('{{cdn 'assets/dist/theme-bundle.polyfills.js'}}');
           }
        */}
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
