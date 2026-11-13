import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from "node:path";
import {BigcommerceStencil} from "@mainlanddev/bigcommerce-stencil";
import {HBXBigCommerce} from "../../../@mainlanddev/_vite/HBX/bigcommerce/src/plugin.ts";


export default defineConfig({
    plugins: [
        react(),
        BigcommerceStencil({
            paths: {
                // assetsScss: "./temp_assets_external_test/scss",
                templates: "./templates"
            },
            debug: {
                // printDetectedFilesOnDisk: true
                // network: { printServerRequests: true }
                // frontmatter: true
            },
            system: {
                variantIndex: 0,
                bundleMode: "flat",
                alwaysBuildLike: "bundle",
                // Mirrors webpack.common.js `entry`; keys are the output names (assets/dist/<key>.js), matching the
                // theme-bundle.* files the templates request. Bare names are packages loaded straight from node_modules.
                jsEntry: {
                    "theme-bundle.main": "./app.js",
                    "theme-bundle.head_async": "lazysizes",
                    "theme-bundle.font": "./theme/common/font.js",
                    "theme-bundle.polyfills": "./polyfills.js",
                    "theme-bundle.polyfill_form_data": "formdata-polyfill",
                },
                channel: 1,
                stencilCliVersion: "10",
                storeSettingsLocale: {
                    default_shopper_language: "en",
                    shopper_language_selection_method: "default_shopper_language"
                },
                buildToPath: "./dist",
                buildWith: "vite",
            }
        }),
        HBXBigCommerce({
            hints: "./.hbx"
        })
    ],
    resolve: {
        // Mirrors webpack.common.js `resolve.alias`
        alias: {
            '@': path.resolve(__dirname, 'src'),

            jquery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js'),
            jstree: path.resolve(__dirname, 'node_modules/jstree/dist/jstree.min.js'),
            lazysizes: path.resolve(__dirname, 'node_modules/lazysizes/lazysizes.min.js'),
            'slick-carousel': path.resolve(__dirname, 'node_modules/slick-carousel/slick/slick.min.js'),
            'svg-injector': path.resolve(__dirname, 'node_modules/svg-injector/dist/svg-injector.min.js'),
        },
    },
    build: {
        rolldownOptions: {
            transform: {
                inject: {
                    exclude: ['**/jquery-global.js', '**/node_modules/jquery/**'],
                    $: 'jquery',
                    jQuery: 'jquery',
                    'window.jQuery': 'jquery',
                }
            }
        },
        minify: true,
        sourcemap: true,
    },
    experimental: {
        // Mirrors webpack's `__webpack_public_path__`: prefix preload/chunk URLs with the {{cdn 'assets/dist/'}} URL set in base.html
        renderBuiltUrl(filename, {hostType}) {
            if (hostType === 'js') {
                return {runtime: `window.__webpack_public_path__ + ${JSON.stringify(filename.replace(/^assets\/dist\//, ''))}`}
            }
        },
    },
    server: {
        allowedHosts: ['.trycloudflare.com']
    }
});
