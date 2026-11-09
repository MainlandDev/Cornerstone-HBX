import {$Each, $Unless, $each, $if, $number, $unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageCart} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$add, $_jsonStringify, $nonce} from '@mainlanddev/bigcommerce-react/bigcommerce';

type Hint = ThemeContextHint<ThemePageCart>;

export default $asPartial<{ breadcrumbs: Hint['breadcrumbs']; theme_settings: Hint['theme_settings'] }>(
    ({breadcrumbs, theme_settings}) => (
        <>
            <nav aria-label="Breadcrumb">
                <ol className="breadcrumbs">
                    <$Unless
                        query={[theme_settings.hide_breadcrumbs]}
                        $then={() => (
                            <$Each
                                list={breadcrumbs}
                                $then={(crumb, loop) => (
                                    <li className={`breadcrumb ${$if(loop['@last']).then(() => $$raw('is-active'))}`}>
                                        <a
                                            className="breadcrumb-label"
                                            href={crumb.url}
                                            $$={$if(loop['@last']).then(() => $$raw('aria-current="page"'))}
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

            <script type="application/ld+json" nonce={$nonce()}>
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
