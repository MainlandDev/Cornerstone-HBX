import {$parseHandlebarsDangerously, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import type {ExtendedThemeContext} from '@/context';
import {$layout, $theme} from '@mainlanddev/bigcommerce-react/theme';
import {$StencilBlock} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $layout({
    content: () => {
        const ctx = $theme<ExtendedThemeContext>();

        return (
            <html lang={ctx.locale_name}>
                <head>
                    {/* React hoists <title>/<meta> and cannot render a token as title text: raw escape hatch (DEVIATIONS: hoisting) */}
                    {$parseHandlebarsDangerously('<title>{{ head.title }}</title>')}
                    {$unescaped(ctx.head.meta_tags)}
                    {$unescaped(ctx.head.config)}

                    <link href={ctx.head.favicon} rel="shortcut icon"/>
                    <$StencilBlock name={$string('head')}/>
                </head>
                <body>
                    <$StencilBlock name={$string('page')}/>
                </body>
            </html>
        );
    },
});
