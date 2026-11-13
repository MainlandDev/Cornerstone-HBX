// Dev-server stand-in for webpack's ProvidePlugin + expose-loader: modules reference bare `$`/`jQuery`,
// and vite's `inject` only runs in builds. Must be imported before any module that uses them.
import jquery from 'jquery';

window.$ = jquery;
window.jQuery = jquery;
