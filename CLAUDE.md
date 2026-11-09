# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

HBX fork of BigCommerce's **Cornerstone** Stencil theme (branch `hbx-conversion`, upstream `master`). It is mid-migration: the legacy theme (Handlebars `.html` in `templates/`, JS in `assets/js/`, SCSS in `assets/scss/`, webpack build) still works, and a new Vite + TypeScript + React-JSX toolchain was added alongside it. Node 24 / npm 11 (see `.nvmrc`, README) — `package-lock.json` must only change for the package being updated.

## Commands

```bash
npm run vite-dev          # Vite dev server (:5173); allowed host *.trycloudflare.com
npm run cloudflared-tunnel # expose :5173 via cloudflared
npm run vite-build        # tsc -b && vite build  -> ./dist
npm run prepare-sass-runtime  # rebuild @bigcommerce/node-sass (run if sass fails)

npm run webpack-build     # legacy prod build -> assets/dist (webpack.prod.js)
npm run webpack-buildDev  # legacy dev build

npm test                  # jest (jsdom, jasmine2)
npx jest assets/js/test-unit/theme/cart.spec.js   # single test file
npx jest -t "name"        # single test by name
npx grunt check           # eslint + jest + stylelint (grunt/aliases.yml)
npx grunt eslint          # JS lint only (airbnb, .eslintrc)
npm run stylelint         # SCSS lint (stylelint:fix to autofix)
npx grunt svgstore        # rebuild icon sprite from assets/icons (also default `grunt`)
```

CI (`.github/workflows/pull_request_review.yml`) only does a Stencil theme bundling test on Node 24.

## Architecture

**Two parallel build pipelines produce the same output names** (`theme-bundle.*.js`) so templates don't care which one built them:
- `webpack.common.js` — entries `main`, `head_async`, `font`, `polyfills`, `polyfill_form_data` -> `assets/dist/`.
- `vite.config.ts` — `jsEntry` mirrors those webpack entries, and `resolve.alias` / `renderBuiltUrl` mirror webpack's aliases and `__webpack_public_path__` (set from `{{cdn 'assets/dist/'}}` in `templates/layout/base.html`). **When changing entries or aliases in one config, update the other.** Vite also injects `$`/`jQuery`/`window.jQuery` globals for legacy code. Note `jsEntry` paths like `./app.js` are resolved by the Stencil plugin (legacy `assets/js/`), not `src/`.

**Vite plugins** (from `@mainlanddev/*`):
- `BigcommerceStencil` — runs/builds the Stencil theme (`templates: ./templates`, flat bundle mode, `buildToPath: ./dist`, `variantIndex: 3`, channel 1). `dist/` and `config.stencil.json`/`secrets.stencil.json` are gitignored — never commit secrets.
- `BigcommerceReact` — compiles JSX in `src/templates/{components,layout,pages}` into Handlebars v4 templates (`jsxImportSource: @mainlanddev/bigcommerce-react`). These directories are currently empty; `src/main.ts`, `src/js`, `src/islands` are scaffolding. Alias `@` -> `src`.

**Legacy JS runtime** (`assets/js/`): `app.js` maps the page-type string from the template context (e.g. `account_orderstatus`, `product`, `cart`) to a lazy `import('./theme/<page>')`; each page module extends `PageManager` (`theme/page-manager.js`). `theme/global.js` runs on every page. Template data reaches JS through the `{{inject}}` / `{{jsContext}}` helpers (`this.context`). Polyfills load conditionally via feature detection in `templates/components/common/polyfill-script.html`.

**Theme metadata**: `config.json` (settings/variations, `handlebars_v4`), `schema*.json`, `lang/` (translations), `meta/`, `schema.graphql` (storefront GraphQL, `.graphqlrc`).

**Tests** live in `assets/js/test-unit/` (mirrors `assets/js/theme/`), `*.spec.js`; jest config maps `jstree`, `lazysizes`, `slick-carousel`, `svg-injector` to dist files. TS/JSX under `src/` is not covered by jest (babel-jest on `.js` only).

## Gotchas

- `tsconfig.app.json` is strict about `noUnusedLocals`/`noUnusedParameters`, `verbatimModuleSyntax`, `erasableSyntaxOnly` (no enums/namespaces/param properties).
- `"type": "module"` in package.json: root config files using `require` need `.cjs` (see `stencil.conf.cjs`); `jest.config.js` and `webpack.*.js` still use CommonJS, so check they load before touching them.
- Upstream Cornerstone conventions apply: Conventional Commits with ticket ids (e.g. `feat(storefront): TRAC-1023 ...`), CHANGELOG.md entry for user-visible changes.
