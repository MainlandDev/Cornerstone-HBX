/**
 * Source: templates/components/common/breadcrumbs.html (37 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $Unless, $each, $if, $number, $unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageCart} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$add, $_jsonStringify, $nonce} from '@mainlanddev/bigcommerce-react/bigcommerce';

type Hint = ThemeContextHint<ThemePageCart>;

export default $asPartial<{ breadcrumbs: Hint['breadcrumbs']; theme_settings: Hint['theme_settings'] }>(
    ({breadcrumbs, theme_settings}) => (
        <>
            {/* html L1: <nav aria-label="Breadcrumb"> */}
            <nav aria-label="Breadcrumb">
                {/* html L2: <ol class="breadcrumbs"> */}
                <ol className="breadcrumbs">
                    {/* html L3: {{#unless theme_settings.hide_breadcrumbs }} */}
                    <$Unless
                        query={[theme_settings.hide_breadcrumbs]}
                        $then={() => (
                            /* html L4: {{#each breadcrumbs}} */
                            <$Each
                                list={breadcrumbs}
                                $then={(crumb, loop) => (
                                    /* html L5: <li class="breadcrumb {{#if @last}}is-active{{/if}}"> */
                                    <li className={`breadcrumb ${$if(loop['@last']).then(() => $$raw('is-active'))}`}>
                                        {/* html L6-9:
                                           <a class="breadcrumb-label"
                                              href="{{url}}"
                                              {{#if @last}}aria-current="page"{{/if}}
                                           >
                                        */}
                                        <a
                                            className="breadcrumb-label"
                                            href={crumb.url}
                                            $$={$if(loop['@last']).then(() => $$raw('aria-current="page"'))}
                                        >
                                            {/* html L10: <span>{{name}}</span> */}
                                            <span>{/* html L10: {{name}} */}{crumb.name}</span>
                                        </a>
                                    </li>
                                )}
                            />
                        )}
                    />
                </ol>
            </nav>

            {/* html L18: <script type="application/ld+json"  nonce="{{nonce}}"> */}
            <script type="application/ld+json" nonce={$nonce()}>
                {/* html L19-35:
                   {
                       "@context": "https://schema.org",
                       "@type": "BreadcrumbList",
                       "itemListElement":
                       [
                           {{#each breadcrumbs}}
                           {
                               "@type": "ListItem",
                               "position": {{add @index 1}},
                               "item": {
                                   "@id": {{{JSONstringify url}}},
                                   "name": {{{JSONstringify name}}}
                               }
                           }{{#unless @last}},{{/unless}}
                           {{/each}}
                       ]
                   }
                */}
                {[
                    $$raw('{ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": ['),
                    $each(breadcrumbs).then((crumb, loop) => [
                        $$raw('{ "@type": "ListItem", "position": '),
                        $add(loop['@index'], $number(1)),
                        $$raw(', "item": { "@id": '),
                        $_jsonStringify(crumb.url),
                        $$raw(', "name": '),
                        $_jsonStringify(crumb.name),
                        $$raw(' } }'),
                        $unless(loop['@last']).then(() => $$raw(',')),
                    ]),
                    $$raw('] }'),
                ]}
            </script>
        </>
    ),
);
