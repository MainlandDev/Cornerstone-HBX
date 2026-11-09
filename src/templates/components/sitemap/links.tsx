import {$Each, $If, $Partial, $this} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageSitemap} from '@mainlanddev/bigcommerce-react/theme';

type Entry = ThemeContextHint<ThemePageSitemap>['sitemap'][number]['body'][number];

/** Recursive: each call receives one sitemap entry as its ambient context (the `{{#each children}}` item). */
export default $asPartial(() => {
    const entry = $this<Entry>();

    return (
        <li>
            <a href={entry.url}>{entry.label}</a>
            <$If
                query={[entry.children]}
                $then={() => (
                    <ul>
                        <$Each list={entry.children} $then={() => <$Partial name="components/sitemap/links"/>}/>
                    </ul>
                )}
            />
        </li>
    );
});
