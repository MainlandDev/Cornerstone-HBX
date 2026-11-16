import {$pointer, $raw, $StencilBlock, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        {$raw("<!DOCTYPE html>")}
        <html lang={$pointer("locale_name")}>
            <head>
                <title>{$pointer("head.title")}</title>
                {$unescaped($pointer("head.meta_tags"))}
                {" "}
                {$unescaped($pointer("head.config"))}

                <link href={$pointer("head.favicon")} rel="shortcut icon" />
                <$StencilBlock name={$string("head")} />
            </head>
            <body>
                <$StencilBlock name={$string("page")} />
            </body>
        </html>
    </>
);
