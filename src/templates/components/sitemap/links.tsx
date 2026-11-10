/**
 * Source: templates/components/sitemap/links.html (11 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $this} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageSitemap} from '@mainlanddev/bigcommerce-react/theme';

type Entry = ThemeContextHint<ThemePageSitemap>['sitemap'][number]['body'][number];

/** Recursive: each call receives one sitemap entry as its ambient context (the `{{#each children}}` item). */
export default $asPartial(() => {
    const entry = $this<Entry>();

    return (
        /* html L1: <li> */
        <li>
            {/* html L2: <a href="{{url}}">{{label}}</a> */}
            <a href={entry.url}>{/* html L2: {{label}} */}{entry.label}</a>
            {/* html L3: {{#if children}} */}
            <$If
                query={[entry.children]}
                $then={() => (
                    /* html L4: <ul> */
                    <ul>
                        {/* html L5: {{#each children}} */}
                        <$Each list={entry.children} $then={() => /* html L6: {{> components/sitemap/links}} */ <$Partial name="components/sitemap/links"/>}/>
                    </ul>
                )}
            />
        </li>
    );
});
