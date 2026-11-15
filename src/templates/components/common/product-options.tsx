import {$Lang, $pointer, $raw, $sanitize, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        {$raw("{{#if value '==' 'Yes'}}")}
        <$Lang keyName={$string("common.yes")} />
        {" "}
        {$raw("{{else if value '==' 'No'}}")}
        {" "}
        <$Lang keyName={$string("common.no")} />
        {$raw("{{else}}")}
        {$unescaped($sanitize($pointer("value")))}
        {$raw("{{/if}}")}
    </>
);
