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
        <h2 className="accordion-heading accordion-nav-clear-holder">
            <button
                type="button"
                className={`accordion-navigation toggleLink${$unless(facet.start_collapsed).then(() => $$raw(' is-open'))}`}
                data-collapsible={`#facetedSearch-content--${$dashcase(facet.facet)}`}
                aria-label={$lang($string('search.faceted.toggleSection'), {title: facet.title})}
            >
                <span className="accordion-title">{facet.title}</span>

                <span>
                    <svg className="icon accordion-indicator toggleLink-text toggleLink-text--off">
                        <use href="#icon-add"/>
                    </svg>
                    <svg className="icon accordion-indicator toggleLink-text toggleLink-text--on">
                        <use href="#icon-remove"/>
                    </svg>
                </span>
            </button>
            <$If
                query={[facet.selected]}
                $then={() => (
                    <a href={facet.remove_url} className="facetedSearch-clearLink" data-faceted-search-facet="">
                        <$Lang translationKey={$string('search.faceted.clear')}/>
                    </a>
                )}
            />
        </h2>
    );
});
