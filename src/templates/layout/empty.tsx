/**
 * Source: templates/layout/empty.html (15 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$parseHandlebarsDangerously, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import type {ExtendedThemeContext} from '@/context';
import {$layout, $theme} from '@mainlanddev/bigcommerce-react/theme';
import {$StencilBlock} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $layout({
    content: () => {
        const ctx = $theme<ExtendedThemeContext>();

        return (
            /* html L2: <html lang="{{ locale_name }}"> */
            <html lang={ctx.locale_name}>
                {/* html L3: <head> */}
                <head>
                    {/* React hoists <title>/<meta> and cannot render a token as title text: raw escape hatch (DEVIATIONS: hoisting) */}
                    {/* html L4: <title>{{ head.title }}</title> */}
                    {$parseHandlebarsDangerously('<title>{{ head.title }}</title>')}
                    {/* html L5: {{{ head.meta_tags }}} */}
                    {$unescaped(ctx.head.meta_tags)}
                    {/* html L6: {{{ head.config }}} */}
                    {$unescaped(ctx.head.config)}

                    {/* html L8: <link href="{{ head.favicon }}" rel="shortcut icon"> */}
                    <link href={ctx.head.favicon} rel="shortcut icon"/>
                    {/* html L9: {{#block "head"}}{{/block}} */}
                    <$StencilBlock name={$string('head')}/>
                </head>
                {/* html L11: <body> */}
                <body>
                    {/* html L12: {{#block "page"}}{{/block}} */}
                    <$StencilBlock name={$string('page')}/>
                </body>
            </html>
        );
    },
});
