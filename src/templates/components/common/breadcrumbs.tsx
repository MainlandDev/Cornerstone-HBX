"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$add, $Each, $number, $pointer, $raw, $Unless, $If} from "@mainlanddev/hbx-bigcommerce";

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
                                $then={(crumb, loop) => (
                                    <li className={`breadcrumb ${$If({test: loop["@last"], $then: () => "is-active"})}`}>
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
        ${$Each({
            list: $pointer<Breadcrumb[]>("breadcrumbs"),
            $then: (_crumb, loop) =>
                `${$raw('\n        {\n            "@type": "ListItem",\n            "position": ')}${$add(loop["@index"], $number(1))}${$raw(',\n            "item": {\n                "@id": ')}${$raw("{{{JSONstringify url}}}")}${$raw(',\n                "name": ')}${$raw("{{{JSONstringify name}}}")}${$raw("\n            }\n        }")}${$Unless({test: loop["@last"], $then: () => ","})}${$raw("\n        ")}`,
        })}
    ]
}
`,
                }}
            />
        </>
    );
};
