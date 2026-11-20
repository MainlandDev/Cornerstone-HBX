import {$If, $pointer, $raw} from "@mainlanddev/hbx-bigcommerce";

type ContextPath = Parameters<typeof $pointer>[0];

/**
 * Prints `name="{{path}}"` only when `path` is truthy: `{{#if path}}name="{{path}}"{{/if}}`.
 * For inline attribute carriers, where an element prop cannot be conditional.
 * `before` / `after` keep the whitespace the original template had around the attribute.
 */
export const $ifAttribute = (name: string, path: ContextPath, before = "", after = ""): string =>
    $If({test: $pointer(path), $then: () => `${$raw(`${before}${name}="`)}${$pointer(path)}${$raw(`"${after}`)}`});
