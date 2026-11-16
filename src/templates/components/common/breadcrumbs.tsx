"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $pointer, $raw, $Unless} from "@mainlanddev/hbx-bigcommerce";

interface Breadcrumb {
    url: string;
    name: string;
}

export default (_props: PartialProps) => {
    const theme = $pointer<ThemeSettingsObject>("theme_settings");
    return (
        <>
            <nav aria-label="Breadcrumb">
                <ol className="breadcrumbs">
                    <$Unless
                        test={theme.hide_breadcrumbs}
                        $then={() => (
                            <$Each
                                list={$pointer<Breadcrumb[]>("breadcrumbs")}
                                $then={(crumb) => (
                                    <li className={`breadcrumb ${$raw("{{#if @last}}is-active{{/if}}")}`}>
                                        <a
                                            className="breadcrumb-label"
                                            href={crumb.url}
                                            dangerouslyInlineAttributes={{attributes: `${$raw('{{#if @last}}aria-current="page"{{/if}}')}`}}
                                        >
                                            <span>{crumb.name}</span>
                                        </a>
                                    </li>
                                )}
                            />
                        )}
                    />
                </ol>
            </nav>

            <script
                type="application/ld+json"
                nonce={$pointer("nonce")}
                dangerouslySetInnerHTML={{
                    __html: `
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement":
    [
        ${$raw("{{#each breadcrumbs}}")}
        {
            "@type": "ListItem",
            "position": ${$raw("{{add @index 1}}")},
            "item": {
                "@id": ${$raw("{{{JSONstringify url}}}")},
                "name": ${$raw("{{{JSONstringify name}}}")}
            }
        }${$raw("{{#unless @last}},{{/unless}}")}
        ${$raw("{{/each}}")}
    ]
}
`,
                }}
            />
        </>
    );
};
