import {$pointer, $raw} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        {$raw("{{#if label_value '===' ''}}")}
        {$pointer("fallback")}
        {$raw("{{else}}")}
        {$pointer("label_value")}
        {$raw("{{/if}}")}
    </>
);
