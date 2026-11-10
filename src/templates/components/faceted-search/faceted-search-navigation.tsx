/**
 * Source: templates/components/faceted-search/faceted-search-navigation.html (24 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $string, $this, $unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$dashcase, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {FacetHint} from '@/context-misc';

/** Reads the facet it is rendered for (the ambient context of `facets/*`). */
export default $asPartial(() => {
    const facet = $this<FacetHint>();

    return (
        /* html L1: <h2 class="accordion-heading accordion-nav-clear-holder"> */
        <h2 className="accordion-heading accordion-nav-clear-holder">
            {/* html L2-6:
               <button type="button"
                    class="accordion-navigation toggleLink{{#unless start_collapsed}} is-open{{/unless}}"
                    data-collapsible="#facetedSearch-content--{{dashcase facet}}"
                    aria-label="{{lang 'search.faceted.toggleSection' title=title}}"
               >
            */}
            <button
                type="button"
                className={`accordion-navigation toggleLink${$unless(facet.start_collapsed).then(() => $$raw(' is-open'))}`}
                data-collapsible={`#facetedSearch-content--${$dashcase(facet.facet)}`}
                aria-label={$lang($string('search.faceted.toggleSection'), {title: facet.title})}
            >
                {/* html L7: <span class="accordion-title"> */}
                <span className="accordion-title">{/* html L8: {{title}} */}{facet.title}</span>

                {/* html L11: <span> */}
                <span>
                    {/* html L12: <svg class="icon accordion-indicator toggleLink-text toggleLink-text--off"> */}
                    <svg className="icon accordion-indicator toggleLink-text toggleLink-text--off">
                        {/* html L13: <use href="#icon-add" /> */}
                        <use href="#icon-add"/>
                    </svg>
                    {/* html L15: <svg class="icon accordion-indicator toggleLink-text toggleLink-text--on"> */}
                    <svg className="icon accordion-indicator toggleLink-text toggleLink-text--on">
                        {/* html L16: <use href="#icon-remove" /> */}
                        <use href="#icon-remove"/>
                    </svg>
                </span>
            </button>
            {/* html L20: {{#if selected}} */}
            <$If
                query={[facet.selected]}
                $then={() => (
                    /* html L21: <a href="{{remove_url}}" class="facetedSearch-clearLink" data-faceted-search-facet>{{lang 'search.faceted.clear'}}</a> */
                    <a href={facet.remove_url} className="facetedSearch-clearLink" data-faceted-search-facet="">
                        {/* html L21: {{lang 'search.faceted.clear'}} */}
                        <$Lang translationKey={$string('search.faceted.clear')}/>
                    </a>
                )}
            />
        </h2>
    );
});
